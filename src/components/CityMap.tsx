import React, { useState } from 'react';
import { City, CargoRarity } from '../types/city';
import { calculateDistance, formatDistance } from '../utils/distanceCalculator';
import { CargoInput } from './CargoInput';

interface CityMapProps {
    mapImage: string;
    cities: City[];
    width: number;
    height: number;
}

// Base value multipliers for each cargo rarity
const CARGO_VALUE_MULTIPLIERS = {
    [CargoRarity.COMMON]: 0.0000005496589097124300,
    [CargoRarity.UNCOMMON]: 0.0000016493174106547000,
    [CargoRarity.RARE]: 0.0000043985051546944500,
    [CargoRarity.HEROIC]: 0.0000082501916855475800,
    [CargoRarity.EPIC]: 0.0000131939027952095000
};

export const CityMap: React.FC<CityMapProps> = ({ mapImage, cities, width, height }) => {
    const [startCity, setStartCity] = useState<City | null>(() => {
        const saved = localStorage.getItem('startCity');
        if (saved) {
            const cityData = JSON.parse(saved);
            return cities.find(c => c.id === cityData.id) || null;
        }
        return null;
    });

    const [endCity, setEndCity] = useState<City | null>(() => {
        const saved = localStorage.getItem('endCity');
        if (saved) {
            const cityData = JSON.parse(saved);
            return cities.find(c => c.id === cityData.id) || null;
        }
        return null;
    });

    const [isCargoPanelVisible, setIsCargoPanelVisible] = useState(true);
    const cargoPanelRef = React.useRef<HTMLDivElement>(null);
    const [panelWidth, setPanelWidth] = React.useState(0);

    const [cargo, setCargo] = useState<Record<CargoRarity, number>>(() => {
        const savedCargo = localStorage.getItem('cargo');
        if (savedCargo) {
            return JSON.parse(savedCargo);
        }
        return {
            [CargoRarity.COMMON]: 0,
            [CargoRarity.UNCOMMON]: 0,
            [CargoRarity.RARE]: 0,
            [CargoRarity.HEROIC]: 0,
            [CargoRarity.EPIC]: 0,
        };
    });

    const [isTransitionEnabled, setIsTransitionEnabled] = React.useState(false);

    React.useEffect(() => {
        if (cargoPanelRef.current) {
            setPanelWidth(cargoPanelRef.current.offsetWidth);
        }
    }, [isCargoPanelVisible]);

    React.useEffect(() => {
        // Enable transitions after component mounts
        const timer = setTimeout(() => {
            setIsTransitionEnabled(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Save cargo values when they change
    React.useEffect(() => {
        localStorage.setItem('cargo', JSON.stringify(cargo));
    }, [cargo]);

    // Save selected cities when they change
    React.useEffect(() => {
        if (startCity) {
            localStorage.setItem('startCity', JSON.stringify({ id: startCity.id }));
        } else {
            localStorage.removeItem('startCity');
        }
    }, [startCity]);

    React.useEffect(() => {
        if (endCity) {
            localStorage.setItem('endCity', JSON.stringify({ id: endCity.id }));
        } else {
            localStorage.removeItem('endCity');
        }
    }, [endCity]);

    const handleCityClick = (city: City) => {
        if (!startCity) {
            setStartCity(city);
        } else if (!endCity) {
            setEndCity(city);
        } else {
            setStartCity(city);
            setEndCity(null);
        }
    };

    const clearSelection = () => {
        setStartCity(null);
        setEndCity(null);
        localStorage.removeItem('startCity');
        localStorage.removeItem('endCity');
    };

    const getMarkerColor = (city: City) => {
        if (city.id === startCity?.id) return '#00ff00'; // Green for start
        if (city.id === endCity?.id) return '#ff0000'; // Red for end
        return '#808080'; // Gray for others
    };

    const calculateAndFormatDistance = () => {
        if (startCity && endCity) {
            const distance = calculateDistance(
                startCity.originalCoordinates,
                endCity.destinationCoordinates
            );
            return formatDistance(distance);
        }
        return '';
    };

    const calculateProfit = () => {
        if (!startCity || !endCity) return 0;

        // Calculate raw distance in original units (before km conversion)
        const dx = endCity.destinationCoordinates.x - startCity.originalCoordinates.x;
        const dy = endCity.destinationCoordinates.y - startCity.originalCoordinates.y;
        const dz = endCity.destinationCoordinates.z - startCity.originalCoordinates.z;
        const rawDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let totalProfit = 0;
        Object.entries(cargo).forEach(([rarity, amount]) => {
            const typedRarity = rarity as CargoRarity;
            const multiplier = CARGO_VALUE_MULTIPLIERS[typedRarity];
            const sellPrice = rawDistance * multiplier;
            totalProfit += sellPrice * amount;
        });

        if (rawDistance > 1000000) {
            totalProfit *= 1.2;
        }

        return totalProfit;
    };

    return (
        <div className="city-map-container" style={{ 
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0
        }}>
            <button 
                onClick={() => setIsCargoPanelVisible(!isCargoPanelVisible)}
                style={{
                    position: 'absolute',
                    left: isCargoPanelVisible ? `${panelWidth}px` : '0',
                    top: '20px',
                    padding: '8px 12px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    transition: isTransitionEnabled ? 'left 0.3s ease-in-out' : 'none',
                    borderTopLeftRadius: isCargoPanelVisible ? '4px' : '0',
                    borderBottomLeftRadius: isCargoPanelVisible ? '4px' : '0',
                    borderTopRightRadius: isCargoPanelVisible ? '0' : '4px',
                    borderBottomRightRadius: isCargoPanelVisible ? '0' : '4px',
                    borderLeft: isCargoPanelVisible ? '1px solid #ccc' : 'none'
                }}
            >
                {isCargoPanelVisible ? '←' : '→'}
            </button>
            <div 
                ref={cargoPanelRef}
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '12px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    maxWidth: '300px',
                    flexShrink: 0,
                    transform: isCargoPanelVisible ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                    position: 'relative',
                    left: isCargoPanelVisible ? '0' : '-300px',
                    overflow: 'hidden',
                    margin: 0
                }}
            >
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px'
                }}>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>Cargo Load</h3>
                </div>
                <div style={{ 
                    fontSize: '14px',
                    margin: '0 -2px'
                }}>
                    <CargoInput onCargoChange={setCargo} initialValues={cargo} />
                </div>
            </div>
            <div style={{ 
                position: 'relative', 
                flexGrow: 1,
                margin: 0,
                padding: 0,
                height: '100%'
            }}>
                <div style={{ 
                    position: 'relative', 
                    width: `${width}px`, 
                    height: `${height}px`,
                    margin: 0,
                    padding: 0
                }}>
                    <img 
                        src={mapImage} 
                        alt="Map" 
                        style={{ 
                            width: '100%', 
                            height: '100%',
                            position: 'relative',
                            top: '30px',
                            left: '10px',
                            display: 'block'
                        }}
                    />
                    {cities.map(city => (
                        <div key={city.id} style={{ position: 'absolute', left: `${city.coordinates.x}px`, top: `${city.coordinates.y}px` }}>
                            <div
                                className="city-marker"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: getMarkerColor(city),
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    transform: 'translate(-50%, -50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    color: 'white',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    padding: '2px',
                                    lineHeight: '1',
                                    wordBreak: 'break-word'
                                }}
                                onClick={() => handleCityClick(city)}
                                title={city.name}
                            >
                                {city.name}
                            </div>
                        </div>
                    ))}
                </div>
                {startCity && endCity && (
                    <div
                        className="travel-info"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            zIndex: 1000
                        }}
                    >
                        <h3>Travel Plan</h3>
                        <p>From: {startCity.name}</p>
                        <p>To: {endCity.name}</p>
                        <p style={{ 
                            fontSize: '16px', 
                            fontWeight: 'bold', 
                            color: '#2c3e50',
                            marginTop: '10px',
                            padding: '5px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '4px'
                        }}>
                            Distance: {calculateAndFormatDistance()}
                        </p>
                        <p style={{ 
                            fontSize: '16px', 
                            fontWeight: 'bold', 
                            color: '#2c3e50',
                            marginTop: '10px',
                            padding: '5px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '4px'
                        }}>
                            Profit: {calculateProfit().toFixed(4)}g
                        </p>
                        <button 
                            onClick={clearSelection}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}
                        >
                            Clear Selection
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}; 