/**
 * Base Parent Award Details.js
 * Created by Kwadwo Opoku-Debrah 12/12/18
 */

const parentAwardDetails = {
    populateCore(data) {
        this.awardId = data.generated_unique_award_id
            ? encodeURIComponent(`${data.generated_unique_award_id}`)
            : '';
        this.idvType = data.idv_type_description || '';
        this.idcType = data.type_of_idc_description || '';
        this.idvAgencyId = data.referenced_idv_agency_iden || '';
        this.agencyId = data.agency_id || '';
        this.agencyName = data.agency_name || '';
        this.agencySlug = data.agency_slug;
        this.subAgencyId = data.sub_agency_id || '';
        this.subAgencyName = data.sub_agency_name || '';
        this.multipleOrSingle = data.multiple_or_single_aw_desc || '';
        this.piid = data.piid || '';
    }
};

export default parentAwardDetails;
