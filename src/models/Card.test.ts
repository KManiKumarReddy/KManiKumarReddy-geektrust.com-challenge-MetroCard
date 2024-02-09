import { PASSENGER_TYPES, STATION_NAMES } from '../constants';
import Journey from './Journey';
import Card, { InsufficientBalanceError } from './Card';
import Station from './Station';

const airportStation = new Station(STATION_NAMES.AIRPORT);
const centralStation = new Station(STATION_NAMES.CENTRAL);

describe('MetroCard', () => {
  it('should initiate a new metro card with balance mentioned', () => {
    const card = new Card('MC1', 200);
    expect(card.balance).toBe(200);
  });

  it("should charge a card when there's enough balance and update balance", () => {
    const card = new Card('MC1', 200);
    expect(card.balance).toBe(200);
    card.chargeCard(
      100,
      new Journey({
        fromStation: new Station(STATION_NAMES.AIRPORT),
        card,
        passengerType: '',
        fare: 100,
      })
    );
    expect(card.balance).toBe(100);
  });

  it("should throw insufficient error when there's not enough balance", () => {
    const card = new Card('MC1', 200);
    expect(card.balance).toBe(200);
    expect(() =>
      card.chargeCard(
        300,
        new Journey({
          fromStation: new Station(STATION_NAMES.AIRPORT),
          card,
          passengerType: '',
          fare: 100,
        })
      )
    ).toThrow(InsufficientBalanceError);
    expect(card.balance).toBe(200);
  });

  it('should recharge a card and update balance when called', () => {
    const card = new Card('MC1', 200);
    expect(card.balance).toBe(200);
    card.rechargeCard(100, new Station(STATION_NAMES.AIRPORT));
    expect(card.balance).toBe(300);
  });

  describe('isReturnApplicable', () => {
    it('should return true when it is simple return journey', () => {
      const card = new Card('MC1', 200);
      const journey = new Journey({
        fromStation: centralStation,
        card,
        passengerType: PASSENGER_TYPES.ADULT,
        fare: 200,
      });
      card.chargeCard(50, journey);
      expect(card.isReturnApplicable(airportStation)).toBe(true);
    });
    it('should return true when it is simple return journey from central', () => {
      const card = new Card('MC1', 200);
      const journey = new Journey({
        fromStation: airportStation,
        card,
        passengerType: PASSENGER_TYPES.ADULT,
        fare: 200,
      });
      card.chargeCard(50, journey);
      expect(card.isReturnApplicable(centralStation)).toBe(true);
    });
  });
});
