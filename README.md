# Metro Card geektrust.in challenge

Solution for geektrust.in Metro Card backend challenge
https://www.geektrust.com/coding/detailed/metro-card

## Problem Statement

### Context

A new metro train has been launched from the Central station to the Airport. It is a non-stop train, which means the train will stop only at the Airport with no intermediate stops.
It is also possible to return from the Airport back to the Central station. This is also a non-stop journey.

### MetroCard

Metro authority prefers money to be collected via MetroCard. MetroCard is an electronic payment utility that can be used to pay for the metro travel charges. The MetroCard is like a wallet loaded with money. Each person traveling in this metro must carry a MetroCard and each card will have a unique number.

To travel by this train, one needs a MetroCard. If the MetroCard doesn’t have sufficient balance, then the remaining cost for the travel needs to be paid by recharging the MetroCard. This auto recharge loads only the required amount of money for the journey and the station collects a 2% service fee for the transaction.

### Travel charges

Costs for the journey are based on the passenger's age. It is categorized as below

| Passenger Type | Charges |
| -------------- | ------- |
| ADULT          | 200     |
| SENIOR_CITIZEN | 100     |
| KID            | 50      |

### Journey Types

Travel charges are different for a single trip and for a return journey. When a passenger takes a return journey, there is a discount of 50% for the travel charges of the return journey.

For eg: If a senior citizen travels from Central to Airport, the travel charge collected is 100. If the same citizen travels back to Central station, the amount collected for the return journey is 50. If the same citizen passes a third time on the same day, it will be treated as a new single journey and the travel charge collected is 100.

### Goal

Your task is to build a solution that calculates various travel charges collected at each station and print the collection summary and passenger summary.

- The collection summary should give a breakup of the total amount collected and the total discount given.
- The passenger summary should display the total number of passengers traveled per type in descending order of the passenger count.
- If any of the passenger type have same value for passenger count then display in the ascending order of the passenger type for that case.
  Ex:If ADULT and KID has same value then display it as
  ADULT <no_of_passengers>
  KID <no_of_passengers>

### Assumptions

- All passengers should have a MetroCard.
- If a passenger does not have sufficient balance in the MetroCard, then the MetroCard needs to be recharged before taking up the journey.
- The service fee for doing the recharge is collected by the origin station of the journey.
- The passenger count is calculated based on journeys eg: if the same passenger travels twice, the count is 2.

### Input Commands & Format

**BALANCE** <METROCARD_NUMBER> <BALANCE_IN_THE_METROCARD>

- <METROCARD_NUMBER> is the identifier for a given MetroCard.
- <BALANCE_IN_THE_METROCARD> is the amount of money available in the MetroCard for journeys.

**CHECK_IN** <METROCARD_NUMBER> <PASSENGER_TYPE> <FROM_STATION>

-The CHECK_IN command should deduct the appropriate amount of travel charge from the MetroCard of the passenger, depending on the passenger type. If the passenger has already made a single journey, then only 50% of the travel charge should be deducted from the MetroCard for their return journey.

**PRINT_SUMMARY**
Returns calculated travel charges collected, and passenger summary per station in the following format:

- TOTAL_COLLECTION AIRPORT <amount of travel charges collected> <total discount given>
- <PASSENGER_TYPE with highest count from AIRPORT> <passenger type count>
- <PASSENGER_TYPE with second highest count from AIRPORT> <passenger type count>
- <PASSENGER_TYPE with least count from AIRPORT> <passenger type count>
- TOTAL_COLLECTION CENTRAL <amount of travel charges collected> <total discount given>
- <PASSENGER_TYPE with highest count from CENTRAL> <passenger type count>
- <PASSENGER_TYPE with second highest count from CENTRAL> <passenger type count>
- <PASSENGER_TYPE with least count from CENTRAL> <passenger type count>

### Sample Input/Output 1

| Input                               | Charges                          |
| ----------------------------------- | -------------------------------- |
| BALANCE MC1 600                     | TOTAL_COLLECTION CENTRAL 300 0   |
| BALANCE MC2 500                     | PASSENGER_TYPE_SUMMARY           |
| BALANCE MC3 50                      | ADULT 1                          |
| BALANCE MC4 50                      | SENIOR_CITIZEN 1                 |
| BALANCE MC5 200                     | TOTAL_COLLECTION AIRPORT 403 100 |
| CHECK_IN MC1 ADULT CENTRAL          | PASSENGER_TYPE_SUMMARY           |
| CHECK_IN MC2 SENIOR_CITIZEN CENTRAL | ADULT 2                          |
| CHECK_IN MC1 ADULT AIRPORT          | KID 2                            |
| CHECK_IN MC3 KID AIRPORT            |                                  |
| CHECK_IN MC4 ADULT AIRPORT          |                                  |
| CHECK_IN MC5 KID AIRPORT            |                                  |
| PRINT_SUMMARY                       |                                  |

