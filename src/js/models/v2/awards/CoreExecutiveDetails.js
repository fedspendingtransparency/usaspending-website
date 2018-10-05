/**
 * CoreExecutiveDetails.js
 * Created by David Trinh 10/5/18
 */
import { formatMoney } from 'helpers/moneyFormatter';

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = {};
    const officerLimit = 6;
    if (data) {
        for (let i = 1; i < officerLimit; i++) {
            const name = data[i].name || '';
            const amount = formatMoney(data[i].amount) || 0;
            if (name) {
                executiveCompensation[`Officer ${i}`] = `${name} - ${amount}`;
            }
            else {
                executiveCompensation[`Officer ${i}`] = '--';
            }
        }
    }
    else {
        for (let i = 1; i < officerLimit; i++) {
            executiveCompensation[`Officer ${i}`] = '--';
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
