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
  });
  static KING_ARTHO = new ResultsFilter({
    name: 'King Artho',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_PAGOS,
    requiredWeather: [Weather.FOG],
    collection: false,
    image: 'crab.png',
    uri: 'crab',
  });
  static SKOLL = new ResultsFilter({
    name: 'Skoll',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    requiredWeather: [Weather.BLIZZARDS],
    collection: false,
    image: 'skoll.png',
    uri: 'skoll',
  });
  static PAZUZU = new ResultsFilter({
    name: 'Pazuzu',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_ANEMOS,
    requiredWeather: [Weather.GALES],
    collection: false,
    image: 'pazuzu.png',
    uri: 'pazuzu',
  });
  static PENTHESILEA = new ResultsFilter({
    name: 'Penthesilea',
    type: FarmType.EUREKA_NM,
    zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    requiredWeather: [Weather.HEAT_WAVES],
    collection: false,
    image: 'penny.png',
    uri: 'penny',
  })

  // Eureka Farms
  static COLD_WARPED_LOCKBOX = new ResultsFilter({
    name: 'Cold-Warped Lockbox',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_PAGOS,
    requiredWeather: [Weather.THUNDER],
    collection: false,
    image: 'lockbox.png',
    uri: 'cold_box',
  });
  static HEAT_WARPED_LOCKBOX = new ResultsFilter({
    name: 'Heat-Warped Lockbox',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    requiredWeather: [Weather.UMBRAL_WIND],
    collection: false,
    image: 'lockbox.png',
    uri: 'heat_box',
  });
  static OFFENSIVE_LOGOGRAM = new ResultsFilter({
    name: 'Offensive Logogram',
    type: FarmType.EUREKA_FARM,
    zone: EorzeaWeather.ZONE_EUREKA_HYDATOS,
    requiredWeather: [Weather.SNOW],
    collection: false,
    image: 'offensive.png',
    uri: 'offensive',
  });

  // Bozja Fragment Farms
  static PREPARATION_FRAGMENT = new ResultsFilter({
    name: 'Preparation',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    requiredWeather: [Weather.THUNDER],
    collection: false,
    image: 'bsffrag.png',
    uri: 'preparation',
  });
  static CARE_FRAGMENT = new ResultsFilter({
    name: 'Care',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    requiredWeather: [Weather.DUST_STORMS, Weather.WIND],
    collection: false,
    image: 'bsffrag.png',
    uri: 'care',
  });
  static SUPPORT_FRAGMENT = new ResultsFilter({
    name: 'Support',
    type: FarmType.FRAGMENT_FARM,
    zone: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    requiredWeather: [Weather.WIND],
    collection: false,
    image: 'bsffrag.png',
    uri: 'support',
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
      ResultsFilter.OFFENSIVE_LOGOGRAM,
      ResultsFilter.PREPARATION_FRAGMENT,
      ResultsFilter.CARE_FRAGMENT,
      ResultsFilter.SUPPORT_FRAGMENT,
      ResultsFilter.HISTORY_FRAGMENT,
      ResultsFilter.ARTISTRY_FRAGMENT,
    ],
    uri: '#'
  });

  static getFilter = function(name) {
    switch(name) {
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
  }
  
  constructor(data) {
    this.name = data.name;
    this.type = data.type;
    this.zone = data.zone;
    this.requiredWeather = data.requiredWeather;
    this.collection = data.collection;
    this.contains = data.contains;
    this.image = data.image;
    this.uri = data.uri;
  }

  toString() {
    return `ResultsFilter.${this.name}`;
  }
}