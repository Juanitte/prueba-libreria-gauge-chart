export function generateValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function modifyValue(value: number, min: number, max: number) {
    const delta = Math.floor(Math.random() * 5000) - 2000;
    let newValue = value + delta;

    if (newValue < min) return min;
    if (newValue > max) return max;
    
    return newValue;
}