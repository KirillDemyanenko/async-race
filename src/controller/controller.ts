import {
  CarData, CarsAPI, CarsAPIModel,
} from '../types';
import Garage from '../model/garage';
import ContentGenerator from '../view/view';
import CarModels from '../model/car-models';

let carsAPI: CarsAPI[] = [];

/* OnClick listener for generate 100 new cars */
export async function generateOneHundredCars(): Promise<void> {
  for (let i = 0; i < 100; i += 1) {
    const carBrand: CarsAPI = carsAPI[Math.floor(Math.random() * carsAPI.length)];
    const color = `#${(`${Math.random()
      .toString(16)}000000`).substring(2, 8)
      .toUpperCase()}`;
    const model: CarsAPIModel[] = await CarModels.loadCarModel(carBrand.id);
    await Garage.createCar({
      name: `${carBrand.name} ${model[Math.floor(Math.random() * model.length)].name}`,
      color,
    });
  }
}

/* OnClick listener for create new car from form data */
export async function buttonCreateNewCar(form: ParentNode): Promise<void> {
  const arr = Array.from(form.children) as Array<HTMLElement>;
  const carData: CarData = {
    name: (arr[0].lastChild as HTMLInputElement).value,
    color: (arr[1].lastChild as HTMLInputElement).value,
  };
  await Garage.createCar(carData)
    .then((data) => console.log(data));
}

/* OnClick listener for update car from form data */
export async function buttonUpdateCar(): Promise<void> {
  console.log('UPDATE');
}

export async function start(): Promise<void> {
  carsAPI = await CarModels.loadCarNames();
  await fetch('http://127.0.0.1:3000', { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Server is not available!');
      }
      ContentGenerator.generateHeader();
      Garage.getCars()
      // ContentGenerator.drawCar('#fff', 1, 'Toyota');
    })
    .catch(() => console.log('Server is not available!'));
}
