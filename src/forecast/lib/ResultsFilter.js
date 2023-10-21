import EorzeaWeather from 'eorzea-weather';
import FarmType from './FarmType';
import Weather from './Weather';

export default class ResultsFilter {
  // Eureka NMs
  static COPYCAT_CASSIE = new ResultsFilter({
    name: 'Copycat Cassie',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_PAGOS,
    requiredWeather: [Weather.BLIZZARDS],
    collection: false,
    image: 'cassie.png',
    uri: 'cassie',
    guide: {
      zone: 'Eureka Pagos',
      mobs: [
        {
          mob: 'Copycat Cassie',
          level: 35,
          element: 'ice',
        },
      ],
      method: 'The Cassie Earring is a rare drop from completing the Copycat Cassie NM.',
    },
    map: 'cassie.jpg',
  });

  static KING_ARTHO = new ResultsFilter({
    name: 'King Artho',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_PAGOS,
    requiredWeather: [Weather.FOG],
    collection: false,
    image: 'crab.png',
    uri: 'crab',
    guide: {
      zone: 'Eureka Pagos',
      mobs: [
        {
          mob: 'King Artho',
          level: 29,
          element: 'water',
        },
      ],
      method: 'The Blitzring is a rare drop from completing the King Artho NM.',
    },
    map: 'crab.jpg',
  });

  static SKOLL = new ResultsFilter({
    name: 'Skoll',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    requiredWeather: [Weather.BLIZZARDS],
    collection: false,
    image: 'skoll.png',
    uri: 'skoll',
    guide: {
      zone: 'Eureka Pyros',
      mobs: [
        {
          mob: 'Skoll',
          level: 50,
          element: 'ice',
        },
      ],
      method: 'Skoll\'s Claw is a rare drop from completing the Skoll NM.',
    },
    map: 'skoll.jpg',
  });

  static PAZUZU = new ResultsFilter({
    name: 'Pazuzu',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_ANEMOS,
    requiredWeather: [Weather.GALES],
    collection: false,
    image: 'pazuzu.png',
    uri: 'pazuzu',
    guide: {
      zone: 'Eureka Anemos',
      mobs: [
        {
          mob: 'Pazuzu',
          level: 20,
          element: 'wind',
        },
      ],
      method: 'Three Pazuzu\'s Feathers drop from completing the Pazuzu NM.',
    },
    map: 'pazuzu.jpg',
  });

  static PENTHESILEA = new ResultsFilter({
    name: 'Penthesilea',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    requiredWeather: [Weather.HEAT_WAVES],
    collection: false,
    image: 'penny.png',
    uri: 'penny',
    guide: {
      zone: 'Eureka Pyros',
      mobs: [
        {
          mob: 'Penthesilea',
          level: 50,
          element: 'fire',
        },
      ],
      method: 'Two Penthesilea\'s Flames drop from completing the Penthesilea NM.',
    },
    map: 'penny.jpg',
  });

  // Eureka Farms
  static COLD_WARPED_LOCKBOX = new ResultsFilter({
    name: 'Cold-Warped Lockbox',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_PAGOS,
    requiredWeather: [Weather.THUNDER],
    collection: false,
    image: 'lockbox.png',
    uri: 'cold_box',
    guide: {
      zone: 'Eureka Pagos',
      mobs: [
        {
          mob: 'Pagos Chimera',
          level: 40,
          element: 'lightning',
        },
        {
          mob: 'Val Griffin',
          level: 40,
          element: 'wind',
        },
        {
          mob: 'Greater Amphiptere',
          level: 39,
          element: 'fire',
        },
      ],
      method: 'Cold-Warped Lockboxes drop from high-level mutated mobs in Pagos. There are three different mobs that are commonly farmed for this - Chimeras, Griffins, and Amphipteres. Pagos has a low mutation rate, so it\'s best to hold mutated mobs and kill them on the 30 chain to get additional boxes.',
    },
    map: 'coldbox.jpg',
  });

  static HEAT_WARPED_LOCKBOX = new ResultsFilter({
    name: 'Heat-Warped Lockbox',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    requiredWeather: [Weather.UMBRAL_WIND],
    collection: false,
    image: 'lockbox.png',
    uri: 'heat_box',
    guide: {
      zone: 'Eureka Pyros',
      mobs: [
        {
          mob: 'Val Gigantopithecus',
          level: 55,
          element: 'fire',
        },
      ],
      method: 'Heat-Warped Lockboxes drop from high-level mutated mobs in Pyros. The most common mob farmed for these boxes is the Val Gigantopithecus. The mutation rate in Pyros is 50-75%, so you\'ll want to hold the last few mutated mobs so you can kill them on the 30 chain.',
    },
    map: 'heatbox.jpg',
  });

