import {
  onCitiesFetchResponse,
  onForecastTypesFetchResponse,
  onForecastForCityFetchResponse,
} from "../utils/contentManager.js";

const BASE_URL = "http://localhost:8080";

export const fetchCities = async () => {
  try {
    const response = await fetch(BASE_URL + "/places");
    const cities = await response.json();

    onCitiesFetchResponse(cities);
  } catch (error) {
    console.error(error);
  }
};

export const fetchForecastTypesByCityCode = async (cityCode) => {
  try {
    const response = await fetch(BASE_URL + `/places/${cityCode}/forecasts`);
    const forecastTypes = await response.json();

    onForecastTypesFetchResponse(forecastTypes);
  } catch (error) {
    console.error(error);
  }
};

export const fetchForecastForCityByCityCodeAndForecastType = async (
  cityCode,
  forecastType
) => {
  try {
    const response = await fetch(
      BASE_URL + `/places/${cityCode}/forecasts/${forecastType}`
    );
    const forecast = await response.json();

    onForecastForCityFetchResponse(forecast);
  } catch (error) {
    console.error(error);
  }
};
