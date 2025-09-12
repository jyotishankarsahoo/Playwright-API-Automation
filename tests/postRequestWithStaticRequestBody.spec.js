import { expect, test } from "@playwright/test";

test("Post API - With Static Request Body", async ({ request }) => {
  const bookingRequestBody = {
    firstname: "Jyoti",
    lastname: "Sahoo",
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-02-01",
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
  expect(postAPIResponseBody.booking.firstname).toBe("Jyoti");
  expect(postAPIResponseBody.booking.lastname).toBe("Sahoo");
  expect(postAPIResponseBody.booking).toHaveProperty(
    "additionalneeds",
    "super bowls"
  );
  // Add Assertion for Nested API Response Body
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    "2024-01-01"
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    "2024-02-01"
  );
});
