import { sendRequest } from "./../../utils/request";

const AccountAPI = {
  register: "/register",
  login: "/login",
};

interface ReturnType {
  success: boolean;
  msg: string;
}

export async function login(data: { account: string; password: string }) {
  return sendRequest({ url: AccountAPI.login, method: "POST", data });
}

export async function register(data: { account: string; password: string }) {
  return sendRequest<ReturnType>({ url: AccountAPI.register, method: "POST", data });
}
