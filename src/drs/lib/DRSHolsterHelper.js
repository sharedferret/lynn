const holsters = require('./Holsters.json');
const lostActions = require('./LostActions.json');
const fragments = require('./Fragments.json');
const holsterModifications = require('./HolsterModifications.json');

class DRSHolsterHelper {
  static getHolsterData(type, loadoutName) {
    const holstersForType = holsters[type];
    if (holstersForType === undefined) {
      return null;
    }

    return holstersForType.holsters[loadoutName];
  }

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
    for (let i = 0; i < actionList.length; i++) {
      const inputAction = actionList[i];
      const action = lostActions.lostActions[inputAction.name];
      if (action !== undefined) {
        weight += action.weight * inputAction.quantity
      }
    }
    return weight;
  }
}

export default DRSHolsterHelper;