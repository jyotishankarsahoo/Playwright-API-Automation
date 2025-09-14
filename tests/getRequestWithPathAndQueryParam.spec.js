import { expect, test } from "@playwright/test";
const bookingAPIRequestBody = require("../test-data/postAPIRequestBodyStatic.json");

test.describe("Get Request - With Path and Query Param", () => {
  // Create a Booking and retrive Booking Info
  test.beforeEach(async ({ request, context }) => {
    const apiResponse = await request.post("/booking", {
      data: bookingAPIRequestBody,
    });
    const responseJson = await apiResponse.json();
    expect(apiResponse.ok()).toBeTruthy();
    expect(apiResponse.status()).toBe(200);
    console.log(responseJson);
    context.bookingid = responseJson.bookingid;
    context.firstname = responseJson.booking.firstname;
    context.lastname = responseJson.booking.lastname;
  });
  // Retrive Booking details using bookingid
  test("Get API Request with Path Param", async ({ request, context }) => {
    console.log("*".repeat(40));
    console.log(context.bookingid);
    let booking_id = context.bookingid;
    const getAPIReponse = await request.get(`/booking/${booking_id}`);
    const getAPIReponseBody = await getAPIReponse.json();
    console.log(getAPIReponseBody);
    expect(getAPIReponse.ok()).toBeTruthy();
    expect(getAPIReponse.status()).toBe(200);
  });
  // Retrive Booking ids and number of booking using firstname and lastname
  test("Get API Request with Query Param", async ({ request, context }) => {
    console.log("*".repeat(40));
    console.log(context.firstname);
    console.log(context.lastname);
    let firstName = context.firstname;
    let lastName = context.lastname;

    const getAPIReponse = await request.get(`/booking`, {
      params: {
        firstname: `${firstName}`,
        lastname: `${lastName}`,
      },
    });
    const getAPIReponseBody = await getAPIReponse.json();
    console.log(getAPIReponseBody);
    expect(getAPIReponse.ok()).toBeTruthy();
    expect(getAPIReponse.status()).toBe(200);
  });
});
