import {generateHeader} from '../view/view';
import {Car} from '../types';
import Garage from '../model/garage';

export async function start(): Promise<void> {
    await fetch('http://127.0.0.1:3000', {method: 'HEAD'})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Server is not available!');
            }
            generateHeader();
        })
        .catch(() =>
            alert('Server is not available!'));
    // const cars: Car[] = await Garage.getCars();
    // //     for (let i = 0; i < 7; i++) {
    // //         drawCar(cars[i].color, i);
    // //     }
    // // await Garage.deleteCar(5)
    // setTimeout(() => console.log(cars), 2000);
}
