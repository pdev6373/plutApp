import { axiosErrorHandler } from "./../shared/models/apiResult";
import {
  SellGiftCardModel,
  TransactionModel,
} from "./../shared/models/transactionModel";
import { ApiResult } from "../shared/models/apiResult";
import axios from "axios";
import { app } from "../shared/const";
import { PaginateModel } from "../shared/models/pagination";

export class TransactionService {
  baseurl = app.coreApi.coreApiUrl;

  async sellGiftCard(data: SellGiftCardModel): Promise<ApiResult<undefined>> {
    try {
      const result = await axios.post<ApiResult<undefined>>(
        `${this.baseurl}/api/v1/transaction/gift-card-transaction`,
        data
      );
      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }

  async getTransacions(
    userId: string
  ): Promise<ApiResult<PaginateModel<TransactionModel>>> {
    try {
      const result = await axios.get<
        ApiResult<PaginateModel<TransactionModel>>
      >(`${this.baseurl}/api/v1/transaction?userid=${userId}`);
      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
}
