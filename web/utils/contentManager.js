import { fetchForecastTypesByCityCode } from "../services/weatherServices.js";

const contentContainer = document.getElementById("content");

export const onCitiesFetchResponse = (cities) => {
  // create dropdown
  const dropdown = createSelectElement("cities");
  dropdown.addEventListener("change", async (e) => {
    await fetchForecastTypesByCityCode(e.target.value);
  });
  // create options for dropdown
  const options = cities.map((city) =>
    createDropdownOptions(city.code, city.name)
  );
  // create default option
  const defaultOption = createDefaultDropdownOption("Select a city");

  // add options to dropdown
  dropdown.append(defaultOption, ...options);
  // display dropdown in content
  contentContainer.appendChild(dropdown);
};

export const onForecastTypesFetchResponse = (forecastTypes) => {
  // create dropdown
  const dropdown = createSelectElement("types");
  // create options for dropdown
  const options = forecastTypes.map((forecastType) =>
    createDropdownOptions(forecastType.type, forecastType.description)
  );
  // create default option
  const defaultOption = createDefaultDropdownOption(
    "Select a type of forecast"
  );
  // add options to dropdown
  dropdown.append(defaultOption, ...options);
  // display dropdown in content
  contentContainer.appendChild(dropdown);
};

const createSelectElement = (id) => {
  const dropdown = document.createElement("select");
  dropdown.id = id;

  return dropdown;
};

const createDropdownOptions = (value, text) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;

  return option;
};

const createDefaultDropdownOption = (text) => {
  const defaultOption = document.createElement("option");
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = text;

  return defaultOption;
};
