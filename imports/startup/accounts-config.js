import { Accounts } from 'meteor/accounts-base';
/** Cinfugeres meteor user manager */
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});