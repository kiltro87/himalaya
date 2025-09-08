
import { TripConfig, ItineraryDay } from './types';

// ======================================================================================
// ITINERARY DATA
// ======================================================================================
export const TRIP_ITINERARY: ItineraryDay[] = [
  { id: 'day-1', day: 1, phase: 'nepal', country: 'Nepal', location: 'Kathmandu', title: 'Llegada a Katmandú', description: 'Llegada al Aeropuerto Internacional de Tribhuvan (KTM), traslado al hotel y tiempo para descansar.', image: '/images/days/day-1.jpg', places: [], icon: '✈️', planA: 'Descansar y aclimatarse. Paseo suave por Thamel.', planB: 'Visitar el Jardín de los Sueños.', consejo: 'Bebe mucha agua.', bocado: 'Prueba el Dal Bhat.', accommodation: 'Hotel Shambaling' },
  { id: 'day-2', day: 2, phase: 'nepal', country: 'Nepal', location: 'Kathmandu', title: 'Explorando la capital', description: 'Visitas a la estupa de Boudhanath, el templo de Pashupatinath y la Plaza Durbar.', image: '/images/days/day-2.jpg', places: [ { name: 'Boudhanath Stupa', coords: [27.7215, 85.3615], icon: 'stupa', description: 'Centro de la cultura tibetana en Katmandú.' }, { name: 'Templo Pashupatinath', coords: [27.7107, 85.3485], icon: 'temple', description: 'El templo hindú más sagrado de Nepal.' }, { name: 'Plaza Durbar de Katmandú', coords: [27.7041, 85.3074], icon: 'palace', description: 'Antiguo palacio real.' } ], icon: '🏛️', planA: 'Seguir el itinerario cultural.', planB: 'Perderse por las callejuelas de Thamel.', consejo: 'Viste con respeto en lugares religiosos.', bocado: 'Los momos son imprescindibles.', accommodation: 'Hotel Shambaling' },
  { id: 'day-3', day: 3, phase: 'nepal', country: 'Nepal', location: 'Pokhara', title: 'Rumbo a Pokhara', description: 'Viaje por carretera a Pokhara. Tarde libre para explorar la orilla del lago Phewa.', image: '/images/days/day-3.jpg', places: [ { name: 'Lago Phewa', coords: [28.2127, 83.9556], icon: 'lake', description: 'Lago con vistas a los Annapurnas.' } ], icon: '🚗', planA: 'Paseo en barca por el lago Phewa.', planB: 'Caminata a la Pagoda de la Paz Mundial.', consejo: 'El viaje por carretera es largo, lleva entretenimiento.', bocado: 'Pescado fresco del lago.', accommodation: 'Hotel Barahi' },
  { id: 'day-4', day: 4, phase: 'nepal', country: 'Nepal', location: 'Pokhara', title: 'Amanecer en Sarangkot', description: 'Excursión de madrugada a Sarangkot para ver el amanecer sobre los Annapurnas. Resto del día libre.', image: '/images/days/day-4.jpg', places: [ { name: 'Sarangkot Viewpoint', coords: [28.2589, 83.9757], icon: 'mountain', description: 'Vistas panorámicas del amanecer.' } ], icon: '🌅', planA: 'Ver el amanecer y luego visitar la cascada de Devi.', planB: 'Parapente sobre el lago Phewa.', consejo: 'Abrígate bien para ver el amanecer, hace frío.', bocado: 'Desayuno nepalí en un café con vistas.', accommodation: 'Hotel Barahi' },
  { id: 'day-5', day: 5, phase: 'nepal', country: 'Nepal', location: 'Chitwan', title: 'Aventura en la Selva', description: 'Viaje al Parque Nacional de Chitwan. Safari por la tarde para avistar rinocerontes y otra fauna.', image: '/images/days/day-5.jpg', places: [ { name: 'Parque Nacional de Chitwan', coords: [27.5724, 84.4168], icon: 'park', description: 'Hogar del rinoceronte de un cuerno.' } ], icon: '🐘', planA: 'Safari en jeep.', planB: 'Paseo en canoa por el río Rapti.', consejo: 'Usa repelente de mosquitos.', bocado: 'Cena con espectáculo de danza Tharu.', accommodation: 'Green Park Chitwan' },
  { id: 'day-6', day: 6, phase: 'nepal', country: 'Nepal', location: 'Chitwan', title: 'Jungla y Cultura Tharu', description: 'Actividades en Chitwan: caminata por la selva, visita a un centro de cría de elefantes y exploración de la cultura local Tharu.', image: '/images/days/day-6.jpg', places: [ { name: 'Centro de Cría de Elefantes', coords: [27.56, 84.33], icon: 'elephant', description: 'Aprende sobre los esfuerzos de conservación.' } ], icon: '🚶', planA: 'Caminata guiada por la selva.', planB: 'Visitar un pueblo Tharu.', consejo: 'Sigue siempre las indicaciones de tu guía en la selva.', bocado: 'Comida tradicional Tharu.', accommodation: 'Green Park Chitwan' },
  { id: 'day-7', day: 7, phase: 'nepal', country: 'Nepal', location: 'Kathmandu', title: 'Regreso a la Civilización', description: 'Vuelo de regreso a Katmandú desde Bharatpur. Tarde libre para compras de última hora o explorar algo pendiente.', image: '/images/days/day-7.jpg', places: [ { name: 'Thamel', coords: [27.715, 85.313], icon: 'shopping', description: 'El barrio turístico por excelencia para compras.' } ], icon: '🛍️', planA: 'Comprar souvenirs en Thamel.', planB: 'Visitar la Plaza Durbar de Patan.', consejo: 'Negocia los precios con una sonrisa.', bocado: 'Cena de despedida de Nepal en un buen restaurante.', accommodation: 'Hotel Shambaling' },
  { id: 'day-8', day: 8, phase: 'bhutan', country: 'Bután', location: 'Thimphu', title: 'Llegada al Reino del Dragón', description: 'Vuelo panorámico de Katmandú a Paro. Traslado a Thimphu, la capital.', image: '/images/days/day-8.jpg', places: [ { name: 'Aeropuerto de Paro', coords: [27.4139, 89.4244], icon: 'airport', description: 'Uno de los aeropuertos más espectaculares.' } ], icon: '✈️', planA: 'Explorar el centro de Thimphu.', planB: 'Visitar el Tashichho Dzong.', consejo: 'El cambio de altitud puede sentirse.', bocado: 'Ema Datshi, el plato nacional.', accommodation: 'Hotel Druk' },
  { id: 'day-9', day: 9, phase: 'bhutan', country: 'Bután', location: 'Thimphu', title: 'Cultura y Tradición', description: 'Visitas al Buda Dordenma, la Biblioteca Nacional y la Escuela de Artes y Oficios.', image: '/images/days/day-9.jpg', places: [ { name: 'Buda Dordenma', coords: [27.4435, 89.6231], icon: 'statue', description: 'Estatua gigante de Buda con vistas al valle.' } ], icon: '🧘', planA: 'Completar las visitas culturales.', planB: 'Pequeña caminata por senderos cercanos.', consejo: 'Pide permiso antes de fotografiar personas.', bocado: 'Prueba el té de mantequilla (Suja).', accommodation: 'Hotel Druk' },
  { id: 'day-10', day: 10, phase: 'bhutan', country: 'Bután', location: 'Punakha', title: 'Hacia el Valle Fértil', description: 'Viaje a Punakha a través del paso de Dochula, con sus 108 estupas. Visita al Punakha Dzong.', image: '/images/days/day-10.jpg', places: [ { name: 'Paso de Dochula', coords: [27.4913, 89.7431], icon: 'stupa', description: 'Vistas del Himalaya en un día claro.' }, { name: 'Punakha Dzong', coords: [27.5825, 89.8631], icon: 'fortress', description: 'La fortaleza más bella de Bután.' } ], icon: '🏞️', planA: 'Cruzar el puente colgante cerca del Dzong.', planB: 'Caminata al Chimi Lhakhang (Templo de la Fertilidad).', consejo: 'El clima en Punakha es más cálido.', bocado: 'Arroz rojo, una especialidad local.', accommodation: 'RKPO Green Resort' },
  { id: 'day-11', day: 11, phase: 'bhutan', country: 'Bután', location: 'Paro', title: 'Regreso a Paro', description: 'Viaje de vuelta a Paro. Por la tarde, visita al Museo Nacional y al Paro Dzong (Rinpung Dzong).', image: '/images/days/day-11.jpg', places: [ { name: 'Museo Nacional de Bután', coords: [27.429, 89.426], icon: 'museum', description: 'Una atalaya histórica con artefactos culturales.' } ], icon: '🏰', planA: 'Explorar el Paro Dzong.', planB: 'Pasear por la calle principal de Paro.', consejo: 'Guarda espacio en la maleta para artesanía local.', bocado: 'Cena en una casa de campo tradicional.', accommodation: 'Tashi Namgay Resort' },
  { id: 'day-12', day: 12, phase: 'bhutan', country: 'Bután', location: 'Paro', title: 'El Nido del Tigre', description: 'Caminata al icónico Monasterio de Taktsang (Nido del Tigre), aferrado a un acantilado.', image: '/images/days/day-12.jpg', places: [ { name: 'Monasterio de Taktsang', coords: [27.4916, 89.3632], icon: 'monastery', description: 'El lugar más sagrado de Bután.' } ], icon: '🐅', planA: 'Realizar la caminata completa.', planB: 'Subir hasta la cafetería para buenas vistas.', consejo: 'Empieza temprano y lleva calzado cómodo.', bocado: 'Almuerzo con vistas al monasterio.', accommodation: 'Tashi Namgay Resort' },
  { id: 'day-13', day: 13, phase: 'farewell', country: 'Bután', location: 'Paro', title: 'Despedida de Bután', description: 'Mañana libre para disfrutar de Paro antes de tomar el vuelo de regreso.', image: '/images/days/day-13.jpg', places: [], icon: '👋', planA: 'Tomar un baño de piedras calientes tradicional.', planB: 'Últimas compras de souvenirs.', consejo: 'Confirma tu vuelo y llega al aeropuerto con tiempo.', bocado: 'Una última ronda de momos butaneses.', accommodation: 'Tashi Namgay Resort' },
  { id: 'day-14', day: 14, phase: 'international', country: 'Vuelo', location: 'En Tránsito', title: 'Viaje Intercontinental', description: 'Largo día de vuelos desde Paro (PBH) a Madrid (MAD), probablemente con varias escalas.', image: '/images/days/day-14.jpg', places: [], icon: '🌍', planA: 'Intentar dormir en el avión.', planB: 'Ver varias películas.', consejo: 'Usa ropa cómoda y mantente hidratado.', bocado: 'Comida de avión.', accommodation: 'En el aire' },
  { id: 'day-15', day: 15, phase: 'general', country: 'España', location: 'Madrid', title: 'Llegada y Descanso', description: 'Llegada a Madrid-Barajas. Traslado a casa y merecido descanso para combatir el jet lag.', image: '/images/days/day-15.jpg', places: [], icon: '🏡', planA: 'Deshacer la maleta y dormir.', planB: 'Paseo suave por el barrio para estirar las piernas.', consejo: 'Intenta adaptarte al horario local lo antes posible.', bocado: 'Una buena tortilla de patatas.', accommodation: 'Casa' },
  { id: 'day-16', day: 16, phase: 'general', country: 'España', location: 'Zaragoza', title: 'Rumbo a Casa', description: 'Viaje en AVE de Madrid a Zaragoza. Reencuentro con la familia y amigos.', image: '/images/days/day-16.jpg', places: [ { name: 'Estación Delicias', coords: [41.656, -0.91], icon: 'train', description: 'Llegada a Zaragoza.' } ], icon: '🚄', planA: 'Comida familiar.', planB: 'Cañas con amigos por El Tubo.', consejo: 'Comparte tus historias del viaje.', bocado: 'Tapas en El Tubo.', accommodation: 'Casa' },
  { id: 'day-17', day: 17, phase: 'general', country: 'España', location: 'Pirineos', title: 'Escapada al Pirineo', description: 'Excursión de un día al Pirineo aragonés para respirar aire puro y disfrutar de paisajes familiares.', image: '/images/days/day-17.jpg', places: [ { name: 'Parque Nacional de Ordesa', coords: [42.652, 0.055], icon: 'mountain', description: 'El corazón del Pirineo.' } ], icon: '🌲', planA: 'Ruta de senderismo a la Cola de Caballo.', planB: 'Paseo por el pueblo de Torla-Ordesa.', consejo: 'Consulta el tiempo antes de subir a la montaña.', bocado: 'Migas a la pastora en un restaurante de montaña.', accommodation: 'Casa' },
  { id: 'day-18', day: 18, phase: 'general', country: 'España', location: 'Zaragoza', title: 'Fin del Viaje', description: 'Último día oficial del viaje. Día de relax, organizar fotos y recuerdos.', image: '/images/days/day-18.jpg', places: [ { name: 'Basílica del Pilar', coords: [41.6568, -0.8787], icon: 'church', description: 'El símbolo de Zaragoza.' } ], icon: '🎉', planA: 'Organizar el álbum de fotos del viaje.', planB: 'Paseo por la ribera del Ebro.', consejo: 'Empieza a planificar el próximo viaje.', bocado: 'Almuerzo de despedida en tu sitio favorito.', accommodation: 'Casa' }
];

