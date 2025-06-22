// Mapa de museo virtual astronómico 12 x 21
// 0: espacio vacío, 1: pared/sala principal, 2-5: salas temáticas de arte
// L: zona de lente gravitatoria (efecto especial)
// El jugador comienza en (2.5, 2.5)
var mapData = {
  map: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,3,1,1,1,0,0,1,1,1,0,4,0,1,1,0,1],
    [1,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,1],
    [1,0,0,0,0,0,5,0,1,1,1,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,5,0,0,0,1,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,5,0,0,0,1,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,0,0,1,1,1,0,0,1,0,0,0,1,1,0,1],
    [1,0,1,1,0,3,1,1,1,0,0,1,1,1,0,4,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  // Lentes gravitatorias decorativas
  lenses: [
    { x: 9.5, y: 3.5, radius: 2, strength: 0.04, visible: true },
    { x: 15.5, y: 8.5, radius: 1.2, strength: 0.07, visible: true },
  ],
  // Salas temáticas con texturas y descripciones
  roomTextures: {
    1: {
      title: "Pasillo Principal",
      url: "https://upload.wikimedia.org/wikipedia/commons/6/60/ESO_-_Milky_Way.jpg",
      description: "Pasillo de ingreso, con vistas panorámicas de la Vía Láctea y paneles introductorios a la astronomía.",
    },
    2: {
      title: "Sala de Nebulosas",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/87/NGC_7293_%28The_Helix_Nebula%29.jpg",
      description: "Sala dedicada a obras inspiradas en nebulosas, como la <b>Nebulosa de la Hélice</b>. <br>Ejemplo de ecuación: $I=I_0 e^{-\\tau}$.",
    },
    3: {
      title: "Sala de Galaxias",
      url: "https://upload.wikimedia.org/wikipedia/commons/0/06/ESO_-_NGC_3981.jpg",
      description: "Obras de arte sobre galaxias espirales y el universo a gran escala.<br>$D_L=\\frac{cz}{H_0}$.",
    },
    4: {
      title: "Sala de Exoplanetas",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/84/Exoplanet_Comparison.png",
      description: "Obras y datos sobre exoplanetas y sistemas planetarios lejanos.<br>$M_p\\sin i$.",
    },
    5: {
      title: "Sala de Agujeros Negros",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Black_hole_-_Messier_87_crop_max_res.jpg",
      description: "Instalaciones visuales y simulaciones de lentes gravitacionales y horizontes de eventos.<br>$r_s=\\frac{2GM}{c^2}$.",
    },
  },
  skyTexture: "https://upload.wikimedia.org/wikipedia/commons/6/6e/ESO_-_Panoramic_View_of_the_Southern_Sky.jpg",
  floorTexture: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Star_field_ngc188.jpg",
  // Sprite: telescopio espacial en la sala de galaxias
  sprites: [
    {
      x: 5.5,
      y: 2.5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/HST-SM4.jpeg",
      description: "Telescopio Hubble: pionero de la observación astronómica orbital.",
    }
  ]
};