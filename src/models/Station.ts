import { FARES } from '../constants';
import Journey from './Journey';
import Card from './Card';

export default class Station {
  name: string;
  #checkins: Journey[];
  #collection: number;
  #discountsGiven: number;
  #CHECKINS_BY_PASSENGER_INDEX: { [key: string]: Journey[] };
  #recharges: { amount: number; card: Card }[];

  constructor(name: string) {
    this.name = name;
    this.#checkins = [];
    this.#recharges = [];
    this.#CHECKINS_BY_PASSENGER_INDEX = {};
    this.#collection = 0;
    this.#discountsGiven = 0;
  }

  checkIn(card: Card, passengerType: string) {
    const isReturnJourney = card.isReturnApplicable(this);
    const fare = isReturnJourney
      ? Math.ceil(FARES[passengerType] / 2)
      : FARES[passengerType];
    if (card.balance < fare) {
      const requiredBalance = fare - card.balance;
      card.rechargeCard(requiredBalance, this);
      this.#recharges.push({ amount: requiredBalance, card });
      this.#collection += Math.ceil(requiredBalance * 0.02);
    }
    const journey = new Journey({
      fromStation: this,
      card,
      passengerType,
      isReturnJourney,
      fare,
    });
    card.chargeCard(fare, journey);
    this.#collection += fare;
    if (isReturnJourney) {
      this.#discountsGiven += fare;
    }
    this.#checkins.push(journey);
    if (this.#CHECKINS_BY_PASSENGER_INDEX[passengerType]) {
      this.#CHECKINS_BY_PASSENGER_INDEX[passengerType].push(journey);
    } else {
      this.#CHECKINS_BY_PASSENGER_INDEX[passengerType] = [journey];
    }
  }

  get summary() {
    return {
      collection: this.#collection,
      discount: this.#discountsGiven,
      checkinsByPassengerType: Object.entries(this.#CHECKINS_BY_PASSENGER_INDEX)
        .map(([passengerType, journeys]) => ({
          passengerType,
          count: journeys.length,
        }))
        .sort(
          (a, b) =>
            b.count - a.count || a.passengerType.localeCompare(b.passengerType)
        ),
    };
  }
}
