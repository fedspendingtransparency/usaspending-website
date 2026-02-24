import { orderBy } from "lodash-es";
import { formatMoneyWithPrecision } from "helpers/moneyFormatter";

const parseResults = (data, total, sort, goDeeper, goToUnreported) => {
    const resultsArray = [];

    data.forEach((item) => {
        // Format obligated amount
        const obligatedAmount =
            formatMoneyWithPrecision(item.amount, 0);

        // Convert from decimal value to percentage and round to 2 decimal places
        const formattedPercentage = ((item.amount / total) * 100).toFixed(2);

        let percent = `${formattedPercentage}%`;
        if (percent === '0.00%') {
            percent = 'Less than 0.01%';
        }

        const name = item.name !== "Unreported Data" ? item.name : "Unreported Data*";
        const link = item.name !== "Unreported Data" ?
            () => goDeeper(item.id, name) :
            () => goToUnreported(item);

        const result = {
            Name: name,
            "Obligated Amount": obligatedAmount,
            "Percent of Total": percent,
            link
        };
        resultsArray.push(result);
    });

    return orderBy(
        resultsArray,
        [sort.field],
        [sort.direction]
    );
};

export default parseResults;
