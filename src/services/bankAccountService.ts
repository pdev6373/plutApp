import { ApiResult, axiosErrorHandler } from "./../shared/models/apiResult";
import axios from "axios";
import { app } from "../shared/const";
import {
  BankAccountModel,
  CreateBankAccountModel,
} from "../shared/models/bankaccountModel";

export class BankaccoutService {
  baseurl = app.coreApi.coreApiUrl;

  async createBankAccount(
    data: CreateBankAccountModel
  ): Promise<ApiResult<BankAccountModel>> {
    try {
      const result = await axios.post<ApiResult<BankAccountModel>>(
        `${this.baseurl}/api/v1/transaction/bank-accounts`,
        data
      );
      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
      //   return Promise.reject(error);
    }
  }

  async getBankAccount(userId: string): Promise<ApiResult<BankAccountModel[]>> {
    try {
      const result = await axios.get<ApiResult<BankAccountModel[]>>(
        `${this.baseurl}/api/v1/transaction/bank-accounts?userId=${userId}`
      );
      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
}
