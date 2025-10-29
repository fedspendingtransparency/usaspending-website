import React from 'react';
import { NewPicker } from "data-transparency-ui";

import ChartTableToggle from "../../sharedComponents/buttons/ChartTableToggle";
// import AwardTypeToggle from '../../sharedComponents/buttons/AwardTypeToggle';

const SearchSectionWrapperHeader = ({
    selectedDropdownOption,
    sectionTitle,
    dropdownOptions,
    viewType,
    // showToggle,
    // onToggle,
    changeView
}) => {
    const wrapperWidth = document.querySelector('.search__section-wrapper-content')?.clientWidth;
    const sortFn = () => dropdownOptions;

    return (
        <>
            {selectedDropdownOption ?
                <div className="search__section-wrapper-header">
                    <span className="filter__dropdown-label">{sectionTitle}</span>
                    <NewPicker
                        leftIcon=""
                        size="md"
                        options={dropdownOptions}
                        enabled
                        selectedOption={dropdownOptions?.length
                            ? dropdownOptions?.find(
                                (obj) => obj.value === selectedDropdownOption
                            )?.name
                            :
                            `${selectedDropdownOption}`}
                        sortFn={sortFn}
                        classname="advanced-search-dropdown__wrapper"
                        buttonClassname="advanced-search-dropdown__button"
                        parentWidth={wrapperWidth} />
                    <ChartTableToggle
                        activeType={viewType}
                        changeView={changeView}
                        classname="search__chart-table-toggle" />
                </div>
                :
                <>
                    <div className="search__section-wrapper-header">
                        <span className="filter__dropdown-label">{sectionTitle}</span>
                        {
                            // bring back when grouped tables are ready for desktop
                            //      {showToggle &&
                            //          <AwardTypeToggle
                            //              spendingLevel={spendingLevel}
                            //              onToggle={onToggle} />
                            //      }
                        }
                    </div>
                    {
                        // bring back when grouped tables are ready for mobile
                        // {showToggle &&
                        //     <div className="award-type-toggle__mobile">
                        //         <AwardTypeToggle
                        //              spendingLevel={spendingLevel}
                        //              onToggle={onToggle} />
                        //     </div>
                        // }
                    }
                </>
            }
        </>
    );
};

export default SearchSectionWrapperHeader;
