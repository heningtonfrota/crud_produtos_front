import httpAdapter from "../http/HttpClientAdapter";

export default class UserGatewayHttp {

  async login(email: string, password: string): Promise<any> {
    const device_name = 'front_app_' + navigator.userAgent;

    await httpAdapter.post('/auth', {
      email,
      password,
      device_name
    });
  }
}