import { CarsAPI, CarsAPIModel } from '../types';

/* Randomly generates a car name using https://cars-base.ru/api/ */
class CarModels {
  /* Loads car brands via API https://cars-base.ru/api/ */
  static async loadCarNames(): Promise<CarsAPI[]> {
    return fetch('https://cars-base.ru/api/cars')
      .then((response) => response.json() as Promise<CarsAPI[]>);
  }

  /* Loads car model via depending on brand */
  static async loadCarModel(id: string): Promise<CarsAPIModel[]> {
    return fetch(`https://cars-base.ru/api/cars/${id}`)
      .then((response) => response.json() as Promise<CarsAPIModel[]>);
  }
}

export default CarModels;
