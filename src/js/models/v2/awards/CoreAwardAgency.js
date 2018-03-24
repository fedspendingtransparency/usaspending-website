/**
 * CoreAwardAgency.js
 * Created by Lizzie Salita 3/5/18
 */

const CoreAwardAgency = {
    name: '--',
    populateCore(data) {
        this.name = data.name || '--';
        this.subtierName = data.subtierName || '';
        this.officeName = data.officeName || '';
    }
};

export default CoreAwardAgency;
