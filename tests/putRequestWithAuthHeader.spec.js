import { test, expect } from "@playwright/test";
const createBookingRequestBody = require("../test-data/postAPIRequestBodyStatic.json");
const updateBookingRequestBody = require("../test-data/putAPIRequestBody.json");

test.describe("Put API: With Request Header", () => {
  let token = null;
  let bookingDetails = {
    booking_id: null
  };
  test.beforeAll("Fetch Auth Token for API header", async ({ request }) => {
    const getTokenResponse = await request.post("/auth", {
      data: {
        username: "admin",
        password: "password123",
      },
    });
    expect(getTokenResponse.ok()).toBeTruthy();
    expect(getTokenResponse.status()).toBe(200);
    const getTokenResponseJson = await getTokenResponse.json();
    token = getTokenResponseJson.token;
  });
  test.beforeEach("Create a Booking and Store Details", async ({ request }) => {
    const createBookingResponse = await request.post("/booking", {
      data: createBookingRequestBody,
    });
    expect(createBookingResponse.ok()).toBeTruthy();
    expect(createBookingResponse.status()).toBe(200);
    const createBookingResponseJson = await createBookingResponse.json();
    console.log(`Create Booking: ${createBookingResponseJson}`);

    bookingDetails.booking_id = createBookingResponseJson?.bookingid;
  });
  test("PUT Request: Update booking details", async ({ request }) => {
    const bookingId = bookingDetails.booking_id;
    expect(bookingId).toBeTruthy();
    const updateBookingResponse = await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: updateBookingRequestBody,
    });
    expect(updateBookingResponse.ok()).toBeTruthy();
    expect(updateBookingResponse.status()).toBe(200);

    const updateBookingResponseJson = await updateBookingResponse.json();
    expect(updateBookingResponseJson.firstname).toEqual(
      updateBookingRequestBody.firstname
    );
    expect(updateBookingResponseJson.lastname).toEqual(
      updateBookingRequestBody.lastname
    );
    expect(updateBookingResponseJson.additionalneeds).toEqual(
      updateBookingRequestBody.additionalneeds
    );
  });
});
