import {
  APIRequestContext,
  APIResponse,
  expect,
  request,
} from "@playwright/test";

class APIController {
  private fakerApi: APIRequestContext;

  async init() {
    this.fakerApi = await request.newContext({
      baseURL: "https://gorest.co.in/public/v2/",
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 784eade1eb774cbd2fe70cf4f2c61d790d6c46f5e2f83158243f931a13c11f59",
      },
    });
  }

  async getUsers() {
    const responseGetAllUser = await this.fakerApi.get("users");
    expect(responseGetAllUser.status()).toEqual(200);
    //console.log(await responseGetAllUser.json());
    const responseBody = await responseGetAllUser.json();

    console.log(
      "Name : " +
        responseBody[0]["name"] +
        "Email : " +
        responseBody[0]["email"]
    );
    return responseBody[0];
  }

  async getAddedNewUser(userName: string, email: string) {
    const postResponse = await this.fakerApi.post("users", {
      data: {
        name: userName,
        gender: "male",
        email: email,
        status: "active",
      },
    });
    return postResponse;
  }

  async checkAddedNewUser(postResponse: APIResponse, userName: string) {
    const postResponseBody = await postResponse.json();
    expect(postResponseBody["name"]).toEqual(userName);
    const responseAddedUser = await this.fakerApi.get(
      "users" + "/" + postResponseBody["id"]
    );
    expect(responseAddedUser.status()).toEqual(200);
    console.log(await responseAddedUser.json());
    const responseAddedUserBody = await responseAddedUser.json();
    expect(responseAddedUserBody["name"]).toEqual(userName);
    return responseAddedUserBody["name"];
  }
}
export default new APIController();
