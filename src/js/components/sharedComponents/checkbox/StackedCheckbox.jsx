/**
 * StackedCheckbox.jsx
 * Created by Brian Petway on 11/06/24.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import { EntityDropdownAutocomplete } from "../../search/filters/location/EntityDropdownAutocomplete";
// import PrimaryStackedCheckbox from "./PrimaryStackedCheckbox";

const propTypes = {
    dataArray: PropTypes.array,
    getRecipientsFromSearchString: PropTypes.func
};

const StackedCheckbox = ({ dataArray, getRecipientsFromSearchString }) => {
    const [searchString, setSearchString] = useState('');

    const handleTextInputChange = (e) => {
        if (e.target.value.length >= 3) {
            setSearchString(e.target.value);
        }
    };

    useEffect(() => {
        getRecipientsFromSearchString(searchString);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    // const itemList = dataArray.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((item, index) => (
    //     <PrimaryStackedCheckbox
    //         index={index}
    //         checkboxLabel="UEI: "
    //         checkboxLabelContent={item.uei ? item.uei : 'Not provided'}
    //         subheadingLabel="Legacy DUNS: "
    //         subheadingLabelContent={item.duns ? item.duns : 'Not provided'}
    //         itemName={item.name}
    //         itemLabelAfterName={levelMapping[recipient.recipient_level]}
    //         toggleRecipient={toggleRecipient}
    //         getRecipientsFromSearchString={getRecipientsFromSearchString} />
    // ));

    return (
        <div className="stacked-checkbox__container">
            <EntityDropdownAutocomplete
                placeholder="Search filters..."
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                loading={false}
                searchIcon />

            {/* {itemList}*/}

        </div>
    );
};

StackedCheckbox.propTypes = propTypes;
export default StackedCheckbox;
