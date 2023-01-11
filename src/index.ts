import './style.scss';
import Garage from './model/garage';
// import {Car} from './types';
// import { Car } from './types';
// import { CarData, Car } from './types';

Garage.getCars().then(result => {
    console.log(result);}, error => {throw new Error(error.text)})
// console.log((async () => {
//   Garage.getCar(5);
// })());
// const car: CarData = {
//   name: 'New Red Car',
//   color: '#ff0000',
// };
// const newCar: CarData = {
//   name: 'Car with new name',
//   color: '#ff00ff',
// };
// console.log((async () => {
//   await Garage.createCar(car);
// })());
// console.log((async () => {
//   await Garage.deleteCar(6);
// })());
// console.log((async () => {
//   await Garage.getCars();
// })());
// console.log((async () => {
//   await Garage.updateCar(newCar, 4);
// })());
