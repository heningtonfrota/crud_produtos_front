import { defineStore } from "pinia";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import User from "@/entities/User";

const userGateway = new UserGatewayHttp;

export const useUsersStore = defineStore('users', {
  state: () => ({
    me: null as null | User,
    users: [] as User[]
  }),
  getters: {
    hasUsers: (state): boolean => state.users.length > 0
  },
  actions: {
    async auth(email: string, password: string): Promise<Response> {
      return await userGateway.login(email, password);
    },
    async getMe(): Promise<any> {
      this.me = await userGateway.getMe();
    },
    async getUsers(): Promise<any> {
      const response = await userGateway.getUsers();
      const users: User[] = response.data.data.map((map: User, i: number) => {
        const { id, name, email } = map;
        const user: User = new User(id, name, email, i);
        return user;        
      });      
      this.users = users;
    },
    async store(params: object): Promise<any> {
      await userGateway.storeUser(params);
    },
    async update(user: object): Promise<void> {      
      await userGateway.updateUser(user);
    },
    async delete(id: string): Promise<void> {
      await userGateway.deleteUser(id);
    }
  }
})