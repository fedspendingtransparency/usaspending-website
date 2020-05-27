import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    content: PropTypes.object, // Pass in a JSX object here as a render prop
    closeTooltip: PropTypes.func,
    showInfoTooltip: PropTypes.bool
};

const tooltipWidth = 160;
const margin = 15;
const tooltipPadding = 6;

export default class RecipientTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            iconTop: 0,
            iconLeft: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    getPosition() {
        const icon = document.getElementById('recipient__info_icon');
        const iconTop = (icon.getBoundingClientRect().top - tooltipPadding) + window.scrollY;

        let iconLeft = icon.getBoundingClientRect().left - tooltipPadding;

        const windowWidth = window.innerWidth;
        if ((iconLeft + tooltipWidth) > windowWidth) {
            iconLeft = windowWidth - tooltipWidth - margin;
        }

        return { iconTop, iconLeft };
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.props.showInfoTooltip && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.closeTooltip();
        }
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            const position = this.getPosition();

            this.setState({
                windowWidth,
                iconTop: position.iconTop,
                iconLeft: position.iconLeft
            });
        }
    }

    render() {
        return (
            <div
                ref={this.setWrapperRef}
                className="recipient-tooltip"
                onMouseLeave={this.props.closeTooltip}
                onBlur={this.props.closeTooltip}
                style={{
                    top: this.state.iconTop,
                    left: this.state.iconLeft
                }}>
                <div className="recipient-tooltip__info_icon">
                    <Icons.InfoCircle />
                </div>
                <div className="recipient-tooltip__text_holder">
                    <div className="recipient-tooltip__tooltip_title">
                        Loan Face Value
                    </div>
                    <div className="recipient-tooltip__tooltip_text">
                        <p>
                            From a budget perspective, loan face value is not considered Federal spending, since it does not in itself represent a long-term cost to the government.
                        </p>
                        <p>
                            The actual budgetary Federal spending associated with the face value of these loan dollars is known as their subsidy cost. Subsidy cost is the calculated net present value of the loan or loan guarantee to the government, taking into account the interest rate and the modeled risk of the recipient failing to pay back the loan in part or full; subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Subsidy cost should never be larger in absolute value terms than the face value itself. Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations.
                        </p>
                        <p>
                            All subsidy costs associated with loans this recipient has received during the filtered time period are captured within the &quot;Total Transaction&quot; number above and anywhere else on this page $ amounts are mentioned.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

RecipientTooltip.propTypes = propTypes;
