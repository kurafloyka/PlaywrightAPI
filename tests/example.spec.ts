import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

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
    const response = await fakerApi.get("users");
    expect(response.status()).toEqual(200);
    //console.log(await response.json());
    const responseBody = await response.json();
    randomUser = responseBody[0];
    console.log(
      "Name : " + randomUser["name"] + "Email : " + randomUser["email"]
    );
  });

  test("AddNewUser", async ({ browser }) => {
    const postResponse = await fakerApi.post("users", {
      data: {
        name: faker.internet.userName(),
        gender: "male",
        email: faker.internet.email(),
        status: "active",
      }
    });
    expect(postResponse.status()).toEqual(201);
    const postResponseBody = await postResponse.json();
    
    //console.log(postResponse.status());
    console.log(postResponseBody);
  });

  test("UpdateUser", async ({ browser }) => {});

  test("DeleteUser", async ({ browser }) => {});

  
  //(Request body ile gönderdiğiniz name ile response’da gelen name degerinin aynı
  //olduğu kontrol edilir.)
  //Get one user servisine id ile istek atılıp kullanıcı bilgileri doğrulanır.

  //Update customer servisi ile kullanıcı bilgileri değiştirilir servise istek atılır,
  //(Güncellenen kullanıcın bilgileri doğrulanır.)
  //Update yapılan user’ın Get one customer ile bilgileri alınır ve doğruluğu kontrol
  //edilir,
  //Remove user servisi ile kullanıcı silinir status kodu 204 döndüğü kontrol edilir
});
