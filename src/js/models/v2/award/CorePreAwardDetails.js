/**
 * CorePreAwardDetails.js
 * Created by Andrea Blackwell 01/13/2025
 */

const emptyPreAwardDetails = () => {
    const preAwardDetails = {
        "Funding Opportunity Number": '--',
        "Funding Opportunity Goal Description": '--'
    };
    return preAwardDetails;
};

const parsePreAwardDetails = (data) => {
    const preAwardDetails = {};
    if (!data) return emptyPreAwardDetails();
    preAwardDetails["Funding Opportunity Number"] = data.number;
    preAwardDetails["Funding Opportunity Goal Description"] = data.goals;
    return preAwardDetails;
};

const CorePreAwardDetails = {
    populateCore(data) {
        this.preAwardDetails = parsePreAwardDetails(data);
    }
};

export default CorePreAwardDetails;
