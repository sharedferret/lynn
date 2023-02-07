import EorzeaWeather from 'eorzea-weather';
import sortBy from 'underscore/modules/sortBy.js'

const EORZEA_TIME_DILATION = 20.571428571428573;
const EIGHT_HOURS_IN_MS = 8 * 1000 * 60 * 60;
const EORZEA_WEATHER_DURATION_MS = (23 * 60000) + (20 * 1000);
// const WEATHER_CHANGES_PER_WEEK = 432;

// Zone mappings for EorzeaWeather
const zone_mapping = {};
zone_mapping[EorzeaWeather.ZONE_AMH_ARAENG] = 'Amh Araeng';
zone_mapping[EorzeaWeather.ZONE_AZYS_LLA] = 'Azys Lla';
zone_mapping[EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT] = 'The Bozjan Southern Front';
zone_mapping[EorzeaWeather.ZONE_CENTRAL_SHROUD] = 'Central Shroud';
zone_mapping[EorzeaWeather.ZONE_CENTRAL_THANALAN] = 'Central Thanalan';
zone_mapping[EorzeaWeather.ZONE_COERTHAS_CENTRAL_HIGHLANDS] = 'Coerthas Central Highlands';
zone_mapping[EorzeaWeather.ZONE_COERTHAS_WESTERN_HIGHLANDS] = 'Coerthas Western Highlands';
zone_mapping[EorzeaWeather.ZONE_EAST_SHROUD] = 'East Shroud';
zone_mapping[EorzeaWeather.ZONE_EASTERN_LA_NOSCEA] = 'Eastern La Noscea';
zone_mapping[EorzeaWeather.ZONE_EASTERN_THANALAN] = 'Eastern Thanalan';
zone_mapping[EorzeaWeather.ZONE_EULMORE] = 'Eulmore';
zone_mapping[EorzeaWeather.ZONE_EUREKA_ANEMOS] = 'Eureka Anemos';
zone_mapping[EorzeaWeather.ZONE_EUREKA_PAGOS] = 'Eureka Pagos';
zone_mapping[EorzeaWeather.ZONE_EUREKA_PYROS] = 'Eureka Pyros';
zone_mapping[EorzeaWeather.ZONE_EUREKA_HYDATOS] = 'Eureka Hydatos';
zone_mapping[EorzeaWeather.ZONE_GRIDANIA] = 'Gridania';
zone_mapping[EorzeaWeather.ZONE_IDYLLSHIRE] = 'Idyllshire';
zone_mapping[EorzeaWeather.ZONE_IL_MHEG] = 'Il Mheg';
zone_mapping[EorzeaWeather.ZONE_ISHGARD] = 'Ishgard';
zone_mapping[EorzeaWeather.ZONE_KHOLUSIA] = 'Kholusia';
zone_mapping[EorzeaWeather.ZONE_KUGANE] = 'Kugane';
zone_mapping[EorzeaWeather.ZONE_LAKELAND] = 'Lakeland';
zone_mapping[EorzeaWeather.ZONE_LIMSA_LOMINSA] = 'Limsa Lominsa';
zone_mapping[EorzeaWeather.ZONE_LOWER_LA_NOSCEA] = 'Lower La Noscea';
zone_mapping[EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA] = 'Middle La Noscea';
zone_mapping[EorzeaWeather.ZONE_MIST] = 'Mist';
zone_mapping[EorzeaWeather.ZONE_MOR_DHONA] = 'Mor Dhona';
zone_mapping[EorzeaWeather.ZONE_NORTH_SHROUD] = 'North Shroud';
zone_mapping[EorzeaWeather.ZONE_NORTHERN_THANALAN] = 'Northern Thanalan';
zone_mapping[EorzeaWeather.ZONE_OUTER_LA_NOSCEA] = 'Outer La Noscea';
zone_mapping[EorzeaWeather.ZONE_RHALGRS_REACH] = 'Rhalgr\'s Reach';
zone_mapping[EorzeaWeather.ZONE_SHIROGANE] = 'Shirogane';
zone_mapping[EorzeaWeather.ZONE_SOUTH_SHROUD] = 'South Shroud';
zone_mapping[EorzeaWeather.ZONE_SOUTHERN_THANALAN] = 'Southern Thanalan';
zone_mapping[EorzeaWeather.ZONE_THE_AZIM_STEPPE] = 'The Azim Steppe';
zone_mapping[EorzeaWeather.ZONE_THE_CHURNING_MISTS] = 'The Churning Mists';
zone_mapping[EorzeaWeather.ZONE_THE_CRYSTARIUM] = 'The Crystarium';
zone_mapping[EorzeaWeather.ZONE_THE_DIADEM] = 'The Diadem';
zone_mapping[EorzeaWeather.ZONE_THE_DRAVANIAN_FORELANDS] = 'The Dravanian Forelands';
zone_mapping[EorzeaWeather.ZONE_THE_DRAVANIAN_HINTERLANDS] = 'The Dravanian Hinterlands';
zone_mapping[EorzeaWeather.ZONE_THE_FRINGES] = 'The Fringes';
zone_mapping[EorzeaWeather.ZONE_THE_GOBLET] = 'The Goblet';
zone_mapping[EorzeaWeather.ZONE_THE_LAVENDER_BEDS] = 'The Lavender Beds';
zone_mapping[EorzeaWeather.ZONE_THE_LOCHS] = 'The Lochs';
zone_mapping[EorzeaWeather.ZONE_THE_PEAKS] = 'The Peaks';
zone_mapping[EorzeaWeather.ZONE_THE_RAKTIKA_GREATWOOD] = 'The Rak\'tika Greatwood';
zone_mapping[EorzeaWeather.ZONE_THE_RUBY_SEA] = 'The Ruby Sea';
zone_mapping[EorzeaWeather.ZONE_THE_SEA_OF_CLOUDS] = 'The Sea of Clouds';
zone_mapping[EorzeaWeather.ZONE_THE_TEMPEST] = 'The Tempest';
zone_mapping[EorzeaWeather.ZONE_ULDAH] = 'Ul\'dah';
zone_mapping[EorzeaWeather.ZONE_UPPER_LA_NOSCEA] = 'Upper La Noscea';
zone_mapping[EorzeaWeather.ZONE_WESTERN_LA_NOSCEA] = 'Western La Noscea';
zone_mapping[EorzeaWeather.ZONE_WESTERN_THANALAN] = 'Western Thanalan';
zone_mapping[EorzeaWeather.ZONE_WOLVES_DEN_PIER] = 'Wolves\' Den Pier';
zone_mapping[EorzeaWeather.ZONE_YANXIA] = 'Yanxia';
zone_mapping[EorzeaWeather.ZONE_ZADNOR] = 'Zadnor';

