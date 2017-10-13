
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
var url="https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/{carrier}/{number}/dep/{year}/{month}/{day}";

const MonthCheck = Match.Where((x) => {
  check(x, Match.Integer);
  return x >= 1 ||x<=12;
});

const DayCheck = Match.Where((x) => {
  check(x, Match.Integer);
  return x >= 1 ||x<=31;
});


Meteor.methods({
/**
 * Consults the API of the fligths
 * @param {Alpanumeric String} carrier - The flight carrier.  
 * @param {Integer} flight - The flight number. 
 * @param {Integer} year -The year to consult. 
 * @param {Integer} month - The month to consult. 
 * @param {Integer} day - The dat to consult. 
 */
  'flightstats.status'({carrier,flight,year,month,day}){
    this.unblock();
    try {
        check(carrier, String);
        check(flight,  Match.Integer);
        check(year,  Match.Integer);
        check(month,  MonthCheck);
        check(day,  DayCheck);
      var urlAct=url.replace("{carrier}",carrier).replace("{number}",flight).replace("{year}",year).replace("{month}",month).replace("{day}",day);
      const result = HTTP.call('GET',urlAct, {
        params: { appId: process.env.APP_ID_FLI,appKey:process.env.APP_KEY_FLI }
      });
      return result;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      console.log(e)
      return false;
    }

  },

/**
 * Inserts in the collection of reserves a reserve for the current user.
 * @param {Date} date - The date of the reservation.  
 * @param {String} flight - The flight of the reservation. 
 * @param {String} airportCode -The airport of the reservation.  
 */

  'reserveChair.reserve'({date,flight,airportCode})
  {
    if(Meteor.userId())
    {
  this.unblock();
    check(date,Date);
    check(flight,String);
    check(airportCode,String);
    var can=Reserves.find({owner:Meteor.userId(),date:date,flight:flight,airportCode:airportCode}).count();
    if (can==0)
    {
      if (Meteor.userId())
      {
          Reserves.insert({owner:Meteor.userId(),date:date,flight:flight,airportCode:airportCode,createdAt:new Date()});
      }
    }

    }
    
    
  },
/**
 * Deletes from the collection of reserves a reserve for the current user.
 * @param {Date} date - The date of the reservation.  
 * @param {String} flight - The flight of the reservation. 
 * @param {String} airportCode -The airport of the reservation.  
 */

    'reserveChair.delete'({date,flight,airportCode})
  {
    if (Meteor.userId())
    {
      this.unblock();
    check(date,Date);
    check(flight,String);
    check(airportCode,String);
    var can=Reserves.find({owner:Meteor.userId(),date:date,flight:flight,airportCode:airportCode}).count();
    if (can!=0)
    {
            if (Meteor.userId())
      {
          Reserves.remove({owner:Meteor.userId(),date:date,flight:flight,airportCode:airportCode});
        }
    }
    }
    
  },
});