// ======================================================================================
// FULL TRIP CONFIGURATION OBJECT
// ======================================================================================
export const tripConfig: TripConfig = {
  // ----------------------------------------------------------------------------------
  // Trip Metadata
  // ----------------------------------------------------------------------------------
  trip: {
    name: "Del Himalaya a los Pirineos",
    startDate: "2024-10-09",
    endDate: "2024-10-26", // Adjusted to Day 18
    duration: 18,
    travelers: 2,
    currency: "EUR",
    destinations: ["Nepal", "Bután", "España"],
    year: 2024
  },

  // ----------------------------------------------------------------------------------
  // Itinerary
  // ----------------------------------------------------------------------------------
  itinerary: TRIP_ITINERARY,

  // ----------------------------------------------------------------------------------
  // Budget
  // ----------------------------------------------------------------------------------
  budget: {
    currency_symbol: "€",
    categories: [
      { id: "vuelos", name: "Vuelos", budget: 4000, expenses: [
        { id: "vuelo-int-1", concept: "Vuelo Madrid-Katmandú (Ida)", amount: 850, date: "2024-10-09" },
        { id: "vuelo-nep-bhu", concept: "Vuelo Katmandú-Paro", amount: 450, date: "2024-10-16" },
        { id: "vuelo-int-2", concept: "Vuelo Paro-Madrid (Vuelta)", amount: 950, date: "2024-10-22" }
      ]},
      { id: "alojamiento", name: "Alojamiento", budget: 2500, expenses: [] },
      { id: "agencias", name: "Agencias y Tours", budget: 3000, expenses: [
        { id: "tour-nepal", concept: "Servicios en Nepal (guía, transporte)", amount: 1200, date: "2024-10-10" },
        { id: "tour-butan", concept: "Tasa turística y servicios en Bután", amount: 1800, date: "2024-10-16" }
      ]},
      { id: "comida", name: "Comida y Bebida", budget: 1200, expenses: [] },
      { id: "transporte", name: "Transporte Local", budget: 400, expenses: [] },
      { id: "actividades", name: "Actividades y Entradas", budget: 600, expenses: [] },
      { id: "compras", name: "Compras y Souvenirs", budget: 500, expenses: [] },
      { id: "otros", name: "Otros (visados, imprevistos)", budget: 800, expenses: [
        { id: "visado-nepal", concept: "Visado de Nepal", amount: 50, date: "2024-10-09" }
      ]}
    ]
  },

  // ----------------------------------------------------------------------------------
  // Packing List
  // ----------------------------------------------------------------------------------
  packing: {
    categories: [
      { id: "documentacion", name: "Documentación", items: [
        { id: "pasaporte", name: "Pasaporte", packed: false },
        { id: "visados", name: "Visados (Nepal, Bután)", packed: false },
        { id: "billetes-avion", name: "Billetes de avión", packed: false },
        { id: "seguro-viaje", name: "Póliza de seguro de viaje", packed: false }
      ]},
      { id: "ropa", name: "Ropa", items: [
        { id: "pantalones-trekking", name: "Pantalones de trekking", quantity: 3, packed: false },
        { id: "camisetas-termicas", name: "Camisetas térmicas", quantity: 4, packed: false },
        { id: "forro-polar", name: "Forro polar", quantity: 2, packed: false },
        { id: "chaqueta-impermeable", name: "Chaqueta impermeable / cortavientos", packed: false },
        { id: "ropa-comoda", name: "Ropa cómoda para ciudades", packed: false }
      ]},
      { id: "electronica", name: "Electrónica", items: [
        { id: "adaptador-universal", name: "Adaptador de enchufe universal", packed: false },
        { id: "power-bank", name: "Batería externa (Power Bank)", packed: false },
        { id: "camara-fotos", name: "Cámara de fotos y baterías extra", packed: false }
      ]},
      { id: "botiquin", name: "Botiquín", items: [
        { id: "analgesicos", name: "Analgésicos (Ibuprofeno, Paracetamol)", packed: false },
        { id: "antihistaminicos", name: "Antihistamínicos", packed: false },
        { id: "material-curas", name: "Material de cura (tiritas, desinfectante)", packed: false },
        { id: "repelente-mosquitos", name: "Repelente de mosquitos (alto DEET)", packed: false }
      ]}
    ]
  },

  // ----------------------------------------------------------------------------------
  // Accommodations
  // ----------------------------------------------------------------------------------
  accommodations: [
    { id: 'shambaling', name: 'Hotel Shambaling', location: 'Kathmandu', description: 'Hotel de estilo tibetano cerca de Boudhanath.', image: '/images/hotels/shambaling.jpg', reservations: [{ id: 'res-sha-1', checkIn: '2024-10-09', checkOut: '2024-10-11', confirmationCode: 'SHM8371'}, { id: 'res-sha-2', checkIn: '2024-10-15', checkOut: '2024-10-16', confirmationCode: 'SHM8372'}]},
    { id: 'barahi', name: 'Hotel Barahi', location: 'Pokhara', description: 'Hotel con piscina cerca del lago Phewa.', image: '/images/hotels/barahi.jpg', reservations: [{ id: 'res-bar-1', checkIn: '2024-10-11', checkOut: '2024-10-13', confirmationCode: 'BAR4490'}]},
    { id: 'greenpark', name: 'Green Park Chitwan', location: 'Chitwan', description: 'Resort con ambiente de safari.', image: '/images/hotels/greenpark.jpg', reservations: [{ id: 'res-gre-1', checkIn: '2024-10-13', checkOut: '2024-10-15', confirmationCode: 'GPC1123'}]},
    { id: 'druk', name: 'Hotel Druk', location: 'Thimphu', description: 'Hotel céntrico y moderno en la capital.', image: '/images/hotels/druk.jpg', reservations: [{ id: 'res-dru-1', checkIn: '2024-10-16', checkOut: '2024-10-18', confirmationCode: 'DRU9876'}]},
    { id: 'rkpo', name: 'RKPO Green Resort', location: 'Punakha', description: 'Vistas impresionantes del valle de Punakha.', image: '/images/hotels/rkpo.jpg', reservations: [{ id: 'res-rkp-1', checkIn: '2024-10-18', checkOut: '2024-10-19', confirmationCode: 'RKP5567'}]},
    { id: 'tashi', name: 'Tashi Namgay Resort', location: 'Paro', description: 'Cerca del aeropuerto con arquitectura tradicional.', image: '/images/hotels/tashi.jpg', reservations: [{ id: 'res-tas-1', checkIn: '2024-10-19', checkOut: '2024-10-22', confirmationCode: 'TNR3341'}]}
  ],

  // ----------------------------------------------------------------------------------
  // Flights
  // ----------------------------------------------------------------------------------
  flights: [
      { type: 'Internacional', title: 'Madrid - Katmandú', airline: 'Qatar Airways', segments: [{ from: 'MAD', to: 'DOH', fromDateTime: '2024-10-09T15:00', toDateTime: '2024-10-09T23:50' }, { from: 'DOH', to: 'KTM', fromDateTime: '2024-10-10T02:00', toDateTime: '2024-10-10T09:30', layover: '2h 10m' }]},
      { type: 'Regional', title: 'Katmandú - Paro', airline: 'Druk Air', segments: [{ from: 'KTM', to: 'PBH', fromDateTime: '2024-10-16T09:00', toDateTime: '2024-10-16T10:20' }]},
      { type: 'Internacional', title: 'Paro - Madrid', airline: 'Turkish Airlines', segments: [{ from: 'PBH', to: 'DEL', fromDateTime: '2024-10-22T07:30', toDateTime: '2024-10-22T09:30' }, { from: 'DEL', to: 'IST', fromDateTime: '2024-10-22T13:00', toDateTime: '2024-10-22T18:00', layover: '3h 30m' }, { from: 'IST', to: 'MAD', fromDateTime: '2024-10-22T20:00', toDateTime: '2024-10-23T00:30', layover: '2h' }]}
  ],

  // ----------------------------------------------------------------------------------
  // Services & Emergency
  // ----------------------------------------------------------------------------------
  services: {
      agencies: [
        { id: 'nepal-agency', name: 'Himalayan Wonders', type: 'Agencia en Nepal', icon: 'briefcase', color: 'blue', tour: 'Tour Clásico de Nepal', price: '1200€', url: 'https://himalayanwonders.com', description: 'Guías, transporte privado y actividades en Nepal.', contact: 'info@himalayanwonders.com' },
        { id: 'bhutan-agency', name: 'Dragon\'s Path Tours', type: 'Agencia en Bután', icon: 'briefcase', color: 'orange', tour: 'Tasa SDF y Tour Cultural', price: '1800€', url: 'https://dragonspath.bt', description: 'Gestión de la Tasa de Desarrollo Sostenible (SDF), guía y vehículo.', contact: 'contact@dragonspath.bt' }
      ],
      insurance: { name: 'IATI Seguros', icon: 'shield', color: 'green', status: 'Activo', description: 'Póliza IATI Mochilero con cobertura de trekking y anulación.' },
      emergency: { name: 'Contactos de Emergencia', icon: 'phone', color: 'red', embassy: 'Embajada de España en Delhi (+91 9810 174 160)', hospital: 'CIWEC Clinic, Kathmandu (+977 1 4424111)', timezone: 'Nepal (GMT+5:45), Bután (GMT+6)' }
  }
};
