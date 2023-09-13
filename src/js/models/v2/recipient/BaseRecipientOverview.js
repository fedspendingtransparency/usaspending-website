/**
 * BaseRecipientOverview.js
 * Created by Lizzie Salita 6/14/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import CoreLocation from 'models/v2/CoreLocation';
import { recipientTypes } from 'dataMapping/search/recipientType';

const convertRecipientType = (type) => recipientTypes[type] || null;

const BaseRecipientOverview = {
    populate(data) {
        this.id = data.recipient_id || null;
        this.name = data.name || 'Name not provided';
        this.alternateNames = data.alternate_names || [];
        this.duns = data.duns;
        this.uei = data.uei;
        this.parentName = data.parent_name || '';
        this.parentDuns = data.parent_duns || '';
        this.parentUei = data.parent_uei;
        this.parentId = data.parent_id || '';
        this.parents = data.parents || [];
        this._totalAmount = parseFloat(data.total_transaction_amount) || 0;
        this._totalTransactions = parseFloat(data.total_transactions) || 0;

        // TODO: Update the object keys for face value loan after back end is implemented
        this._totalLoanFaceValueAmount = parseFloat(data.total_face_value_loan_amount) || 0;
        this._totalLoanTransactions = parseFloat(data.total_face_value_loan_transactions) || 0;
        this._businessTypes = data.business_types || [];
        this.level = data.recipient_level || 'R';

        // Recipient Location
        let locationData = {};
        if (data.location) {
            locationData = {
                address1: data.location.address_line1,
                address2: data.location.address_line2,
                address3: data.location.address_line3,
                province: data.location.foreign_province,
                city: data.location.city_name,
                county: data.location.county_name,
                stateCode: data.location.state_code,
                zip: data.location.zip,
                zip5: data.location.zip5,
                zip4: data.location.zip4,
                foreignPostalCode: data.location.foreign_postal_code,
                country: data.location.country_name || '',
                countryCode: data.location.location_country_code || '',
                congressionalDistrict: data.location.congressional_code
            };
        }
        const location = Object.create(CoreLocation);
        location.populateCore(locationData);
        this.location = location;
    },
    get totalAmount() {
        if (this._totalAmount >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalAmount);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalAmount / units.unit, 1)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._totalAmount, 0);
    },
    get totalTransactions() {
        return MoneyFormatter.formatNumberWithPrecision(this._totalTransactions, 0);
    },
    get totalLoanFaceValueAmount() {
        if (this._totalLoanFaceValueAmount >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalLoanFaceValueAmount);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalLoanFaceValueAmount / units.unit, 1)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._totalLoanFaceValueAmount, 0);
    },
    get totalLoanTransactions() {
        return MoneyFormatter.formatNumberWithPrecision(this._totalLoanTransactions, 0);
    },
    get businessTypes() {
        return this._businessTypes.reduce((parsed, type) => {
            const displayName = convertRecipientType(type);
            if (displayName) {
                parsed.push(displayName);
            }
            return parsed;
        }, []);
    }
};

export default BaseRecipientOverview;
