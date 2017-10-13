Reserves= new Mongo.Collection("reserves");

Reserves.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
})

Meteor.publish("allReservations",function(){
	return Reserves.find();
});