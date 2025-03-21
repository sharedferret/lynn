class MapData {
  constructor() {
    this.dataSourceMapping = {
      hydatos: 'hydatos',
      bsf: 'bsf',
      bozja: 'bsf',
    };

    this.mapData = {};
  }

  fetchMapData = async (key) => {
    const dataSource = this.dataSourceMapping[key];

    if (!dataSource) {
      return null;
    }

    if (!this.mapData[key]) {
      const response = await fetch(`${process.env.PUBLIC_URL}/map/data/${key}.json`);
      if (response.ok) {
        this.mapData[key] = await response.json();
      } else {
        throw new Error(`Failed to fetch map data for ${key}`);
      }
    }

    console.log('returning data', this.mapData[key]);

    return this.mapData[key];
  };

  static instance = null;

  static getInstance() {
    if (!MapData.instance) {
      MapData.instance = new MapData();
    }
    return MapData.instance;
  }
}

export default MapData;
