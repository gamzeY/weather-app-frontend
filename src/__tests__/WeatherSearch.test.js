import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import { setActivePinia, createPinia } from 'pinia';
import { useWeatherStore } from '../store/weatherStore';
import WeatherSearch from '../components/WeatherSearch.vue';
import { nextTick } from 'vue';

describe('WeatherSearch.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); 
  });

  it('calls the store action when search is triggered', async () => {
    const weatherStore = useWeatherStore();
    weatherStore.fetchWeather = vi.fn(); 
    weatherStore.isLoading = false; 

    render(WeatherSearch);

    const input = screen.getByLabelText('Enter a city');
    const button = screen.getByLabelText('Search');

    await fireEvent.update(input, 'London');
    await nextTick(); 
    expect(button).toBeDisabled(); 
  });

  it('does not call the store action when input is empty', async () => {
    const weatherStore = useWeatherStore();
    weatherStore.fetchWeather = vi.fn(); 

    render(WeatherSearch);

    const button = screen.getByLabelText('Search');

    await fireEvent.click(button);

    expect(weatherStore.fetchWeather).not.toHaveBeenCalled();
  });
});
