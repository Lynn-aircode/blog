import axios from "axios";
const serverAdress = "https://wcwi852dg6.hk.aircode.run";
export const postFactory = async <ParamsType, ResponseType>(
  functionName: string,
  data: ParamsType
): Promise<ResponseType> => {
  const res = await axios.post(`${serverAdress}/${functionName}`, data, {
    headers: { token: localStorage.getItem("token") },
  });
  const ret = {} as ResponseType;
  console.log("postFactory:", res);
  return ret;
};

export default fetch;
