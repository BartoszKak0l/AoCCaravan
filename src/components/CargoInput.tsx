import React from 'react';
import { CargoRarity } from '../types/city';

interface CargoInputProps {
    onCargoChange: (cargo: Record<CargoRarity, number>) => void;
    initialValues: Record<CargoRarity, number>;
}

const RARITY_COLORS = {
    [CargoRarity.COMMON]: '#808080',    // Grey
    [CargoRarity.UNCOMMON]: '#1eff00',  // Green
    [CargoRarity.RARE]: '#0070dd',      // Blue
    [CargoRarity.HEROIC]: '#ffd100',    // Gold
    [CargoRarity.EPIC]: '#a335ee',      // Purple
};

const RARITY_LABELS = {
    [CargoRarity.COMMON]: 'Common',
    [CargoRarity.UNCOMMON]: 'Uncommon',
    [CargoRarity.RARE]: 'Rare',
    [CargoRarity.HEROIC]: 'Heroic',
    [CargoRarity.EPIC]: 'Epic',
};

export const CargoInput: React.FC<CargoInputProps> = ({ onCargoChange, initialValues }) => {
    const [cargo, setCargo] = React.useState<Record<CargoRarity, number>>(initialValues);

    const handleChange = (rarity: CargoRarity, value: string) => {
        const numValue = parseInt(value) || 0;
        const newCargo = {
            ...cargo,
            [rarity]: Math.max(0, numValue)
        };
        setCargo(newCargo);
        onCargoChange(newCargo);
    };

    return (
        <div className="cargo-input" style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px'
        }}>
            <div style={{ display: 'grid', gap: '10px' }}>
                {Object.values(CargoRarity).map((rarity) => (
                    <div key={rarity} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        padding: '8px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        border: `2px solid ${RARITY_COLORS[rarity]}`
                    }}>
                        <span style={{ 
                            color: RARITY_COLORS[rarity],
                            fontWeight: 'bold',
                            width: '80px',
                            fontSize: '13px'
                        }}>
                            {RARITY_LABELS[rarity]}
                        </span>
                        <input
                            type="number"
                            min="0"
                            value={cargo[rarity]}
                            onChange={(e) => handleChange(rarity, e.target.value)}
                            style={{
                                width: '60px',
                                padding: '4px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                textAlign: 'center',
                                fontSize: '13px'
                            }}
                        />
                        <div style={{ 
                            display: 'flex', 
                            gap: '4px',
                            marginLeft: 'auto'
                        }}>
                            <button 
                                onClick={() => handleChange(rarity, (cargo[rarity] - 1).toString())}
                                style={{
                                    padding: '2px 6px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#f0f0f0',
                                    fontSize: '12px'
                                }}
                            >
                                -
                            </button>
                            <button 
                                onClick={() => handleChange(rarity, (cargo[rarity] + 1).toString())}
                                style={{
                                    padding: '2px 6px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#f0f0f0',
                                    fontSize: '12px'
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 