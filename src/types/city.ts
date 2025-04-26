export enum CargoRarity {
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
    HEROIC = 'HEROIC',
    EPIC = 'EPIC'
}

export interface CargoPrice {
    buy: number;
    sell: number;
}

export interface CityTrade {
    [CargoRarity.COMMON]: CargoPrice;
    [CargoRarity.UNCOMMON]: CargoPrice;
    [CargoRarity.RARE]: CargoPrice;
    [CargoRarity.HEROIC]: CargoPrice;
    [CargoRarity.EPIC]: CargoPrice;
}

export interface City {
    id: string;
    name: string;
    coordinates: {
        x: number;  // X coordinate on the map image
        y: number;  // Y coordinate on the map image
    };
    originalCoordinates: {
        x: number;  // Original X coordinate
        y: number;  // Original Y coordinate
        z: number;  // Original Z coordinate (elevation)
    };
    population?: number;  // Optional population data
    description?: string;  // Optional city description
    trade: CityTrade;  // Trading prices for different cargo types
} 