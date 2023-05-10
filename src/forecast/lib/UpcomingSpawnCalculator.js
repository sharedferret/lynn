import EorzeaWeather from 'eorzea-weather';
import { sortBy } from 'underscore';
// import sortBy from 'underscore/modules/sortBy.js'

const EORZEA_TIME_DILATION = 20.571428571428573;
const EIGHT_HOURS_IN_MS = 8 * 1000 * 60 * 60;
const EORZEA_WEATHER_DURATION_MS = (23 * 60000) + (20 * 1000);
const WEATHER_CHANGES_PER_14_DAYS = 864;

const calculateWeatherForTimePeriod = (
  segments,
  start_date = new Date(),
  location = EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
) => {
  const current_eorzea_epoch = start_date.getTime() * EORZEA_TIME_DILATION;

  // Align to start of current weather segment
  const weather_start_eorzea_epoch = current_eorzea_epoch - (current_eorzea_epoch % EIGHT_HOURS_IN_MS) + 1;
  const weather_start_date = new Date(Math.round(weather_start_eorzea_epoch / EORZEA_TIME_DILATION));

  const weather_array = [];
  for (let i = 0; i < segments; i++) {
    const time = new Date(weather_start_date.getTime() + (i * EORZEA_WEATHER_DURATION_MS));
    const weather_condition = EorzeaWeather.getWeather(location, time);
    weather_array.push({
      time,
      condition: weather_condition,
    });
  }

  return weather_array;
};

/* const calculateTopSpawns = (location, targetWeather) => {
  // Get weather condition array for the next 14 days
  const upcoming_conditions = calculateWeatherForTimePeriod(
    WEATHER_CHANGES_PER_14_DAYS,
    new Date(),
    filter.zone,
  );

  // calculateFavorabilityScoresForTimeSlice
  // sortAndReturnTopNTimeSlices
  // generateConditionsForFavorableTimes
} */

const calculateUpcomingFarms = (filter) => {
  // Get weather condition array for the next 14 days
  const upcoming_conditions = calculateWeatherForTimePeriod(
    WEATHER_CHANGES_PER_14_DAYS,
    new Date(),
    filter.zone,
  );

  const output = [];
  // Build initial output array
  for (let i = 0; i < upcoming_conditions.length; i++) {
    const condition = upcoming_conditions[i];
    if (filter.requiredWeather.indexOf(condition.condition) !== -1) {
      // Check if the last weather was the same. If so, just increment the counter on the last output object
      if (i > 0 && filter.requiredWeather.indexOf(upcoming_conditions[i - 1].condition) !== -1) {
        output[output.length - 1].duration = output[output.length - 1].duration + 1;
        output[output.length - 1].condition.push(upcoming_conditions[i].condition);
      } else {
        output.push({
          time: condition.time,
          condition: [upcoming_conditions[i].condition],
          spawn: filter,
          duration: 1,
        });
      }
    }
  }

  return output;
};

/**
 *
 * @param filter  A ResultsFilter object to retrieve upcoming spawns for.
 * @return An array of upcoming spawns containing the following object:
 *  {
 *    timestamp, (epoch)
 *    spawn_name, (as a ResultsFilter object)
 *    weather, (as a Weather object)
 *    duration, (in number of weather segments, e.g. double Umbral wind would return 2)
 *  }
 */
const calculateUpcomingSpawns = (filter, max_results = 10) => {
  const now = new Date();
  // Get weather condition array for the next 14 days
  const upcoming_conditions = calculateWeatherForTimePeriod(
    WEATHER_CHANGES_PER_14_DAYS,
    now,
    filter.zone,
  );
  let output = [];
  // Run through array and build output array
  for (let i = 0; i < upcoming_conditions.length; i++) {
    const condition = upcoming_conditions[i];
    if (filter.requiredWeather.indexOf(condition.condition) !== -1) {
      output.push({
        time: condition.time,
        condition: condition.condition,
        spawn: filter,
      });
    }
  }

  output = output.slice(0, max_results);

  // See if there's a conflict - if so, save the most recent one
  for (let i = 0; i < output.length; i++) {
    const most_recent_conditions = calculateWeatherForTimePeriod(
      5,
      new Date(output[i].time.getTime() - (5 * EORZEA_WEATHER_DURATION_MS)),
      filter.zone,
    );

    for (let j = most_recent_conditions.length - 1; j >= 0; j--) {
      if (most_recent_conditions[j].condition === output[i].condition && output[i].conflict === undefined) {
        output[i].conflict = most_recent_conditions[j];
      }
    }
  }

  return output;
};

class UpcomingSpawnCalculator {
  static getUpcomingSpawns(filter, max_results = 10) {
    const upcoming = calculateUpcomingSpawns(filter);
    return upcoming.splice(0, max_results);
  }

  static getMultipleUpcomingSpawns(filters, max_results = 10) {
    const partialResults = [];
    for (let i = 0; i < filters.length; i++) {
      const partialResult = this.getUpcomingSpawns(filters[i]).slice(0, max_results);
      for (let j = 0; j < partialResult.length; j++) {
        partialResults.push(partialResult[j]);
      }
    }
    const sortedResults = sortBy(partialResults, 'time');
    return sortedResults.slice(0, max_results);
  }

  static getUpcomingFarms(filter, max_results = 10) {
    return calculateUpcomingFarms(filter).slice(0, max_results);
  }

  /**
   * TODO: This is really inefficient. Make a new fn that creates the weather array once and
   * iterates through it only one time.
   */

  static getMultipleUpcomingFarms(filters, max_results = 10) {
    const partialResults = [];
    for (let i = 0; i < filters.length; i++) {
      const partialResult = calculateUpcomingFarms(filters[i]).slice(0, max_results);
      for (let j = 0; j < partialResult.length; j++) {
        partialResults.push(partialResult[j]);
      }
    }
    return sortBy(partialResults, 'time');
  }

  static getTopFarms(filter, max_results = 10) {
    const unsortedResults = calculateUpcomingFarms(filter);
    const sortedResults = sortBy(unsortedResults, (result) => -(result.duration));
    return sortedResults.slice(0, max_results);
  }

  static getMultipleTopFarms(filters, max_results = 10) {
    const partialResults = [];
    for (let i = 0; i < filters.length; i++) {
      const partialResult = this.getTopFarms(filters[i]).slice(0, max_results);
      for (let j = 0; j < partialResult.length; j++) {
        partialResults.push(partialResult[j]);
      }
    }

    // Sort by time first, then by most concurrent weathers
    let results = sortBy(partialResults, 'time');
    results = sortBy(results, (result) => -(result.duration));

    return results.slice(0, max_results);
  }
}

export default UpcomingSpawnCalculator;
