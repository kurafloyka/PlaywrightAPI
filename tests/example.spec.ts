import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("API Testing", () => {
  let fakerApi: APIRequestContext;
  let randomUser: APIResponse;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: "https://gorest.co.in/public/v2/",
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 784eade1eb774cbd2fe70cf4f2c61d790d6c46f5e2f83158243f931a13c11f59",
      },
    });
  });

  test("GetAllUsers", async ({ browser }) => {
    const responseGetAllUser = await fakerApi.get("users");
    expect(responseGetAllUser.status()).toEqual(200);
    //console.log(await response.json());
    const responseBody = await responseGetAllUser.json();
    randomUser = responseBody[0];
    console.log(
      "Name : " + randomUser["name"] + "Email : " + randomUser["email"]
    );
  });

  test("AddNewUser", async ({ browser }) => {
    const userName = faker.internet.userName();
    const email = faker.internet.email();

    const postResponse = await fakerApi.post("users", {
      data: {
        name: userName,
        gender: "male",
        email: email,
        status: "active",
      },
    });
    expect(postResponse.status()).toEqual(201);
    const postResponseBody = await postResponse.json();

    //console.log(postResponse.status());
    //console.log(postResponseBody);
    //console.log(postResponseBody["name"]);

    expect(postResponseBody["name"]).toEqual(userName);

    const responseAddedUser = await fakerApi.get(
      "users" + "/" + postResponseBody["id"]
    );
    expect(responseAddedUser.status()).toEqual(200);
    console.log(await responseAddedUser.json());
    const responseAddedUserBody=await responseAddedUser.json();
    expect(responseAddedUserBody['name']).toEqual(userName);
  });

  test("UpdateUser", async ({ browser }) => {});

  test("DeleteUser", async ({ browser }) => {});

  //Update customer servisi ile kullanıcı bilgileri değiştirilir servise istek atılır,
  //(Güncellenen kullanıcın bilgileri doğrulanır.)
  //Update yapılan user’ın Get one customer ile bilgileri alınır ve doğruluğu kontrol
  //edilir,
  //Remove user servisi ile kullanıcı silinir status kodu 204 döndüğü kontrol edilir
});
