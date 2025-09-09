'use server';

/**
 * @fileOverview Provides personalized travel tips, food suggestions, and alternative activity ideas based on daily itinerary and preferences.
 *
 * - personalizedTravelTips - A function that generates personalized travel recommendations.
 * - PersonalizedTravelTipsInput - The input type for the personalizedTravelTips function.
 * - PersonalizedTravelTipsOutput - The return type for the personalizedTraveltips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTravelTipsInputSchema = z.object({
  itineraryDay: z.string().describe('The itinerary for the specific day.'),
  userPreferences: z.string().describe('The user preferences for travel, food and activities.'),
});
export type PersonalizedTravelTipsInput = z.infer<typeof PersonalizedTravelTipsInputSchema>;

const PersonalizedTravelTipsOutputSchema = z.object({
  travelTip: z.string().describe('A personalized travel tip for the day.'),
  foodSuggestion: z.string().describe('A food suggestion based on user preferences and itinerary.'),
  alternativeActivity: z.string().describe('An alternative activity idea for unexpected situations.'),
});
export type PersonalizedTravelTipsOutput = z.infer<typeof PersonalizedTravelTipsOutputSchema>;

export async function personalizedTravelTips(input: PersonalizedTravelTipsInput): Promise<PersonalizedTravelTipsOutput> {
  return personalizedTravelTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTravelTipsPrompt',
  input: {schema: PersonalizedTravelTipsInputSchema},
  output: {
    format: 'json',
    schema: PersonalizedTravelTipsOutputSchema,
  },
  prompt: `You are an expert travel assistant for the Himalayas. Your goal is to provide concise, practical, and inspiring advice.

  Based on the user's plan for the day and their stated preferences, you must generate three specific recommendations.

  **Today's Itinerary:**
  "{{{itineraryDay}}}"

  **User's Preferences:**
  "{{{userPreferences}}}"

  **Your Task:**
  Generate a valid JSON object with three keys, ensuring it is perfectly formatted:
  1.  \`travelTip\`: A specific, actionable tip relevant to the day's activities. Example: "Para la subida al Nido del Tigre, empieza a caminar antes de las 8 a.m. para evitar las multitudes y el sol más fuerte."
  2.  \`foodSuggestion\`: A recommendation for a local dish or type of food that fits the location and preferences. Example: "Después del trekking, prueba un 'thukpa' (sopa de fideos tibetana) en Pokhara para reponer fuerzas. Es reconfortante y delicioso."
  3.  \`alternativeActivity\`: A "Plan B" or complementary idea in case of bad weather or extra time, aligned with the user's interests. Example: "Si la tarde en Pokhara está nublada, en lugar de buscar vistas, visita el fascinante Museo Internacional de la Montaña."
  `,
});


const personalizedTravelTipsFlow = ai.defineFlow(
  {
    name: 'personalizedTravelTipsFlow',
    inputSchema: PersonalizedTravelTipsInputSchema,
    outputSchema: PersonalizedTravelTipsOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse?.output?.();

    if (!output) {
        const errorText = llmResponse ? llmResponse.text() : 'No response from model.';
        console.error("Failed to get structured output from the model. Response text:", errorText);
        throw new Error(
          'The AI model returned an unexpected or empty response. Please try again.'
        );
    }
    
    return output;
  }
);
