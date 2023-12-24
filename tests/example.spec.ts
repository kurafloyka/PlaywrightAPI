import test, { APIRequestContext, expect } from "@playwright/test";

test.describe("API Testing", () => {
  let fakerApi: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: "https://gorest.co.in/public/v2/",
      extraHTTPHeaders: {
      
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer 784eade1eb774cbd2fe70cf4f2c61d790d6c46f5e2f83158243f931a13c11f59',
    }

    });

    const response = await fakerApi.get("users");
    console.log(await response.json());
  });

  test("GetListUsers", async ({ browser }) => {});
});
