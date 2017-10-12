var url="https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/{carrier}/{number}/dep/{year}/{month}/{day}";

Meteor.methods({

  'flightstats.status'({carrier,flight,year,month,day}){
    this.unblock();
    try {

      var urlAct=url.replace("{carrier}",carrier).replace("{number}",flight).replace("{year}",year).replace("{month}",month).replace("{day}",day);
      const result = HTTP.call('GET',urlAct, {
        params: { appId: process.env.APP_ID,appKey:process.env.APP_KEY }
      });
      return result;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      console.log(e)
      return false;
    }

  }
});