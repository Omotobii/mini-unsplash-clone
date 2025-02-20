import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useDataStore = defineStore("data", () => {
  const images = ref<string[]>([]);
  const API_KEY = import.meta.env.VITE_ACCESS_KEY;

  async function getImages(payload: string) {
    const searchTerm = payload ? `&query=africa ${payload}` : "&query=africa";
    // console.log("API_KEY", API_KEY);

    await axios
      .get(
        `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=1&per_page=8${searchTerm}`
      )
      .then((response: any) => {
        images.value = response.data.results;
      })
      .catch((error: any) => {
        console.error("Error fetching images:", error);
      });
  }

  return {
    images,
    getImages,
  };
});
