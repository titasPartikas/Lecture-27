import { fetchCities } from "../services/weatherServices.js";

export const initApplication = async () => {
  await fetchCities();
};
