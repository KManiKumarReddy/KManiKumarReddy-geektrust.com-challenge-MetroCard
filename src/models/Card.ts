import { ERROR_CODES, STATION_NAMES } from '../constants';
import Journey from './Journey';
import Station from './Station';

const TRANSACTION_TYPES = {
  CHARGE: 'CHARGE',
  RECHARGE: 'RECHARGE',
};

interface TransactionInterface {
  station?: Station;
  journey?: Journey;
  type: string;
  amount: number;
  previousBalance: number;
  updatedBalance?: number;
  [key: string]: any;
}

export default class Card {
  balance: number;
  name: string;
  #transactionsLog: TransactionInterface[];
  #JOURNEYS_BY_STATION: { [key: string]: Journey[] };
  constructor(name: string, balance: number) {
    this.name = name;
    this.balance = balance;
    this.#transactionsLog = [];
    this.#JOURNEYS_BY_STATION = {};
  }

  chargeCard(charge: number, journey: Journey) {
    const transactionToLog: any = {
      amount: charge,
      previousBalance: this.balance,
      type: TRANSACTION_TYPES.CHARGE,
    };
    if (charge > this.balance) {
      throw new InsufficientBalanceError(
        'Insufficient balance error: Not enough balance for this charge'
      );
    } else {
      this.balance = this.balance - charge;
    }
    transactionToLog.updatedBalance = this.balance;
    this.#transactionsLog.push(transactionToLog);
    if (this.#JOURNEYS_BY_STATION[journey.fromStation.name])
      this.#JOURNEYS_BY_STATION[journey.fromStation.name].push(journey);
    else this.#JOURNEYS_BY_STATION[journey.fromStation.name] = [journey];
  }

  rechargeCard(amount: number, station: Station) {
    const transactionToLog: TransactionInterface = {
      station,
      amount,
      previousBalance: this.balance,
      type: TRANSACTION_TYPES.RECHARGE,
    };
    this.balance += amount;
    transactionToLog.updatedBalance = this.balance;
    this.#transactionsLog.push(transactionToLog);
  }

  isReturnApplicable(fromStation: Station) {
    return fromStation.name === STATION_NAMES.AIRPORT
      ? (this.#JOURNEYS_BY_STATION[STATION_NAMES.AIRPORT]?.length || 0) <
          (this.#JOURNEYS_BY_STATION[STATION_NAMES.CENTRAL]?.length || 0)
      : (this.#JOURNEYS_BY_STATION[STATION_NAMES.AIRPORT]?.length || 0) >
          (this.#JOURNEYS_BY_STATION[STATION_NAMES.CENTRAL]?.length || 0);
  }
}

export class InsufficientBalanceError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.code = ERROR_CODES.INSUFFICIENT_BALANCE;
  }
}
