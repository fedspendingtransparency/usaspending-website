/**
 * CoreExecutiveDetails.js
 * Created by David Trinh 10/9/18
 */
import { formatMoney } from 'helpers/moneyFormatter';

const emptyExecutiveCompensation = () => {
    const executiveCompensation = {};
    for (let i = 1; i < 6; i++) {
        executiveCompensation[`Officer ${i}`] = '--';
    }
    return executiveCompensation;
};

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = {};
    if (!data) return emptyExecutiveCompensation();
    const officers = data.officers;
    if (officers && officers.length > 0) {
        officers.forEach((officer, index) => {
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
        return emptyExecutiveCompensation();
    }
    return executiveCompensation;
};

const CoreExecutiveDetails = {
    populateCore(data) {
        this.officers = parseExecutiveCompensation(data);
    }
};

export default CoreExecutiveDetails;
