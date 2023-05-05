/**
 * DrilldownSidebar.jsx
 * Created by Lizzie Salita 10/29/21
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DrilldownSidebarLevel from './DrilldownSidebarLevel';

const propTypes = {
    toggle: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    goBack: PropTypes.func,
    fy: PropTypes.string.isRequired,
    selectedLevelDataList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        budgetaryResources: PropTypes.string,
        obligations: PropTypes.string
    }))
};

const DrilldownSidebar = ({
    toggle,
    level,
    goBack,
    fy,
    selectedLevelDataList,
    goBackEngaged
}) => {
    const { agencyBudgetShort, agencyObligatedShort } = useSelector((state) => state.agency.budgetaryResources?.[fy]) || '--';
    const { toptierCode } = useSelector((state) => state.agency.overview) || '--';
    const outlay = useSelector((state) => state.agency.agencyOutlays[toptierCode]) || '--';
    const agencyName = useSelector((state) => state.agency.overview.name);

    const subComponentName = useSelector((state) => state.agency.selectedSubcomponent?.name);
    const subComponentTbr = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedSubcomponent?._budgetaryResources), 2);
    useSelector((state) => state.agency.selectedSubcomponent?._budgetaryResources);
    const subComponentObligation = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedSubcomponent?._obligations), 2);
    const subComponentOutlays = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedSubcomponent?._outlays), 2);

    const federalAccountName = `${useSelector((state) => state.agency.selectedFederalAccount?.id)}: ${useSelector((state) => state.agency.selectedFederalAccount?.name)}`;
    const federalAccountTbr = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedFederalAccount?._budgetaryResources), 2);
    useSelector((state) => state.agency.selectedFederalAccount?._budgetaryResources);
    const federalAccountObligation = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedFederalAccount?._obligations), 2);
    const federalAccountOutlays = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedFederalAccount?._outlays), 2);

    const tasName = useSelector((state) => state.agency.selectedTas?.name);
    useSelector((state) => state.agency.selectedFederalAccount?._budgetaryResources);
    const tasObligation = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedTas?._obligations), 2);
    const tasOutlays = MoneyFormatter.formatMoneyWithUnitsShortLabel(useSelector((state) => state.agency.selectedTas?._outlays), 2);


    console.log('selectedLevelDataList', selectedLevelDataList);

    // const formatName = (selectedLevel, index) => {
    //     if (selectedLevel === 2 && index === 1 && !goBackEngaged) {
    //         return `${selectedLevelDataList[index]?.id}: ${selectedLevelDataList[index]?.name}`;
    //     }
    //
    //     return selectedLevelDataList[index]?.name;
    // };
    //
    // const obligatedText = level === 3 ? (
    //     <div className="drilldown-level__description">
    //         <strong>{obligated}</strong> committed
    //     </div>
    // ) : (
    //     <div className="drilldown-level__description">
    //         <strong>{obligated}</strong> committed of <strong>{budgetaryResources}</strong> Total
    //         Budgetary Resources
    //     </div>
    // );

    return (
        <>
            <DrilldownSidebarLevel
                name={agencyName}
                label="Parent Agency"
                active={level === 0}
                obligatedText={(
                    <div className="drilldown-level__description">
                        <strong>{agencyObligatedShort}</strong> committed of <strong>{agencyBudgetShort}</strong> Total
                        Budgetary Resources
                    </div>
                )}
                toggle={toggle}
                outlay={MoneyFormatter.formatMoneyWithUnitsShortLabel(outlay, 2)} />
            {/* {levels.map((dataType, i) => ((i < level) ? ( */}
            {/*     <DrilldownSidebarLevel */}
            {/*         key={dataType} */}
            {/*         active={level === i + 1} */}
            {/*         name={formatName(level, i)} */}
            {/*         label={dataType} */}
            {/*         obligated={selectedLevelDataList[i]?.total_obligations ? selectedLevelDataList[i].total_obligations : MoneyFormatter.formatMoneyWithUnitsShortLabel(selectedLevelDataList[i]?._obligations, 2)} */}
            {/*         budgetaryResources={selectedLevelDataList[i]?.total_budgetary_resources ? selectedLevelDataList[i].total_budgetary_resources : MoneyFormatter.formatMoneyWithUnitsShortLabel(selectedLevelDataList[i]?._budgetaryResources, 2)} */}
            {/*         goBack={goBack} */}
            {/*         toggle={toggle} */}
            {/*         outlay={MoneyFormatter.formatMoneyWithUnitsShortLabel(selectedLevelDataList[i]?._outlays, 2)} */}
            {/*         level={level} /> */}
            {/* ) : '') */}
            {/* )} */}
            {level >= 1 &&
                <DrilldownSidebarLevel
                    key="Sub-Component"
                    label="Sub-Component"
                    active={level === 1}
                    name={subComponentName}
                    obligatedText={(
                        <div className="drilldown-level__description">
                            <strong>{subComponentObligation}</strong> committed of <strong>{subComponentTbr}</strong> Total
                            Budgetary Resources
                        </div>
                    )}
                    outlay={subComponentOutlays}
                    goBack={goBack}
                    toggle={toggle} />
            }
            {level >= 2 &&
                <DrilldownSidebarLevel
                    key="Federal Account"
                    label="Federal Account"
                    active={level === 2}
                    name={federalAccountName}
                    obligatedText={(
                        <div className="drilldown-level__description">
                            <strong>{federalAccountObligation}</strong> committed of <strong>{federalAccountTbr}</strong> Total
                            Budgetary Resources
                        </div>
                    )}
                    outlay={federalAccountOutlays}
                    goBack={goBack}
                    toggle={toggle} />
            }
            {level >= 3 &&
                <DrilldownSidebarLevel
                    key="Treasury Account Symbol"
                    label="Treasury Account Symbol"
                    name={tasName}
                    active={level === 3}
                    obligatedText={(
                        <div className="drilldown-level__description">
                            <strong>{tasObligation}</strong> committed
                        </div>
                    )}
                    outlay={tasOutlays}
                    goBack={goBack}
                    toggle={toggle} />
            }
        </>
    );
};

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
