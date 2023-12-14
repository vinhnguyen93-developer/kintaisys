import axios from "axios";
import { SHEET_ID, API_KEY } from "../constants";

export const readData = async (sheetName) => {
  return axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`
  );
};

export const writeSheet = async (month, position, value, accessToken) => {
  const range = `${month}!${position}`; // specify the sheet name
  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  return axios.put(
    apiUrl,
    { values: [[value]], majorDimension: "ROWS" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        valueInputOption: "RAW",
      },
    }
  );
};

export const checkTokenInvalid = async (accessToken) => {
  return axios.get(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
};
