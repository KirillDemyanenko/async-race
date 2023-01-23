import { Car, CarData, CarDrive } from '../types';
import ContentGenerator from '../view/view';

class Garage {
  /* Returns json data about cars in a garage. */
  static async getCars(page = 0, limit = 0): Promise<Car[]> {
    return fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        ContentGenerator.setTotalPageCount(response.headers.get('X-Total-Count') as string);
        return response.json() as Promise<Car[]>;
      });
  }

  /* Returns json data about specified car. */
  static async getCar(id: number): Promise<Car> {
    return fetch(`http://127.0.0.1:3000/garage/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Car>;
      });
  }

  /* Creates a new car in a garage. */
  static async createCar(data: CarData): Promise<Car> {
    return fetch('http://127.0.0.1:3000/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Car>;
      });
  }

  /* Delete specified car from a garage */
  static async deleteCar(id: number): Promise<void> {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('DELETED');
        } else {
          console.log('NOT DELETED');
        }
      });
  }

  /* Updates attributes of specified car. */
  static async updateCar(data: CarData, id: number): Promise<Car> {
    return fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<Car>);
  }

  /* Starts or stops engine of specified car, and returns it's actual velocity and distance. */
  static async switchCarEngine(status: string, id: number): Promise<CarDrive> {
    return fetch(`http://127.0.0.1:3000/engine/?id=${id}&status=${status}`, {
      method: 'PATCH',
    })
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<CarDrive>;
        }
        throw new Error(response.statusText);
      });
  }
}

export default Garage;
