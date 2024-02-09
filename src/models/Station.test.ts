import { PASSENGER_TYPES, STATION_NAMES } from '../constants';
import Card from './Card';
import Station from './Station';

describe('Stations', () => {
  it('should create a new station', () => {
    const station = new Station(STATION_NAMES.AIRPORT);
    expect(station.name).toBe(STATION_NAMES.AIRPORT);
  });

  it('should account checkings and get correct collections', () => {
    const station = new Station(STATION_NAMES.AIRPORT);
    const card = new Card('MC1', 500);
    station.checkIn(card, PASSENGER_TYPES.ADULT);
    expect(station.summary).toStrictEqual({
      collection: 200,
      discount: 0,
      checkinsByPassengerType: [
        { passengerType: PASSENGER_TYPES.ADULT, count: 1 },
      ],
    });
  });

  it('should account checkings and get correct collections when recharge is applicable', () => {
    const station = new Station(STATION_NAMES.AIRPORT);
    const card = new Card('MC1', 100);
    station.checkIn(card, PASSENGER_TYPES.ADULT);
    expect(station.summary).toStrictEqual({
      collection: 202,
      discount: 0,
      checkinsByPassengerType: [
        { passengerType: PASSENGER_TYPES.ADULT, count: 1 },
      ],
    });
  });

  it('should return summary in sorted order', () => {
    const station = new Station(STATION_NAMES.AIRPORT);
    const card = new Card('MC1', 100);
    station.checkIn(card, PASSENGER_TYPES.ADULT);
    station.checkIn(card, PASSENGER_TYPES.ADULT);
    station.checkIn(card, PASSENGER_TYPES.KID);
    station.checkIn(card, PASSENGER_TYPES.SENIOR_CITIZEN);
    station.checkIn(card, PASSENGER_TYPES.SENIOR_CITIZEN);
    station.checkIn(card, PASSENGER_TYPES.SENIOR_CITIZEN);
    expect(station.summary).toStrictEqual({
      collection: 763,
      discount: 0,
      checkinsByPassengerType: [
        { passengerType: PASSENGER_TYPES.SENIOR_CITIZEN, count: 3 },
        { passengerType: PASSENGER_TYPES.ADULT, count: 2 },
        { passengerType: PASSENGER_TYPES.KID, count: 1 },
      ],
    });
  });

  it('should count discounted fare for return journeys', () => {
    const airportStation = new Station(STATION_NAMES.AIRPORT);
    const centralStation = new Station(STATION_NAMES.CENTRAL);
    const card = new Card('MC1', 100);
    airportStation.checkIn(card, PASSENGER_TYPES.ADULT);
    centralStation.checkIn(card, PASSENGER_TYPES.ADULT);
    expect(centralStation.summary).toStrictEqual({
      collection: 102,
      discount: 100,
      checkinsByPassengerType: [
        { passengerType: PASSENGER_TYPES.ADULT, count: 1 },
      ],
    });
    expect(airportStation.summary).toStrictEqual({
      collection: 202,
      discount: 0,
      checkinsByPassengerType: [
        { passengerType: PASSENGER_TYPES.ADULT, count: 1 },
      ],
    });
  });

  it('multi  check scenario', () => {
    const airportStation = new Station(STATION_NAMES.AIRPORT);
    const centralStation = new Station(STATION_NAMES.CENTRAL);
    const card1 = new Card('MC1', 400);
    const card2 = new Card('MC2', 100);
    const card3 = new Card('MC3', 50);
    airportStation.checkIn(card1, PASSENGER_TYPES.SENIOR_CITIZEN);
    airportStation.checkIn(card2, PASSENGER_TYPES.KID);
    centralStation.checkIn(card3, PASSENGER_TYPES.ADULT);
    centralStation.checkIn(card1, PASSENGER_TYPES.SENIOR_CITIZEN);
    airportStation.checkIn(card3, PASSENGER_TYPES.ADULT);
    centralStation.checkIn(card3, PASSENGER_TYPES.ADULT);
    expect(card3.balance).toBe(0);
    expect(centralStation.summary).toStrictEqual({
      collection: 457,
      discount: 50,
      checkinsByPassengerType: [
        { passengerType: PASSENGER_TYPES.ADULT, count: 2 },
        { passengerType: PASSENGER_TYPES.SENIOR_CITIZEN, count: 1 },
      ],
    });
    expect(airportStation.summary).toStrictEqual({
      collection: 252,
      discount: 100,
      checkinsByPassengerType: [
        { passengerType: PASSENGER_TYPES.ADULT, count: 1 },
        { passengerType: PASSENGER_TYPES.KID, count: 1 },
        { passengerType: PASSENGER_TYPES.SENIOR_CITIZEN, count: 1 },
      ],
    });
  });
});
