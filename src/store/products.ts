import { defineStore } from "pinia";
import ProductGatewayHttp from "@/infra/gateway/ProductGatewayHttp.ts";
import Product from "@/entities/Product.ts";

const userGateway = new ProductGatewayHttp;

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[]
  }),
  getters: {
    hasProducts: (state): boolean => state.products.length > 0
  },
  actions: {
    async getProducts(): Promise<any> {
      const responseProducts = await userGateway.getProducts();
      const products: Product[] = responseProducts;
      this.products = products;
    },
    async store(params: object): Promise<any> {
      await userGateway.storeProduct(params);
    },
    async update(product: object): Promise<void> {      
      await userGateway.updateProduct(product);
    },
    async delete(id: string): Promise<void> {
      await userGateway.deleteProduct(id);
    }
  }
})