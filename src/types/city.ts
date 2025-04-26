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
        x: number;  // Original X coordinate for source
        y: number;  // Original Y coordinate for source
        z: number;  // Original Z coordinate (elevation) for source
    };
    destinationCoordinates: {
        x: number;  // Original X coordinate for destination
        y: number;  // Original Y coordinate for destination
        z: number;  // Original Z coordinate (elevation) for destination
    };
    population?: number;  // Optional population data
    description?: string;  // Optional city description
    trade: CityTrade;  // Trading prices for different cargo types
} 