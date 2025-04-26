interface WorldCoordinate {
    x: number;
    y: number;
    z: number;
}

export function calculateDistance(coord1: WorldCoordinate, coord2: WorldCoordinate): number {
    // Convert coordinates to kilometers (assuming the coordinates are in meters)
    const x1 = coord1.x / 10000;
    const y1 = coord1.y / 10000;
    const z1 = coord1.z / 10000;  // Include elevation in calculation
    const x2 = coord2.x / 10000;
    const y2 = coord2.y / 10000;
    const z2 = coord2.z / 10000;  // Include elevation in calculation

    // Calculate Euclidean distance in 3D space including elevation
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;  // Include elevation difference
    
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
    return distance;
}

export function formatDistance(distance: number): string {
    if (distance < 1) {
        return `${(distance * 1000).toFixed(4)} meters`;
    }
    return `${distance.toFixed(4)} km`;
} 