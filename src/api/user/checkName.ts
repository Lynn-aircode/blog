import { postFactory } from "@/utils/fetch";

interface checkNameParams {
  userName: string;
}
interface checkNameResponse {
  err_code: string;
  has?: boolean;
}

const checkName = (data: checkNameParams) =>
  postFactory<checkNameParams, checkNameResponse>("checkName", data);

export default checkName;
