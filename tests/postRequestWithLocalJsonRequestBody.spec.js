import { expect, test } from "@playwright/test";

const bookingAPIRequestBody = require("../test-data/postAPIRequestBodyStatic.json");

test("Post API - With Static Json File as Request Body", async ({ request}) => {
  const postAPIResponse = await request.post("/booking", {
    data: bookingAPIRequestBody,
  });
  const postAPIResponseBody = await postAPIResponse.json();

  console.log(postAPIResponseBody);
  // Add Assertions Status
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  // Add Assertion for API Response Body
  expect(postAPIResponseBody.booking.firstname).toBe("Jyoti Shankar");
  expect(postAPIResponseBody.booking.lastname).toBe("Sahoo");
  expect(postAPIResponseBody.booking).toHaveProperty(
    "additionalneeds",
    "super bowls"
  );
  // Add Assertion for Nested API Response Body
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    "2018-01-01"
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    "2019-01-01"
  );
});
