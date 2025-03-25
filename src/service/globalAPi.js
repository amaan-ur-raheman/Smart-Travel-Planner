import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const PEXELS_URL = "https://api.pexels.com/v1/search";

const config = {
    headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.photos,places.id"
    },
};

const pexelsConfig = {
    headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
};

export const getPlaceDetails = (data) => axios.post(BASE_URL, data, config);

export const getPexelsImages = (query) =>
    axios.get(`${PEXELS_URL}?query=${query}&per_page=10`, pexelsConfig);