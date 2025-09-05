# User Stories for Himalaya Navigator App

This document outlines the user stories that define the features and functionality of the Himalaya Navigator application.

## 1. Core Concept & Navigation

- **As a traveler**, I want a comprehensive, mobile-first travel planning application for my trip to the Himalayas (Nepal and Bhutan).
- **As a traveler**, I want the app to be a single source of truth for my itinerary, budget, packing list, logistics, and real-time assistance.
- **As a traveler**, I want a fixed bottom navigation bar for quick and easy access to the five main sections of the app: "Hoy" (Today), "Itinerario" (Itinerary), "Logística" (Logistics), "Panel de Control" (Dashboard), and "Mapas" (Maps).

## 2. "Hoy" (Today) View

- **As a traveler**, I want a "Today" screen that automatically displays the relevant information for the current day of my trip.
- **As a traveler**, I want this screen to show a prominent summary card with the day's location, title, country, and an inspiring image.
- **As a traveler**, I want to see dedicated cards on the "Today" screen for:
    - **Plan del Día:** A brief summary of the day's main activities.
    - **Bocado del Día:** A specific food or drink recommendation for the day.
    - **Tiempo Actual:** The current weather for my location, which is fetched from an API.
- **As a traveler**, I want an "AI Travel Assistant" card where I can input my daily plan and preferences to receive personalized, AI-generated tips for travel, food, and alternative activities.
- **As a developer/tester**, I want a "Day Simulator" floating button that allows me to change the current day to view the app's state for any day of the trip.

## 3. "Itinerario" (Itinerary) View

- **As a traveler**, I want to see my full 18-day trip itinerary presented as a clear, vertical timeline that is easy to scroll on a mobile device.
- **As a traveler**, I want each item in the timeline to be a clickable card showing key daily information: day number, date, location, title, country, and a preview image.
- **As a traveler**, I want each itinerary card to display the real-time weather for that day's location.
- **As a traveler**, when I click on a day's card, I want a detailed modal to open, showing:
    - A large header image.
    - A full list of places to visit with icons and descriptions.
    - Detailed descriptions for "Plan A" (primary plan) and "Plan B" (alternative plan).
    - A specific "Consejo del Día" (Tip of the Day) and "Bocado del Día" (Bite of the Day).
    - The name of the accommodation for that night.
- **As a traveler**, I want the images to gracefully hide if they fail to load, instead of showing a broken image icon.

## 4. "Panel de Control" (Dashboard) View

- **As a traveler**, I want a dashboard that gives me a high-level overview of my trip's status.
- **As a traveler**, I want to see key statistics at the top of the dashboard:
    - **Días Restantes:** How many days are left in the trip.
    - **Progreso de Equipaje:** The percentage of items I've packed.
    - **Presupuesto Gastado:** Total amount spent versus the total budget.
- **As a traveler**, I want to see two side-by-side pie charts comparing my **budget distribution** by category versus my **actual spending distribution** by category.
- **As a traveler**, I want the dashboard to have collapsible sections for:
    - **Detalle de Gastos (Budget):** A detailed view to manage my expenses.
    - **Equipaje (Packing):** My complete packing list.
    - **Conversor de Divisas (Currency Converter):** A tool for quick currency conversions.
- **As a traveler**, I want the dashboard to display loading skeletons while initial data (like expenses from the database) is being fetched to ensure a smooth user experience.

## 5. "Logística" (Logistics) View

- **As a traveler**, I want a logistics screen that consolidates all my booking information.
- **As a traveler**, I want this screen to have collapsible accordion sections for:
    - **Hoteles:** A list of all my hotel bookings, with images, descriptions, check-in/out dates, and confirmation codes.
    - **Vuelos:** A list of all my international and regional flights, showing segments, times, and layover information.
    - **Servicios y Agencias:** Cards containing information about my tour operator, travel insurance, and emergency contacts.

## 6. "Mapas" (Maps) View

- **As a traveler**, I want an interactive map screen that shows markers for all the places mentioned in my itinerary.
- **As a traveler**, I want to be able to click on a map marker to see a popup with the name of the place and the corresponding itinerary day.

## 7. Budget and Expense Management

- **As a traveler**, in the "Panel de Control," I want to manage my budget by category.
- **As a traveler**, I want to see the budget, the amount spent, and a progress bar for each category.
- **As a traveler**, I want to be able to add new expenses, edit existing ones, and delete them. Adding or editing an expense should open a form in a modal.
- **As a traveler**, I want my expense data to be saved to a backend database (Firestore) so it persists. The app should handle anonymous user authentication to store this data.
- **As a traveler**, I want to see both my pre-planned (estimated) expenses and my actual logged expenses in the same list for each category, with a clear distinction between them.

## 8. Packing List

- **As a traveler**, in the "Panel de Control," I want an interactive packing list organized by categories (e.g., Ropa, Equipamiento, Documentos).
- **As a traveler**, I want to be able to check and uncheck items on the list.
- **As a traveler**, I want my packing progress to be saved automatically in the browser's local storage so it persists between sessions.
- **As a traveler**, I want the packing categories to be collapsed by default to keep the interface clean.

## 9. Technical Specifications & Data

This section provides technical details for replication.

### 9.1. Core Data File (`src/lib/trip-config.ts`)

- **As a developer**, I need a central TypeScript file that exports a single `tripConfig` object. This object will contain all the static data for the trip.
- **Itinerary Data:** This should be an array of `ItineraryDay` objects. Each object must include day number, location, title, description, image URL, places with coordinates, plans, tips, and accommodation details.
- **Budget Data:** This should be a `BudgetConfig` object, including currency symbol and an array of `BudgetCategories`. Each category has a name, budget amount, and a list of pre-defined (estimated) `Expense` items.
- **Packing List:** A `PackingConfig` object with categories and items for the packing list.
- **Accommodations:** An array of `Accommodation` objects with hotel details and reservation confirmation codes.
- **Flights:** An array of `Flight` objects detailing international and regional flights, including segments and times.
- **Services:** A `Services` object containing information about tour agencies, insurance, and emergency contacts.

### 9.2. Environment & API Keys (`.env` and `firebase.ts`)

- **As a developer**, I need to manage several API keys for external services. These should be stored in a `.env` file at the project root.
- **`GEMINI_API_KEY`:** Required for the AI-powered features (Personalized Tips). This key is used by the Genkit AI framework on the server side.
- **`NEXT_PUBLIC_OPENWEATHERMAP_API_KEY`:** Required to fetch real-time weather data. The `NEXT_PUBLIC_` prefix makes it available on the client-side.
- **`NEXT_PUBLIC_MAPBOX_API_KEY`:** Required to render the interactive maps.
- **Firebase Config:** The file `src/lib/firebase.ts` must contain the Firebase project configuration object. This allows the application to connect to Firestore for storing and retrieving user-specific data, like expenses, and to handle anonymous user authentication.

### 9.3. AI Flows (`src/ai/flows/`)

- **As a developer**, I need two server-side AI flows managed by Genkit.
- **`personalized-travel-tips.ts`:** This flow takes the user's daily itinerary and preferences as input. It queries the Gemini model to generate a JSON object containing a travel tip, a food suggestion, and an alternative activity. The flow must be robust enough to handle potential JSON formatting errors from the AI.
- **`weather-flow.ts`:** This flow takes a location (city name) as input. It uses the OpenWeatherMap API to fetch the current temperature and weather conditions, and returns a formatted object including a relevant weather emoji.
