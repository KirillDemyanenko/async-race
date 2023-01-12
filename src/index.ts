import './style.scss';
import Garage from './model/garage';
import {drawCar} from './view/view';
const a: Garage = new Garage()
async function start () {
    const cars = await a.getCars();
    setTimeout(() => console.log(cars), 2000)
}
(async () => await start())()
drawCar('#c4ff12', 1)
drawCar('#c00dd5', 2)
drawCar('#1144b0', 3)
drawCar('#de0fa4', 4)
drawCar('#59550b', 5)
drawCar('#669188', 6)
drawCar('#620e4e', 7)
