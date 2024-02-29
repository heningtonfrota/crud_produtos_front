import { defineStore } from "pinia";
import CategoryGatewayHttp from "@/infra/gateway/CategoryGatewayHttp.ts";
import Category from "@/entities/Category.ts";

const userGateway = new CategoryGatewayHttp;

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[]
  }),
  getters: {
    hasCategories: (state): boolean => state.categories.length > 0
  },
  actions: {
    async getCategories(): Promise<any> {
      const responseCategories = await userGateway.getCategories();
      const categories: Category[] = responseCategories;                   
      this.categories = categories;
    },
    async store(params: object): Promise<any> {
      await userGateway.storeCategory(params);
    },
    async update(category: object): Promise<void> {      
      await userGateway.updateCategory(category);
    },
    async delete(id: string): Promise<void> {
      await userGateway.deleteCategory(id);
    }
  }
})