/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import axios from "axios";
import type {
  ApiConfig,
} from "./api.types"


/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

}

// Function to set token for authentication
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

/**  Sign Up User */
export const signUpUser = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${Config.API_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error signing up user:", error.response?.data || error.message);
    return null;
  }
};

/**  Log in a user */
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${Config.API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.data?.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error logging in:", error.response?.data || error.message);
    return null;
  }
};

export const addExpense = async (amount: any, category: any, note: any, date: any) => {
  try {
    console.log("📤 Sending expense to API:", {
      amount,
      category,
      note,
      date,
    });

    const response = await axios.post(`${Config.API_URL}/expenses/add`, {
      amount,
      category,
      note,
      date,
    });

    console.log("✅ API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding expense:", axios.isAxiosError(error) ? error.response?.data : error);
  }
};


export const getExpenses = async () => {
  try {
    const response = await axios.get(`${Config.API_URL}/expenses`);
    return response.data;
  } catch (error){
    console.error("Error can't get expenses:", error);
  }
};

export const modifyExpense = async (id: string, amount: number, category: string, note?: string) => {
  try {
    const response = await axios.put(`${Config.API_URL}/expenses/update/${id}`, {
      amount,
      category,
      note: note || "",
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating expense:", error.response?.data || error.message);
    return null;
  }
};

export const deleteExpense = async (id: string) => {
  try {
    await axios.delete(`${Config.API_URL}/expenses/delete/${id}`);
    return true;
  } catch (error) {
    console.error("❌ Error deleting expense:", error.response?.data || error.message);
    return false;
  }
};



export const api = new Api()