/**
 * Overall logic here:
 * - assign a value to each favorable weather condition (dust storms, wind, thunder)
 * - for each segment (23m 20s), calculate a score for the patterns during the following n minutes
 * - sort and return
 * 
 * - input: conditions and weights, time slice (3h default)
 * - return a sorted list of weights
 */

 const calculateWeatherForTimePeriod = (segments, 
    start_date = new Date(), 
    location = EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT) => {
  const current_eorzea_epoch = start_date.getTime() * EORZEA_TIME_DILATION;

  // Align to start of current weather segment
  const weather_start_eorzea_epoch = current_eorzea_epoch - (current_eorzea_epoch % EIGHT_HOURS_IN_MS) + 1;
  const weather_start_date = new Date(Math.round(weather_start_eorzea_epoch / EORZEA_TIME_DILATION));

  const weather_array = [];
  for (let i = 0; i < segments; i++) {
    const time = new Date(weather_start_date.getTime() + (i * EORZEA_WEATHER_DURATION_MS));
    const weather_condition = EorzeaWeather.getWeather(location, time);
    weather_array.push({
      time: time,
      condition: weather_condition,
    });
  }

  return weather_array;
};

/**
 * 
 * @param {*} conditions A generated list of conditions and start times (see calculateWeatherForTimePeriod)
 * @param {*} slice_duration The amount of time (ms) each time slice should be (e.g. 3 hours to align w/ BSF lockout)
 * @param {*} favorability_ranking Set of ranking scores for each condition and combinations
 */
