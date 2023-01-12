import {Car, CarData} from '../types';

class Garage {

    /* Returns json data about cars in a garage. */
    static getCars(page: number = 0, limit: number = 0): Promise<Car[]> {
        return fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<Car[]>;
            });
    }

    /* Returns json data about specified car. */
    static getCar(id: number): Promise<Car> {
        return fetch(`http://127.0.0.1:3000/garage/${id}`)
            .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json() as Promise<Car>;
                }
            );
    }

    /* Creates a new car in a garage. */
    static createCar(data: CarData): Promise<Car> {
        return fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json() as Promise<Car>;
                }
            );
    }

    /* Delete specified car from a garage */
    static deleteCar(id: number): void {
        fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                response.ok ? console.log('DELETED') : console.log('NOT DELETED');
            })
            .catch(error => console.log(error.text));
    }

    /* Updates attributes of specified car. */
    static updateCar(data: CarData, id: number): Promise<Car> {
        return fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((response) => response.json());
    }
}

export default Garage;
