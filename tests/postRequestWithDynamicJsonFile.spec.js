import { expect, test } from "@playwright/test";
import { stringFormat } from "../utils/common";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

const bookingAPIRequestBody = require("../test-data/postAPIRequestBodyDynamic.json");

test("Post API - With Dynamic Json File as Request Body", async ({
  request,
}) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalprice = faker.number.int(1000);

  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

  const bookingAPIRequestBodyUpdated = stringFormat(
    JSON.stringify(bookingAPIRequestBody),
    firstName,
    lastName,
    totalprice,
    checkInDate,
    checkOutDate
  );
  const postAPIResponse = await request.post("/booking", {
    data: JSON.parse(bookingAPIRequestBodyUpdated),
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
