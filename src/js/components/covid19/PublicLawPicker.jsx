import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlossaryLink from '../sharedComponents/GlossaryLink';

const options = [
    {
        title: 'All COVID-19 Funding Laws',
        value: 'all',
        term: 'disaster-emergency-fund-code-defc'
    },
    {
        title: 'American Rescue Plan',
        description: 'Non-emergency Public Law 117-2',
        value: 'american-rescue-plan'
    }
];

const PublicLawPickerOption = ({
    title,
    description,
    term,
    className
}) => (
    <li className={className}>
        <p>{title}</p>
        {description && (
            <p>
                {description}
                {term && (
                    <GlossaryLink term={term} />
                )}
            </p>)}
    </li>
);

PublicLawPickerOption.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    term: PropTypes.string,
    className: PropTypes.string
};

const backgroundColor = {
    backgroundColor: "#1a4480",
    ' @media(max-width: $medium-screen)': {
        backgroundColor: "#f1f1f1"
    }
};

const PublicLawPicker = ({
    selectedOption = null,
    onClick
}) => {
    const selected = options.find((obj) => obj.value === selectedOption);
    return (
        <div className="public-law-picker__container">
            <Picker
                backgroundColor={backgroundColor}
                className="public-law-picker"
                icon={<FontAwesomeIcon icon="scroll" size="sm" />}
                selectedOption={selected?.title || options[0].title}
                options={options.map((obj) => ({
                    name: <PublicLawPickerOption {...obj} />,
                    value: obj.value,
                    onClick
                }))} />
            <span>Public Law</span>
        </div>);
};

PublicLawPicker.propTypes = {
    selectedOption: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default PublicLawPicker;
