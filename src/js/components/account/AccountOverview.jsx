/**
 * AccountOverview.jsx
 * Created by 3/20/17
 */

import React, {useState, useEffect, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import { SectionHeader } from "data-transparency-ui";

import * as MoneyFormatter from 'helpers/moneyFormatter';
import SankeyVisualization from './visualizations/sankey/SankeyVisualization';
import useFetchFederalAccountFYSnapshot from "../../containers/account/useFetchFederalAccountFYSnapshot";

const propTypes = {
    account: PropTypes.object,
    currentFiscalYear: PropTypes.string
};

const AccountOverview = ({ account, currentFiscalYear }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationWidth, setVisualizationWidth] = useState(0);

    const sankeyHr = useRef(null);

    const { response } = useFetchFederalAccountFYSnapshot(account, currentFiscalYear);

    useEffect(() => {
        const handleWindowResize = () => {
            // determine if the width changed
            const currentWindowWidth = window.innerWidth;
            if (windowWidth !== currentWindowWidth) {
                // width changed, update the visualization width
                setWindowWidth(currentWindowWidth);
                setVisualizationWidth(Math.min(1200, sankeyHr.current.offsetWidth));
            }
        };

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { summary, amounts, fyAvailable } = useMemo(() => {
        // determine the current fiscal year and get the associated values
        const fiscalYearAvailable = response?.totals.available;
        const newSummary = {
            flow: `No data is available for the current fiscal year (FY ${currentFiscalYear}).`,
            toDate: ''
        };
        let newAmounts;

        if (!fiscalYearAvailable) {
            newAmounts = {
                budgetAuthority: 0,
                out: {
                    obligated: 0,
                    unobligated: 0
                }
            };

            return {
                summary: newSummary,
                amounts: newAmounts,
                fyAvailable: fiscalYearAvailable
            }
        }

        const authorityValue = response.totals.budgetAuthority || 0;
        const obligatedValue = response.totals.obligated || 0;
        const balanceBroughtForwardValue = response.totals.balanceBroughtForward || 0;
        const otherValue = response.totals.otherBudgetaryResources || 0;
        const appropriationsValue = response.totals.appropriations || 0;

        const authUnits = MoneyFormatter.calculateUnitForSingleValue(authorityValue);
        const authority = `${MoneyFormatter.formatMoney(authorityValue / authUnits.unit)}\
${authUnits.unitLabel}`;

        const obUnits = MoneyFormatter.calculateUnitForSingleValue(obligatedValue);

        let percentObligated = 'N/A';
        if (authorityValue !== 0) {
            percentObligated = Math.round((obligatedValue / authorityValue) * 1000) / 10;
        }
        const amountObligated = `${MoneyFormatter.formatMoney(obligatedValue / obUnits.unit)}\
${obUnits.unitLabel}`;

        const bbfUnits = MoneyFormatter.calculateUnitForSingleValue(balanceBroughtForwardValue);
        const bbfString = `${MoneyFormatter.formatMoney(balanceBroughtForwardValue / bbfUnits.unit)}\
${bbfUnits.unitLabel}`;

        const appropUnits = MoneyFormatter.calculateUnitForSingleValue(appropriationsValue);
        const appropString = `${MoneyFormatter.formatMoney(appropriationsValue / appropUnits.unit)}\
${appropUnits.unitLabel}`;

        const otherUnits = MoneyFormatter.calculateUnitForSingleValue(otherValue);
        const otherString = `${MoneyFormatter.formatMoney(otherValue / otherUnits.unit)}\
${otherUnits.unitLabel}`;

        newSummary.flow = `For this current fiscal year, this agency has been granted authority to spend \
${authority} out of this federal account. They carried over a balance of ${bbfString} from last \
year, were given ${appropString} in new appropriations, and have authority to use ${otherString} \
of other budgetary resources.`;
        newSummary.toDate = `To date, ${percentObligated}% (${amountObligated}) of the total \
${authority} has been obligated.`;

        newAmounts = {
            budgetAuthority: authorityValue,
            out: {
                obligated: obligatedValue,
                unobligated: parseFloat(response.totals.unobligated)
            },
            in: {
                bbf: balanceBroughtForwardValue,
                other: otherValue,
                appropriations: appropriationsValue
            }
        };

        return {
            summary: newSummary,
            amounts: newAmounts,
            fyAvailable: fiscalYearAvailable
        }
    }, [response, currentFiscalYear]);

    return (
        <div className="account-overview">
            <SectionHeader
                title={account.title}
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <SectionHeader
                title={currentFiscalYear ? `FY ${currentFiscalYear} Snapshot` : 'FY'}
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr
                className="results-divider"
                ref={(div) => {
                    sankeyHr.current = div;
                }} />
            <div className="account-overview__content">
                <p>{summary.flow}</p>
                <p>{summary.toDate}</p>
            </div>
            <div className="sankey-wrapper">
                <SankeyVisualization
                    fyAvailable={fyAvailable}
                    amounts={amounts}
                    width={visualizationWidth}
                    height={340} />
            </div>
        </div>
    );
};

AccountOverview.propTypes = propTypes;
export default AccountOverview;
