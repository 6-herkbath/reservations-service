# BTDF

Reservations component for a vacation rental marketplace site

## Related Projects

  - https://github.com/6-BTDF/ImageCarousel-Service
  - https://github.com/6-BTDF/more-places-service
  - https://github.com/6-BTDF/reviews-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Installing Dependencies](#dependencies) 
5. [API Endpoints](#endpoints)

## Usage

- Access the individual component through
- Access the site in whole through 
- Change listings by modifying the numerical value after the site, e.g. from 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

## Installing Dependencies

From within the root directory:

```sh
npm install
npm run seed
npm run server
npm run build
```

## API Endpoints

API endpoints conform to a RESTful API architecture to retrieve and modify database-hosted information. All responses will include HTTP response codes to indicate status and errors and data will come in JSON pretty format. All requests must include a Content-Type of application/json and the body must be valid JSON.

**POST /api/listings/newListing**
- POST request for a single listing
- This endpoint allows you to create a new listing for a house
- Takes a valid JSON object and will return 201 HTTP code if listing is saved successfully
- Request field will be accepted where dailyPrice, cleaningFee and taxes are required and other parameters are optional 
```{ dailyPrice: Number, cleaningFee: Number, taxes: Number, [max_guests: Number, min_stay: Number, max_stay: Number, monthlyDiscount: Number, weeklyDiscount: Number]}```

**GET /api/listings/:listingid**
- GET request for a single listing
- Request parameter of :listingid from API endpoint will be accepted. No request object is required.
- Response will be HTTP status code 200 and a JSON object that contains property at the given ID with respective fees and all booked reservation dates

**PATCH /api/listings/:listingid/updateListing**
- PATCH request for a single listing
- This endpoint allows you to modify a listing for fees, discounts, max guests, max stays
- Takes a valid JSON object and will return 204 HTTP code if reservation is saved successfully
- Request field will be accepted where listingID is required and other parameters are optional 
```{ id: listingId, [dailyPrice: Number, max_guests: Number, min_stay: Number, max_stay: Number, monthlyDiscount: Number, weeklyDiscount: Number]}```

**DELETE /api/listings/:listingid/deleteListing**
- DELETE request for a single reservation
- Request parameter of :listingid from API endpoint will be accepted. No request object is required.
- This will delete the listing and all associated information for listing's reservations
- On success, the server will send back a HTTP response 204 to the request when the reservation is deleted

**GET /api/listings/:listingid/getReservations**
- GET request for all reservations for a particular listingid
- Request parameter of :listingid from API endpoint will be accepted. No request object is required.
- Response will be HTTP status code 200 and a JSON object that contains property at the given ID with respective fees and all booked reservation dates

**POST /api/listings/:listingid/makeReservation**
- POST request for a single reservation
- This endpoint allows you to create a reservation for specified dates, number of adults/children
- Takes a valid JSON object and will return 201 HTTP code if reservation is saved successfully
- Request field will be accepted as 
```{ checkin: date, checkout: date, id: listingId, adults: Number, children: Number }```

**DELETE /api/listings/:listingid/deleteReservation**
- DELETE request for a single reservation
- Request field will be accepted as a valid JSON object of { reservation: reservationNumber }
- This will delete the reservation and all associated information at this reservation number
- On success, the server will send back a HTTP response 204 to the request when the reservation is deleted




