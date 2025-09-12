import { expect, test } from "@playwright/test";
/* 
  Faker is a popular library for generating fake personal information, such as names, addresses, etc.
  To install Faker, use the following command:
   `npm install @faker-js/faker --save-dev`
*/
import { faker } from "@faker-js/faker";

/*
  Luxon is a powerful date and time library for JavaScript.
  To install Luxon, use the following command:
   `npm install --save luxon`
*/

import { DateTime } from "luxon";

test("Post API - With Dynamic Request Body", async ({ request }) => {
  // Create Dynamic Test Data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalprice = faker.number.int(1000);

  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

  const bookingRequestBody = {
    firstname: firstName,
    lastname: lastName,
    totalprice: totalprice,
    depositpaid: true,
    bookingdates: {
      checkin: checkInDate,
      checkout: checkOutDate,
    },
    additionalneeds: "super bowls",
  };

  const postAPIResponse = await request.post("/booking", {
    data: bookingRequestBody,
  });
  const postAPIResponseBody = await postAPIResponse.json();

  console.log(postAPIResponseBody);
  // Add Assertions Status
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  // Add Assertion for API Response Body
  expect(postAPIResponseBody.booking.firstname).toBe(firstName);
  expect(postAPIResponseBody.booking.lastname).toBe(lastName);
  expect(postAPIResponseBody.booking).toHaveProperty(
    "additionalneeds",
    "super bowls"
  );
  // Add Assertion for Nested API Response Body
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    checkInDate
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    checkOutDate
  );
});
