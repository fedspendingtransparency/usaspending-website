/**
 * CoreAwardAgency.js
 * Created by David Trinh 10/9/18
 */

const CoreAwardAgency = {
    toptierName: '--',
    populateCore(data) {
        this.id = data.id || '';
        this.toptierName = data.toptierName || '--';
        this.toptierAbbr = data.toptierAbbr || '';
        this.subtierName = data.subtierName || '';
        this.subtierAbbr = data.subtierAbbr || '';
        this.officeName = data.officeName || '';
    }
};

export default CoreAwardAgency;
