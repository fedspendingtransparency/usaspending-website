/**
 * DefCodesModel.js
 * Created by Jonathan Hill 06/19/20
 */

const defCodesModel = {
    populate(data) {
        this._code = data.code || null;
        this._publicLaw = data.public_law || null;
        this._title = data.title || null;
        this._urls = data.urls || [];
        this._disaster = data.disaster || null;
    },
    get publicLaw() {
        if (!this._publicLaw) return null;
        const emergencyText = this._publicLaw.startsWith('Emergency') ? 'Emergency' : 'Non-Emergency';
        const lawCode = this._publicLaw.split(' ').pop();
        return `${emergencyText} Public Law ${lawCode}`;
    }
};

export default defCodesModel;
