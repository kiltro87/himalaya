
import { TripConfig, ItineraryDay } from './types';
import { v4 as uuidv4 } from "uuid";
const today = new Date().toISOString();

// ======================================================================================
// ITINERARY DATA
// ======================================================================================
export const itinerary = [
  {
    "id": "day-1",
    "day": 1,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Madrid",
    "title": "Salida desde Madrid",
    "description": "El viaje comienza con el vuelo nocturno desde Madrid-Barajas (MAD) con destino a Katmandú.",
    "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    "places": [
      { "name": "Aeropuerto de Madrid-Barajas (MAD)", "coords": [40.4936, -3.5668], "icon": "✈️", "description": "Punto de partida del viaje" }
    ],
    "icon": "✈️",
    "planA": "Embarque en el vuelo nocturno de Qatar Airways. Acomódate para el primer trayecto largo hasta Doha. Cena y desayuno a bordo.",
    "planB": "Asegúrate de haber hecho el check-in online para elegir un buen asiento.",
    "consejo": "Usa un cojín de viaje y antifaz. Dormir en el primer vuelo es clave para combatir el jet lag.",
    "bocado": "Cena ligera antes de embarcar. En el avión, bebe mucha agua.",
    "accommodation": "Vuelo nocturno"
  },
  {
    "id": "day-2",
    "day": 2,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Katmandú",
    "title": "Llegada a Katmandú",
    "description": "Llegada al aeropuerto, trámites de visado y traslado al hotel en Thamel para un primer contacto con la ciudad.",
    "image": "https://www.conmochila.com/wp-content/uploads/2019/12/thamel-kathmandu-01.jpg",
    "coords": [27.7172, 85.324],
    "places": [
      { "name": "Aeropuerto Internacional Tribhuvan (KTM)", "coords": [27.6966, 85.3533], "icon": "🛬", "description": "Punto de llegada a Nepal" },
      { "name": "Thamel", "coords": [27.7172, 85.3138], "icon": "🛍️", "description": "Barrio turístico y centro neurálgico" },
      { "name": "Jardín de los Sueños", "coords": [27.7172, 85.3150], "icon": "🌳", "description": "Oasis de paz de estilo neoclásico" }
    ],
    "icon": "flight_land",
    "planA": "Llegada a KTM. Pasa por inmigración para obtener el visado on-arrival. Recoge tu equipaje y busca al representante del tour o toma un taxi prepago al hotel en Thamel. Check-in y tiempo para refrescarse.",
    "planB": "Si llegas con energía, da un primer paseo por las caóticas y fascinantes calles de Thamel para ubicarte. Para un respiro, visita el cercano Jardín de los Sueños.",
    "consejo": "Ten a mano 50 USD en efectivo para el visado de 30 días. El proceso en el aeropuerto es sencillo pero puede haber cola. Un taxi a Thamel cuesta entre 400-800 NPR.",
    "bocado": "Tu primer Dal Bhat. ¡El plato nacional! Pide uno en un restaurante local en Thamel.",
    "accommodation": "Hotel en Thamel"
  },
  {
    "id": "day-3",
    "day": 3,
    "phase": "bhutan",
    "country": "Bután",
    "location": "Thimphu",
    "title": "Llegada a Bután y Capital Thimphu",
    "description": "Vuelo panorámico a Paro y traslado a la capital, Thimphu. Visita al Museo Nacional, al Buda Dordenma y al centro de tejido.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Buddha_Dordenma.jpg",
    "coords": [27.4728, 89.639],
    "places": [
      { "name": "Aeropuerto Internacional de Paro (PBH)", "coords": [27.4032, 89.4246], "icon": "✈️", "description": "Llegada a Bután" },
      { "name": "Museo Nacional de Bután", "coords": [27.4287, 89.4265], "icon": "🏛️", "description": "Historia y cultura en la atalaya Ta Dzong" },
      { "name": "Buda Dordenma", "coords": [27.443, 89.637], "icon": "🙏", "description": "Estatua gigante con vistas a Thimphu" }
    ],
    "icon": "✈️",
    "planA": "Traslado al aeropuerto para el espectacular vuelo a Paro. A la llegada, encuentro con el guía local. Visita al Museo Nacional (Ta Dzong) para una introducción a la historia de Bután. Traslado a Thimphu. Visita a la estatua del Buda Dordenma y al Weaving Center. Tarde libre para un primer paseo por la capital.",
    "planB": "Pide a tu guía parar en el mirador del río Chuzom, donde se unen los ríos de Paro y Thimphu, marcados por tres estupas de diferentes estilos.",
    "consejo": "¡Pide asiento de ventanilla en el lado izquierdo en el vuelo a Paro! Si el día está claro, verás el Everest.",
    "bocado": "Tu primera comida en Bután seguramente incluirá 'Ema Datshi' (chiles y queso). ¡Pide que no pique mucho al principio!",
    "accommodation": "Hotel en Thimphu"
  },
  {
    "id": "day-4",
    "day": 4,
    "phase": "bhutan",
    "country": "Bután",
    "location": "Thimphu",
    "title": "Arte y Cultura en Thimphu",
    "description": "Caminata al Monasterio de Tango y visita a los centros culturales de Thimphu: el Instituto Zorig Chusum, la Biblioteca Nacional y el Museo Postal.",
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/3e/05/86/tashichho-dzong-it-was.jpg?w=900&h=500&s=1",
    "coords": [27.578, 89.636],
    "places": [
      { "name": "Monasterio de Tango", "coords": [27.578, 89.636], "icon": "🏯", "description": "Caminata espiritual" },
      { "name": "Instituto Nacional Zorig Chusum", "coords": [27.48, 89.63], "icon": "🎨", "description": "Escuela de las 13 artes de Bután" },
      { "name": "Museo Postal de Bután", "coords": [27.47, 89.63], "icon": "📮", "description": "Crea tu propio sello postal" },
      { "name": "Tashichho Dzong", "coords": [27.4897, 89.6350], "icon": "🏛️", "description": "Sede del gobierno y cuerpo monástico" }
    ],
    "icon": "🎨",
    "planA": "Por la mañana, caminata de 2.5h (ida y vuelta) al Monasterio de Tango. Almuerzo tradicional en el Folk Heritage Restaurant. Por la tarde, visita al Instituto Nacional Zorig Chusum (escuela de las 13 artes), la Biblioteca Nacional, el Authentic Craft Bazaar y el Museo Postal.",
    "planB": "Visita la Reserva de Takines para ver el curioso animal nacional de Bután y el Tashichho Dzong (Fortaleza de la Gloriosa Religión), sede del gobierno.",
    "consejo": "En el Museo Postal puedes imprimir un sello con tu propia foto. ¡El mejor y más original souvenir!",
    "bocado": "Prueba los 'momos' butaneses. Son similares a los nepalíes pero a menudo más picantes y con rellenos diferentes.",
    "accommodation": "Hotel en Thimphu"
  },
  {
    "id": "day-5",
    "day": 5,
    "phase": "bhutan",
    "country": "Bután",
    "location": "Punakha",
    "title": "Hacia Punakha vía Dochula Pass",
    "description": "Viaje a Punakha a través del paso Dochula (3.150m). Visita al 'Templo de la Fertilidad' y al majestuoso Punakha Dzong.",
    "image": "https://www.authenticindiatours.com/app/uploads/2022/04/Monument-with-108-chorten-Dochula-Pass-Bhutan-min-1400x550-c-default.jpg",
    "coords": [27.5843, 89.8631],
    "places": [
      { "name": "Paso Dochula", "coords": [27.492, 89.744], "icon": "🏔️", "description": "108 estupas y vistas del Himalaya" },
      { "name": "Chimi Lhakhang", "coords": [27.57, 89.83], "icon": "❤️", "description": "Templo de la Fertilidad" },
      { "name": "Punakha Dzong", "coords": [27.5843, 89.8631], "icon": "🏯", "description": "Palacio de la Gran Felicidad" },
      { "name": "Puente Colgante de Punakha", "coords": [27.58, 89.86], "icon": "🌉", "description": "Uno de los más largos de Bután" }
    ],
    "icon": "🏯",
    "planA": "Salida hacia Punakha. Parada en el paso de Dochula para admirar las 108 estupas y las vistas del Himalaya. Descenso al valle y caminata hasta el Chimi Lhakhang, el 'Templo de la Fertilidad'. Por la tarde, visita al Punakha Dzong, situado en la confluencia de los ríos Phochu y Mochu.",
    "planB": "Cruza el puente colgante cerca del Punakha Dzong, uno de los más largos de Bután. ¡Las vistas y la sensación son geniales!",
    "consejo": "En el paso Dochula, si el día está despejado, la vista de la cordillera del Himalaya es sobrecogedora. Tómate tu tiempo y abrígate.",
    "bocado": "El arroz rojo es una especialidad de Bután. Lo servirán en casi todas las comidas, es nutritivo y tiene un sabor particular, a nuez.",
    "accommodation": "Hotel en Punakha"
  },
  {
    "id": "day-6",
    "day": 6,
    "phase": "bhutan",
    "country": "Bután",
    "location": "Paro",
    "title": "Valle de Punakha y Regreso a Paro",
    "description": "Caminata matutina al Khamsum Yuelley Namgyel Chorten y regreso por carretera a Paro, con una posible caminata adicional en ruta.",
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/1c/1e/22/khamsum-yulley-namgyal.jpg?w=1200&h=-1&s=1",
    "coords": [27.618, 89.861],
    "places": [
      { "name": "Khamsum Yuelley Namgyel Chorten", "coords": [27.618, 89.861], "icon": "🏯", "description": "Chorten sagrado con vistas al valle" }
    ],
    "icon": "🚶‍♂️",
    "planA": "Caminata matutina de 2.5h a través de campos de arroz hasta el Khamsum Yuelley Namgyel Chorten. Disfruta de las vistas del valle. Viaje de regreso a Paro, con almuerzo en el Dochula Cafe. Por la tarde, caminata opcional de 1h al monasterio Tashigang Gonpa desde el paso.",
    "planB": "Pide a tu guía que te cuente la historia del 'Divino Loco', Drukpa Kunley, asociada al Templo de la Fertilidad. Es muy curiosa y fundamental para entender parte de la cultura butanesa.",
    "consejo": "La caminata al Chorten es suave y muy fotogénica, atravesando campos de arroz y un puente colgante. Un paseo muy agradable.",
    "bocado": "Prueba el 'Suja', el té de mantequilla butanés. Es una bebida de sabor fuerte y salado, una experiencia cultural en sí misma.",
    "accommodation": "Hotel en Paro"
  },
  {
    "id": "day-7",
    "day": 7,
    "phase": "bhutan",
    "country": "Bután",
    "location": "Paro",
    "title": "Trekking al Nido del Tigre",
    "description": "Día dedicado al trekking al icónico Monasterio de Taktsang, el 'Nido del Tigre', y cena de despedida en una granja local.",
    "image": "https://www.earthtrekkers.com/wp-content/uploads/2017/02/Tigers-Nest-Bhutan.jpg.webp",
    "coords": [27.4915, 89.3632],
    "places": [
      { "name": "Monasterio de Taktsang (Nido del Tigre)", "coords": [27.4915, 89.3632], "icon": "🐅", "description": "El icono sagrado de Bután" },
      { "name": "Kyichu Lhakhang", "coords": [27.4411, 89.3764], "icon": "🏛️", "description": "Uno de los templos más antiguos de Bután" }
    ],
    "icon": "🐅",
    "planA": "Día cumbre en Bután. Desayuno temprano y trekking al Monasterio de Taktsang (4-5h ida y vuelta). Visita al monasterio. Descenso y almuerzo. Tarde libre. Cena de despedida en una granja local con opción de baño de piedras calientes.",
    "planB": "Si te quedan fuerzas, visita el Kyichu Lhakhang por la tarde, uno de los templos más antiguos y sagrados de Bután, para una experiencia más tranquila y espiritual.",
    "consejo": "Empieza a caminar antes de las 8 am para evitar multitudes y el calor. El camino es empinado, usa bastones si lo necesitas. Viste con decoro (mangas y pantalones largos).",
    "bocado": "La comida en la cafetería a mitad de camino del Nido del Tigre tiene las mejores vistas del mundo. Para la cena, prueba el 'Phaksha Paa' (cerdo con chiles).",
    "accommodation": "Hotel en Paro"
  },
  {
    "id": "day-8",
    "day": 8,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Katmandú",
    "title": "Regreso a Katmandú y Plaza Durbar",
    "description": "Vuelo panorámico a Katmandú. Por la tarde, día libre para explorar el corazón histórico de Katmandú, la Plaza Durbar.",
    "image": "https://www.lasociedadgeografica.com/blog/uploads/2020/09/katmandu-square-nepal-tourism.jpg",
    "coords": [27.7048, 85.3074],
    "places": [
      { "name": "Plaza Durbar de Katmandú", "coords": [27.7048, 85.3074], "icon": "🏛️", "description": "Corazón histórico y Patrimonio UNESCO" },
      { "name": "Kumari Chowk", "coords": [27.7045, 85.3065], "icon": "🙏", "description": "Residencia de la diosa viviente" },
      { "name": "Asan Tole", "coords": [27.708, 85.311], "icon": "🌶️", "description": "Mercado local auténtico y bullicioso" }
    ],
    "icon": "🏛️",
    "planA": "Vuelo de Paro a Katmandú (ventanilla derecha para ver el Himalaya de nuevo). Check-in y por la tarde visita la Plaza Durbar de Katmandú, Patrimonio de la Humanidad. Explora el Palacio Real de Hanuman Dhoka y busca a la diosa viviente en el Kumari Chowk.",
    "planB": "Piérdete por los mercados de Asan Tole e Indra Chowk, cerca de la Plaza Durbar, para una inmersión total en la vida local.",
    "consejo": "La entrada a la Plaza Durbar cuesta 1000 NPR y te permite acceder a varios templos y al museo del palacio. Guarda la entrada, te la pueden pedir.",
    "bocado": "Prueba un 'Lassi' en las tiendas especializadas cerca de Indra Chowk. Es una bebida de yogur refrescante, perfecta para una pausa.",
    "accommodation": "Hotel en Thamel"
  },
  {
    "id": "day-9",
    "day": 9,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Patan y Ciudades Sagradas",
    "title": "Patan y Bhaktapur",
    "description": "Día para explorar las ciudades de Patan y Bhaktapur, con sus exquisitas plazas y templos.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/48/Patan-Palastplatz-14-Tauben-2013-gje.jpg",
    "coords": [27.6736, 85.325],
    "places": [
      { "name": "Plaza Durbar de Patan", "coords": [27.6736, 85.3250], "icon": "🏛️", "description": "Patrimonio UNESCO, la 'Ciudad de la Belleza'" },
      { "name": "Templo Dorado (Hiranya Varna Mahavihar)", "coords": [27.675, 85.323], "icon": "✨", "description": "Monasterio budista del siglo XII" },
      { "name": "Swayambhunath Stupa (Templo de los Monos)", "coords": [27.7147, 85.2903], "icon": "🐒", "description": "Estupa sagrada con vistas panorámicas" },
      { "name": "Boudhanath Stupa", "coords": [27.7215, 85.3615], "icon": "☸️", "description": "La estupa más grande de Nepal" }
    ],
    "icon": "🏛️",
    "planA": "Día completo para explorar las ciudades históricas de Patan y Bhaktapur. Visita la Plaza Durbar de Patan, el Museo de Patan y el Templo Dorado. Por la tarde, visita las estupas de Swayambhunath y Boudhanath.",
    "planB": "Ve a la estupa de Boudhanath al atardecer. La atmósfera con los monjes y peregrinos dando vueltas (kora) mientras encienden lámparas de mantequilla es mágica.",
    "consejo": "Para visitar estos lugares, negocia un precio con un taxista para que te lleve y te espere. Ahorrarás tiempo y dinero.",
    "bocado": "Cena en una de las terrazas de los restaurantes que rodean la estupa de Boudhanath, con vistas a la cúpula iluminada.",
    "accommodation": "Hotel en Katmandú"
  },
  {
    "id": "day-10",
    "day": 10,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Pokhara",
    "title": "Rafting en el Trisuli y Llegada a Pokhara",
    "description": "Viaje por carretera hacia Pokhara con una parada para una emocionante sesión de rafting en el río Trisuli. Tarde en el tranquilo barrio tibetano.",
    "image": "https://cdn.getyourguide.com/image/format=auto,fit=contain,gravity=auto,quality=60,width=1440,height=650,dpr=1/tour_img/e4dc6366c7816be975f4947353bf8202ae7451d1c058c6ed928c49f9e870f54b.jpeg",
    "coords": [28.2096, 83.9856],
    "places": [
      { "name": "Río Trisuli", "coords": [27.87, 84.76], "icon": "🚣", "description": "Rafting de aguas bravas" },
      { "name": "Pokhara", "coords": [28.2096, 83.9856], "icon": "🏞️", "description": "Ciudad a orillas del lago Phewa" },
      { "name": "Barrio Tibetano (Pokhara)", "coords": [28.216, 83.96], "icon": "🏘️", "description": "Asentamiento con templo y artesanía" },
      { "name": "Lago Phewa", "coords": [28.2096, 83.9856], "icon": "⛵", "description": "Vistas al Annapurna y Templo Tal Barahi" }
    ],
    "icon": "🚣",
    "planA": "Salida temprano por carretera hacia Pokhara (aprox. 6 horas). Parada para una sesión de rafting en el río Trisuli. Llegada a Pokhara y check-in en el Hotel White Pearl o similar. Por la tarde, visita al barrio tibetano, con sus casas de colores, su templo y tiendas de artesanía. Atardecer paseando por Lakeside.",
    "planB": "Al llegar a Pokhara, alquila una barca en el lago Phewa y rema hasta el templo Tal Barahi, situado en una isla en medio del lago. Es una experiencia muy serena.",
    "consejo": "Para el rafting, no lleves nada de valor que no se pueda mojar. Te darán bolsas estancas para lo imprescindible. Lleva un cambio de ropa.",
    "bocado": "Cena en un restaurante en la orilla del lago (Lakeside) en Pokhara. Prueba un Thukpa, una sopa de fideos de origen tibetano, muy reconfortante.",
    "accommodation": "Hotel en Pokhara"
  },
  {
    "id": "day-11",
    "day": 11,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Ghandruk",
    "title": "Día 1 de Trekking",
    "description": "Comienzo del trekking de 5 días. Viaje en jeep y caminata a través de selva y pueblos hasta el asentamiento Gurung de Ghandruk.",
    "image": "https://himalayan-masters.com/wp-content/uploads/2024/08/Gurung-Cottage-Ghandruk.webp",
    "coords": [28.375, 83.81],
    "places": [
      { "name": "Ghandruk", "coords": [28.375, 83.81], "icon": "🏔️", "description": "Pueblo Gurung a 1.940m" }
    ],
    "icon": "🏔️",
    "planA": "Traslado en jeep hasta Landruk (aprox. 4h). Inicio de la caminata desde Jhinu Danda. La ruta pasa por Saulibazaar (parada para almorzar) y atraviesa senderos selváticos y pequeños pueblos. Llegada a Ghandruk por la tarde. Visita al museo local para entender la cultura Gurung. Noche en una pensión local.",
    "planB": "Charla con los locales en los pueblos que atravieses. Su hospitalidad es legendaria y te permitirá conocer de cerca su modo de vida.",
    "consejo": "La segunda parte de la ruta tiene muchas escaleras. Camina a tu propio ritmo ('bistari, bistari'). No es una carrera. Disfruta del paisaje.",
    "bocado": "Prueba el té de jengibre, limón y miel en uno de los lodges. Es reconfortante y se dice que ayuda con la altitud.",
    "accommodation": "Teahouse en Ghandruk"
  },
  {
    "id": "day-12",
    "day": 12,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Trekking (Placeholder)",
    "title": "Día 2 de Trekking",
    "description": "Día de trekking. La ruta ofrece vistas increíbles del Himalaya y te acerca a la cultura local de los pueblos de montaña.",
    "image": "https://media.istockphoto.com/id/1493335414/es/foto/hermosa-estupa-de-budismo-tibetano-en-el-pueblo-de-chhomrong-con-el-monte-annapurna-al-sur-en.jpg?s=612x612&w=0&k=20&c=A5-ydGKKdxpFmvEYeaNQeZvYtMIX59ue3a3yl_oE3H8=",
    "coords": [28.415, 83.82],
    "places": [
      { "name": "Annapurna Sur (vista)", "coords": [28.52, 83.81], "icon": "⛰️", "description": "Pico de 7.219m" },
      { "name": "Machhapuchhre (vista)", "coords": [28.49, 83.94], "icon": "⛰️", "description": "Montaña sagrada 'Cola de Pez' (6.993m)" }
    ],
    "icon": "🏔️",
    "planA": "Continúa el ascenso hacia Chhomrong. Este pueblo es la puerta de entrada al Santuario del Annapurna. Disfruta del atardecer sobre el Annapurna Sur y el Machhapuchhre. Noche en pensión local.",
    "planB": "Busca la 'German Bakery' de Chhomrong. Encontrar un pastel de chocolate o un apple crumble en medio de la montaña no tiene precio.",
    "consejo": "Las vistas del Annapurna Sur y Machhapuchhre desde Chhomrong al atardecer son espectaculares. Ten la cámara preparada.",
    "bocado": "Recarga energías con un plato de 'garlic soup' (sopa de ajo). Es un clásico del trekking para combatir el mal de altura y entrar en calor.",
    "accommodation": "Teahouse en Chhomrong"
  },
  {
    "id": "day-13",
    "day": 13,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Trekking (Placeholder)",
    "title": "Día 3 de Trekking",
    "description": "Jornada de caminata. Sigue el sendero, atravesando puentes y bosques. El paisaje cambia a medida que te acercas a las grandes montañas.",
    "image": "https://images.unsplash.com/photo-1620025754593-9c8e19e075d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "coords": [28.45, 83.85],
    "places": [
      { "name": "Dovan", "coords": [28.45, 83.85], "icon": "🏞️", "description": "Punto de paso clave en el trekking" }
    ],
    "icon": "🚶‍♂️",
    "planA": "Continúa tu aventura de trekking. El camino te lleva por pequeños asentamientos y puentes colgantes, con el sonido de los ríos y las vistas de los picos. Almuerzo en ruta y llegada al destino para descansar y cenar.",
    "planB": "Aprende a decir 'Namaste' y 'Dhanyabad' (gracias) en nepalí. Los locales aprecian mucho el gesto y te hará sentir más conectado con la experiencia.",
    "consejo": "Mantente hidratado y camina a un ritmo constante. Beber agua con sales de rehidratación es una buena idea para los días largos de caminata.",
    "bocado": "Prueba un 'Apple Pie'. Muchos de los lodges en el sendero ofrecen este delicioso postre, hecho con manzanas locales.",
    "accommodation": "Teahouse"
  },
  {
    "id": "day-14",
    "day": 14,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Trekking (Placeholder)",
    "title": "Día 4 de Trekking",
    "description": "Jornada de descenso o tramo final del ascenso, con paisajes espectaculares y la sensación de logro por la caminata.",
    "image": "https://images.unsplash.com/photo-1621535732159-86c8d76b1f28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "coords": [28.39, 83.82],
    "places": [
      { "name": "Bambú", "coords": [28.39, 83.82], "icon": "🎋", "description": "Un lugar para descansar en el camino de vuelta" }
    ],
    "icon": "🏞️",
    "planA": "Hoy es la jornada final de trekking. Descenso hasta el punto de encuentro con el transporte. Disfruta de las últimas vistas y del ambiente del camino. Almuerzo en ruta.",
    "planB": "Tómate tu tiempo para una caminata consciente. El paisaje del Himalaya es una oportunidad para la meditación y la reflexión personal.",
    "consejo": "Lleva capas de ropa. La temperatura puede cambiar drásticamente entre el día y la noche, y entre zonas de sombra y sol.",
    "bocado": "Cena para celebrar la finalización del trekking con el grupo. Comparte historias y anécdotas de los días de caminata.",
    "accommodation": "Teahouse"
  },
  {
    "id": "day-15",
    "day": 15,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Pokhara",
    "title": "Regreso a Pokhara y Relajación",
    "description": "Descenso final para un baño en aguas termales en Jhimodanda y regreso en jeep a Pokhara.",
    "image": "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/73/e2/fd.jpg",
    "coords": [28.2096, 83.9856],
    "places": [
      { "name": "Aguas Termales de Jhimodanda", "coords": [28.33, 83.80], "icon": "♨️", "description": "Piscinas naturales para relajación muscular" },
      { "name": "Pokhara", "coords": [28.2096, 83.9856], "icon": "🏞️", "description": "Regreso a la ciudad base del trekking" }
    ],
    "icon": "♨️",
    "planA": "Última etapa del trekking. Descenso hasta Jhimodanda. Tiempo para relajarse en las piscinas de aguas termales. Almuerzo y traslado en jeep de vuelta a Pokhara (pasando por Nayapul). Tarde libre para descansar o actividades opcionales.",
    "planB": "Si te sientes con adrenalina, la tarde en Pokhara es ideal para hacer parapente, una de las actividades estrella de la ciudad, con vistas increíbles del lago y las montañas.",
    "consejo": "Lleva bañador para las aguas termales. Es la mejor recompensa para los músculos después del trekking.",
    "bocado": "Celebra el fin del trekking con una pizza en Pokhara. Hay pizzerías sorprendentemente buenas como la de Roadhouse Cafe.",
    "accommodation": "Hotel en Pokhara"
  },
  {
    "id": "day-16",
    "day": 16,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Chitwan",
    "title": "Viaje a Chitwan y Primer Safari",
    "description": "Viaje a la selva de Chitwan. Por la tarde, safari en jeep en busca de rinocerontes y otra fauna salvaje.",
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/ee/68/e7/chitwan-jungle-safari.jpg?w=1200&h=900&s=1",
    "coords": [27.5291, 84.422],
    "places": [
      { "name": "Parque Nacional de Chitwan", "coords": [27.5291, 84.4220], "icon": "🐘", "description": "Safari en busca de rinocerontes" },
      { "name": "Río Rapti", "coords": [27.57, 84.49], "icon": "🌊", "description": "Paseos al atardecer y canoas" }
    ],
    "icon": "🐘",
    "planA": "Salida por carretera hacia el sur, a la región de Terai (aprox. 5-6 horas). Llegada al Parque Nacional de Chitwan. Por la tarde, primer safari en jeep por la jungla para avistar fauna, especialmente rinocerontes de un cuerno. Cena en el lodge junto al río Rapti.",
    "planB": "Paseo al atardecer por la orilla del río Rapti. Es muy relajante y se ven muchos pájaros y locales bañando a sus elefantes.",
    "consejo": "Usa ropa de colores neutros (verde, beige) para el safari y no te olvides del repelente de mosquitos. Mantén silencio para no asustar a los animales.",
    "bocado": "Prueba un curry de pescado fresco en algún restaurante cerca del río, es una especialidad de la zona.",
    "accommodation": "Lodge en Chitwan"
  },
  {
    "id": "day-17",
    "day": 17,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Chitwan",
    "title": "Explorando Chitwan",
    "description": "Día completo de actividades en el Parque Nacional de Chitwan, incluyendo paseo en canoa al amanecer y visita a un pueblo Tharu.",
    "image": "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/9a/f2/ec.jpg",
    "coords": [27.5291, 84.422],
    "places": [
      { "name": "Pueblo Tharu (Chitwan)", "coords": [27.57, 84.49], "icon": "🏘️", "description": "Cultura indígena de la región de Terai" },
      { "name": "Río Rapti", "coords": [27.57, 84.49], "icon": "🌊", "description": "Paseo en canoa y observación de cocodrilos" }
    ],
    "icon": "🛶",
    "planA": "Actividad matutina: paseo en canoa por el río Rapti para observar aves y cocodrilos gaviales. Desayuno y visita a un pueblo de la etnia Tharu para conocer su cultura única. Posibilidad de otro safari por la tarde o tiempo libre para relajarse.",
    "planB": "El paseo en canoa por el río Rapti es muy recomendable al amanecer. La niebla matutina sobre el río crea una atmósfera mágica.",
    "consejo": "Lleva binoculares para una mejor observación de aves y fauna desde la canoa.",
    "bocado": "Cena en el lodge, disfrutando de la tranquilidad de la selva. La cocina local es deliciosa.",
    "accommodation": "Lodge en Chitwan"
  },
  {
    "id": "day-18",
    "day": 18,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Katmandú",
    "title": "Regreso a Katmandú y Despedida",
    "description": "Actividad matutina en Chitwan y largo viaje de vuelta a Katmandú, seguido de la cena de despedida del grupo.",
    "image": "https://almamochilera.com/images/blog/abhishek-sanwa-limbu-lr559dcst70-unsplash-compressor.jpg",
    "coords": [27.7172, 85.324],
    "places": [
      { "name": "Pueblo Tharu (Chitwan)", "coords": [27.57, 84.49], "icon": "🏘️", "description": "Cultura indígena de la región de Terai" },
      { "name": "Katmandú", "coords": [27.7172, 85.3240], "icon": "🏙️", "description": "Regreso a la capital" }
    ],
    "icon": "🚙",
    "planA": "Actividad matutina en Chitwan: paseo en canoa o visita a la aldea Tharu. Comienzo del viaje de regreso por carretera a Katmandú (aprox. 6 horas). Llegada por la tarde. Cena de despedida del grupo para compartir las experiencias del viaje.",
    "planB": "El viaje de vuelta puede ser largo y pesado. Ten a mano un libro o música para el trayecto. Compra algunos snacks locales para el camino.",
    "consejo": "Aprovecha la tarde para comprar los últimos souvenirs en Thamel, ya que tendrás más tiempo que el día 19.",
    "bocado": "Para cenar en Katmandú, busca un restaurante que sirva 'Chatamari', a menudo llamada la 'pizza nepalí', una fina crepe de arroz con toppings.",
    "accommodation": "Hotel en Katmandú"
  },
  {
    "id": "day-19",
    "day": 19,
    "phase": "nepal",
    "country": "Nepal",
    "location": "Katmandú",
    "title": "Vuelo de Vuelta a Casa",
    "description": "Desayuno y traslado al aeropuerto para el vuelo de regreso, lleno de recuerdos del Himalaya.",
    "image": "https://media.istockphoto.com/id/1465916031/es/foto/el-camino-al-avi%C3%B3n.jpg?s=612x612&w=0&k=20&c=h7qjRLIKPBelNG5e3PP6fje3D9pOxvYDHN1hoQLZHms=",
    "coords": [27.6966, 85.3533],
    "places": [
      { "name": "Aeropuerto Internacional Tribhuvan (KTM)", "coords": [27.6966, 85.3533], "icon": "✈️", "description": "Punto de partida final" }
    ],
    "icon": "🏠",
    "planA": "Desayuno en el hotel. Dependiendo de la hora del vuelo, tiempo para un último paseo por Thamel. Traslado al Aeropuerto Internacional Tribhuvan para el vuelo de regreso a casa.",
    "planB": "Si tienes tiempo, compra té nepalí de buena calidad en alguna tienda especializada. Es un gran recuerdo y regalo.",
    "consejo": "Llega al aeropuerto con bastante antelación. El proceso de facturación y seguridad en Katmandú puede ser lento.",
    "bocado": "Un último café nepalí en el aeropuerto mientras esperas el embarque.",
    "accommodation": "Vuelo de regreso"
  }
],
  // ----------------------------------------------------------------------------------
  // Budget
  // ----------------------------------------------------------------------------------
  budget: {
    currency_symbol: "€",
    categories: [
      {
        id: "transporte",
        name: "Transporte",
        budget: 714.97,
        spent: 0,
        expenses: [
          { id: "exp-001", concept: "Vuelo Madrid ↔ Katmandú (Qatar)", amount: 270.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-002", concept: "Vuelo Katmandú → Paro (Drukair)", amount: 227.76, isEstimate: true, date: '2025-10-17' },
          { id: "exp-003", concept: "Vuelo Paro → Katmandú (Bhutan Airlines)", amount: 196.21, isEstimate: true, date: '2025-10-17' },
          { id: "exp-004", concept: "Taxis Aeropuerto (4 viajes)", amount: 28.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-005", concept: "Taxis Ciudad (4 viajes)", amount: 12.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-006", concept: "Autobuses (2 viajes)", amount: 1.0, isEstimate: true, date: '2025-10-17' }
        ]
      },
      {
        id: "tour",
        name: "Tour",
        budget: 1602.0,
        spent: 0,
        expenses: [
          { id: "exp-007", concept: "Itinerario \"Best of Bhutan\"", amount: 1602.0, isEstimate: true, date: '2025-10-17' },
        ]
      },
      {
        id: "comida",
        name: "Comida y Bebida",
        budget: 232.0,
        spent: 0,
        expenses: [
          { id: "exp-008", concept: "Comidas en Nepal", amount: 187.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-009", concept: "Bebidas", amount: 45.0, isEstimate: true, date: '2025-10-17' }
        ]
      },
      {
        id: "entradas-visados",
        name: "Entradas y Visados",
        budget: 127.5,
        spent: 0,
        expenses: [
          { id: "exp-010", concept: "Visado de Nepal (30 días)", amount: 50.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-011", concept: "Plaza Durbar, Katmandú", amount: 7.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-012", concept: "Swayambhunath (Templo de los Monos)", amount: 1.5, isEstimate: true, date: '2025-10-17' },
          { id: "exp-013", concept: "Pashupatinath", amount: 7.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-014", concept: "Estupa de Boudhanath", amount: 3.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-015", concept: "Monasterio Taktsang (Nido del Tigre)", amount: 22.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-016", concept: "Tashichho Dzong", amount: 11.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-017", concept: "Punakha Dzong", amount: 11.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-018", concept: "Memorial Chorten", amount: 11.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-019", concept: "Buddha Dordenma", amount: 11.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-020", concept: "Rinpung Dzong", amount: 11.0, isEstimate: true, date: '2025-10-17' }
        ]
      },
      {
        id: "alojamiento",
        name: "Alojamiento",
        budget: 66.0,
        spent: 0,
        expenses: [
          { id: "exp-021", concept: "Hotel New Era (10-12 Oct)", amount: 33.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-022", concept: "Hotel New Era (19-20 Oct)", amount: 16.5, isEstimate: true, date: '2025-10-17' },
          { id: "exp-023", concept: "Hotel New Era (25-26 Oct)", amount: 16.5, isEstimate: true, date: '2025-10-17' }
        ]
      },
      {
        id: "actividades-ocio",
        name: "Actividades y Ocio",
        budget: 80.0,
        spent: 0,
        expenses: [
          { id: "exp-024", concept: "Parapente en Pokhara (Opcional)", amount: 80.0, isEstimate: true, date: '2025-10-17' },
        ]
      },
      {
        id: "gastos-personales",
        name: "Gastos Personales",
        budget: 50.0,
        spent: 0,
        expenses: [
          { id: "exp-025", concept: "Souvenirs", amount: 45.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-026", concept: "Lavandería", amount: 5.0, isEstimate: true, date: '2025-10-17' },
        ]
      },
      {
        id: "propinas-servicios",
        name: "Propinas y Servicios",
        budget: 203.0,
        spent: 0,
        expenses: [
          { id: "exp-027", concept: "Propinas", amount: 55.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-028", concept: "Fondo Común Estimado", amount: 50.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-029", concept: "Comunicaciones (SIM)", amount: 8.0, isEstimate: true, date: '2025-10-17' },
          { id: "exp-030", concept: "Propinas Guía y Conductor", amount: 90.0, isEstimate: true, date: '2025-10-17' }
        ]
      },
      {
        id: "contingencia",
        name: "Contingencia",
        budget: 325.55,
        spent: 0,
        expenses: [
          { id: "exp-031", concept: "Fondo para Imprevistos (Nepal)", amount: 149.2, isEstimate: true, date: '2025-10-17' },
          { id: "exp-032", concept: "Fondo para Imprevistos (Bután)", amount: 176.35, isEstimate: true, date: '2025-10-17' }
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------------
  // Packing List
  // ----------------------------------------------------------------------------------
  packing: {
    categories: [
      {
        id: 'equipaje_ropa',
        name: 'Ropa',
        items: [
          { id: 'ropa_camisetas_manga_larga', name: 'Camisetas de manga larga (5-7)', packed: false },
          { id: 'ropa_pantalones_trekking', name: 'Pantalones de trekking (3-4)', packed: false },
          { id: 'ropa_chaqueta_ligera', name: 'Chaleco o chaqueta ligera', packed: false },
          { id: 'ropa_interior_termica', name: 'Ropa interior térmica', packed: false },
          { id: 'ropa_calcetines_trekking', name: 'Calcetines de trekking (5-7 pares)', packed: false },
          { id: 'ropa_gorros_lana', name: 'Gorros de lana (2)', packed: false },
          { id: 'ropa_guantes_trekking', name: 'Guantes de trekking', packed: false },
          { id: 'ropa_bufanda', name: 'Bufanda o pañuelo', packed: false }
        ]
      },
      {
        id: 'equipaje_calzado',
        name: 'Calzado',
        items: [
          { id: 'calzado_botas_de_trekking', name: 'Botas de trekking', packed: false },
          { id: 'calzado_zapatillas_deportivas', name: 'Zapatillas deportivas', packed: false },
          { id: 'calzado_sandalias_para_el_hotel', name: 'Sandalias para el hotel', packed: false },
          { id: 'calzado_calcetines_de_repuesto', name: 'Calcetines de repuesto', packed: false }
        ]
      },
      {
        id: 'equipaje_equipamiento',
        name: 'Equipamiento',
        items: [
          { id: 'equipo_mochila_principal', name: 'Mochila de 30-40L', packed: false },
          { id: 'equipo_mochila_pequena', name: 'Mochila pequeña para excursiones', packed: false },
          { id: 'equipo_botella_agua', name: 'Botella de agua 1L', packed: false },
          { id: 'equipo_linterna_frontal', name: 'Linterna frontal', packed: false },
          { id: 'equipo_bastones_trekking', name: 'Bastones de trekking', packed: false },
          { id: 'equipo_gafas_sol', name: 'Gafas de sol', packed: false },
          { id: 'equipo_protector_solar', name: 'Protector solar SPF 50+', packed: false },
          { id: 'equipo_crema_hidratante', name: 'Crema hidratante', packed: false },
          { id: 'equipo_kit_primeros_auxilios', name: 'Kit de primeros auxilios', packed: false },
          { id: 'equipo_camara_fotografica', name: 'Cámara fotográfica', packed: false },
          { id: 'equipo_power_bank', name: 'Power bank', packed: false },
          { id: 'equipo_adaptadores_corriente', name: 'Adaptadores de corriente', packed: false }
        ]
      },
      {
        id: 'equipaje_higiene',
        name: 'Higiene',
        items: [
          { id: 'higiene_cepillo_dientes', name: 'Cepillo de dientes', packed: false },
          { id: 'higiene_pasta_dientes', name: 'Pasta de dientes', packed: false },
          { id: 'higiene_jabon_champú', name: 'Jabón y champú', packed: false },
          { id: 'higiene_toalla_microfibra', name: 'Toalla de microfibra', packed: false }
        ]
      },
      {
        id: 'equipaje_documentos',
        name: 'Documentos',
        items: [
          { id: 'documentos_pasaporte', name: 'Pasaporte válido', packed: false },
          { id: 'documentos_visas', name: 'Visas (Nepal y Bután)', packed: false },
          { id: 'documentos_seguro_viaje', name: 'Seguro de viaje', packed: false },
          { id: 'documentos_tarjetas_credito', name: 'Tarjetas de crédito/débito', packed: false },
          { id: 'documentos_efectivo', name: 'Efectivo en dólares/euros', packed: false },
          { id: 'documentos_reservas', name: 'Copias de reservas', packed: false }
        ]
      },
      {
        id: 'equipaje_electronica',
        name: 'Electrónica',
        items: [
          { id: 'electronica_telefono', name: 'Teléfono y cargador', packed: false },
          { id: 'electronica_auriculares', name: 'Auriculares', packed: false }
        ]
      },
      {
        id: 'equipaje_medicinas',
        name: 'Medicinas',
        items: [
          { id: 'medicinas_personales', name: 'Medicamentos personales', packed: false },
          { id: 'medicinas_analgesicos', name: 'Analgésicos (Ibuprofeno, etc.)', packed: false },
          { id: 'medicinas_mal_altura', name: 'Pastillas para el mal de altura', packed: false },
          { id: 'medicinas_repelente', name: 'Repelente de mosquitos', packed: false },
          { id: 'medicinas_tiritas', name: 'Tiritas y antiséptico', packed: false }
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------------
  // Accommodations
  // ----------------------------------------------------------------------------------
  accommodations: [
    {
      id: "hotel-new-era",
      name: "Hotel New Era",
      location: "Thamel, Katmandú",
      description: "Hotel cómodo en Kathmandu con habitaciones twin, cerca de la zona turística de Thamel.",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/531252739.jpg?k=1b2a4753e147325065588383a8b2572f65a12d1b74d471a4f8a075587f7036a7&o=&hp=1",
      reservations: [
        {
          id: "res-001",
          checkIn: "2025-10-10",
          checkOut: "2025-10-12",
          confirmationCode: "5740622864"
        },
        {
          id: "res-002",
          checkIn: "2025-10-19",
          checkOut: "2025-10-20",
          confirmationCode: "5740698796"
        },
        {
          id: "res-003",
          checkIn: "2025-10-25",
          checkOut: "2025-10-26",
          confirmationCode: "5379085400"
        }
      ]
    },
    {
      id: "hotel-white-pearl",
      name: "Hotel White Pearl",
      location: "Lakeside, Pokhara",
      description: "Hotel con vistas al lago Phewa, base para el trekking del Annapurna.",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/204917421.jpg?k=23e6f54363294a5e9a38f3622e0380a1c726d577881e19d9b4b0e9a4e0c45152&o=&hp=1",
      reservations: [
        {
          id: "res-004",
          checkIn: "2025-10-12",
          checkOut: "2025-10-13",
          confirmationCode: "WERD456"
        },
        {
          id: "res-005",
          checkIn: "2025-10-15",
          checkOut: "2025-10-16",
          confirmationCode: "WERD789"
        }
      ]
    }
  ],

  // ----------------------------------------------------------------------------------
  // Flights
  // ----------------------------------------------------------------------------------
  flights: [
    {
      type: 'Internacional',
      title: 'Vuelo de Ida',
      airline: 'Qatar Airways',
      segments: [
        {
          from: 'MAD',
          fromDateTime: '9 de Octubre 22:45',
          to: 'DOH',
          toDateTime: '10 de Octubre 06:30',
          layover: 'Tránsito de 2h 55m en Doha (DOH)'
        },
        {
          from: 'DOH',
          fromDateTime: '10 de Octubre 09:25',
          to: 'KTM',
          toDateTime: '10 de Octubre 16:45'
        }
      ]
    },
    {
      type: 'Internacional',
      title: 'Vuelo de Vuelta',
      airline: 'Qatar Airways',
      segments: [
        {
          from: 'KTM',
          fromDateTime: '26 de Octubre 18:00',
          to: 'DOH',
          toDateTime: '26 de Octubre 20:15',
          layover: 'Tránsito de 2h 30m en Doha (DOH)'
        },
        {
          from: 'DOH',
          fromDateTime: '26 de Octubre 22:45',
          to: 'MAD',
          toDateTime: '27 de Octubre 04:30'
        }
      ]
    },
    {
      type: 'Regional',
      title: 'Kathmandu - Paro',
      airline: 'Buthan Airlines',
      segments: [
        {
          from: 'KTM',
          fromDateTime: '20 de Octubre 07:15',
          to: 'PBH',
          toDateTime: '20 de Octubre 08:15'
        }
      ]
    },
    {
      type: 'Regional',
      title: 'Paro - Kathmandu',
      airline: 'Buthan Airlines',
      segments: [
        {
          from: 'PBH',
          fromDateTime: '25 de Octubre 09:00',
          to: 'KTM',
          toDateTime: '25 de Octubre 10:00'
        }
      ]
    }
  ],

  // ----------------------------------------------------------------------------------
  // Services & Emergency
  // ----------------------------------------------------------------------------------
  services: {
    agencies: [
      {
        id: "bhutan-acorn",
        name: "Best of Bhutan",
        type: "tour_operator",
        icon: "temple_buddhist",
        color: "text-orange-600 dark:text-orange-400",
        tour: "Best of Bhutan Tour (6 días)",
        price: "1,602€",
        url: "https://www.bhutan-acorn.com/tour/6-days-best-of-bhutan-tour",
        description: "Agencia local especializada en turismo sostenible",
        contact: "Bhutan Acorn Tours & Treks"
      }
    ],
    insurance: {
      name: "Seguro de Viaje",
      icon: "security",
      color: "text-purple-600 dark:text-purple-400",
      status: "pending",
      description: "Información del seguro pendiente de añadir"
    },
    emergency: {
      name: "Información Importante",
      icon: "info",
      color: "text-red-600 dark:text-red-400",
      embassy: "Embajada España Nepal: +977 1 4123789",
      hospital: "CIWEC Clinic, Katmandú",
      timezone: "Nepal: UTC+5:45 | Bután: UTC+6:00"
    }
  }
];