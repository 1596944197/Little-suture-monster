import { sendRequest } from "./../../utils/request";

const AccountAPI = {
  register: "",
  login: "",
};

export async function login(data = {}) {
  return sendRequest({ url: AccountAPI.login, method: "POST", data });
}
