import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlossaryLink from '../../components/sharedComponents/GlossaryLink';

const options = [
    {
        title: 'All COVID-19 Funding Laws', description: 'Data from all related DEFC', value: 'all', link: 'disaster-emergency-fund-code-defc'
    },
    { title: 'American Rescue Plan Act of 2021', description: 'Emergency PublicLaw 117-7 (DEFC V)', value: 'biden' },
    { title: 'Learn more about filtering USAspending data by Public Law in our Data Sources & Methodology page.', value: 'dsm', className: 'ds-and-m' }
];

const PublicLawPickerOption = ({ title, description, link }) => (
    <li>
        <p>{title}</p>
        <p>
            {description}
            {link && (
                <GlossaryLink term={link} currentUrl="disaster/covid-19" />
            )}
        </p>
    </li>
);

PublicLawPickerOption.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.shape({ term: PropTypes.string.isRequired, url: PropTypes.string.isRequired })
};

const PublicLawPicker = ({
    selectedOption = null
}) => {
    const defaultSelectedOption = options[0].title;
    return (
        <div className="public-law-picker__container">
            <Picker
                className="public-law-picker"
                icon={<FontAwesomeIcon icon="scroll" size="sm" />}
                selectedOption={selectedOption || defaultSelectedOption}
                options={options.map((obj) => ({ name: <PublicLawPickerOption {...obj} />, value: obj.value }))} />
            <span>Public Law Filter</span>
        </div>
    );
};

PublicLawPicker.propTypes = {
    selectedOption: PropTypes.string
};

export default PublicLawPicker;
