import { PASSENGER_TYPES } from '../constants';
import Journey from './Journey';
import Card from './Card';
import Station from './Station';

describe('Journey', () => {
  it('should create a journey', () => {
    const station = new Station('airport');
    const card = new Card('MC1', 100);
    const journey = new Journey({
      fromStation: station,
      card,
      passengerType: PASSENGER_TYPES.ADULT,
      fare: 200,
    });
    expect(journey).toBeInstanceOf(Journey);
    expect(journey.card).toBe(card);
    expect(journey.fromStation).toBe(station);
    expect(journey.passengerType).toBe(PASSENGER_TYPES.ADULT);
    expect(journey.fare).toBe(200);
    expect(journey.isReturnJourney).toBe(false);
  });
});
