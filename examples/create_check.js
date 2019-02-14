'use strict';

/*
 * Example of creating an address, then bank acct, then verifying that bank
 * acct, then create a check using the created address and bank account.
 * Run me! This example works out of the box, "batteries included".
 */

const lobFactory = require('../lib/index.js');
const Lob = new lobFactory('YOUR_API_KEY');

// Create the address
Lob.addresses.create({
  name: 'Test Person',
  email: 'test@gmail.com',
  phone: '123456789',
  address_line1: '123 Test Street',
  address_line2: 'Unit 199',
  address_city: 'Chicago',
  address_state: 'IL',
  address_zip: '60012',
  address_country: 'US'
}, (err, address) => {
  if (err) {
    return console.log(err);
  }
  Lob.bankAccounts.create({
    routing_number: '122100024',
    account_number: '123456789',
    account_type: 'company',
    signatory: 'John Doe'
  }, (err, bankAccount) => {
    if (err) {
      return console.log(err);
    }
    Lob.bankAccounts.verify(bankAccount.id, { amounts: [23, 34] }, (err) => {
      if (err) {
        return console.log(err);
      }
      Lob.checks.create({
        description: 'Test Check',
        check_number: '10000',
        bank_account: bankAccount.id,
        to: address.id,
        from: {
          name: 'Leore Avidar',
          address_line1: '123 Test Street',
          address_city: 'Sunnyvale',
          address_state: 'CA',
          address_zip: '94085',
          address_country: 'US'
        },
        amount: 100,
        memo: 'This is my first Check',
        message: 'This check is for laundry',
        logo: 'https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png'
      }, (err, check) => {
        if (err) {
          return console.log(err);
        }
        console.log('The Lob API responded with this check object: ', check);
      });
    });
  });

});
