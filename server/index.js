const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const server = express();

server.use(cors());

server.get("/places", async (_, res) => {
  try {
    const response = await fetch("https://api.meteo.lt/v1/places");
    const cities = await response.json();

    res.send(cities);
  } catch (error) {
    console.error(error);
  }
});

// places/taurage/forecast -> { cityCode: "taurage" }
server.get("/places/:cityCode/forecasts", async (req, res) => {
  try {
    const cityCode = req.params.cityCode;
    const response = await fetch(
      `https://api.meteo.lt/v1/places/${cityCode}/forecasts`
    );
    const forecastTypesForCity = await response.json();

    res.send(forecastTypesForCity);
  } catch (error) {
    console.error(error);
  }
});

// places/taurage/forecast/long-term -> { cityCode: "taurage", forecastType: "long-term" }
server.get("/places/:cityCode/forecasts/:forecastType", async (req, res) => {
  try {
    const { cityCode, forecastType } = req.params;
    const response = await fetch(
      `https://api.meteo.lt/v1/places/${cityCode}/forecasts/${forecastType}`
    );
    const forecast = await response.json();

    res.send(forecast);
  } catch (error) {
    console.error(error);
  }
});

server.listen(8080, () => console.log("Listening to 8080"));
