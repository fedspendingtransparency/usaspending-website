/**
 * CoreExecutiveDetails.js
 * Created by David Trinh 10/5/18
 */
import { formatMoney } from 'helpers/moneyFormatter';

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = new Map();
    if (data) {
        data.forEach((officer, index) => {
            const name = officer.name || '';
            const amount = formatMoney(officer.amount) || 0;
            if (name) {
                executiveCompensation.set(`Officer ${index + 1}`, `${name} - ${amount}`);
            }
            else {
                executiveCompensation.set(`Officer ${index + 1}`, '--');
            }
        });
    }
    else {
        for (let i = 1; i < 6; i++) {
            executiveCompensation.set(`Officer ${i}`, '--');
        }
    }
    return executiveCompensation;
};

const CoreExecutiveDetails = {
    populateCore(data) {
        this.officers = parseExecutiveCompensation(data.officers) || null;
    }
};

export default CoreExecutiveDetails;
