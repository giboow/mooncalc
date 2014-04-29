var MoonCalc = require('./mooncalc'),
  t = require('tape');



t.test('test data for day', function (t) {
  var date = new Date('2014-04-29');
  
  t.equal(
    JSON.stringify(MoonCalc.datasForDay(date)),
    JSON.stringify({
      'date' : {
        'year' : 2014, 'month' : 4, 'day' : 29
      },
      'age' : 29.5157733025988,
      'distance' : 382220.74996379716,
      'ecliptic' : {
        'latitude' : -0.7738569272648606,
        'longitude': 41.595918875627774
      }, 
      'phase' : 'NEW',
      'trajectory' : 'ascendent',
      'constellation' : 'Aries'
    })
  );

  t.end();
});