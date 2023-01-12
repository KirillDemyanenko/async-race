import {Car} from '../types';

class Garage {

    /* Returns json data about cars in a garage. */
    async getCars(page: number = 0, limit: number = 0): Promise<Car[]> {
        return await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<Car[]>;
            });
    }

    /* Returns json data about specified car. */
    static getCar(id: number) {
        return fetch(`http://127.0.0.1:3000/garage/${id}`)
            .then((response) => response.json());
    }

    /* Creates a new car in a garage. */
    static async createCar(data: Car) {
        return await fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((response) => response.json());
    }

    /* Delete specified car from a garage */
    static deleteCar(id: number) {
        fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    /* Updates attributes of specified car. */
    static updateCar(data: Car, id: number) {
        fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
}

export default Garage;
