import User from "@/entities/User";
import httpAdapter from "@/infra/http/HttpClientAdapter";
import { NAME_TOKEN } from "@/utils/constants";

export default class UserGatewayHttp {

  async login(email: string, password: string): Promise<Response> {
    const device_name = 'front_app_' + navigator.userAgent;

    return await httpAdapter.post('/auth', {
      email,
      password,
      device_name
    })
    .then(response => {
      localStorage.setItem(NAME_TOKEN, response.data.token);
      return Promise.resolve(response);
    });
  }

  async getMe(): Promise<User> {

    const response = await httpAdapter.withAuthorization().get('/me');

    const { id, name, email } = response.data.data;

    return new User(id, name, email);
  }
}