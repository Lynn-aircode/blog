import { postFactory } from "@/utils/fetch";

interface LoginParams {
  userName: string;
  password: string;
}
interface LoginResponse {
  err_code: string;
  token?: string;
}

const login = (data: LoginParams) =>
  postFactory<LoginParams, LoginResponse>("login", data);

export default login;
