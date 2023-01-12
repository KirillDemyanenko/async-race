import './style.scss';
import Garage from './model/garage';
// import {drawCar} from './view/view';
import {Car, CarData} from './types';

async function start() {
    // const dC: CarData = {name:'gfdg', color:'#670c0c'}
    // const car: Car = await Garage.updateCar(dC, 2)
            const cars: Car[] = await Garage.getCars();
    //     for (let i = 0; i < 7; i++) {
    //         drawCar(cars[i].color, i);
    //     }
    // await Garage.deleteCar(5)
    setTimeout(() => console.log(cars), 2000)
}

(async () => await start())();
// drawCar('#c4ff12', 1);
// drawCar('#c00dd5', 2);
// drawCar('#1144b0', 3);
// drawCar('#de0fa4', 4);
// drawCar('#59550b', 5);
// drawCar('#669188', 6);
// drawCar('#620e4e', 0);
