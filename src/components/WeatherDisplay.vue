<template>
    <v-container>
      <v-card v-if="weatherData" outlined>
        <v-card-title>
          Weather in {{ weatherData.city }}
        </v-card-title>
        <v-card-text>
          <p>Temperature: {{ weatherData.temperature }}°C</p>
          <p>Description: {{ weatherData.description }}</p>
        </v-card-text>
      </v-card>
  
      <v-alert v-else-if="error" type="error">
        {{ error }}
      </v-alert>
  
      <v-alert v-else-if="!isLoading" type="info">
        Enter a city to see the weather!
      </v-alert>
  
      <v-progress-circular v-if="isLoading" indeterminate color="primary"   role="progressbar"></v-progress-circular>
    </v-container>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useWeatherStore } from '../store/weatherStore';
  
  export default {
    setup() {
      const weatherStore = useWeatherStore();
  
      return {
        weatherData: computed(() => weatherStore.weatherData),
        isLoading: computed(() => weatherStore.isLoading),
        error: computed(() => weatherStore.error),
      };
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    margin-top: 20px;
    text-align: center;
  }
  .v-card {
    background-color: #f5f5f5;
  }
  </style>
  