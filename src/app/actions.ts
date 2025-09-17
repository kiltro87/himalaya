
"use server";

import { getWeatherInfo } from "@/ai/flows/weather-flow";
import { z } from "zod";

const weatherSchema = z.string().min(1, { message: "Location is required." });

/**
 * Fetches weather information for a given location.
 * This is a server action that securely calls the underlying weather fetching logic.
 * @param location The location string (e.g., "Kathmandu").
 * @returns An object with the success status and either the weather data or an error message.
 */
export async function fetchWeather(location: string) {
    const parsed = weatherSchema.safeParse(location);
    if (!parsed.success) {
        return { success: false, error: "Invalid location provided." };
    }
    try {
        // The getWeatherInfo function is responsible for securely fetching its own API key.
        const weather = await getWeatherInfo(parsed.data);
        return { success: true, data: weather };
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        const errorMessage = error instanceof Error ? error.message : "Could not fetch weather data.";
        return { success: false, error: errorMessage };
    }
}
