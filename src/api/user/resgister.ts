import { postFactory } from "@/utils/fetch";

interface RegisterParams {
  userName: string;
  password: string;
}
interface RegisterResponse {
  err_code: string;
}

const register = (data: RegisterParams) =>
  postFactory<RegisterParams, RegisterResponse>("register", data);

export default register;
