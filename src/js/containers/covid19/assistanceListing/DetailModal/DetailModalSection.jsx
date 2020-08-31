/**
 * DetailModalSection.jsx
 * Created by Jonathan Hill 08/31/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReadMore from 'components/covid19/ReadMore';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    readMore: PropTypes.bool
};

const DetailModalSection = (props) => {
    const description = props.readMore ?
        (<div className="usa-dt-modal__section__description"><ReadMore>{props.description}</ReadMore></div>) :
        (<div className="usa-dt-modal__section__description"><p>{props.description}</p></div>);
    return (
        <div className="usa-dt-modal__section">
            <div className="usa-dt-modal__section__titel">{props.title}</div>
            {description}
        </div>
    );
};

DetailModalSection.propTypes = propTypes;
export default DetailModalSection;
