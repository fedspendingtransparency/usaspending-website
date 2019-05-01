/**
 * AwardDescription.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { SpeechBubble, Glossary, AngleDown, AngleUp } from 'components/sharedComponents/icons/Icons';
import InfoTooltip from '../../idv/InfoTooltip';
import { descriptionInfo } from '../../idv/InfoTooltipContent';

const propTypes = {
    awardId: PropTypes.string,
    description: PropTypes.string,
    naics: PropTypes.string,
    psc: PropTypes.string
};

export default class AwardDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moreButton: true,
            buttonValue: 'More',
            arrowValue: (<AngleDown alt="See full description" />)
        };

        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton() {
        const button = !this.state.moreButton;
        let arrow = (<AngleDown alt="See full description" />);
        let value = 'More';
        if (this.state.buttonValue === 'More') {
            value = 'Less';
            arrow = (<AngleUp alt="Hide full description" />);
        }
        this.setState({
            moreButton: button,
            buttonValue: value,
            arrowValue: arrow
        });
    }

    render() {
        const maxChars = 300;
        let value = this.props.description;
        const overflow = value.length > maxChars;
        if (overflow && this.state.moreButton) {
            value = `${value.substring(0, maxChars)}...`;
        }

        let button = null;
        if (overflow) {
            button = (
                <button
                    onClick={this.toggleButton}
                    className="award-description__button">
                    {this.state.buttonValue}
                    <div className="award-description__button-icon">
                        {this.state.arrowValue}
                    </div>
                </button>
            );
        }

        return (
            <div className="award__col award-viz award-description">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <SpeechBubble />
                    </div>
                    <h3 className="award-viz__title">
                        Description
                    </h3>
                    <InfoTooltip left>
                        {descriptionInfo}
                    </InfoTooltip>
                </div>
                <hr />
                <div className="award-description__content">
                    <p className="award-description__description">
                        {value} {button}
                    </p>
                    <div className="award-description__naics-psc">
                        <div className="naics-psc__section">
                            <div className="naics-psc__heading">
                                NAICS
                                <div className="naics-psc__icon">
                                    <a href={`#/award/${this.props.awardId}/?glossary=naics`}>
                                        <Glossary />
                                    </a>
                                </div>
                            </div>
                            {this.props.naics}
                        </div>
                        <div className="naics-psc__section naics-psc__section_psc">
                            <div className="naics-psc__heading">
                                PSC
                                <div className="naics-psc__icon">
                                    <a href={`#/award/${this.props.awardId}/?glossary=productservice-code-psc`}>
                                        <Glossary />
                                    </a>
                                </div>
                            </div>
                            {this.props.psc}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AwardDescription.propTypes = propTypes;
