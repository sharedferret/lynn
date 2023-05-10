const logograms = require('../../ba/lib/Logograms.json');
const logosActions = require('../../ba/lib/LogosActions.json');
const idToItem = require('../../acquisition/IDToItem.json');

class EurekaLogosActionHelper {
  static getLogosActionData(logosAction) {
    return logosActions.logosActions[logosAction];
  }

  static getLogosActions() {
    return logosActions.logosActions;
  }

  static getLogogramNameFromId(id) {
    return idToItem[id].name;
  }

  static getLogogramData(logogram) {
    return logograms.logograms[logogram];
  }

  static getLogogramForMneme(mneme) {
    const mnemeData = logograms.mnemes[mneme];
    if (mnemeData) {
      return mnemeData.logogram;
    }
    return null;
  }

  static getMnemeData(mneme) {
    return logograms.mnemes[mneme];
  }
}

export default EurekaLogosActionHelper;
