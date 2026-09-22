import { BE_ENDPOINTS } from "@/config/endpoints";
import { env } from "@/config/env-config";
import type { ApiMsgDto, CommonResponseDto } from "@/models/api/common-response-dto";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: env.VITE_BE_URL,
});

export const BeApiService = {
  pingCall: async () => {
    const response = await getRequest<ApiMsgDto>(
      BE_ENDPOINTS.DATA.PING,
    );
    return response;

  }
}

export function getApiError<T extends CommonResponseDto<any>>(error: any) {
  let errorMessage: string | undefined = "";
  if (axios.isAxiosError<T>(error)) {
    let statusCode = error.response?.status;

    if (error.response?.data.errors) {
      errorMessage += error.response.data.errors.map((item) => {
        return item.msg;
      });
    } else {
      errorMessage = error.message;
    }
  }

  return errorMessage;
}

export function buildFullUrl(apiUrl: string, reqUri: string): string {
  return `${apiUrl}${reqUri}`;
}

export const getRequest = async <T>(reqUrl: string) => {
  //LoaderService.show();
  try {
    const response = await axiosInstance.get<T>(reqUrl);
    return response.data;
  } catch (error) {
    const errorMessage = getApiError(error);
    throw Error(errorMessage);
  } finally {
    //LoaderService.hide();
  }
};

export const postRequest = async <T>(reqUrl: string, body: unknown) => {
  //LoaderService.show();
  try {
    const response = await axiosInstance.post<T>(reqUrl, body);
    return response.data;
  } catch (error) {
    const errorMessage = getApiError(error);
    throw Error(errorMessage);
  } finally {
    //LoaderService.hide();
  }
};

export const putRequest = async <T>(reqUrl: string, body: unknown) => {
  try {
    const response = await axiosInstance.put<T>(reqUrl, body);
    return response.data;
  } catch (error) {
    const errorMessage = getApiError(error);
    throw Error(errorMessage);
  }
};

export const deleteRequest = async <T>(reqUrl: string) => {
  try {
    const response = await axiosInstance.delete<T>(reqUrl);
    return response.data;
  } catch (error) {
    const errorMessage = getApiError(error);
    throw Error(errorMessage);
  }
};