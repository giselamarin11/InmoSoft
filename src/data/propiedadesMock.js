// src/..data/propiedadesMock.js

const propiedadesMock = [
  {
    id: 1,
    codigo: "APT-001",
    tipo: "arriendo",
    ciudad: "medellin",
    precio: 2500000,
    tipoInmueble: "apartamento",
    descripcion: "Hermoso apartamento en El Poblado con vista panorámica",
    habitaciones: 3,
    banos: 2,
    areaMetros: 85,
    estrato: 5,
    parqueadero: true,
    piscina: true,
    seguridad: true,
    amoblado: false,
    mascotas: true,
    imagenes: [
      "https://i.pinimg.com/1200x/00/ec/eb/00ecebbd277a6141ee7921270491862b.jpg",
      "https://i.pinimg.com/736x/24/b4/18/24b41819cf8490bb48a0e9a44d8502aa.jpg",
      "https://i.pinimg.com/736x/be/f8/22/bef8229ae3c82055b1363c878ddfb5e2.jpg",
      "https://i.pinimg.com/736x/69/99/b6/6999b6d9f88d15a0491c372fa1cd3f8a.jpg"
    ],
    ubicacion: {
      lat: 6.2088,  // Medellín El Poblado
      lng: -75.5676
    },
    estado: "Disponible"
  },
  {
    id: 2,
    codigo: "CASA-002",
    tipo: "compra",
    ciudad: "bogota",
    precio: 650000000,
    tipoInmueble: "casa",
    descripcion: "Casa campestre en Usaquén, amplia y moderna",
    habitaciones: 4,
    banos: 3,
    areaMetros: 180,
    estrato: 6,
    parqueadero: true,
    piscina: false,
    seguridad: true,
    amoblado: true,
    mascotas: false,
    imagenes: [
      "https://i.pinimg.com/736x/c0/03/7f/c0037f8468e69883bfd2e5ce6907a863.jpg",
      "https://i.pinimg.com/736x/b8/53/99/b85399c596987dc65ab40ad9ea0b1c91.jpg",
      "https://i.pinimg.com/736x/b1/2e/1b/b12e1baa7fd443f14a0d2ffc7a473373.jpg",
      "https://i.pinimg.com/736x/e6/1e/29/e61e29c5e5ca8efa0f644f87a3805f35.jpg",
      "https://i.pinimg.com/1200x/b2/b5/7d/b2b57d1dd64928f65250ad766d985981.jpg"
    ],
    ubicacion: {
      lat: 4.71099, // Bogotá Usaquén
      lng: -74.07209
    },
    estado: "Disponible"
  },
  {
    id: 3,
    codigo: "APT-003",
    tipo: "arriendo",
    ciudad: "cali",
    precio: 1800000,
    tipoInmueble: "apartamento",
    descripcion: "Apartamento moderno en Granada, Cali",
    habitaciones: 2,
    banos: 2,
    areaMetros: 65,
    estrato: 4,
    parqueadero: true,
    piscina: true,
    seguridad: false,
    amoblado: true,
    mascotas: true,
    imagenes: [
      "https://i.pinimg.com/1200x/d7/cd/67/d7cd679755d52af25083a5ee7bb19d6d.jpg",
      "https://i.pinimg.com/736x/d3/c8/ab/d3c8ab546525313f6865dc712197bd2f.jpg",
      "https://i.pinimg.com/1200x/df/96/c8/df96c8084740d5f78ae2ac3c3f52474a.jpg",
      "https://i.pinimg.com/736x/07/b3/0d/07b30d5dbc54519bc07be12665412f23.jpg",
      "https://i.pinimg.com/736x/83/05/0e/83050ebde25f6e8e2777a9518258336e.jpg"
    ],
    ubicacion: {
      lat: 3.4516, // Cali Granada
      lng: -76.5320
    },
    estado: "Reservado"
  },

  {
    id: 4,
    codigo: "APT-004",
    tipo: "arriendo",
    ciudad: "medellin",
    precio: 3800000,
    tipoInmueble: "apartamento",
    descripcion: "Casa moderna en laureles, medellin",
    habitaciones: 3,
    banos: 2,
    areaMetros: 120,
    estrato: 4,
    parqueadero: true,
    piscina: true,
    seguridad: false,
    amoblado: true,
    mascotas: true,
    imagenes: [
      "https://i.pinimg.com/736x/16/6c/08/166c08fd70c0199e2ccde02da0cec6eb.jpg",
      "https://i.pinimg.com/736x/ec/eb/01/eceb014df0853f00d74e7ed80d2d84cf.jpg",
      "https://i.pinimg.com/736x/26/bb/f1/26bbf18efc7ea96d0731c15a44b976e2.jpg",
      "https://i.pinimg.com/736x/aa/41/8c/aa418c0edf2c022cf9e6bdd0de5f44a7.jpg"
    ],
    ubicacion: {
      lat: 6.2088,  
      lng: -75.5676
    },
    estado: "Reservado"
  }
];

export default propiedadesMock;
