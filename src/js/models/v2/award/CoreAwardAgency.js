/**
 * CoreAwardAgency.js
 * Created by David Trinh 10/9/18
 */

const CoreAwardAgency = {
    toptierName: '--',
    populateCore(data) {
        this.id = data.id || '';
        this.hasAgencyPage = data.hasAgencyPage || false;
        this.toptierName = data.toptierName || '--';
        this.toptierAbbr = data.toptierAbbr || '';
        this.toptierId = data.toptierId || '';
        this.subtierName = data.subtierName || '';
        this.subtierAbbr = data.subtierAbbr || '';
        this.subtierId = data.subtierId || '';
        this.officeName = data.officeName || '';
        this.officeId = data.officeId || '';
        this.agencySlug = data.agencySlug;
    },
    get formattedToptier() {
        if (this.toptierAbbr) {
            return `${this.toptierName} (${this.toptierAbbr})`;
        }
        return this.toptierName;
    }
};

export default CoreAwardAgency;
