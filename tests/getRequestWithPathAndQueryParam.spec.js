import { expect, test } from "@playwright/test";
const bookingAPIRequestBody = require("../test-data/postAPIRequestBodyStatic.json");

test.describe("Get Request - With Path and Query Param", () => {
  let context = {
    bookingid: null,
    firstname: null,
    lastname: null,
  };
  // Create a Booking and retrive Booking Info
  test.beforeEach(
    "Create a new Booking and store details",
    async ({ request }) => {
      // Make a post request to create a booking.
      const createBookingResponse = await request.post("/booking", {
        data: bookingAPIRequestBody,
      });
      // Assert that response was successful.
      expect(createBookingResponse.ok()).toBeTruthy();
      expect(createBookingResponse.status()).toBe(200);
      // Parse the JSON response body.
      const responseJson = await createBookingResponse.json();
      // Store the booking details in the context object for later use.
      // Use optional chaining to safely access nested properties.
      context.bookingid = responseJson?.bookingid;
      context.firstname = responseJson?.booking.firstname;
      context.lastname = responseJson?.booking.lastname;
    }
  );
  // Test to search for booking using path parameter
  test("Get API Request with Path Param", async ({ request }) => {
    // Use Booking ID from the beforeEach hook.
    let booking_id = context.bookingid;
    expect(booking_id).toBeTruthy();
    // Make the Get request with dynamic path parameter
    const getBookingReponse = await request.get(`/booking/${booking_id}`);
    // Assert that response is successful
    expect(getBookingReponse.ok()).toBeTruthy();
    expect(getBookingReponse.status()).toBe(200);
    // Parse the response body
    const getBookingReponseBody = await getBookingReponse.json();
    // Assert That the retrived details match the original request body
    expect(getBookingReponseBody.firstname).toEqual(context.firstname);
    expect(getBookingReponseBody.lastname).toEqual(context.lastname);
  });

  // Test to search for booking using query parameters
  test("Get API Request with Query Param", async ({ request }) => {
    // Use firstname and lastname from the beforeEach hook.
    let firstNameQuery = context.firstname;
    let lastNameQuery = context.lastname;
    // Make a GET request with Query parameters.
    const searchResponse = await request.get(`/booking`, {
      params: {
        firstname: `${firstNameQuery}`,
        lastname: `${lastNameQuery}`,
      },
    });
    // Assert that response was successful.
    expect(searchResponse.ok()).toBeTruthy();
    expect(searchResponse.status()).toBe(200);
    // Parse response body
    const searchResponseBody = await searchResponse.json();
    // Assert that response body is an Array and contains at-least one booking ID
    expect(Array.isArray(searchResponseBody)).toBeTruthy();
    expect(searchResponseBody.length).toBeGreaterThan(0);
    // Assert that search result contains the specified booking ID.
    const foundBooking = searchResponseBody.find(
      (booking) => booking.bookingid === context.bookingid
    );
    expect(foundBooking).toBeDefined();
  });
});
