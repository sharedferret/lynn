import EorzeaWeather from 'lynn-eorzea-weather';
import sortBy from 'underscore/modules/sortBy';

const EORZEA_TIME_DILATION = 20.571428571428573;
const EIGHT_HOURS_IN_MS = 8 * 1000 * 60 * 60;
const EORZEA_WEATHER_DURATION_MS = (23 * 60000) + (20 * 1000);
// const WEATHER_CHANGES_PER_WEEK = 432;

// Zone mappings for EorzeaWeather
const zoneMapping = {};
zoneMapping[EorzeaWeather.ZONE_AMH_ARAENG] = 'Amh Araeng';
zoneMapping[EorzeaWeather.ZONE_AZYS_LLA] = 'Azys Lla';
zoneMapping[EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT] = 'The Bozjan Southern Front';
zoneMapping[EorzeaWeather.ZONE_CENTRAL_SHROUD] = 'Central Shroud';
zoneMapping[EorzeaWeather.ZONE_CENTRAL_THANALAN] = 'Central Thanalan';
zoneMapping[EorzeaWeather.ZONE_COERTHAS_CENTRAL_HIGHLANDS] = 'Coerthas Central Highlands';
zoneMapping[EorzeaWeather.ZONE_COERTHAS_WESTERN_HIGHLANDS] = 'Coerthas Western Highlands';
zoneMapping[EorzeaWeather.ZONE_EAST_SHROUD] = 'East Shroud';
zoneMapping[EorzeaWeather.ZONE_EASTERN_LA_NOSCEA] = 'Eastern La Noscea';
zoneMapping[EorzeaWeather.ZONE_EASTERN_THANALAN] = 'Eastern Thanalan';
zoneMapping[EorzeaWeather.ZONE_EULMORE] = 'Eulmore';
zoneMapping[EorzeaWeather.ZONE_EUREKA_ANEMOS] = 'Eureka Anemos';
zoneMapping[EorzeaWeather.ZONE_EUREKA_PAGOS] = 'Eureka Pagos';
zoneMapping[EorzeaWeather.ZONE_EUREKA_PYROS] = 'Eureka Pyros';
zoneMapping[EorzeaWeather.ZONE_EUREKA_HYDATOS] = 'Eureka Hydatos';
zoneMapping[EorzeaWeather.ZONE_GRIDANIA] = 'Gridania';
zoneMapping[EorzeaWeather.ZONE_IDYLLSHIRE] = 'Idyllshire';
zoneMapping[EorzeaWeather.ZONE_IL_MHEG] = 'Il Mheg';
zoneMapping[EorzeaWeather.ZONE_ISHGARD] = 'Ishgard';
zoneMapping[EorzeaWeather.ZONE_KHOLUSIA] = 'Kholusia';
zoneMapping[EorzeaWeather.ZONE_KUGANE] = 'Kugane';
zoneMapping[EorzeaWeather.ZONE_LAKELAND] = 'Lakeland';
zoneMapping[EorzeaWeather.ZONE_LIMSA_LOMINSA] = 'Limsa Lominsa';
zoneMapping[EorzeaWeather.ZONE_LOWER_LA_NOSCEA] = 'Lower La Noscea';
zoneMapping[EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA] = 'Middle La Noscea';
zoneMapping[EorzeaWeather.ZONE_MIST] = 'Mist';
zoneMapping[EorzeaWeather.ZONE_MOR_DHONA] = 'Mor Dhona';
zoneMapping[EorzeaWeather.ZONE_NORTH_SHROUD] = 'North Shroud';
zoneMapping[EorzeaWeather.ZONE_NORTHERN_THANALAN] = 'Northern Thanalan';
zoneMapping[EorzeaWeather.ZONE_OUTER_LA_NOSCEA] = 'Outer La Noscea';
zoneMapping[EorzeaWeather.ZONE_RHALGRS_REACH] = 'Rhalgr\'s Reach';
zoneMapping[EorzeaWeather.ZONE_SHIROGANE] = 'Shirogane';
zoneMapping[EorzeaWeather.ZONE_SOUTH_HORN] = 'Occult Crescent: South Horn';
zoneMapping[EorzeaWeather.ZONE_SOUTH_SHROUD] = 'South Shroud';
zoneMapping[EorzeaWeather.ZONE_SOUTHERN_THANALAN] = 'Southern Thanalan';
zoneMapping[EorzeaWeather.ZONE_THE_AZIM_STEPPE] = 'The Azim Steppe';
zoneMapping[EorzeaWeather.ZONE_THE_CHURNING_MISTS] = 'The Churning Mists';
zoneMapping[EorzeaWeather.ZONE_THE_CRYSTARIUM] = 'The Crystarium';
zoneMapping[EorzeaWeather.ZONE_THE_DIADEM] = 'The Diadem';
zoneMapping[EorzeaWeather.ZONE_THE_DRAVANIAN_FORELANDS] = 'The Dravanian Forelands';
zoneMapping[EorzeaWeather.ZONE_THE_DRAVANIAN_HINTERLANDS] = 'The Dravanian Hinterlands';
zoneMapping[EorzeaWeather.ZONE_THE_FRINGES] = 'The Fringes';
zoneMapping[EorzeaWeather.ZONE_THE_GOBLET] = 'The Goblet';
zoneMapping[EorzeaWeather.ZONE_THE_LAVENDER_BEDS] = 'The Lavender Beds';
zoneMapping[EorzeaWeather.ZONE_THE_LOCHS] = 'The Lochs';
zoneMapping[EorzeaWeather.ZONE_THE_PEAKS] = 'The Peaks';
zoneMapping[EorzeaWeather.ZONE_THE_RAKTIKA_GREATWOOD] = 'The Rak\'tika Greatwood';
zoneMapping[EorzeaWeather.ZONE_THE_RUBY_SEA] = 'The Ruby Sea';
zoneMapping[EorzeaWeather.ZONE_THE_SEA_OF_CLOUDS] = 'The Sea of Clouds';
zoneMapping[EorzeaWeather.ZONE_THE_TEMPEST] = 'The Tempest';
zoneMapping[EorzeaWeather.ZONE_ULDAH] = 'Ul\'dah';
zoneMapping[EorzeaWeather.ZONE_UPPER_LA_NOSCEA] = 'Upper La Noscea';
zoneMapping[EorzeaWeather.ZONE_WESTERN_LA_NOSCEA] = 'Western La Noscea';
zoneMapping[EorzeaWeather.ZONE_WESTERN_THANALAN] = 'Western Thanalan';
zoneMapping[EorzeaWeather.ZONE_WOLVES_DEN_PIER] = 'Wolves\' Den Pier';
zoneMapping[EorzeaWeather.ZONE_YANXIA] = 'Yanxia';
zoneMapping[EorzeaWeather.ZONE_ZADNOR] = 'Zadnor';

