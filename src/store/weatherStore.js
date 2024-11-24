import { defineStore } from 'pinia';
import api from '../services/api';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchWeather(city) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.get(`Weather/${city}`);
        this.weatherData = response.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred.';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
