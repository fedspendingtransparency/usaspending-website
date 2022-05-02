
const BaseAgencySubagencyCount = {
    populate(data) {
    // eslint-disable-next-line camelcase
        this.subagencyCount = data?.sub_agency_count || '--';
        // eslint-disable-next-line camelcase
        this.officeCount = data?.office_count || '--';
        // eslint-disable-next-line camelcase
        this.newAwardCount = data?.new_award_count || '--';
        // eslint-disable-next-line camelcase
        this.transactionCount = data?.transaction_count || '--';
        this.obligations = data?.obligations || '--';
    }
};

export default BaseAgencySubagencyCount;
