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

  static getFriendlyHolsterSetName(set) {
    return holsters[set].name;
  }

  static getAvailableHolsterSets() {
    const holsterSetKeys = Object.keys(holsters);
    const holsterSets = {};
    for (let i in holsterSetKeys) {
      holsterSets[holsterSetKeys[i]] = holsters[holsterSetKeys[i]].name
    }
    return holsterSets;
  }

  static getHolsterNames(type) {
    const holsterNameKeys = Object.keys(holsters[type].holsters);
    const holsterNames = {};
    for (let i in holsterNameKeys) {
      const holsterData = holsters[type].holsters[holsterNameKeys[i]];
      holsterNames[holsterNameKeys[i]] = {
        name: holsterData.name,
        role: holsterData.role,
        icon: holsterData.icon
      };
    }
    return holsterNames;
  }
}

export default DRSHolsterHelper;