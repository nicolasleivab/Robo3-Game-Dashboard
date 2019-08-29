const { sumAll } = require('./heatmapsettings');

test('should output date in unix timestamp and sum value', () => {
    const arrOfObj = sumAll([{date: '01/24/2019', "Success Probability": 1}, {date: '01/24/2019', "Success Probability": 1}]);
    expect(arrOfObj).toBe('[(date: 1550962800, value: 2)]');
});