import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlossaryLink from '../../components/sharedComponents/GlossaryLink';

const options = [
    {
        title: 'All COVID-19 Funding Laws', description: 'Data from all related DEFC', value: 'all', term: 'disaster-emergency-fund-code-defc'
    },
    { title: 'American Rescue Plan Act of 2021', description: 'Emergency PublicLaw 117-7 (DEFC V)', value: 'american-rescue-plan' },
    { title: 'Learn more about filtering USAspending data by Public Law in our Data Sources & Methodology page.', value: 'dsm', className: 'ds-and-m' }
];

const PublicLawPickerOption = ({ title, description, term }) => (
    <li>
        <p>{title}</p>
        <p>
            {description}
            {term && (
                <GlossaryLink term={term} />
            )}
        </p>
    </li>
);

PublicLawPickerOption.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    term: PropTypes.string
};

const PublicLawPicker = ({
    selectedOption = null,
    onClick
}) => {
    const selected = options.find((obj) => obj.value === selectedOption);
    return (
        <div className="public-law-picker__container">
            <Picker
                className="public-law-picker"
                icon={<FontAwesomeIcon icon="scroll" size="sm" />}
                selectedOption={selected?.title || options[0].title}
                options={options.map((obj) => ({ name: <PublicLawPickerOption {...obj} />, value: obj.value, onClick }))} />
            <span>Public Law Filter</span>
        </div>
    );
};

PublicLawPicker.propTypes = {
    selectedOption: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default PublicLawPicker;
