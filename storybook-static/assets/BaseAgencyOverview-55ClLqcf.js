import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
//#region src/js/models/v2/agency/BaseAgencyOverview.js
var BaseAgencyOverview;
var init_BaseAgencyOverview = __esmMin((() => {
	BaseAgencyOverview = {
		populate(data) {
			this._name = data.name || "";
			this._abbreviation = data.abbreviation || "";
			this.website = data.website || "";
			this.id = data.agency_id || "";
			this.toptierCode = data.toptier_code || "";
			this.logo = data.icon_filename || "";
			this.mission = data.mission || "Not Available";
			this.congressionalJustification = data.congressional_justification_url || "";
			this.showAboutData = data.about_agency_data || false;
			this._defCodes = data.def_codes;
		},
		get covidDefCodes() {
			return this._defCodes.filter(({ disaster: d }) => d === "covid_19");
		},
		get name() {
			const abbreviation = this._abbreviation ? ` (${this._abbreviation})` : "";
			return `${this._name}${abbreviation}`;
		}
	};
}));
//#endregion
export { init_BaseAgencyOverview as n, BaseAgencyOverview as t };
