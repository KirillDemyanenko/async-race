import { Car } from '../types';

class Garage {

  /* Returns json data about cars in a garage. */
  async getCars(page?: number, limit?: number): Promise<Car[]> {
      let options: string = '?'
      // if (arguments.length > 0) {
      //   options.concat(`${page ? /`_page=${page}/` : ''}`)
      //   const page: string =
      //   const limit: string = limit ? `_page=${limit}` : ''
      // }
      return await fetch('http://127.0.0.1:3000/garage'.concat(options))
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Car[]>;
      })
  }

//   /* Returns json data about specified car. */
//   static getCar(id: number) {
//     fetch(`http://127.0.0.1:3000/garage/${id}`)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//
//   /* Creates a new car in a garage. */
//   static createCar(data: CarData) {
//     fetch('http://127.0.0.1:3000/garage', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//
//   /* Delete specified car from a garage */
//   static deleteCar(id: number) {
//     fetch(`http://127.0.0.1:3000/garage/${id}`, {
//       method: 'DELETE',
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//
//   /* Updates attributes of specified car. */
//   static updateCar(data: CarData, id: number) {
//     fetch(`http://127.0.0.1:3000/garage/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
}

export default Garage;
