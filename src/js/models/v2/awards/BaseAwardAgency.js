/**
 * BaseAwardAgency.js
 * Created by Lizzie Salita 3/5/18
 */

const BaseAwardAgency = {
    populate(data) {
        this.name = (data.toptier_agency && data.toptier_agency.name) || '';
        this.subtierName = (data.subtier_agency && data.subtier_agency.name) || '';
        this.officeName = (data.office_agency && data.office_agency.name) || '';
    }
};

export default BaseAwardAgency;
