export function multiply(a, b) {
    return a * b;
}

export function celsiumToFarenheit(a) {
 if (a >= -273) {
    return Math.floor((a * 9 / 5) + 32);
} else
    return -460;
}