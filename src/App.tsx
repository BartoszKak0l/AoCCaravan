import React from 'react';
import './App.css';
import { CityMap } from './components/CityMap';
import { City, CargoRarity } from './types/city';
import { transformCoordinates } from './utils/coordinateTransform';

// Helper function to generate random trade prices
const generateTradePrices = (basePrice: number, variance: number = 0.4) => {
  const randomFactor = () => 1 + (Math.random() * 2 - 1) * variance;
  return {
    buy: Math.round(basePrice * randomFactor()),
    sell: Math.round(basePrice * randomFactor() * 1.2) // Selling price is generally higher
  };
};

// Original map aspect ratio (based on the previous 1320x900 dimensions)
const MAP_ASPECT_RATIO = 1320 / 900;

const calculateDimensions = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Try to fit to width first
  let width = viewportWidth;
  let height = width / MAP_ASPECT_RATIO;
  
  // If too tall, fit to height instead
  if (height > viewportHeight) {
    height = viewportHeight;
    width = height * MAP_ASPECT_RATIO;
  }
  
  return { width, height };
};

function App() {
  const [dimensions, setDimensions] = React.useState(calculateDimensions());

  React.useEffect(() => {
    function handleResize() {
      setDimensions(calculateDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // calculateDimensions is now stable since it's outside the component

  // Base prices for different cargo rarities
  const basePrices = {
    [CargoRarity.COMMON]: 50,
    [CargoRarity.UNCOMMON]: 100,
    [CargoRarity.RARE]: 250,
    [CargoRarity.HEROIC]: 500,
    [CargoRarity.EPIC]: 1000
  };

  const generateCityTrade = () => ({
    [CargoRarity.COMMON]: generateTradePrices(basePrices[CargoRarity.COMMON]),
    [CargoRarity.UNCOMMON]: generateTradePrices(basePrices[CargoRarity.UNCOMMON]),
    [CargoRarity.RARE]: generateTradePrices(basePrices[CargoRarity.RARE]),
    [CargoRarity.HEROIC]: generateTradePrices(basePrices[CargoRarity.HEROIC]),
    [CargoRarity.EPIC]: generateTradePrices(basePrices[CargoRarity.EPIC])
  });

  const cities: City[] = [
    {
      id: 'halcyon',
      name: 'Halcyon',
      coordinates: transformCoordinates({ x: -884751.499392000, y: -325649.112187000000, z: 11824.72745300000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -884751.499392000, y: -325649.112187000000, z: 11824.72745300000 },
      description: 'A peaceful city in the north',
      trade: generateCityTrade()
    },
    {
      id: 'new-aela',
      name: 'New Aela',
      coordinates: transformCoordinates({ x: -1130812.407337000, y: -843312.073625000000, z: 14019.45910100000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1130812.407337000, y: -843312.073625000000, z: 14019.45910100000 },
      description: 'A bustling port city',
      trade: generateCityTrade()
    },
    {
      id: 'joeva',
      name: 'Joeva',
      coordinates: transformCoordinates({ x: -1087379.008970000, y: -513361.741606000000, z: 14094.10331900000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1087379.008970000, y: -513361.741606000000, z: 14094.10331900000 },
      description: 'A historic trading hub',
      trade: generateCityTrade()
    },
    {
      id: 'winstead',
      name: 'Winstead',
      coordinates: transformCoordinates({ x: -634673.584447000, y: -372780.083735000000, z: 14269.98790700000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -634673.584447000, y: -372780.083735000000, z: 14269.98790700000 },
      description: 'A mountain city',
      trade: generateCityTrade()
    },
    {
      id: 'miraleth',
      name: 'Miraleth',
      coordinates: transformCoordinates({ x: -475615.671719000, y: -574470.865970000000, z: 11168.55352100000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -475615.671719000, y: -574470.865970000000, z: 11168.55352100000 },
      description: 'An ancient city',
      trade: generateCityTrade()
    },
    {
      id: 'aithanahr',
      name: 'Aithanahr',
      coordinates: transformCoordinates({ x: -259920.177304000, y: -751638.912231000000, z: 6846.93269800000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -259920.177304000, y: -751638.912231000000, z: 6846.93269800000 },
      description: 'A desert city',
      trade: generateCityTrade()
    },
    {
      id: 'azmaran',
      name: 'Azmaran',
      coordinates: transformCoordinates({ x: -268302.455695000, y: -989209.595577000000, z: 9484.75534100000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -268302.455695000, y: -989209.595577000000, z: 9484.75534100000 },
      description: 'A coastal city',
      trade: generateCityTrade()
    },
    {
      id: 'sunhaven',
      name: 'Sunhaven',
      coordinates: transformCoordinates({ x: -623148.978528000, y: -863431.096719000000, z: 14331.35023900000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -623148.978528000, y: -863431.096719000000, z: 14331.35023900000 },
      description: 'A sunny paradise',
      trade: generateCityTrade()
    },
    {
      id: 'djinna',
      name: 'Djinna',
      coordinates: transformCoordinates({ x: 63377.039789148, y: -861186.586615326000, z: 6767.22937500000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: 63377.039789148, y: -861186.586615326000, z: 6767.22937500000 },
      description: 'A mystical city',
      trade: generateCityTrade()
    },
    {
      id: 'squalls-end',
      name: "Squall's End",
      coordinates: transformCoordinates({ x: -47680.406512000, y: -1134380.725584000000, z: 16982.22188100000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -47680.406512000, y: -1134380.725584000000, z: 16982.22188100000 },
      description: 'A stormy port city',
      trade: generateCityTrade()
    },
    {
      id: 'jundark-trading-post',
      name: "Jundark Trading Post",
      coordinates: transformCoordinates({ x: -1483331.434872000, y: -1180489.317986000000, z: 7268.38626800000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1483331.434872000, y: -1180489.317986000000, z: 7268.38626800000 },
      description: 'A remote trading outpost',
      trade: generateCityTrade()
    },
    {
      id: 'tropics-trading-post',
      name: "Tropics Trading Post",
      coordinates: transformCoordinates({ x: -1974887.420323000, y: -36751.314912000000, z: 4622.15253000000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1974887.420323000, y: -36751.314912000000, z: 4622.15253000000 },
      description: 'A tropical trading post',
      trade: generateCityTrade()
    },
    {
      id: 'windansea',
      name: 'Windansea',
      coordinates: transformCoordinates({ x: -1100678.269613270, y: -246478.207851110000, z: 7050.00000000000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1100678.269613270, y: -246478.207851110000, z: 7050.00000000000 },
      description: 'A windy coastal city',
      trade: generateCityTrade()
    },
    {
      id: 'seahook',
      name: 'Seahook',
      coordinates: transformCoordinates({ x: -1764306.601345460, y: -539249.759503641000, z: 7252.22181100000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1764306.601345460, y: -539249.759503641000, z: 7252.22181100000 },
      description: 'A fishing port',
      trade: generateCityTrade()
    },
    {
      id: 'shorefoot',
      name: 'Shorefoot',
      coordinates: transformCoordinates({ x: -1372667.846502820, y: -57352.728025698100, z: 4460.00000000000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1372667.846502820, y: -57352.728025698100, z: 4460.00000000000 },
      description: 'A beachside town',
      trade: generateCityTrade()
    },
    {
      id: 'korrin',
      name: 'Korrin',
      coordinates: transformCoordinates({ x: -1764272.320962990, y: -114492.455202844000, z: 7252.22181100000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1764272.320962990, y: -114492.455202844000, z: 7252.22181100000 },
      description: 'A mountain village',
      trade: generateCityTrade()
    },
    {
      id: 'brinebarrel',
      name: 'Brinebarrel',
      coordinates: transformCoordinates({ x: -1861019.666082260, y: 171850.471882255000, z: 7252.22181100000 }, dimensions.width, dimensions.height),
      originalCoordinates: { x: -1861019.666082260, y: 171850.471882255000, z: 7252.22181100000 },
      description: 'A coastal fishing village',
      trade: generateCityTrade()
    }
  ];

  return (
    <div className="App" style={{ 
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1a1a1a'
    }}>
      <CityMap
        mapImage="/map.png"
        cities={cities}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}

export default App;
