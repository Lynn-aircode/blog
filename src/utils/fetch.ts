import axios from "axios";
const serverAdress = "";
export const postFactory = <ParamsType, ResponseType>(
  functionName: string,
  data: ParamsType
): Promise<ResponseType> => {
  return axios.post(`${serverAdress}${functionName}`, data).then((res) => {
    const ret = {} as ResponseType;
    return ret;
  });
};

export default fetch;
