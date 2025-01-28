import { AxiosInstance } from "axios";
import { Campaign, CampaignCreate } from "../types/campaign";

class CampaignService {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getAll(): Promise<Campaign[]> {
    try {
      const response = await this.httpClient.get("/campaigns");

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch campaigns");
    }
  }

  async create(campaign: CampaignCreate): Promise<Campaign> {
    try {
      const response = await this.httpClient.post("/campaigns", campaign);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create campaign");
    }
  }

  async toggleStatus(id: string, newStatus: boolean): Promise<Campaign> {
    try {
      const response = await this.httpClient.patch(
        `/campaigns/${id}?enable=${newStatus}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update campaign");
    }
  }

  async search(searchQuery: string): Promise<Campaign[]> {
    try {
      const response = await this.httpClient.get(`/campaigns?${searchQuery}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Campaigns search failure");
    }
  }
}

export default CampaignService;
