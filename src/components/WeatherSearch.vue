<template>
    <v-container>
      <v-text-field
        v-model="city"
        label="Enter a city"
        aria-label="Enter a city"
        @keyup.enter="onSearch"
        outlined
      ></v-text-field>
      <v-btn @click="onSearch" color="primary" :disabled="!city || isLoading" aria-label="Search" >
        Search
      </v-btn>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useWeatherStore } from '../store/weatherStore';
  
  export default {
    setup() {
      const city = ref('');
      const weatherStore = useWeatherStore();
  
      const onSearch = () => {
        if (city.value) {
          weatherStore.fetchWeather(city.value);
        }
      };
  
      return {
        city,
        onSearch,
        isLoading: weatherStore.isLoading,
      };
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  </style>
  