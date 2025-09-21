# Playwright API Automation Project

This project provides automated API tests for the [Restful Booker](https://restful-booker.herokuapp.com) service using [Playwright](https://playwright.dev/). It covers common booking operations such as creating, updating, deleting, and searching bookings via REST API endpoints.

## Project Structure

```
.
├── playwright.config.js
├── package.json
├── tests/
│   ├── deleteRequest.spec.js
│   ├── fetchRequestForPatialUpdate.spec.js
│   ├── getRequestWithPathAndQueryParam.spec.js
│   ├── postRequestWithDynamicJsonFile.spec.js
│   ├── postRequestWithDynamicRequestBody.spec.js
│   ├── postRequestWithStaticJsonFile.spec.js
│   ├── postRequestWithStaticRequestBody.spec.js
│   └── putRequestWithAuthHeader.spec.js
├── test-data/
│   ├── postAPIRequestBodyDynamic.json
│   ├── postAPIRequestBodyStatic.json
│   └── putAPIRequestBody.json
├── utils/
│   └── common.js
└── ...
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Playwright-API-Automation
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

- The base URL for API requests is set in [`playwright.config.js`](playwright.config.js).
- Test data is stored in the [`test-data`](test-data/) directory.
- You can set environment variables for authentication in a `.env` file (see commented code in [`playwright.config.js`](playwright.config.js)).

### Running Tests

To run all tests:
```sh
npx playwright test
```

To run a specific test file:
```sh
npx playwright test tests/fetchRequestForPatialUpdate.spec.js
```

To view the HTML report after running tests:
```sh
npx playwright show-report
```

## Key Features

- **Create Booking:** POST requests with static/dynamic bodies and JSON files.
- **Update Booking:** PATCH and PUT requests with authentication.
- **Delete Booking:** Authenticated DELETE requests.
- **Search Booking:** GET requests with path and query parameters.
- **Reusable Utilities:** See [`utils/common.js`](utils/common.js) for helpers like [`stringFormat`](utils/common.js).

## Example Test

See [`tests/fetchRequestForPatialUpdate.spec.js`](tests/fetchRequestForPatialUpdate.spec.js) for an authenticated partial update test:

```js
import { expect, test } from "@playwright/test";
const createBookingRequestBody = require("../test-data/postAPIRequestBodyStatic.json");

test.describe("Fetch API Test: Authenticated Partial Booking Update", () => {
  // ...existing code...
});
```

## Reporting

- Test results and reports are generated in the `playwright-report/` and `test-results/` directories.
