import DRSHolsterHelper from "../drs/lib/DRSHolsterHelper";
import axios from 'axios';

let instance;

class UniversalisPriceHelper {
  constructor() {
    if (instance) {
      throw new Error('Duplicate UniversalisPriceHelper object');
    }
    this.priceData = {}
    instance = this;
  }

  fetchIDs(ids, updateGuideState) {
    // Check if any of these already exist; if so, ignore them.
    const idsToFetch = ids.reduce((result, i) => {
      const lostActionData = DRSHolsterHelper.getLostActionData(i);
      if (lostActionData) {
        const fragmentData = DRSHolsterHelper.getFragmentData(lostActionData.fragment);
        if (!this.priceData[lostActionData.fragment]) {
          result.push(fragmentData.id);
        }
      }
      
      return result;
    }, []);

    if (idsToFetch.length > 0) {
      axios.get('https://universalis.app/api/v2/North-America/' + idsToFetch.join(',') + '?listings=3')
      .then(response => {
        if (response.data.itemID) {
          const id = response.data.itemID;
          const fragmentName = DRSHolsterHelper.getFragmentNameForId(id);
          const data = response.data;
          this.addPrice(fragmentName, data);
        } else {
          for (let i in response.data.itemIDs) {
            const id = response.data.itemIDs[i];
            const fragmentName = DRSHolsterHelper.getFragmentNameForId(id);
            const data = response.data.items[id];
            this.addPrice(fragmentName, data);
          }
        }

        

        updateGuideState(this.getPriceData());
      }, error => {
        console.log(error);
      });
    }
  }

  addPrice(fragmentName, data) {
    this.priceData[fragmentName] = {
      averagePrice: Math.round(data.averagePrice),
      cheapestListings: data.listings
    }
  }

  getPriceData() {
    return this.priceData;
  }

  getPrices(fragmentName) {
    return this.priceData[fragmentName];
  }
}

let universalisPriceHelperInstance = Object.freeze(new UniversalisPriceHelper());

export default universalisPriceHelperInstance;