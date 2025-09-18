import { test, expect } from "@playwright/test";
const createBookingRequestBody = require("../test-data/postAPIRequestBodyStatic.json");

test.describe("Delete API Request: Autheniticated Booking Delete", () => {
  const sharedData = {
    token: null,
    bookingid: null,
  };
  test.beforeAll("Fetch auth token", async ({ request }) => {
    const getTokenResponse = await request.post("/auth", {
      data: {
        username: `${process.env.BOOKING_API_USERNAME}`,
        password: `${process.env.BOOKING_API_PASSWORD}`,
      },
    });
    expect(getTokenResponse.ok()).toBeTruthy();
    expect(getTokenResponse.status()).toBe(200);
    const getTokenResponseJson = await getTokenResponse.json();
    expect(getTokenResponseJson).toHaveProperty("token");
    sharedData.token = getTokenResponseJson.token;
    expect(sharedData.token).toBeDefined();
  });
  test.beforeEach("Create a Booking and store details", async ({ request }) => {
    const createBookingResponse = await request.post("/booking", {
      data: createBookingRequestBody,
    });
    expect(createBookingResponse.ok()).toBeTruthy();
    expect(createBookingResponse.status()).toBe(200);
    const createBookingResponseJson = await createBookingResponse.json();
    expect(createBookingResponseJson).toHaveProperty("bookingid");
    sharedData.bookingid = createBookingResponseJson.bookingid;
    expect(sharedData.bookingid).toBeDefined();
  });
  test("Delete Booking", async ({ request }) => {
    const { token, bookingid } = sharedData;
    expect(token).toBeTruthy();
    expect(bookingid).toBeTruthy();
    const requestHeader = {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    };
    const requestURL = `/booking/${bookingid}`;
    const deleteBookingResponse = await request.delete(requestURL, {
      headers: requestHeader,
    });
    expect(deleteBookingResponse.status()).toBe(201);
    expect(deleteBookingResponse.statusText()).toBe("Created");
  });
});
