import './style.scss'
import {Garage} from "./model/garage";
import {carData} from "./types";

console.log('app starts!')

const a = new Garage()
// console.log((async () => {
//     await a.getCars()
// })())
// console.log((async () => {
//     await a.getCar(5)
// })())
const car: carData = {"name": "New Red Car", "color": "#ff0000"}
const newCar: carData = {"name": "Car with new name", "color": "#ff00ff"}
// console.log((async () => {
//     await a.createCar(car)
// })())
// console.log((async () => {
//     await a.deleteCar(6)
// })())
console.log((async () => {
    await a.getCars()
})())
console.log((async () => {
    await a.updateCar(newCar, 4)
})())