  static OFFENSIVE_LOGOGRAM = new ResultsFilter({
    name: 'Offensive Logogram',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_HYDATOS,
    requiredWeather: [Weather.SNOW],
    collection: false,
    image: 'offensive.png',
    uri: 'offensive',
    guide: {
      zone: 'Eureka Hydatos',
      mobs: [
        {
          mob: 'Snowstorm Sprite',
          level: 64,
          element: 'ice',
        },
      ],
      method: 'Offensive Logogram farms use adapted Snowstorm Sprites. Kill Hydatos Peistes, then kill an adapted Snowstorm Sprite on the 30 chain. You can have a tank hold Snowstorm Sprites after the farm\'s weather has ended, as long as they adapt before the weather ends.',
    },
    map: 'offensive.jpg',
  });

  static CONCEPTUAL_LOGOGRAM = new ResultsFilter({
    name: 'Conceptual Logogram',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_HYDATOS,
    requiredWeather: [Weather.SHOWERS, Weather.THUNDERSTORMS],
    collection: false,
    image: 'conceptual.png',
    uri: 'conceptual',
    guide: {
      zone: 'Eureka Hydatos',
      mobs: [
        {
          mob: 'Snowmelt Sprite',
          level: 65,
          element: 'water',
        },
        {
          mob: 'Thunderstorm Sprite',
          level: 65,
          element: 'lightning',
        },
      ],
      method: 'You can reflect farm these mobs to get logograms. Take off all your gear, swap to 0 defensive magia, and use Reflect L to kill the sprites. Make sure to use your first Reflect outside of aggro range to avoid dying. Additionally, Thunderstorm Sprites will kill you with their autoattacks, so be sure to kite these as you kill them.',
    },
    map: 'conceptual.jpg',
  });

  static MITIGATIVE_LOGOGRAM = new ResultsFilter({
    name: 'Mitigative Logogram',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    requiredWeather: [Weather.THUNDER, Weather.HEAT_WAVES],
    collection: false,
    image: 'mitigative.png',
    uri: 'mitigative',
    guide: {
      zone: 'Eureka Pyros',
      mobs: [
        {
          mob: 'Thunderstorm Sprite',
          level: 46,
          element: 'lightning',
          syncRequired: true,
        },
        {
          mob: 'Ember Sprite',
          level: 43,
          element: 'fire',
          syncRequired: true,
        },
      ],
      method: 'You can reflect farm these mobs to get logograms. Take off all your gear, swap to 0 defensive magia, and use Reflect L to kill the sprites. Make sure to use your first Reflect outside of aggro range to avoid dying.\n\nNote that reflecting for Mitigative requires you to level-sync to a nearby NM to receive rewards. For Thunderstorm Sprites, you must spawn the Rondo Aetolus (Aetolus) NM and level sync to it. For Ember Sprites, you must spawn the Creepy Doll (Graffiacane) NM and level sync to it.',
    },
    map: 'mitigative.jpg',
  });

  // Bozja Fragment Farms

  static REFLECT_GUIDE_TEXT = 'You can reflect farm these mobs to get fragments. Use Essence of the Irregular and take off all your gear. Use Lost Reflect to kill the sprites. Make sure to use your first Reflect outside of aggro range to avoid dying.';

  static PREPARATION_FRAGMENT = new ResultsFilter({
    name: 'Preparation',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    requiredWeather: [Weather.THUNDER],
    collection: false,
    image: 'bsffrag.png',
    uri: 'preparation',
    guide: {
      zone: 'The Bozjan Southern Front, Zone 1',
      mobs: [
        {
          mob: 'Wind Sprite',
          rank: 3,
        },
      ],
      method: this.REFLECT_GUIDE_TEXT,
    },
  });

  static CARE_FRAGMENT = new ResultsFilter({
    name: 'Care',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    requiredWeather: [Weather.DUST_STORMS, Weather.WIND],
    collection: false,
    image: 'bsffrag.png',
    uri: 'care',
    guide: {
      zone: 'The Bozjan Southern Front, Zone 2',
      mobs: [
        {
          mob: 'Earth Sprite',
          rank: 5,
        },
        {
          mob: 'Wind Sprite',
          rank: 4,
        },
      ],
      method: this.REFLECT_GUIDE_TEXT,
    },
    map: 'care.jpg',
  });

  static SUPPORT_FRAGMENT = new ResultsFilter({
    name: 'Support',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    requiredWeather: [Weather.WIND],
    collection: false,
    image: 'bsffrag.png',
    uri: 'support',
    guide: {
      zone: 'The Bozjan Southern Front, Zone 3',
      mobs: [
        {
          mob: 'Wind Sprite',
          rank: 5,
        },
      ],
      method: this.REFLECT_GUIDE_TEXT,
    },
  });

  static HISTORY_FRAGMENT = new ResultsFilter({
    name: 'History',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_ZADNOR,
    requiredWeather: [Weather.SNOW, Weather.WIND],
    collection: false,
    image: 'zadnorfrag.png',
    uri: 'history',
  });

  static ARTISTRY_FRAGMENT = new ResultsFilter({
    name: 'Artistry',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_ZADNOR,
    requiredWeather: [Weather.THUNDER, Weather.RAIN],
    collection: false,
    image: 'zadnorfrag.png',
    uri: 'artistry',
    guide: {
      zone: 'Zadnor, Zone 2',
      mobs: [
        {
          mob: 'Water Sprite',
          rank: 5,
        },
        {
          mob: 'Lightning Sprite',
          rank: 4,
        },
      ],
      method: this.REFLECT_GUIDE_TEXT,
    },
    map: 'artistry.jpg',
  });

