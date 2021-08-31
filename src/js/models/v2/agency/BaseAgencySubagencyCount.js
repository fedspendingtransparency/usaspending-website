
const BaseAgencySubagencyCount = {
    populate(data) {
        // eslint-disable-next-line camelcase
        this.subagencyCount = data?.sub_agency_count || 0;
        // eslint-disable-next-line camelcase
        this.officeCount = data?.office_count || 0;
        // eslint-disable-next-line camelcase
        this.newAwardCount = data?.new_award_count || 0;
        // eslint-disable-next-line camelcase
        this.transactionCount = data?.transaction_count || 0;
        this.obligations = data?.obligations || 0;
    }
};

export default BaseAgencySubagencyCount;
