<template>
    <v-container>
      <WeatherSearch />
      <WeatherDisplay />
    </v-container>
  </template>
  
  <script>
  import WeatherSearch from '../components/WeatherSearch.vue';
  import WeatherDisplay from '../components/WeatherDisplay.vue';
  
  export default {
    components: {
      WeatherSearch,
      WeatherDisplay,
    },
  };
  </script>
  