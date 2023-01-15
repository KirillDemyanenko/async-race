import {
  Car, CarData, Winner, WinnerData,
} from '../types';
import Garage from '../model/garage';
import { generateHeader, drawCar } from '../view/view';

async function buttonCreateNewCar(form: ParentNode): Promise<void> {
  const arr = Array.from(form.children) as Array<HTMLElement>;
  const carData: CarData = {
    name: (arr[0].lastChild as HTMLInputElement).value,
    color: (arr[1].lastChild as HTMLInputElement).value,
  };
  await Garage.createCar(carData).then((data) => console.log(data));
}

async function buttonUpdateCar(): Promise<void> {
  console.log('UPDATE');
}

export async function start(): Promise<void> {
  await fetch('http://127.0.0.1:3000', { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Server is not available!');
      }
      generateHeader();
      drawCar('#fff', 1, 'Toyota');
    })
    .catch(() => console.log('Server is not available!'));
}

export { buttonUpdateCar, buttonCreateNewCar };
