import tools from "@/common/tools";

const API_PRE = "http://localhost:3000";
export const adsReq = (data) =>
  tools.request({
    url: `${API_PRE}/ads/advertising`,
    params: data,
  });

// 城市列表
export const airportCityListReq = (data) =>
  tools.request({
    url: `${API_PRE}/city/airportList`,
    params: data,
  });
