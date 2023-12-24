import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import apiController from "../controller/api.controller";

test.describe("API Testing", () => {

  test.beforeAll(async ({ playwright }) => {
    await apiController.init();
  });

  test("GetAllUsers", async ({ browser }) => {
    await apiController.getUsers();
  });

  test("AddNewUser", async ({ browser }) => {
    const userName = faker.internet.userName();
    const email = faker.internet.email();

    const postResponse = await apiController.getAddedNewUser(userName, email);
    expect(postResponse.status()).toEqual(201);
    const postResponseBody = await postResponse.json();
    expect(postResponseBody["name"]).toEqual(userName);

    console.log(await apiController.checkAddedNewUser(postResponse, userName));
  });

  test("UpdateUser", async ({ browser }) => {});

  test("DeleteUser", async ({ browser }) => {});

  //Update customer servisi ile kullanıcı bilgileri değiştirilir servise istek atılır,
  //(Güncellenen kullanıcın bilgileri doğrulanır.)
  //Update yapılan user’ın Get one customer ile bilgileri alınır ve doğruluğu kontrol
  //edilir,
  //Remove user servisi ile kullanıcı silinir status kodu 204 döndüğü kontrol edilir
});