/**
 * Overall logic here:
 * - assign a value to each favorable weather condition (dust storms, wind, thunder)
 * - for each segment (23m 20s), calculate a score for the patterns during the following n minutes
 * - sort and return
 *
 * - input: conditions and weights, time slice (3h default)
 * - return a sorted list of weights
 */

const calculateWeatherForTimePeriod = (
  segments,
  startDate = new Date(),
  location = EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
) => {
  const currentEorzeaEpoch = startDate.getTime() * EORZEA_TIME_DILATION;

  // Align to start of current weather segment
  const weatherStartEorzeaEpoch = currentEorzeaEpoch
    - (currentEorzeaEpoch % EIGHT_HOURS_IN_MS)
    + 1;
  const weatherStartDate = new Date(Math.round(weatherStartEorzeaEpoch / EORZEA_TIME_DILATION));

  const weatherArray = [];
  for (let i = 0; i < segments; i += 1) {
    const time = new Date(weatherStartDate.getTime() + (i * EORZEA_WEATHER_DURATION_MS));
    const weatherCondition = EorzeaWeather.getWeather(location, time);
    weatherArray.push({
      time,
      condition: weatherCondition,
    });
  }

  return weatherArray;
};

/**
 *
 * @param {*} conditions A generated list of conditions and start times
 *            (see calculateWeatherForTimePeriod)
 * @param {*} slice_duration The amount of time (ms) each time slice should be
 *            (e.g. 3 hours to align w/ BSF lockout)
 * @param {*} favorability_ranking Set of ranking scores for each condition and combinations
 */
