const { average } = require('./barchart_tutor'); //import function

test('should output an array of objects with average success probability per level ', () => {
    const newAverage = average([{level: 1, 'Success Probability': 1}, {level: 1, 'Success Probability': 0}, {level: 2, 'Success Probability': 1}]);
    expect(newAverage).toBe([{level: 1, average: 0.5}, {level: 2, average: 1}]); //expected result
});