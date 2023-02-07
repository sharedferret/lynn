export default class FarmType {
  static ALL = new FarmType('All');
  static EUREKA_NM = new FarmType('Eureka NM');
  static EUREKA_FARM = new FarmType('Eureka Farm');
  static FRAGMENT_FARM = new FarmType('Bozja Fragment Farm');

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `FarmType.${this.name}`;
  }
}