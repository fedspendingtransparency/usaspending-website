/**
 * ParentIDVDetails.js
 * Created by Kwadwo Opoku-Debrah 12/12/18
 */

const ParentIDVDetails = {
    populateCore(data) {
        this._parentDetails = data;
        this.agency_id = this.parentDetails.agency_id;
        this.referenced_idv_agency_iden = this.parentDetails.referenced_idv_agency_iden;
        this.piid = this.parentDetails.piid;
        this.parent_award_id = this.parentDetails.parent_award_id;
    },
    get parentDetails() {
        if (this._parentDetails) {
            const parentDetails = this._parentDetails.split('_');
            return {
                agency_id: parentDetails[2] === '-NONE-' ? '' : parentDetails[2],
                referenced_idv_agency_iden: parentDetails[3] === '-NONE-' ? '--' : parentDetails[3],
                piid: parentDetails[4] === '-NONE-' ? '' : parentDetails[4],
                parent_award_id: parentDetails[5] === '-NONE-' ? '' : parentDetails[5]
            };
        }
        return {
            agency_id: '',
            referenced_idv_agency_iden: '',
            piid: '',
            parent_award_id: ''
        };
    }
};

export default ParentIDVDetails;
