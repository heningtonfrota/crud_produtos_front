import Permission from "@/entities/Permission";
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

      this.getMe();

      return Promise.resolve(response);
    });
  }

  async getMe(): Promise<User> {
    const response = await httpAdapter
      .withAuthorization()
      .get('/me')
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });

    const { id, name, email, permissions } = response.data.data;

    const permissionsUser:Permission[] = permissions.map((permission: any) => {
      const { id, name, description } = permission;
      return new Permission(id, name, description);
    });

    const user = new User(id, name, email);
    user.syncPermissions(permissionsUser);

    return user;
  }

  async getUsers(): Promise<any> {
    const response = await httpAdapter
      .withAuthorization()
      .get('/users')
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });

    return response;    
  }

  async storeUser(params: object): Promise<any> {
    const response = await httpAdapter
      .withAuthorization()
      .post('/users', params)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });

    return response;    
  }

  async updateUser(user: any): Promise<void> {    
    await httpAdapter
      .withAuthorization()
      .put(`/users/${user.value.id}`, user.value)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }

  async deleteUser(id: string): Promise<void> {
    await httpAdapter
      .withAuthorization()
      .delete(`/users/${id}`)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }
}