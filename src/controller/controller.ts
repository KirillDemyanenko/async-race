import {
    Car,
    CarData, CarsAPI, CarsAPIModel
} from '../types';
import Garage from '../model/garage';
import ContentGenerator from '../view/view';
import CarModels from '../model/car-models';

let carsAPI: CarsAPI[] = [];
let selectedCarId: number;

export async function startRace(): Promise<void> {
    const arr: Promise<void>[] = Array(7);
    document.querySelectorAll('svg')
        .forEach(value => {
            arr.push(startCar(parseInt(value.id.replace('svg-', ''), 10)));
        });
    await Promise.all(arr);
}

export async function resetRace(): Promise<void> {
    document.querySelectorAll('.car-track')
        .forEach(value => value.innerHTML = '');
    await redrawCarTrackWithCars(parseInt((document.querySelector('#current-page') as HTMLInputElement).value, 10));
}

export async function redrawCarTrackWithCars(page: number): Promise<void> {
    document.querySelectorAll('.car-track')
        .forEach(value => value.innerHTML = '');
    await Garage.getCars(page, 7)
        .then(data => data.forEach((car, inx) => {
            ContentGenerator.drawCar(car.color, inx, car.name, car.id)
        }))
}

export async function startCar(carId: number) {
    try {
        await Garage.switchCarEngine('started', carId)
            .then(data => {
                const element = document.querySelector(`#svg-${carId}`) as HTMLElement;
                element.style.animationDuration = `${((data.distance / data.velocity) / 1000).toString()}s`;
                console.log(((data.distance / data.velocity) / 1000).toString());
                element.style.animationPlayState = 'running';
                try {
                    Garage.switchCarEngine('drive', carId)
                        .catch(error => {
                            element.style.animationPlayState = 'paused';
                            console.log(error);
                        });
                } catch (error) {
                    element.style.animationPlayState = 'paused';
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
    }
}

/* OnClick listener for select car */
export async function selectCar(carId: number): Promise<void> {
    await Garage.getCar(carId)
        .then(data => {
            selectedCarId = carId;
            ContentGenerator.enableUpdateForm();
            ContentGenerator.setDataInUpdateForm(data.name, data.color);
        });
}

/* OnClick listener for generate 100 new cars */
export async function generateOneHundredCars(): Promise<void> {
    let count = 0;
    let timerId = setInterval(async () => {
            count++;
            if (count > 100) {
                clearInterval(timerId);
                console.log('done');
                return;
            }

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
    );
    await redrawCarTrackWithCars(parseInt((document.querySelector('#current-page') as HTMLInputElement).value, 10));
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
export async function buttonUpdateCar(form: ParentNode): Promise<void> {
    const arr = Array.from(form.children) as Array<HTMLElement>;
    const carData: CarData = {
        name: (arr[0].lastChild as HTMLInputElement).value,
        color: (arr[1].lastChild as HTMLInputElement).value,
    };
    await Garage.updateCar(carData, selectedCarId)
        .then(() => alert('Sucsessfully udated!'));
    const element: SVGGElement = (document.querySelector(`#svg-${selectedCarId}`) as SVGGElement);
    element.children[2].setAttribute('fill', carData.color);
    element.children[3].textContent = carData.name;
    ContentGenerator.disableUpdateForm();
}

export async function start(): Promise<void> {
    carsAPI = await CarModels.loadCarNames();
    await fetch('http://127.0.0.1:3000', {method: 'HEAD'})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Server is not available!');
            }
            ContentGenerator.generateHeader();
            Garage.getCars(1, 7)
                .then(data => data.forEach((car, inx) => ContentGenerator.drawCar(car.color, inx, car.name, car.id)));
        })
        .catch(() => console.log('Server is not available!'));

}
