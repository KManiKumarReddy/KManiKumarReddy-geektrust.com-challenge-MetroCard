import { PASSENGER_TYPES } from '../constants';
import Card from './Card';
import Station from './Station';

export default class Journey {
  fromStation: Station;
  card: Card;
  fare: number;
  passengerType: string;
  isReturnJourney: boolean;

  constructor({
    fromStation,
    card,
    passengerType,
    isReturnJourney,
    fare,
  }: {
    fromStation: Station;
    card: Card;
    passengerType: string;
    isReturnJourney?: boolean;
    fare: number;
  }) {
    this.fromStation = fromStation;
    this.card = card;
    this.passengerType = passengerType;
    this.fare = fare;
    this.isReturnJourney = isReturnJourney || false;
  }
}
