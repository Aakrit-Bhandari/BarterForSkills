import axios from "axios";
import { POKER_BARTER_FOR_SKILLS_SERVER } from "./constants";

const fetcher = axios.create({
  baseURL: POKER_BARTER_FOR_SKILLS_SERVER,
  timeout: 40000000,
});

export const pokeBarterForSkillsServer = async (URL, options = {}, method) => {
  const config = {
    url: URL,
    method,
    headers: options.headers ?? {},
    data: options.data,
    params: options.params,
    withCredentials: options.withCredentials,
  };
  try {
    const response = await fetcher(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
