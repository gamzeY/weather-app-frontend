import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import MockAdapter from 'axios-mock-adapter';
import api from '../services/api';
import { useWeatherStore } from '../store/weatherStore';

describe('weatherStore', () => {
  let mock;

  beforeEach(() => {
    setActivePinia(createPinia());
    mock = new MockAdapter(api);
    mock.reset();
  });

  it('updates state with weather data on success', async () => {
    const store = useWeatherStore();
    const mockData = { city: 'London', temperature: 15, description: 'Sunny' };

    mock.onGet('Weather/London').reply(200, mockData); 

    await store.fetchWeather('London');

    expect(store.weatherData).toEqual(mockData);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('sets error state on API failure', async () => {
    const store = useWeatherStore();

    mock.onGet('Weather/InvalidCity').reply(404);

    await store.fetchWeather('InvalidCity');

    expect(store.weatherData).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe('An error occurred.');
  });

  it('sets a generic error message on unknown error', async () => {
    const store = useWeatherStore();

    mock.onGet('Weather/London').reply(500);

    await store.fetchWeather('London');

    expect(store.weatherData).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe('An error occurred.');
  });

  it('sets isLoading during API call', async () => {
    const store = useWeatherStore();

    mock.onGet('Weather/London').reply(() => 
      new Promise((resolve) => setTimeout(() => resolve([200, { city: 'London', temperature: 15 }]), 500))
    );

    const fetchPromise = store.fetchWeather('London');
    expect(store.isLoading).toBe(true);

    await fetchPromise;

    expect(store.isLoading).toBe(false);
  });
});
