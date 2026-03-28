import axios from "axios";
import { POKER_BARTER_FOR_SKILLS_SERVER } from "./constants";

const fetcher = axios.create({
  baseURL: POKER_BARTER_FOR_SKILLS_SERVER,
  timeout: 4000,
});

export const pokeBarterForSkillsServer = async (URL, options, method) => {
  const config = {
    url: URL,
    method,
    header: options.headers,
    data: options.data,
    params: options.params,
    withCredentials: options.withCredentials,
  };
  try {
    const response = await fetcher(config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
