import axios, { AxiosInstance } from "axios";
import HttpClient from "./HttpClient";
import { API_URL } from "@/utils/constants";
import { NAME_TOKEN } from "@/utils/constants";

class HttpClientAdapter implements HttpClient {
  private axiosInstace: AxiosInstance | null = null;
  private static instance: HttpClientAdapter | null = null;

  constructor() {
    const base_URL = API_URL;

    this.axiosInstace = axios.create({
      baseURL: base_URL,
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'appication/json'
      }
    });
  }

  static getInstance(): HttpClient {
    if (!this.instance) {
      this.instance = new HttpClientAdapter();
    }

    return this.instance;
  }

  async get(url: string, configs?: object | undefined): Promise<any> {
    return await this.axiosInstace?.get(url, configs);
  }

  async post(url: string, body: object, configs?: object | undefined): Promise<any> {
    return await this.axiosInstace?.post(url, body, configs);
  }

  async put(url: string, body: object, configs?: object | undefined): Promise<any> {
    return await this.axiosInstace?.put(url, body, configs);
  }

  async delete(url: string, configs?: object | undefined): Promise<any> {
    return await this.axiosInstace?.delete(url, configs);
  }

  withAuthorization(): this {
    if (this.axiosInstace) {
      const token = localStorage.getItem(NAME_TOKEN);
      this.axiosInstace.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return this;
  }
}

export default HttpClientAdapter.getInstance();