import { Mongo } from 'meteor/mongo';
/** Exports the collection reserves as a constant to allow th consultation in different files */ 
export const Reserves = new Mongo.Collection('reserves');