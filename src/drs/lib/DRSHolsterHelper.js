import { Buffer } from 'buffer';
import DRSLostActionHelper from './DRSLostActionHelper';

const holsters = require('./Holsters.json');

class DRSHolsterHelper {
  static getHolsterData(host, type, loadoutName) {
    const holstersForType = holsters.host[host].holsters[type];
    if (holstersForType === undefined) {
      return null;
    }

    return holstersForType.holsters[loadoutName];
  }

  static getFriendlyHolsterSetName(host, set) {
    return holsters.host[host].holsters[set].name;
  }

  static getAvailableHolsterSets() {
    const holsterSetKeys = Object.keys(holsters);
    const holsterSets = {};
    for (let i = 0; i < holsterSetKeys.length; i += 1) {
      holsterSets[holsterSetKeys[i]] = holsters[holsterSetKeys[i]].name;
    }
    return holsterSets;
  }

  static getHolsterNames(host, type) {
    const holsterNameKeys = Object.keys(holsters[host].holsters[type].holsters);
    const holsterNames = {};
    for (let i = 0; i < holsterNameKeys.length; i += 1) {
      const holsterData = holsters[host].holsters[type].holsters[holsterNameKeys[i]];
      holsterNames[holsterNameKeys[i]] = {
        name: holsterData.name,
        role: holsterData.role,
        icon: holsterData.icon,
      };
    }
    return holsterNames;
  }

  static getNeededActionsForBag(prepop, main, multiplier) {
    const actions = {};
    for (let i = 0; i < prepop.length; i += 1) {
      if (actions[prepop[i].name] > 0) {
        actions[prepop[i].name] += (prepop[i].quantity * multiplier);
      } else {
        actions[prepop[i].name] = (prepop[i].quantity * multiplier);
      }
    }

    for (let i = 0; i < main.length; i += 1) {
      if (actions[main[i].name] > 0) {
        actions[main[i].name] += (main[i].quantity * multiplier);
      } else {
        actions[main[i].name] = (main[i].quantity * multiplier);
      }
    }

    return actions;
  }

  static getDecodedQuantity(encodedQuantity) {
    const decodedQuantity = parseInt(encodedQuantity, 36);
    if (!decodedQuantity || decodedQuantity < 0 || decodedQuantity > 35) {
      return 1;
    }
    return decodedQuantity;
  }

  static encodeQuantity(quantity) {
    if (!quantity || quantity < 0 || quantity > 35) {
      return 1;
    }
    return quantity.toString(36);
  }

  static encodeHolster(prepopBag, mainBag) {
    const holsterComponents = [];

    for (let i = 0; i < prepopBag.length; i += 1) {
      if (prepopBag[i].name !== '') {
        const code = DRSLostActionHelper.getCodeForLostAction(prepopBag[i].name);
        if (code) {
          holsterComponents.push(`${DRSLostActionHelper.getCodeForLostAction(prepopBag[i].name)}${this.encodeQuantity(prepopBag[i].quantity)}`);
        }
      }
    }

    holsterComponents.push(',');

    for (let i = 0; i < mainBag.length; i += 1) {
      if (mainBag[i].name !== '') {
        const code = DRSLostActionHelper.getCodeForLostAction(mainBag[i].name);
        if (code) {
          holsterComponents.push(`${DRSLostActionHelper.getCodeForLostAction(mainBag[i].name)}${this.encodeQuantity(mainBag[i].quantity)}`);
        }
      }
    }

    const holsterString = holsterComponents.join('');

    return Buffer.from(holsterString).toString('base64');
  }

  static decodeHolster(holsterString) {
    const encodedHolster = Buffer.from(holsterString, 'base64').toString();
    const encodedBags = encodedHolster.split(',');

    const encodedPrepopBag = encodedBags[0];
    const prepopBagActions = encodedPrepopBag.match(/.{1,2}/g) ?? [];
    const prepopHolster = [];

    for (let i = 0; i < prepopBagActions.length; i += 1) {
      const encodedAction = prepopBagActions[i];
      if (encodedAction.length === 2) {
        const name = DRSLostActionHelper.getLostActionFromCode(encodedAction[0]);
        if (name) {
          prepopHolster.push({
            name,
            quantity: this.getDecodedQuantity(encodedAction[1]),
          });
        }
      }
    }

    const encodedMainBag = encodedBags[1] ?? '';
    const mainBagActions = encodedMainBag.match(/.{1,2}/g) ?? [];
    const mainHolster = [];

    for (let i = 0; i < mainBagActions.length; i += 1) {
      const encodedAction = mainBagActions[i];
      if (encodedAction.length === 2) {
        const name = DRSLostActionHelper.getLostActionFromCode(encodedAction[0]);
        if (name) {
          mainHolster.push({
            name,
            quantity: this.getDecodedQuantity(encodedAction[1]),
          });
        }
      }
    }

    const holstersToReturn = {
      prepop: prepopHolster,
      main: mainHolster,
    };

    return holstersToReturn;
  }
}

export default DRSHolsterHelper;