  // Collections
  static EUREKA_NMS = new ResultsFilter({
    name: 'All Eureka NMs',
    type: FarmType.EUREKA_NM,
    zone: null,
    requiredWeather: null,
    collection: true,
    contains: [
      ResultsFilter.COPYCAT_CASSIE,
      ResultsFilter.KING_ARTHO,
      ResultsFilter.SKOLL,
      ResultsFilter.PAZUZU,
      ResultsFilter.PENTHESILEA,
    ],
    uri: 'nm',
  });

  static FRAGMENT_FARM = new ResultsFilter({
    name: 'All Bozja Fragment Farms',
    type: FarmType.FRAGMENT_FARM,
    zone: null,
    requiredWeather: null,
    collection: true,
    contains: [
      ResultsFilter.PREPARATION_FRAGMENT,
      ResultsFilter.CARE_FRAGMENT,
      ResultsFilter.SUPPORT_FRAGMENT,
      ResultsFilter.HISTORY_FRAGMENT,
      ResultsFilter.ARTISTRY_FRAGMENT,
    ],
    uri: 'fragments',
  });

  static EUREKA_FARMS = new ResultsFilter({
    name: 'All Eureka Farms',
    type: FarmType.EUREKA_FARM,
    zone: null,
    requiredWeather: null,
    collection: true,
    contains: [
      ResultsFilter.COLD_WARPED_LOCKBOX,
      ResultsFilter.HEAT_WARPED_LOCKBOX,
      ResultsFilter.OFFENSIVE_LOGOGRAM,
      ResultsFilter.CONCEPTUAL_LOGOGRAM,
      ResultsFilter.MITIGATIVE_LOGOGRAM,
    ],
    uri: 'eurekafarms',
  });

  static ALL = new ResultsFilter({
    name: 'All Upcoming Spawns',
    type: FarmType.ALL,
    zone: null,
    requiredWeather: null,
    collection: true,
    contains: [
      ResultsFilter.COPYCAT_CASSIE,
      ResultsFilter.KING_ARTHO,
      ResultsFilter.SKOLL,
      ResultsFilter.PAZUZU,
      ResultsFilter.PENTHESILEA,
      ResultsFilter.COLD_WARPED_LOCKBOX,
      ResultsFilter.HEAT_WARPED_LOCKBOX,
      ResultsFilter.PREPARATION_FRAGMENT,
      ResultsFilter.CARE_FRAGMENT,
      ResultsFilter.SUPPORT_FRAGMENT,
      ResultsFilter.HISTORY_FRAGMENT,
      ResultsFilter.ARTISTRY_FRAGMENT,
    ],
    uri: '#',
  });

  static getFilter = function (name) {
    switch (name) {
      case 'copycatcassie':
      case 'cassie': return ResultsFilter.COPYCAT_CASSIE;
      case 'kingartho':
      case 'crab': return ResultsFilter.KING_ARTHO;
      case 'skoll': return ResultsFilter.SKOLL;
      case 'pazuzu': return ResultsFilter.PAZUZU;
      case 'penthesilea':
      case 'penny': return ResultsFilter.PENTHESILEA;
      case 'cold':
      case 'cold_lockbox':
      case 'coldbox':
      case 'cold_box': return ResultsFilter.COLD_WARPED_LOCKBOX;
      case 'heat':
      case 'heat_lockbox':
      case 'heatbox':
      case 'heat_box': return ResultsFilter.HEAT_WARPED_LOCKBOX;
      case 'offensive': return ResultsFilter.OFFENSIVE_LOGOGRAM;
      case 'conceptual': return ResultsFilter.CONCEPTUAL_LOGOGRAM;
      case 'mitigative': return ResultsFilter.MITIGATIVE_LOGOGRAM;
      case 'preparation': return ResultsFilter.PREPARATION_FRAGMENT;
      case 'care': return ResultsFilter.CARE_FRAGMENT;
      case 'support': return ResultsFilter.SUPPORT_FRAGMENT;
      case 'history': return ResultsFilter.HISTORY_FRAGMENT;
      case 'artistry': return ResultsFilter.ARTISTRY_FRAGMENT;
      case 'bsf':
      case 'bozja':
      case 'zadnor':
      case 'fragments': return ResultsFilter.FRAGMENT_FARM;
      case 'eurekanms':
      case 'nms':
      case 'nm': return ResultsFilter.EUREKA_NMS;
      case 'eurekafarms': return ResultsFilter.EUREKA_FARMS;
      default: return ResultsFilter.ALL;
    }
  };

  constructor(data) {
    this.name = data.name;
    this.type = data.type;
    this.zone = data.zone;
    this.requiredWeather = data.requiredWeather;
    this.collection = data.collection;
    this.contains = data.contains;
    this.image = data.image;
    this.uri = data.uri;
    this.guide = data.guide;
    this.map = data.map;
  }

  toString() {
    return `ResultsFilter.${this.name}`;
  }
}
