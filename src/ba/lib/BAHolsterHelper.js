import { Buffer } from 'buffer';

const LogosActions = require('./LogosActions.json');
const CodeToLogosAction = require('./CodeToLogosAction.json');

class BAHolsterHelper {
  static getCodeForLogosAction(logosAction) {
    if (logosAction === null) {
      return '0';
    }
    return LogosActions.logosActions[logosAction].code;
  }

  static getLogosActionFromCode(code) {
    if (code === 0) {
      return null;
    }
    return CodeToLogosAction[code];
  }

  static encodeHolster(holster) {
    const holsterComponents = [];

    for (let i = 0; i < holster.length; i += 1) {
      const umbralCode = this.getCodeForLogosAction(holster[i].umbral) ?? '0';
      const astralCode = this.getCodeForLogosAction(holster[i].astral) ?? '0';
      holsterComponents.push(`${umbralCode}${astralCode}`);
    }

    const holsterString = holsterComponents.join(',');
    return Buffer.from(holsterString).toString('base64');
  }

  static decodeHolster(holsterString) {
    const encodedHolster = Buffer.from(holsterString, 'base64').toString();
    const trays = encodedHolster.split(',');

    const outputHolster = [];

    for (let i = 0; i < trays.length; i += 1) {
      const encodedTray = trays[i];
      const umbralAction = this.getLogosActionFromCode(encodedTray[0]);
      const astralAction = this.getLogosActionFromCode(encodedTray[1]);
      outputHolster.push({
        index: i,
        umbral: umbralAction,
        astral: astralAction,
      });
    }

    return outputHolster;
  }
}

export default BAHolsterHelper;
