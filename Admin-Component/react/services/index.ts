import axios from "axios"

export const apiClient = (baseURL:any) => axios.create({
  baseURL: baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchTotalOrders = async (orderState: string, api:any) => {
  try {
    const response = await api.get(`totalOrders/${orderState}`);
    const totalOrders = response.data
    return totalOrders;
  } catch (error) {
    console.log("error", error);
  }
}

export const fetchTotalNotification = async (orderState: string, api:any) => {
  try {
    const response = await api.get(`getNotification/${orderState}`);
    const totalNotification = response.data
    return totalNotification;
  } catch (error) {
    console.log("error", error);
  }
}

export const updateTotalNotification = async (orderState: string, newNotification: number, api:any) => {
  try {
    const response = await api.patch(`setNotification/${orderState}/${newNotification}`);
    if (response.status === 200) return;
  } catch (error) {
    console.log("error", error);
  }
}

export const fetchTotalEmails = async (orderState: string, api:any) => {
  try {
    const response = await api.get(`getEmails/${orderState}`);
    const totalEmails = response.data
    return totalEmails;
  } catch (error) {
    console.log("error", error);
  }
}

export const updateTotalEmails = async (orderState: string, emailsList: any, api:any) => {
  try {
    const response = await api.patch(`setEmails/${orderState}`, emailsList);
    if (response.status === 200) return;
  } catch (error) {
    console.log("error", error);
  }
}

export const fetchReloadTime = async (api:any) => {
  try {
    const response = await api.get(`updateTime`);
    const reloadTime = response.data
    return reloadTime;
  } catch (error) {
    console.log("error", error);
  }
}

export const updateReloadTime = async (reloadTime: number, api:any) => {
  try {
    const response = await api.patch(`setUpdateTime/${reloadTime}`);
    if (response.status === 200) return;
  } catch (error) {
    console.log("error", error);
  }
}

export const startMonitoring = async (api:any) => {
  try {
    const response = await api.get(`start`);
    if (response.status === 200) return;
  } catch (error) {
    console.log("error", error);
  }
}
