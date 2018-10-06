/**
 * CoreExecutiveDetails.js
 * Created by David Trinh 10/5/18
 */
import { formatMoney } from 'helpers/moneyFormatter';

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = new Map();
    if (data) {
        for (let i = 1; i < data.length; i++) {
            const name = data[i].name || '';
            console.log(name);
            const amount = formatMoney(data[i].amount) || 0;
            if (name) {
                executiveCompensation.set(`Officer ${i}`, `${name} - ${amount}`);
            }
            else {
                executiveCompensation.set(`Officer ${i}`, '--');
            }
        }
    }
    else {
        for (let i = 1; i < data.length; i++) {
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
