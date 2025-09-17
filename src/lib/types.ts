
export interface Place {
  name: string;
  coords: [number, number];
  icon: string;
  description: string;
}

export interface ItineraryDay {
  id: string;
  day: number;
  phase: 'nepal' | 'bhutan' | 'farewell' | 'international' | 'general';
  country: string;
  location: string;
  title: string;
  description: string;
  image: string;
  places: Place[];
  icon: string;
  planA: string;
  planB: string;
  consejo: string;
  bocado: string;
  accommodation: string | Accommodation;
  coords?: [number, number];
  zoom?: number;
}

export interface Expense {
    id: string;
    concept: string;
    amount: number;
    date: string;
    isEstimate?: boolean;
    categoryId?: string;
}

export interface BudgetCategory {
    id: string;
    name: string;
    budget: number;
    spent?: number;
    expenses: Expense[];
}

export interface BudgetConfig {
    currency_symbol: string;
    categories: BudgetCategory[];
}

export interface PackingItem {
    id: string;
    name: string;
    description?: string;
    quantity?: number;
    packed: boolean;
}

export interface PackingCategory {
    id: string;
    name: string;
    items: PackingItem[];
}

export interface PackingConfig {
    categories: PackingCategory[];
}

export interface Reservation {
    id: string;
    checkIn: string;
    checkOut: string;
    confirmationCode: string;
}

export interface Accommodation {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    reservations: Reservation[];
}

// New types from comprehensive config
export interface FlightSegment {
    from: string;
    to: string;
    fromDateTime: string;
    toDateTime: string;
    layover?: string;
}

export interface Flight {
    type: string;
    title: string;
    airline: string;
    segments: FlightSegment[];
}

export interface Agency {
    id: string;
    name: string;
    type: string;
    icon: string;
    color: string;
    tour: string;
    price: string;
    url: string;
    description: string;
    contact: string;
}

export interface Insurance {
    name: string;
    icon: string;
    color: string;
    status: string;
    description: string;
}

export interface Emergency {
    name: string;
    icon: string;
    color: string;
    embassy: string;
    hospital: string;
    timezone: string;
}

export interface Services {
    agencies: Agency[];
    insurance: Insurance;
    emergency: Emergency;
}


export interface TripConfig {
  trip: {
      name: string;
      startDate: string;
      endDate: string;
      duration: number;
      travelers: number;
      currency: string;
      destinations: string[];
      year: number;
  };
  itinerary: ItineraryDay[];
  budget: BudgetConfig;
  packing: PackingConfig;
  accommodations: Accommodation[];
  flights: Flight[];
  services: Services;
}

// AI Flow Types
export interface PersonalizedTravelTipsInput {
  itineraryDay: string;
  userPreferences: string;
}

export interface PersonalizedTravelTipsOutput {
  travelTip: string;
  foodSuggestion: string;
  alternativeActivity: string;
}

export interface WeatherInfoOutput {
    location: string;
    temperature: number;
    description:string;
    icon: string;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
}
