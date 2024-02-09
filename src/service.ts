import { STATION_NAMES } from './constants';
import Card from './models/Card';
import Station from './models/Station';

export default class MetroCardService {
  #CARDS_INDEX: { [key: string]: Card };
  #STATIONS: { [key: string]: Station };
  constructor() {
    this.#CARDS_INDEX = {};
    this.#STATIONS = {
      [STATION_NAMES.CENTRAL]: new Station(STATION_NAMES.CENTRAL),
      [STATION_NAMES.AIRPORT]: new Station(STATION_NAMES.AIRPORT),
    };
  }

  registerCard(name: string, balance: number) {
    if (this.#CARDS_INDEX[name]) {
      throw new Error(
        'Duplicate card error: A card with same number already exists'
      );
    }
    const card = new Card(name, balance);
    this.#CARDS_INDEX[name] = card;
  }

  checkIn(cardName: string, passengerType: string, stationName: string) {
    const card = this.#CARDS_INDEX[cardName];
    const station = this.#STATIONS[stationName];
    if (!card) {
      throw new Error(`Invalid Input: Card ${cardName} doesn't exist`);
    }
    if (!station) {
      throw new Error(`Invalid Input: Station ${stationName} doesn't exist`);
    }
    station.checkIn(card, passengerType);
  }

  printSummary() {
    Object.values(this.#STATIONS).forEach((station) => {
      const { collection, discount, checkinsByPassengerType } = station.summary;
      console.log(
        `\x1b[1mTOTAL_COLLECTION\x1b[0m\t${
          station.name
        }\t${collection}\t${discount}\n\x1b[1mPASSENGER_TYPE_SUMMARY\x1b[0m\n${checkinsByPassengerType
          .map(({ passengerType, count }) => `${passengerType}\t${count}`)
          .join('\n')}`
      );
    });
  }
}
