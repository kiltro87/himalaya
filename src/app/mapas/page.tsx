
import { Header } from "@/components/header";
import { MapPin } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MapsPageClient } from "./maps-page-client"; // Import the new client component

async function getMapboxApiKey(): Promise<string> {
  const docRef = doc(db, "secrets", "apiKeys");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const apiKey = data.mapbox;
    if (typeof apiKey === 'string' && apiKey.length > 0) {
      return apiKey;
    }
  }
  console.error("Mapbox API key is not configured in Firestore.");
  return ""; 
}

export default async function MapsPage() {
  const mapboxApiKey = await getMapboxApiKey();

  return (
    <div className="flex h-screen w-full flex-col">
      <Header 
        icon={<MapPin size={48} />}
        title="Mapas"
        subtitle="Navegación Interactiva"
      />
      <main className="flex-1">
        {/* Use the client component to handle the dynamic map import */}
        <MapsPageClient mapboxApiKey={mapboxApiKey} />
      </main>
    </div>
  );
}
