const phantomJobs = require('./PhantomJobs.json');

class PhantomJobHelper {
  static getPhantomJobs() {
    return phantomJobs.phantomJobs;
  }

  static getPhantomJobData(phantomJob) {
    return phantomJobs.phantomJobs[phantomJob];
  }
}

export default PhantomJobHelper;
