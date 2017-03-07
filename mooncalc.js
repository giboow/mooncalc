/*
(c) 2014, Philippe Gibert
MoonCalc is a JavaScript library for calculating moon position, phases and zodiac sign.
https://github.com/giboow/mooncalc

Sources of the algorithm : http://www.abecedarical.com/zenosamples/zs_lunarphasecalc.html
*/

(function () {
  'use strict';



  //normalize values to range 0...1
  function normalize(v) {
    v = v - Math.floor(v);
    if (v < 0) {
      v = v + 1;
    }
    return v;
  }


  function getMoonInformations(date) {
    var age, // Moon's age
      distance, // Moon's distance in earth radii
      latitude, // Moon's ecliptic latitude
      longitude, // Moon's ecliptic longitude
      phase, // Moon's phase
      trajectory, // Moon's trajectory
      zodiac; // Moon's zodiac sign 

    var yy, mm, k1, k2, k3, jd;
    var ip, dp, np, rp;

    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();


    yy = year - Math.floor((12 - month) / 10);
    mm = month + 9;
    if (mm >= 12) {
      mm = mm - 12;
    }

    k1 = Math.floor(365.25 * (yy + 4712));
    k2 = Math.floor(30.6 * mm + 0.5);
    k3 = Math.floor(Math.floor((yy / 100) + 49) * 0.75) - 38;

    jd = k1 + k2 + day + 59;  // for dates in Julian calendar
    if (jd > 2299160) {
      jd = jd - k3;      // for Gregorian calendar
    }

    //calculate moon's age in days
    ip = normalize((jd - 2451550.1) / 29.530588853);
    age = ip * 29.53;

    if (age <  1.84566) {
      phase = 'NEW';
      trajectory = 'ascendent';
    } else if (age <  5.53699) {
      phase = 'Waxing crescent';
      trajectory = 'ascendent';
    } else if (age <  9.22831) {
      phase = 'First quarter';
      trajectory = 'ascendent';
    } else if (age < 12.91963) {
      phase = 'Waxing gibbous';
      trajectory = 'ascendent';
    } else if (age < 16.61096) {
      phase = 'FULL';
      trajectory = 'descendent';
    } else if (age < 20.30228) {
      phase = 'Waning gibbous';
      trajectory = 'descendent';
    } else if (age < 23.99361) {
      phase = 'Last quarter';
      trajectory = 'descendent';
    } else if (age < 27.68493) {
      phase = 'Waning crescent';
      trajectory = 'descendent';
    } else {
      phase = 'NEW';
      trajectory = 'ascendent';
    }

    ip = ip * 2 * Math.PI;  //Convert phase to radians

    // Calculate moon's distance
    dp = 2 * Math.PI * normalize((jd - 2451562.2) / 27.55454988);
    distance = 60.4 - 3.3 * Math.cos(dp) - 0.6 * Math.cos(2 * ip - dp) - 0.5 * Math.cos(2 * ip);

    // Calculate moon's ecliptic latitude
    np = 2 * Math.PI * normalize((jd - 2451565.2) / 27.212220817);
    latitude = 5.1 * Math.sin(np);

    // Calculate moon's ecliptic longitude
    rp = normalize((jd - 2451555.8) / 27.321582241);
    longitude = 360 * rp + 6.3 * Math.sin(dp) + 1.3 * Math.sin(2 * ip - dp) + 0.7 * Math.sin(2 * ip);

    if (longitude <  33.18) {
      zodiac = 'Aries';
    } else if (longitude <  51.16) {
      zodiac = 'Taurus';
    } else if (longitude <  93.44) {
      zodiac = 'Gemini';
    } else if (longitude < 119.48) {
      zodiac = 'Cancer';
    } else if (longitude < 135.30) {
      zodiac = 'Leo';
    } else if (longitude < 173.34) {
      zodiac = 'Virgo';
    } else if (longitude < 224.17) {
      zodiac = 'Libra';
    } else if (longitude < 242.57) {
      zodiac = 'Scorpio';
    } else if (longitude < 271.26) {
      zodiac = 'Sagittarius';
    } else if (longitude < 302.49) {
      zodiac = 'Capricorn';
    } else if (longitude < 311.72) {
      zodiac = 'Aquarius';
    } else if (longitude < 348.58) {
      zodiac = 'Pisces';
    } else {
      zodiac = 'Aries';
    }

    return {
      'date' : { 'year' : year, 'month' : month , 'day' : day},
      'age' : age,
      'distance' : distance * 6371,
      'ecliptic' : {
        'latitude' : latitude,
        'longitude' : longitude
      },
      'phase' : phase,
      'trajectory' : trajectory,
      'constellation' : zodiac,
    };
  }



  var MoonCalc = {};

  MoonCalc.datasForDay = function (day) {
    return getMoonInformations(day);
  };

  // export as AMD module / Node module / browser variable
  if (typeof define === 'function' && define.amd) define(MoonCalc);
  else if (typeof module !== 'undefined') module.exports = MoonCalc;
  else window.MoonCalc = MoonCalc;

}());