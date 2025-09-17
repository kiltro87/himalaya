
import { getTripDay } from "@/lib/date-utils";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HomePageClient } from "./home-page-client";

async function getApiKeys(): Promise<{ mapbox: string; openweather: string; }> {
  const docRef = doc(db, "secrets", "apiKeys");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    // CORRECTED: Use openWeatherMap to match the rest of the codebase
    const mapbox = data.mapbox || "";
    const openweather = data.openWeatherMap || ""; 
    if (typeof mapbox === 'string' && mapbox.length > 0 && typeof openweather === 'string' && openweather.length > 0) {
      return { mapbox, openweather };
    }
  }
  console.error("API keys are not configured correctly in Firestore.");
  return { mapbox: "", openweather: "" };
}

export default async function Home() {
  const initialDayNumber = getTripDay();
  const { mapbox: mapboxApiKey } = await getApiKeys();

  return (
    <HomePageClient 
      initialDayNumber={initialDayNumber} 
      mapboxApiKey={mapboxApiKey}
    />
  );
}
