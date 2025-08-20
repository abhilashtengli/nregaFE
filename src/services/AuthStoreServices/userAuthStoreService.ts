import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import axios from "axios";
import { toast } from "sonner";

export const fetchloggedInUser = async () => {
  const { logout } = useAuthStore.getState();

  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await axios.get(`${Base_Url}/get-me`, {
      withCredentials: true
    });
    // console.log("ME : ", response.data);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      if (data.code === "USER_NOT_FOUND" && status === 404) {
        // Handle user not found error
        toast.error("User not found", {
          description: "Please log in to access this feature",
          duration: 4000
        });
        logout();
        return;
      }
    }
    console.error("Failed to fetch user:", error);
    throw error;
  }
};
