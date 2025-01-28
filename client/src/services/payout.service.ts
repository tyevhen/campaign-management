import { AxiosInstance } from "axios";
import { Payout } from "../types/payout";

class PayoutService {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getAll(): Promise<Payout[]> {
    try {
      const response = await this.httpClient.get("/payouts");

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch payouts");
    }
  }
}

export default PayoutService;
