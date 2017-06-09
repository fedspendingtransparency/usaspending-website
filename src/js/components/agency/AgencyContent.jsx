/**
 * AgencyContent.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import { find } from 'lodash';
import jQuery from 'jquery';

import Router from 'containers/router/Router';

import ObjectClassContainer from 'containers/agency/visualizations/ObjectClassContainer';
import RecipientContainer from 'containers/agency/visualizations/RecipientContainer';

import AgencySidebar from './sidebar/AgencySidebar';
import AgencyOverview from './overview/AgencyOverview';

const agencySections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'obligatedAmount',
        label: 'Obligated Amount'
    },
    {
        section: 'objectClasses',
        label: 'Object Classes'
    },
    {
        section: 'recipients',
        label: 'Recipients'
    }
];

const propTypes = {
    agency: React.PropTypes.object
};

export default class AgencyContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSection: 'overview'
        };

        this.jumpToSection = this.jumpToSection.bind(this);
    }

    componentDidMount() {
        // auto-jump to a section if the section param is baked into the URL on mount
        this.jumpToSection();
    }

    jumpToSection(clickedSection = '') {
        // check if we should jump to a section
        const query = Router.state.query;
        if (query.section || (clickedSection && clickedSection !== '')) {
            let section = query.section;
            if (clickedSection && clickedSection !== '') {
                section = clickedSection;
            }

            // we've been provided a section to jump to
            // check if it's a valid section
            const matchedSection = find(agencySections, {
                section
            });

            if (!matchedSection) {
                // no matching section, invalid URL
                // reset the URL without the section
                Router.history.replace(Router.state.path);
                return;
            }

            // update the state
            this.setState({
                activeSection: section
            }, () => {
                // reset the URL without the section
                Router.history.replace(Router.state.path);

                // scroll to the correct section
                const sectionDom = document.querySelector(`#agency-${section}`);
                const sectionTop = sectionDom.offsetTop - 10;
                jQuery('body').animate({
                    scrollTop: sectionTop
                }, 700);
            });
        }
    }

    render() {
        return (
            <div className="agency-content-wrapper">
                <div className="agency-sidebar">
                    <AgencySidebar
                        active={this.state.activeSection}
                        sections={agencySections}
                        jumpToSection={this.jumpToSection} />
                </div>
                <div className="agency-content">
                    <AgencyOverview agency={this.props.agency.overview} />
                    <ObjectClassContainer
                        id={this.props.agency.id}
                        active_fy={this.props.agency.active_fy} />
                    <RecipientContainer id={this.props.agency.id} />
                </div>
            </div>
        );
    }
}

AgencyContent.propTypes = propTypes;
