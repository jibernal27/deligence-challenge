Reserves= new Mongo.Collection("reserves");

Reserves.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
})

/**
 * Publishes the reservations of the current user. 
 */

Meteor.publish("allReservations",function(){
	return Reserves.find({owner:this.userId});
});