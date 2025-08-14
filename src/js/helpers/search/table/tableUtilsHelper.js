/**
 * tableUtilsHelper.js
 * Created by JD House on 7/17/2025.
 */

export const twoVariableFormat = (object, key1, key2) => {
    if (object?.[key1] && object?.[key2]) {
        return `${object[key1]} - ${object[key2]}`;
    }

    return "--";
};

export const assistanceListingFormat = (assistanceListing) => {
    // format for spending by award api
    if (assistanceListing?.length === 1) {
        const listing = assistanceListing[0];

        return `${listing.cfda_number} - ${listing.cfda_program_title}`;
    }
    else if (assistanceListing?.length > 1) {
        const listings = [];

        assistanceListing.forEach((listing) => {
            listings.push(`${listing.cfda_number} - ${listing.cfda_program_title}`);
        });

        return listings.join(', ');
    }

    return '--';
};

