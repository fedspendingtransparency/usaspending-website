/**
 * CoreExecutiveDetails.js
 * Created by David Trinh 10/9/18
 */
import { formatMoney } from 'helpers/moneyFormatter';

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = {};
    if (data && data.length > 0) {
        data.forEach((officer, index) => {
            const name = officer.name || '';
            const amount = formatMoney(officer.amount) || 0;
            if (name) {
                executiveCompensation[`Officer ${index + 1}`] = `${name} - ${amount}`;
            }
            else {
                executiveCompensation[`Officer ${index + 1}`] = '--';
            }
        });
    }
    else {
        for (let i = 1; i < 6; i++) {
            executiveCompensation[`Officer ${i}`] = '--';
        }
    }
    return executiveCompensation;
};

const CoreExecutiveDetails = {
    populateCore(data) {
        this.officers = parseExecutiveCompensation(data.officers);
    }
};

export default CoreExecutiveDetails;
