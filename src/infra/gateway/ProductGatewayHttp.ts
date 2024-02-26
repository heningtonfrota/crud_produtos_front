import Product from "@/entities/Product";
import httpAdapter from "@/infra/http/HttpClientAdapter";
import { NAME_TOKEN } from "@/utils/constants";

export default class ProductGatewayHttp {
  async getProducts(): Promise<Product[]> {
    const response = await httpAdapter
      .withAuthorization()
      .get('/products')
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });

    return response;    
  }

  async storeProduct(params: object): Promise<void> {
    await httpAdapter
      .withAuthorization()
      .post('/products', params)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }

  async updateProduct(product: any): Promise<void> {    
    await httpAdapter
      .withAuthorization()
      .put(`/products/${product.value.id}`, product.value)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }

  async deleteProduct(id: string): Promise<void> {
    await httpAdapter
      .withAuthorization()
      .delete(`/products/${id}`)
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
  }
}