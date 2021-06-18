import axios from "axios"
import { baseURL } from '../constants'

const apiClient = axios.create({
  baseURL: baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchTotalOrders = async (orderState: string) => {
  try {
    const response = await apiClient.get(`totalOrders/${orderState}`);
    const totalOrders = response.data
    return totalOrders;
  } catch (error) {
    console.log("error", error);
  }
}

export const fetchTotalNotification = async (orderState: string) => {
  try {
    const response = await apiClient.get(`getNotification/${orderState}`);
    const totalNotification = response.data
    return totalNotification;
  } catch (error) {
    console.log("error", error);
  }
}
