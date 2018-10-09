/**
 * CoreExecutiveDetails.js
 * Created by David Trinh 10/5/18
 */
import { formatMoney } from 'helpers/moneyFormatter';

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = {};
    if (data) {
        if (Array.isArray(data)) {
            data.forEach((officer, index) => {
                const name = officer.name || '';
                const amount = formatMoney(officer.amount) || 0;
                if (name) {
                    executiveCompensation[`officer${index + 1}`] = `${name} - ${amount}`;
                }
                else {
                    executiveCompensation[`officer${index + 1}`] = '--';
                }
            });
        } else {
            for (let i = 1; i < 6; i++) {
                const name = data[`officer_${i}_name`] || '';
                const amount = formatMoney(data[`officer_${i}_amount`]) || 0;
                if (name) {
                    executiveCompensation[`officer${i}`] = `${name} - ${amount}`;
                }
                else {
                    executiveCompensation[`officer${i}`] = '--';
                }
            }
        }
    }
    else {
        for (let i = 1; i < 6; i++) {
            executiveCompensation[`officer${i}`] = '--';
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
