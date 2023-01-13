import { drawCar, generateHeader } from '../view/view';
import { Car, CarData } from '../types';
import Garage from '../model/garage';

export async function buttonCreateNewCar(form: ParentNode) {
  const arr = Array.from(form.children) as Array<HTMLElement>;
  console.log();
  const carData: CarData = {
    name: (arr[0].lastChild as HTMLInputElement).value,
    color: (arr[1].lastChild as HTMLInputElement).value,
  };
  await Garage.createCar(carData);
}

export function buttonUpdateCar() {
  console.log('UPDATE');
}

export async function start(): Promise<void> {
  await fetch('http://127.0.0.1:3000', { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Server is not available!');
      }
      generateHeader();
    })
    .catch(() => console.log('Server is not available!'));
  const cars: Car[] = await Garage.getCars();
  setTimeout(() => console.log(...cars), 2000);
  setTimeout(() => {
    for (let i = 0; i <= 7; i += 1) {
      drawCar(cars[i].color, i);
      console.log(cars[i]);
    }
  }, 3000);
}
