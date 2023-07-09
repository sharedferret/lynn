const lostActions = require('./LostActions.json');
const fragments = require('./Fragments.json');
const idsToFragments = require('./IDsToFragments.json');
const codeToLostAction = require('./CodeToLostAction.json');

class DRSLostActionHelper {
  static getLostActionData(lostAction) {
    return lostActions.lostActions[lostAction];
  }

  static getLostActions() {
    return lostActions.lostActions;
  }

  static getFragmentData(fragment) {
    return fragments.fragments[fragment];
  }

  static calculateHolsterWeight(actionList) {
    let weight = 0;
    for (let i = 0; i < actionList.length; i += 1) {
      const inputAction = actionList[i];
      const action = lostActions.lostActions[inputAction.name];
      if (action !== undefined) {
        weight += action.weight * inputAction.quantity;
      }
    }
    return weight;
  }

  static getFragmentNameForId(id) {
    return idsToFragments[id];
  }

  static getLostActionFromCode(code) {
    return codeToLostAction[code];
  }

  static getCodeForLostAction(actionName) {
    const action = this.getLostActionData(actionName);
    return action.code;
  }
}

export default DRSLostActionHelper;
