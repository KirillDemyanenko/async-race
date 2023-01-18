export interface CarData {
    name: string,
    color: string
}

export interface Car {
    name: string,
    color: string,
    id: number
}

export interface Winner {
    'id': number,
    'wins': number,
    'time': number
}

export interface WinnerData {
    'wins': number,
    'time': number
}

export interface CarsAPI {
    'id': string,
    'name': string,
    'cyrillic-name': string,
    'models': number
}

export interface CarsAPIModel {
    'id': string,
    'name': string,
    'cyrillic-name': string,
    'class': string,
    'year-from': number,
    'year-to': number | null,
    'generations': number
}

export interface CarDrive {
    'velocity': number,
    'distance': number
}
