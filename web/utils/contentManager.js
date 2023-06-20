import {
  fetchForecastTypesByCityCode,
  fetchForecastForCityByCityCodeAndForecastType,
} from "../services/weatherServices.js";

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
  clearContentById("types");
  // create dropdown
  const dropdown = createSelectElement("types");
  dropdown.addEventListener("change", (e) => {
    const selectedCityCode = document.getElementById("cities").value;
    fetchForecastForCityByCityCodeAndForecastType(
      selectedCityCode,
      e.target.value
    );
  });
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

// { place: {...}, forecastType: "long-term", forecastCreationTimeUtc: "2023-06-20", forecastTimestamps: [{..}, ...]}
export const onForecastForCityFetchResponse = ({ forecastTimestamps }) => {
  // create cards
  const forecastCards = forecastTimestamps.map((forecastTimestamp) => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");
    const time = document.createElement("p");
    const temp = document.createElement("p");
    const condition = document.createElement("p");

    time.textContent = forecastTimestamp.forecastTimeUtc;
    temp.textContent = `${forecastTimestamp.airTemperature}℃`;
    condition.textContent = forecastTimestamp.conditionCode;

    card.append(time, temp, condition);

    return card;
  });
  // display cards

  contentContainer.append(...forecastCards);
};

const clearContentById = (id) => {
  const elementToRemove = document.getElementById(id);
  // const obj = {
  //   nested: {
  //     nested: {
  //       nested: {
  //         firstName: "labas",
  //       },
  //     },
  //   },
  // };
  // if (obj) {
  //   if (obj.nested) {
  //     if (obj.nested.nested) {
  //       if(obj.nested.nested.nested) {
  //         return obj.nested.nested.nested.firstname;
  //       }
  //     }
  //   }
  // }
  // return obj?.nested?.nested?.nested?.firstname;
  // if (elementToRemove) {
  //   elementToRemove.remove();
  // }
  elementToRemove?.remove();
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
