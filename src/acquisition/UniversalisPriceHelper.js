import axios from 'axios';
import DRSHolsterHelper from '../drs/lib/DRSHolsterHelper';
import EurekaLogosActionHelper from '../eureka/lib/EurekaLogosActionHelper';

let instance;

const idToItem = require('./IDToItem.json');

class UniversalisPriceHelper {
  constructor() {
    if (instance) {
      throw new Error('Duplicate UniversalisPriceHelper object');
    }
    this.priceData = {};
    instance = this;
  }

  fetchIDs(ids, updateGuideState) {
    // Check if any of these already exist; if so, ignore them.
    const idsToFetch = ids.reduce((result, i) => {
      // Bozja
      const lostActionData = DRSHolsterHelper.getLostActionData(i);
      if (lostActionData) {
        const fragmentData = DRSHolsterHelper.getFragmentData(lostActionData.fragment);
        if (!this.priceData[lostActionData.fragment]) {
          result.push(fragmentData.id);
        }
      }

      // Eureka
      const logogramData = EurekaLogosActionHelper.getLogogramData(i);
      if (logogramData) {
        if (!this.priceData[logogramData.short]) {
          result.push(logogramData.id);
        }
      }

      return result;
    }, []);

    if (idsToFetch.length > 0) {
      axios.get(`https://universalis.app/api/v2/North-America/${idsToFetch.join(',')}?listings=3`)
        .then((response) => {
          if (response.data.itemID) {
            const id = response.data.itemID;
            const itemData = idToItem[id];
            let itemName = '';
            if (itemData.type === 'fragment') {
              itemName = DRSHolsterHelper.getFragmentNameForId(id);
            } else if (itemData.type === 'logogram') {
              itemName = EurekaLogosActionHelper.getLogogramNameFromId(id);
            }
            const { data } = response;
            this.addPrice(itemName, data);
          } else {
            for (const i in response.data.itemIDs) {
              const id = response.data.itemIDs[i];
              const itemData = idToItem[id];
              let itemName = '';
              if (itemData.type === 'fragment') {
                itemName = DRSHolsterHelper.getFragmentNameForId(id);
              } else if (itemData.type === 'logogram') {
                itemName = EurekaLogosActionHelper.getLogogramNameFromId(id);
              }
              const data = response.data.items[id];
              this.addPrice(itemName, data);
            }
          }

          updateGuideState(this.getPriceData());
        }, (error) => {
          console.log(error);
        });
    }
  }

  addPrice(fragmentName, data) {
    this.priceData[fragmentName] = {
      averagePrice: Math.round(data.averagePrice),
      cheapestListings: data.listings,
    };
  }

  getPriceData() {
    return this.priceData;
  }

  getPrices(fragmentName) {
    return this.priceData[fragmentName];
  }
}

const universalisPriceHelperInstance = Object.freeze(new UniversalisPriceHelper());

export default universalisPriceHelperInstance;