const calculateFavorabilityScoresForTimeSlice = (conditions, slice_duration, favorability_ranking) => {
  // Each weather condition lasts 23m 20s, calculate how many changes occur during the provided duration
  // The last slice will be handled independently of this calculation, since it will be less than the full duration
  const lookahead_slice_count = Math.floor(slice_duration / EORZEA_WEATHER_DURATION_MS);
  // Percentage factor for the last slice
  const last_slice_pct = (slice_duration % EORZEA_WEATHER_DURATION_MS) / slice_duration;
  const weighted_start_times = {};

  for (let i = 0; i < conditions.length - lookahead_slice_count - 1; i++) {
    // For each slice, calculate the favorability score including the partial slice
    let favorability = 0;
    for (let j = 0; j < lookahead_slice_count; j++) {
      const condition_entry = conditions[i + j];
      const favorability_for_entry = favorability_ranking.conditions[condition_entry.condition];
      if (favorability_for_entry != null) {
        if (favorability > 0) {
          favorability += favorability_ranking.combinations;
        }
        favorability += favorability_for_entry;
      }
    }

    // Calculate partial slice
    const condition_entry = conditions[i + lookahead_slice_count];
    const favorability_for_entry = favorability_ranking.conditions[condition_entry.condition];
    if (favorability_for_entry != null) {
      if (favorability > 0) {
        favorability += favorability_ranking.combinations * last_slice_pct;
      }
      favorability += favorability_for_entry * last_slice_pct;
    }

    if (favorability > 0) {
      weighted_start_times[conditions[i].time] = {
        starting_time: conditions[i].time,
        favorability: favorability,
      }
    }
  }

  return weighted_start_times;
}

const sortAndReturnTopNTimeSlices = (unsorted_slices, result_length) => {
  const sorted_results = sortBy(unsorted_slices, function(i) {
    return -(i.favorability);
  });
  return sorted_results.slice(0, result_length);
}

const favorability_ranking = {
  conditions: {
    'Dust Storms': 4,
    'Wind': 2,
    'Thunder': 1,
  },
  combinations: 2,
};

const generateConditionsForFavorableTimes = (favorability_scores, slice_duration, location) => {
  const output = [];
  for (let i = 0; i < favorability_scores.length; i++) {
    const weather_changes_per_slice_duration = Math.ceil(slice_duration / EORZEA_WEATHER_DURATION_MS);
    const conditions = calculateWeatherForTimePeriod(weather_changes_per_slice_duration, favorability_scores[i].starting_time, location);
    output.push({
      starting_time: favorability_scores[i].starting_time,
      duration: slice_duration,
      favorability: favorability_scores[i].favorability,
      conditions: conditions,
    });
  }
  return output;
}

/**
 * 
 * @param {*} slice_length The length of each slice in ms. Usually this is the lockout period for an instance (3 hours = 10800000)
 * @param {*} lookahead_segments How far in the future to search, calculated in terms of weather changes. The weather changes every 23m 20s, which corresponds to 432 changes per week.
 * @param {*} start_time The starting time for the search. Defaults to now.
 * @param {*} location The location to look up weather data for, defaults to Bozjan Southern Front.
 * @param {*} favorability_ranking The ranking criteria for each weather condition, and a bonus applied to additional favorable weather conditions during a slice.
 * @returns 
 */
/**
const getFavorability = (slice_length, lookahead_segments, start_time = new Date(), location = EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT, favorability_ranking = favorability_ranking) => {
  const scores = calculateFavorabilityScoresForTimeSlice(calculateWeatherForTimePeriod(lookahead_segments, start_time, location), slice_length, favorability_ranking);
  const scores_to_display = sortAndReturnTopNTimeSlices(scores, 10);
  return generateConditionsForFavorableTimes(scores_to_display, slice_length, location);
}
*/

class WeatherFavorability {
  static ZoneMapping = zone_mapping;
  static getFavorability(slice_length, lookahead_segments, start_time = new Date(), location = EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT, favorability_ranking = favorability_ranking) {
    const scores = calculateFavorabilityScoresForTimeSlice(calculateWeatherForTimePeriod(lookahead_segments, start_time, location), slice_length, favorability_ranking);
    const scores_to_display = sortAndReturnTopNTimeSlices(scores, 10);
    return generateConditionsForFavorableTimes(scores_to_display, slice_length, location);
  }
}

export default WeatherFavorability;
