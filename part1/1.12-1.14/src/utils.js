export function incrementValueAtIndex(array, idx) {
    array[idx]++;
    return array;
}

export function indexWithHighestValue(array) {
    let res = 0;
    for (let i = 1; i < array.length; i++) if (array[i] > array[res]) res = i;
    return res;
}