
import {Cards} from 'high-flash';
const c = new Cards(true, 'data/cards.sqlite');
await c.import_from_csv("cards.csv");
