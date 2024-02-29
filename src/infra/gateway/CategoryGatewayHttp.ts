import Category from "@/entities/Category.ts";
import httpAdapter from "@/infra/http/HttpClientAdapter";
import { NAME_TOKEN } from "@/utils/constants";

export default class CategoryGatewayHttp {
  async getCategories(): Promise<Category[]> {
    const response = await httpAdapter
      .withAuthorization()
      .get('/categories')
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });

    return response.data.data;    
  }

  async storeCategory(params: object): Promise<void> {
    await httpAdapter
      .withAuthorization()
      .post('/categories', params)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }

  async updateCategory(category: any): Promise<void> {    
    await httpAdapter
      .withAuthorization()
      .put(`/categories/${category.value.id}`, category.value)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }

  async deleteCategory(id: string): Promise<void> {
    await httpAdapter
      .withAuthorization()
      .delete(`/categories/${id}`)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }
}