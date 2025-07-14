var mapData = {
  map : [
      [1, 3, 2, 1, 1, 1, 1, 1, 9, 10, 11, 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 12],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
      [4, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [1, 5, 2, 0, 0, 3, 0, 0, 0, 3, 7, 1],  
      [3, 1, 4, 0, 0, 0, 0, 0, 0, 2, 1, 2],
      [1, 6, 4, 0, 0, 0, 2, 0, 0, 7, 8, 1],
      [1, 1, 4, 0, 0, 0, 0, 0, 0, 3, 1, 1],
      [1, 2, 4, 0, 0, 0, 0, 0, 0, 5, 6, 1],  
      [4, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 5],
      [1, 0, 0, 0, 0, 5, 4, 0, 0, 0, 0, 1],
      [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
      [1, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 1],
      [1, 1, 4, 1, 0, 0, 0, 0, 1, 5, 1, 1],
      [1, 2, 2, 3, 0, 0, 0, 0, 3, 4, 5, 1],  
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],  
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],  
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],  
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 3, 4, 5, 4, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]         
  ],

  sprites: [
    {type: "hubble",x: 6.5, y: 17.5, img: null,
      imageUrl: "https://icon-library.com/images/information-icon-white/information-icon-white-23.jpg"}
  ],

  "roomTextures": {
    "2": {
      "title": "Galaxia de las antenas",
      "description": "Galaxia en interacción",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/AntennaeGalaxies/012.jpg"
    },
    "3": {
      "title": "ARP 142",
      "description": "Galaxia en interacción",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/ARP142/012.jpg"
    },
    "4": {
      "title": "ARP 273",
      "description": "Galaxia en interacción",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/ARP142/012.jpg"
    },
    "5": {
      "title": "Objetos Herbi Haro",
      "description": "Región de formacion estelar",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/HH901/012.jpg",
      "actions": {
        "appUrl": "https://nicomedinap.github.io/decosmos/HH901/HST/19Diciembre2024/HH901.html",
        "infoUrl": "https://es.wikipedia.org/wiki/Galaxias_Antennae"
      }
    },
    "6": {
      "title": "Nebulosa del Aguila",
      "description": "Región de formacion estelar",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/012.jpg"
    },
    "7": {
      "title": "M17",
      "description": "Región de formacion estelar",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M17_SFR/012.jpg"
    },
    "8": {
      "title": "NGC 5189",
      "description": "Nebulosa planetaria",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/NGC5189/012.jpg"
    },
    "9": {
      "title": "NGC 6357",
      "description": "Región de formacion estelar",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/NGC6357/012.jpg"
    },
    "10": {
      "title": "ARP 273",
      "description": "Nebulosa planetaria",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/ARP142/012.jpg"
    },
    "11": {
      "title": "Objetos Herbi Haro",
      "description": "Nebulosa planetaria",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/HH901/012.jpg"
    },
    "12": {
      "title": "Nebulosa del Aguila",
      "description": "Nebulosa planetaria",
      "url": "https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/012.jpg"
    },
  }
};