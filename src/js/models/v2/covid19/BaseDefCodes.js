/**
 * BaseDefCodes.js
 * Created by Jonathan Hill 06/19/20
 */

const BaseDefCodes = {
    populate(data) {
        this._code = data.code || '';
        this._publicLaw = data.public_law || '';
        this._title = data.title || '';
        this._urls = data.urls || [];
        this._disaster = data.disaster || '';
    },
    get publicLaw() {
        if (!this._publicLaw) return '';
        const emergencyText = this._publicLaw.startsWith('Emergency') ? 'Emergency' : 'Non-Emergency';
        const lawCode = this._publicLaw.split(' ').pop();
        return `${emergencyText} Public Law ${lawCode}`;
    }
};

export default BaseDefCodes;
