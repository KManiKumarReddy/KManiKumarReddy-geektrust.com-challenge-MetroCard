import { PASSENGER_TYPES, STATION_NAMES } from './constants';
import MetroCardService from './service';

describe('MetroCardService', () => {
  it('should output right', () => {
    const logSpy = jest.spyOn(console, 'log');
    const service = new MetroCardService();

    service.registerCard('MC1', 400);
    service.registerCard('MC2', 100);
    service.registerCard('MC3', 50);
    service.checkIn(
      'MC1',
      PASSENGER_TYPES.SENIOR_CITIZEN,
      STATION_NAMES.AIRPORT
    );
    service.checkIn('MC2', PASSENGER_TYPES.KID, STATION_NAMES.AIRPORT);
    service.checkIn('MC3', PASSENGER_TYPES.ADULT, STATION_NAMES.CENTRAL);
    service.checkIn(
      'MC1',
      PASSENGER_TYPES.SENIOR_CITIZEN,
      STATION_NAMES.CENTRAL
    );
    service.checkIn('MC3', PASSENGER_TYPES.ADULT, STATION_NAMES.AIRPORT);
    service.checkIn('MC3', PASSENGER_TYPES.ADULT, STATION_NAMES.CENTRAL);

    service.printSummary();
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy.mock.calls[0][0]).toMatchSnapshot();
    expect(logSpy.mock.calls[1][0]).toMatchSnapshot();
  });

  it('should throw duplicate card error', () => {
    const service = new MetroCardService();
    ``;
    service.registerCard('MC1', 400);
    expect(() => service.registerCard('MC1', 100)).toThrow(
      'Duplicate card error: A card with same number already exists'
    );
  });

  it('should throw card not found error', () => {
    const service = new MetroCardService();
    service.registerCard('MC1', 400);
    expect(() =>
      service.checkIn('MC2', PASSENGER_TYPES.ADULT, STATION_NAMES.AIRPORT)
    ).toThrow("Invalid Input: Card MC2 doesn't exist");
  });

  it('should throw invalid station error', () => {
    const service = new MetroCardService();
    service.registerCard('MC1', 400);
    expect(() => service.checkIn('MC1', PASSENGER_TYPES.ADULT, 'TEST')).toThrow(
      "Invalid Input: Station TEST doesn't exist"
    );
  });
});
