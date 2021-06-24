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

export const updateTotalNotification = async (orderState: string, newNotification: number) => {
  try {
    const response = await apiClient.patch(`setNotification/${orderState}/${newNotification}`);
    if (response.status === 200) return;
  } catch (error) {
    console.log("error", error);
  }
}

export const fetchTotalEmails = async (orderState: string) => {
  try {
    const response = await apiClient.get(`getEmails/${orderState}`);
    const totalEmails = response.data
    return totalEmails;
  } catch (error) {
    console.log("error", error);
  }
}

export const updateTotalEmails = async (orderState: string, emailsList: any) => {
  try {
    const response = await apiClient.patch(`setEmails/${orderState}`, emailsList);
    if (response.status === 200) return;
  } catch (error) {
    console.log("error", error);
  }
}

export const fetchReloadTime = async () => {
  try {
    const response = await apiClient.get(`updateTime`);
    const reloadTime = response.data
    return reloadTime;
  } catch (error) {
    console.log("error", error);
  }
}

export const updateReloadTime = async (reloadTime: number) => {
  try {
    const response = await apiClient.patch(`setUpdateTime/${reloadTime}`);
    if (response.status === 200) return;
  } catch (error) {
    console.log("error", error);
  }
}
