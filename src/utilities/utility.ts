export const generateRandomNumbers = (min: number, max: number) => {
    const lowest = min < 0 ? Math.abs(min) : min;
    const total = (max - min);
    return Array(total).fill(total).map(f => Math.fround(f * Math.random()));
}

