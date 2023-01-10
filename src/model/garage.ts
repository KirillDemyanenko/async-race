import {carData} from "../types";

export class Garage {
    /* Returns json data about cars in a garage. */
    getCars(page?: number, limit?: number) {
        fetch('http://127.0.0.1:3000/garage')
            .then(response => response.json())
            .then(data => console.log(data))
    }

    /* Returns json data about specified car. */
    getCar(id: number) {
        fetch(`http://127.0.0.1:3000/garage/${id}`)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    /* Creates a new car in a garage. */
    createCar(data: carData) {
        fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    /* Delete specified car from a garage */
    deleteCar(id: number) {
        fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    /* Updates attributes of specified car. */
    updateCar(data: carData, id: number) {
        fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }
}
