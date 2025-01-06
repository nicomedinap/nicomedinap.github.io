// mapa.js

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 12, 0, 88, 0, 96, 0, 41, 0, 33, 0, 22, 0, 10, 0, 67, 0, 89, 0, 78, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 78, 0, 84, 0, 60, 0, 43, 0, 37, 0, 55, 0, 31, 0, 88, 0, 23, 0, 67, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 55, 0, 89, 0, 119, 0, 47, 0, 38, 0, 96, 0, 72, 0, 14, 0, 55, 0, 88, 0, 51, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 67, 0, 89, 0, 120, 0, 78, 0, 56, 0, 99, 0, 33, 0, 45, 0, 77, 0, 88, 0, 40, 0, 55, 0, 91, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 50, 0, 72, 0, 34, 0, 66, 0, 78, 0, 43, 0, 21, 0, 65, 0, 99, 0, 100, 0, 64, 0, 48, 0, 25, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 84, 0, 91, 0, 13, 0, 94, 0, 85, 0, 47, 0, 38, 0, 66, 0, 76, 0, 54, 0, 12, 0, 43, 0, 55, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 56, 0, 15, 0, 78, 0, 33, 0, 20, 0, 65, 0, 89, 0, 47, 0, 14, 0, 86, 0, 90, 0, 32, 0, 45, 0, 71, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 67, 0, 40, 0, 99, 0, 74, 0, 88, 0, 55, 0, 34, 0, 19, 0, 60, 0, 12, 0, 77, 0, 83, 0, 45, 0, 89, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 78, 0, 65, 0, 45, 0, 90, 0, 67, 0, 120, 0, 33, 0, 89, 0, 76, 0, 12, 0, 100, 0, 34, 0, 45, 0, 55, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 99, 0, 88, 0, 34, 0, 12, 0, 67, 0, 55, 0, 90, 0, 21, 0, 76, 0, 33, 0, 100, 0, 45, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 55, 0, 12, 0, 67, 0, 120, 0, 33, 0, 99, 0, 76, 0, 88, 0, 34, 0, 45, 0, 90, 0, 100, 0, 45, 0, 89, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 88, 0, 90, 0, 33, 0, 67, 0, 55, 0, 12, 0, 99, 0, 120, 0, 45, 0, 34, 0, 76, 0, 100, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 76, 0, 12, 0, 67, 0, 88, 0, 34, 0, 55, 0, 99, 0, 120, 0, 33, 0, 45, 0, 90, 0, 100, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 99, 0, 34, 0, 120, 0, 45, 0, 88, 0, 12, 0, 55, 0, 33, 0, 67, 0, 76, 0, 90, 0, 100, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 67, 0, 88, 0, 33, 0, 12, 0, 76, 0, 55, 0, 99, 0, 45, 0, 120, 0, 34, 0, 90, 0, 100, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 99, 0, 34, 0, 55, 0, 88, 0, 45, 0, 67, 0, 12, 0, 33, 0, 120, 0, 76, 0, 90, 0, 100, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 67, 0, 88, 0, 33, 0, 12, 0, 76, 0, 55, 0, 99, 0, 45, 0, 120, 0, 34, 0, 90, 0, 100, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 99, 0, 34, 0, 55, 0, 88, 0, 45, 0, 67, 0, 12, 0, 33, 0, 120, 0, 76, 0, 90, 0, 100, 0, 83, 0, 45, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 67, 0, 88, 0, 33, 0, 12, 0, 76, 0, 55, 0, 99, 0, 45, 0, 120, 0, 34, 0, 90, 0, 100, 0, 83, 0, 45, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export { map };