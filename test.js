var MoonCalc = require('./mooncalc'),
  t = require('tape');



t.test('test data for day', function (t) {
  var date = new Date('2014-04-29T00:00:00.000+02:00');

  t.equal(
    JSON.stringify(MoonCalc(date)),
    JSON.stringify({
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