const calculateFavorabilityScoresForTimeSlice = (
  conditions,
  sliceDuration,
  favorabilityRanking,
) => {
  /**
   * Since each weather period lasts 23m 20s, calculate how many changes should occur during the
   * provided duration. The last slice will be handled independently of this, since it will
   * be for less than the full weather duration.
   */
  const lookaheadSliceCount = Math.floor(sliceDuration / EORZEA_WEATHER_DURATION_MS);
  // Percentage factor for the last slice
  const lastSlicePct = (sliceDuration % EORZEA_WEATHER_DURATION_MS) / sliceDuration;
  const weightedStartTimes = {};

  for (let i = 0; i < conditions.length - lookaheadSliceCount - 1; i += 1) {
    // For each slice, calculate the favorability score including the partial slice
    let favorability = 0;
    for (let j = 0; j < lookaheadSliceCount; j += 1) {
      const conditionEntry = conditions[i + j];
      const favorabilityForEntry = favorabilityRanking.conditions[conditionEntry.condition];
      if (favorabilityForEntry != null) {
        if (favorability > 0) {
          favorability += favorabilityRanking.combinations;
        }
        favorability += favorabilityForEntry;
      }
    }

    // Calculate partial slice
    const conditionEntry = conditions[i + lookaheadSliceCount];
    const favorabilityForEntry = favorabilityRanking.conditions[conditionEntry.condition];
    if (favorabilityForEntry != null) {
      if (favorability > 0) {
        favorability += favorabilityRanking.combinations * lastSlicePct;
      }
      favorability += favorabilityForEntry * lastSlicePct;
    }

    if (favorability > 0) {
      weightedStartTimes[conditions[i].time] = {
        startingTime: conditions[i].time,
        favorability,
      };
    }
  }

  return weightedStartTimes;
};

const sortAndReturnTopNTimeSlices = (unsortedSlices, resultLength) => {
  const sortedResults = sortBy(unsortedSlices, (i) => -(i.favorability));
  return sortedResults.slice(0, resultLength);
};

const generateConditionsForFavorableTimes = (favorabilityScores, sliceDuration, location) => {
  const output = [];
  for (let i = 0; i < favorabilityScores.length; i += 1) {
    const weatherChangesPerSliceDuration = Math.ceil(sliceDuration / EORZEA_WEATHER_DURATION_MS);
    const conditions = calculateWeatherForTimePeriod(
      weatherChangesPerSliceDuration,
      favorabilityScores[i].startingTime,
      location,
    );
    output.push({
      startingTime: favorabilityScores[i].startingTime,
      duration: sliceDuration,
      favorability: favorabilityScores[i].favorability,
      conditions,
    });
  }
  return output;
};

/**
 *
 * @param {*} slice_length The length of each slice in ms. Usually this is the lockout period
 *            for an instance (3 hours = 10800000)
 * @param {*} lookahead_segments How far in the future to search, calculated in terms of weather
 *            changes. The weather changes every 23m 20s, which corresponds to 432 changes per week.
 * @param {*} start_time The starting time for the search. Defaults to now.
 * @param {*} location The location to look up weather data for, defaults to Bozjan Southern Front.
 * @param {*} favorability_ranking The ranking criteria for each weather condition, and a bonus
 *            applied to additional favorable weather conditions during a slice.
 * @returns
 */
/**
const getFavorability = (
  slice_length,
  lookahead_segments,
  start_time = new Date(),
  location = EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
  favorability_ranking = favorability_ranking
  ) => {
  const scores = calculateFavorabilityScoresForTimeSlice(
    calculateWeatherForTimePeriod(lookahead_segments, start_time, location),
    slice_length,
    favorability_ranking);
  const scores_to_display = sortAndReturnTopNTimeSlices(scores, 10);
  return generateConditionsForFavorableTimes(scores_to_display, slice_length, location);
}
*/

class WeatherFavorability {
  static ZoneMapping = zoneMapping;

  static getFavorability(
    sliceLength,
    lookaheadSegments,
    startTime = new Date(),
    location = EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    favorabilityRanking = [],
  ) {
    const scores = calculateFavorabilityScoresForTimeSlice(
      calculateWeatherForTimePeriod(lookaheadSegments, startTime, location),
      sliceLength,
      favorabilityRanking,
    );
    const scoresToDisplay = sortAndReturnTopNTimeSlices(scores, 10);
    return generateConditionsForFavorableTimes(scoresToDisplay, sliceLength, location);
  }
}

export default WeatherFavorability;
