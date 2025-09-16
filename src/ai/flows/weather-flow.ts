
'use server';

import { z } from 'zod';
import axios from 'axios';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';

const WeatherInfoOutputSchema = z.object({
  location: z.string().describe('The name of the location.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  description: z.string().describe('A brief description of the weather (e.g., "Clear sky").'),
  icon: z.string().describe('An emoji representing the current weather conditions (e.g., "☀️").'),
  feelsLike: z.number().describe("The 'feels like' temperature in Celsius."),
  humidity: z.number().describe('The humidity percentage.'),
  windSpeed: z.number().describe('The wind speed in km/h.'),
  sunrise: z.string().describe('The sunrise time in HH:MM format.'),
  sunset: z.string().describe('The sunset time in HH:MM format.'),
});

const OpenWeatherMapDataSchema = z.object({
    weather: z.array(z.object({
      description: z.string(),
      icon: z.string(),
    })).min(1),
    main: z.object({
      temp: z.number(),
      feels_like: z.number(),
      humidity: z.number(),
    }),
    wind: z.object({
      speed: z.number(),
    }),
    sys: z.object({
      sunrise: z.number(),
      sunset: z.number(),
    }),
    timezone: z.number(),
    name: z.string(),
  });

export type WeatherInfoOutput = z.infer<typeof WeatherInfoOutputSchema>;

async function getApiKey(): Promise<string> {
    const docRef = doc(db, "secrets", "apiKeys");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const apiKey = data.openWeatherMap; 
        if (typeof apiKey === 'string' && apiKey.length > 0) {
            return apiKey;
        } else {
            throw new Error('openWeatherMap API key is missing or invalid in Firestore.');
        }
    } else {
        throw new Error('API keys document not found in Firestore.');
    }
}

export async function getWeatherInfo(location: string): Promise<WeatherInfoOutput> {
    let apiKey;
    try {
      apiKey = await getApiKey();
    } catch (error: any) {      
      console.error(error.message);
      throw new Error(error.message);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=es`;
    
    try {
      const response = await axios.get(url);
      const data = OpenWeatherMapDataSchema.parse(response.data);

      const iconMap: { [key: string]: string } = {
        '01d': '☀️', '01n': '🌙',
        '02d': '🌤️', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '🌥️', '04n': '🌥️',
        '09d': '🌦️', '09n': '🌦️',
        '10d': '🌧️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️',
      };
      
      const formatTime = (timestamp: number, timezoneOffset: number) => {
        const date = new Date((timestamp + timezoneOffset) * 1000);
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
      }

      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: iconMap[data.weather[0].icon] || '🌡️',
        location: data.name,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        sunrise: formatTime(data.sys.sunrise, data.timezone),
        sunset: formatTime(data.sys.sunset, data.timezone),
      };

    } catch (error: any) {
       if (error instanceof z.ZodError) {
        console.error("Weather data validation error:", error.issues);
        throw new Error("Received invalid weather data format.");
       }
       if (error.response) {
        console.error('Error fetching weather data. Status:', error.response.status, 'Data:', JSON.stringify(error.response.data, null, 2));
        throw new Error(`Could not fetch weather data for ${location}: ${error.response.data.message}`);
       } else if (error.request) {
        console.error('Error fetching weather data: No response received', error.request);
        throw new Error('No response from weather service. Please check network.');
       } else {
        console.error('Error fetching weather data:', error.message);
        throw new Error(`Could not fetch weather data for ${location}.`);
       }
    }
}
