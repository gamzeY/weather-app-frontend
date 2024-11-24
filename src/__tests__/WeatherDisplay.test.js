import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { render, screen } from '@testing-library/vue';
import { useWeatherStore } from '../store/weatherStore';
import WeatherDisplay from '../components/WeatherDisplay.vue';

describe('WeatherDisplay.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('displays weather data when available', () => {
    const weatherStore = useWeatherStore();
    weatherStore.weatherData = {
      city: 'London',
      temperature: 15,
      description: 'Sunny',
    };
    weatherStore.isLoading = false;
    weatherStore.error = null;

    render(WeatherDisplay);

    expect(screen.getByText('Weather in London')).toBeInTheDocument();
    expect(screen.getByText('Temperature: 15°C')).toBeInTheDocument();
    expect(screen.getByText('Description: Sunny')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    const weatherStore = useWeatherStore();
    weatherStore.weatherData = null;
    weatherStore.isLoading = false;
    weatherStore.error = 'Failed to fetch weather data';

    render(WeatherDisplay);

    expect(screen.getByText('Failed to fetch weather data')).toBeInTheDocument();
  });

  it('displays loading indicator when loading', () => {
    const weatherStore = useWeatherStore();
    weatherStore.weatherData = null;
    weatherStore.isLoading = true;
    weatherStore.error = null;

    render(WeatherDisplay);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays info message when no weather data is available and not loading', () => {
    const weatherStore = useWeatherStore();
    weatherStore.weatherData = null;
    weatherStore.isLoading = false;
    weatherStore.error = null;

    render(WeatherDisplay);

    expect(screen.getByText('Enter a city to see the weather!')).toBeInTheDocument();
  });
});
