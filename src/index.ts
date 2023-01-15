import './style.scss';
import {start} from './controller/controller';

start()
    .then(() => console.log('Successfully running!'))
    .catch(() => console.log('Something wrong...'));
