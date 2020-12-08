/**
 * BaseAgencyOverview.js
 * Created by Lizzie Salita 12/3/20
 */

const BaseAgencyOverview = {
    populate(data) {
        this._name = data?.name || '';
        this._abbreviation = data?.abbreviation || '';
        this.website = data?.website || '';
        this.id = data?.id || '';
    },
    get name() {
        const abbreviation = this._abbreviation ? ` (${this._abbreviation})` : '';
        return `${this._name}${abbreviation}`;
    }
};

export default BaseAgencyOverview;
