/**
 * ParentIDVDetails.js
 * Created by Kwadwo Opoku-Debrah 12/12/18
 */

const ParentIDVDetails = {
    populateCore(data) {
        this.agency_id = data.agency_id || '';
        this.referenced_idv_agency_iden = data.referenced_idv_agency_iden || '--';
        this.piid = data.piid || '';
        this.parent_award_id = data.parent_award_id || '';
    }
};

export default ParentIDVDetails;
