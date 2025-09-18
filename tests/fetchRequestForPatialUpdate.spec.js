import { expect, test } from "@playwright/test";
const createBookingRequestBody = require("../test-data/postAPIRequestBodyStatic.json");

test.describe("Fetch API Test: Authenticated Partial Booking Update", () => {
  const sharedData = {
    token: null,
    bookingId: null,
  };
  test.beforeAll("Fetch Auth Token", async ({ request }) => {
    const getTokenResponse = await request.post("/auth", {
      data: {
        username: "admin",
        password: "password123",
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
    sharedData.bookingId = createBookingResponseJson.bookingid;
    expect(sharedData.bookingId).toBeDefined();
  });
  test("Update Firstname for Booking", async ({ request }) => {
    const { token, bookingId } = sharedData;
    expect(token).toBeTruthy();
    expect(bookingId).toBeTruthy();
    const bookingUpdateResponse = await request.patch(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      data: {
        firstname: "Anshika",
        additionalneeds: "Swimming Pool",
      },
    });
    expect(bookingUpdateResponse.ok()).toBeTruthy();
    expect(bookingUpdateResponse.status()).toBe(200);
    const bookingUpdateResponseJson = await bookingUpdateResponse.json();
    expect(bookingUpdateResponseJson.firstname).toEqual("Anshika");
    expect(bookingUpdateResponseJson.additionalneeds).toEqual("Swimming Pool");
  });
});
