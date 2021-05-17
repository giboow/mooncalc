⚠️ PROJECT NOT LONGER SUPPORTED ⚠️ 

mooncalc
========

JavaScript library for calculating moon position, phases and zodiac sign, created by [Philippe Gibert](http://www.giboow.fr) ([@giboow](http://github.com/giboow.fr)).

## Usage example :
```js
// get datas for current day :
var date = new Date();
var moonDatas = MoonCalc.datasForDay(date);
```

## Using in a server environment

In addition to browsers, MoonCalc can be used in server environments like Node,
and is available as an NPM package (`npm install mooncalc`).

```js
var MoonCalc = require('mooncalc');
```
