interface WorldCoordinate {
    x: number;
    y: number;
    z: number;
}

interface MapCoordinate {
    x: number;
    y: number;
}

export function transformCoordinates(
    worldCoord: WorldCoordinate,
    mapWidth: number,
    mapHeight: number
): MapCoordinate {
    // Find the bounds of the world coordinates
    const minX = -1974887.420323000;
    const maxX = 63377.039789148;
    const minY = -1180489.317986000;
    const maxY = 171850.471882255;

    // Calculate border size (8% horizontal, 13% vertical)
    const borderX = mapWidth * 0.08;
    const borderY = mapHeight * 0.13;

    // Add extra 3.33% to top margin (2/3 of 5%)
    const topMargin = mapHeight * 0.0333;

    // Calculate the actual map area (excluding borders)
    const actualWidth = mapWidth - (2 * borderX);
    const actualHeight = mapHeight - (2 * borderY);

    // Transform the coordinates to map space with borders
    const x = borderX + ((worldCoord.x - minX) / (maxX - minX)) * actualWidth;
    // Flip the y coordinate vertically and add border plus extra top margin
    const y = borderY + topMargin + (actualHeight - ((worldCoord.y - minY) / (maxY - minY)) * actualHeight);

    return { x, y };
} 