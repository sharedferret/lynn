export default class Weather {
  static BLIZZARDS = 'Blizzards';

  static CLEAR_SKIES = 'Clear Skies';

  static CLOUDS = 'Clouds';

  static DUST_STORMS = 'Dust Storms';

  static FAIR_SKIES = 'Fair Skies';

  static FOG = 'Fog';

  static GALES = 'Gales';

  static GLOOM = 'Gloom';

  static HEAT_WAVES = 'Heat Waves';

  static RAIN = 'Rain';

  static SHOWERS = 'Showers';

  static SNOW = 'Snow';

  static THUNDER = 'Thunder';

  static THUNDERSTORMS = 'Thunderstorms';

  static UMBRAL_STATIC = 'Umbral Static';

  static UMBRAL_WIND = 'Umbral Wind';

  static WIND = 'Wind';

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `Weather.${this.name}`;
  }
}
