/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const faker = require('faker');
const writeListings = fs.createWriteStream('cassListings.csv');
writeListings.write('id,max_guests,min_stay,max_stay,prices\n');

const writeBookingsbyListingId = fs.createWriteStream('cassBookings.csv');
writeBookings.write('id,id_listings,check_in,check_out,total_price,adults,children,infants,id_users\n');

const writeBookings = fs.createWriteStream('cBookings.csv');
writeBookings.write('id,id_listings,check_in,check_out,total_price,adults,children,infants,id_users\n');


const random = (num, skew = 1) => Math.floor(Math.random() ** skew * num);

const reservationsGen = (listingsCounter, baseFee, tax) => {
  // eslint-disable-next-line no-undef
  const discount = Math.round(random(40)) / 4;
  const premium = Math.round(random(40)) / 4;
  const currentId = listingsCounter;
  return `${currentId},${random(14) + 2},${random(3) + 1},${random(40) + 3},{ dailyPrice: ${baseFee.toFixed(2)},cleaningFee: ${(baseFee * 0.5).toFixed(2)},serviceFee: ${(baseFee * 0.125).toFixed(2)},taxes: ${tax},holidayPremium: ${premium + 15},weekendPremium: ${premium + 10},weeklyDiscount: ${discount + 10},monthlyDiscount: ${discount + 15} }\n`;
};

const bookingsGen = (listingId, counter, numToWrite, prices, taxes) => {
  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(today.getDate() + random(15));
  let bookings = '';
  for (let i = 0; i < numToWrite; i++) {
    const stayAmount = random(15) + 1;
    endDate.setDate(startDate.getDate() + stayAmount);
    const totalCharges = ((prices * (1.125 + taxes) * stayAmount) + (prices * 0.5)).toFixed(2);
    const startFormatted = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const endFormatted = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    bookings += `${counter++},${listingId},${startFormatted},${endFormatted},${totalCharges},${Math.floor(random(5) + 1)},${Math.floor(random(5))},${Math.floor(random(5))},${Math.floor(random(1000000) + 1)}\n`;
    startDate.setDate(endDate.getDate() + random(3) + 1);
  }
  return bookings;
};

function writeTenMillionListings(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  let bookingId = 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const tax = Math.floor(random(4) + 5) + Math.round(random(4) * 4) / 4;
      const baseFee = random(250) + 50;
      const numToWrite = Math.floor(random(25));
      if (i === 0) {
        writer.write(reservationsGen(id, baseFee, tax), encoding);
        writeBookings.write(bookingsGen(id, bookingId, numToWrite, baseFee, tax), encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        if (id % 100000 === 0) {console.log(id)}
        writer.write(reservationsGen(id, baseFee, tax), encoding);
        ok = writeBookings.write(bookingsGen(id, bookingId, numToWrite, baseFee, tax), encoding);
      }
      bookingId += numToWrite;
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writeBookings.once('drain', write)
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionListings(writeListings, 'utf-8', () => {
  writeListings.end();
  writeBookings.end();
});

// bookingsGen();
usersGen();
