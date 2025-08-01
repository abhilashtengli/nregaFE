import { Base_Url } from "@/lib/constant";
import axios from "axios";

export const fetchloggedInUser = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await axios.get(`${Base_Url}/get-me`, {
      withCredentials: true,
    });
    // console.log("ME : ", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};
