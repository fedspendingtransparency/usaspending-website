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
        this.toptierId = data.toptierId || '';
        this.subtierName = data.subtierName || '';
        this.subtierAbbr = data.subtierAbbr || '';
        this.subtierId = data.subtierId || '';
        this.officeName = data.officeName || '';
        this.officeId = data.officeId || '';
    },
    get formattedToptier() {
        if (this.toptierAbbr) {
            return `${this.toptierName} (${this.toptierAbbr})`;
        }
        return this.toptierName;
    }
};

export default CoreAwardAgency;