Each person’s total charges are sorted in ascending order of their metro card number.

#### Explanation:

|                             |                                                                                                     |     |
| --------------------------- | --------------------------------------------------------------------------------------------------- | --- |
| Amount collected at Central | 200 (MC1) + 100(MC2)                                                                                | 300 |
| Amount collected at Airport | 100 (MC1 Return) + 50 (MC3) + 200 (MC4) + 3 (2% Service Fee for recharge of 150 for MC4) + 50 (MC5) | 403 |

### Sample Input/Output 2

| Input                               | Charges                          |
| ----------------------------------- | -------------------------------- |
| BALANCE MC1 600                     | TOTAL_COLLECTION CENTRAL 457 50  |
| BALANCE MC2 500                     | PASSENGER_TYPE_SUMMARY           |
| BALANCE MC3 50                      | ADULT 2                          |
| BALANCE MC4 50                      | SENIOR_CITIZEN 1                 |
| CHECK_IN MC1 SENIOR_CITIZEN AIRPORT | TOTAL_COLLECTION AIRPORT 252 100 |
| CHECK_IN MC2 KID AIRPORT            | PASSENGER_TYPE_SUMMARY           |
| CHECK_IN MC3 ADULT CENTRAL          | ADULT 1                          |
| CHECK_IN MC1 SENIOR_CITIZEN CENTRAL | KID 1                            |
| CHECK_IN MC3 ADULT AIRPORT          | SENIOR_CITIZEN 1                 |
| CHECK_IN MC3 ADULT CENTRAL          |                                  |
| PRINT_SUMMARY                       |                                  |

Each person’s total charges are sorted in ascending order of their metro card number.

#### Explanation:

|                             |                                                                                                                                                      |     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Amount collected at Central | 200 (MC3) + 3 (2% Service Fee for recharge of 150 for MC3) + 50 (MC1 Return) + 200 (MC3 2nd Onward) + 4 (2% Service Fee for recharge of 200 for MC3) | 300 |
| Amount collected at Airport | 100 (MC1) + 50 (MC2) + 100 (MC3 Return) + 2 (2% Service Fee for recharge of 200 for MC3)                                                             | 403 |

# Pre-requisites

- NodeJS 12.6.0/14.15.4/16.10.0
- npm

# How to run the code

We have provided scripts to execute the code.

Use `run.sh` if you are Linux/Unix/macOS Operating systems and `run.bat` if you are on Windows. Both the files run the commands silently and prints only output from the input file `sample_input/input1.txt`. You are supposed to add the input commands in the file from the appropriate problem statement.

Internally both the scripts run the following commands

- `yarn install --silent` - This will build the solution downloading the necessary dependencies.
- Once the `yarn install` from the previous build process is complete, we will execute the program using the command

`yarn run --silent start sample_input/input1.txt`

We expect your program to take the location to the text file as parameter. Input needs to be read from a text file, and output should be printed to the console. The text file will contain only commands in the format prescribed by the respective problem.

This main file, main.go should receive in the command line argument and parse the file passed in. Once the file is parsed and the application processes the commands, it should only print the output.

# Running the code for multiple test cases

Please fill `input1.txt` and `input2.txt` with the input commands and use those files in `run.bat` or `run.sh`. Replace `./geektrust sample_input/input1.txt` with `./geektrust sample_input/input2.txt` to run the test case from the second file.

# How to execute the unit tests

Mocha based test cases are executed with the following command from the root folder
`mocha test`

Jest based test cases are executed with the following command from the root folder
`jest`

# Typescript

Your main file should be named as `geektrust.ts`.

As of now we only support Typescript under the NPM build system. This will require you to compile your typescript program into javascript.

We run the commands `yarn install --silent`, `yarn run --silent start` and `yarn test --silent`.

Please ensure that the npm install commands creates the file `geektrust.js` from your geektrust.ts file. The npm start command should then execute this `geektrust.js` file.

In your `package.json` file make sure you have an entry for the install, start and test script.

- The install command should install the dependencies and also build the `geektrust.js` file.
- The start command will execute the program.
- The test command should execute all the unit tests present

```
"scripts": {
    "install" :"<command to create your geektrust.js file>",
    "start": "node geektrust.js",
    "test": "jest"
}
```

Note: If you create the geektrust.js file in some other folder (like dist/, build/ or out/)other than the main folder, then please appropriately edit the start command.

# Help

You can refer our help documents [here](https://help.geektrust.com)
You can read build instructions [here](https://github.com/geektrust/coding-problem-artefacts/tree/master/NodeJS)
