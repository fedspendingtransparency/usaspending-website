/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import NAICSSearch from 'components/search/filters/naics/NAICSSearch';

const propTypes = {
    updateSelectedNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object,
    appliedNAICS: PropTypes.object
};

export class NAICSContainer extends React.Component {
    getNAICS = () => [
        {
            value: 11,
            label: 'Agriculture, Forestry, Fishing and Hunting',
            children: [
                {
                    value: 1111,
                    label: 'Oilseed and Grain Farming',
                    children: [
                        {
                            value: 111111,
                            label: 'More Oilseed Stuff and Grain Farming'
                        },
                        {
                            value: 111112,
                            label: 'Even More Oilseed Stuff and Grain Farming'
                        }
                    ]
                },
                {
                    value: 1112,
                    label: 'Vegetable and Melon Farming',
                    children: [
                        {
                            value: 111211,
                            label: 'Potato Farming'
                        },
                        {
                            value: 111219,
                            label: 'Other Vegetable (except Potato) and Melon Farming'
                        }
                    ]
                },
                {
                    value: 1114,
                    label: 'Greenhouse, Nursery, and Floriculture Production',
                    children: [
                        {
                            value: 111411,
                            label: 'More Greenhouse, Nursery, and Floriculture Production'
                        },
                        {
                            value: 111412,
                            label: 'Even More Greenhouse, Nursery, and Floriculture Production'
                        }
                    ]
                },
                {
                    value: 1119,
                    label: 'Other Crop Farming',
                    children: [
                        {
                            value: 111911,
                            label: 'More Other Crop Farming'
                        },
                        {
                            value: 111912,
                            label: 'Even More Other Crop Farming'
                        }
                    ]
                },
                {
                    value: 1121,
                    label: 'Cattle Ranching and Farming',
                    children: [
                        {
                            value: 112111,
                            label: 'More Cattle Ranching and Farming'
                        },
                        {
                            value: 112112,
                            label: 'Even More Cattle Ranching and Farming'
                        }
                    ]
                },
                {
                    value: 1122,
                    label: 'Hog and Pig Farming',
                    children: [
                        {
                            value: 112211,
                            label: 'More Hog and Pig Farming'
                        },
                        {
                            value: 112212,
                            label: 'Even More Hog and Pig Farming'
                        }
                    ]
                },
                {
                    value: 1123,
                    label: 'Poultry and Egg Production',
                    children: [
                        {
                            value: 112311,
                            label: 'More Poultry and Egg Production'
                        },
                        {
                            value: 112312,
                            label: 'Even More Poultry and Egg Production'
                        }
                    ]
                },
                {
                    value: 1124,
                    label: 'Sheep and Goat Farming',
                    children: [
                        {
                            value: 112411,
                            label: 'More Sheep and Goat Farming'
                        },
                        {
                            value: 112412,
                            label: 'Even More Sheep and Goat Farming'
                        }
                    ]
                },
                {
                    value: 1125,
                    label: 'Aquaculture',
                    children: [
                        {
                            value: 112511,
                            label: 'More Aquaculture'
                        },
                        {
                            value: 112512,
                            label: 'Even More Aquaculture'
                        }
                    ]
                },
                {
                    value: 1129,
                    label: 'Other Animal Production',
                    children: [
                        {
                            value: 112911,
                            label: 'More Other Animal Production'
                        },
                        {
                            value: 112912,
                            label: 'Even More Other Animal Production'
                        }
                    ]
                }
            ]
        },
        {
            value: 21,
            label: 'Mining, Quarrying, and Oil and Gas Extraction',
            children: [
                {
                    value: 2111,
                    label: 'Oil and Gas Extraction',
                    children: [
                        {
                            value: 211120,
                            label: 'Crude Petroleum Extraction'
                        },
                        {
                            value: 211130,
                            label: 'Natural Gas Extraction'
                        }
                    ]
                },
                {
                    value: 2121,
                    label: 'Coal Mining',
                    children: [
                        {
                            value: 212111,
                            label: 'Bituminous Coal and Lignite Surface Mining'
                        },
                        {
                            value: 212112,
                            label: 'Bituminous Coal Underground Mining'
                        },
                        {
                            value: 212113,
                            label: 'Anthracite Mining'
                        }
                    ]
                }
            ]
        },
        {
            value: 54,
            label: 'Professional, Scientific, and Technical Services',
            children: [
                {
                    value: 5411,
                    label: 'Legal Services'
                },
                {
                    value: 5412,
                    label: 'Accounting, Tax Preparation, Bookkeeping, and Payroll Services'
                }
            ]
        },
        {
            value: 55,
            label: 'Management of Companies and Enterprises',
            children: [
                {
                    value: 5511,
                    label: 'Management of Companies and Enterprises'
                }
            ]
        },
        {
            value: 56,
            label: 'Administrative and Support and Waste Management and Remediation Services	',
            children: [
                {
                    value: 5611,
                    label: 'Office Administrative Services'
                },
                {
                    value: 5612,
                    label: 'Facilities Support Services'
                }
            ]
        },
        {
            value: 61,
            label: 'Educational Services',
            children: [
                {
                    value: 6111,
                    label: 'Elementary and Secondary Schools'
                },
                {
                    value: 6112,
                    label: 'Junior Colleges'
                }
            ]
        },
        {
            value: 62,
            label: 'Health Care and Social Assistance',
            children: [
                {
                    value: 6211,
                    label: 'Offices of Physicians'
                },
                {
                    value: 6212,
                    label: 'Offices of Dentists'
                }
            ]
        },
        {
            value: 71,
            label: 'Arts, Entertainment, and Recreation',
            children: [
                {
                    value: 7111,
                    label: 'Performing Arts Companies'
                },
                {
                    value: 7112,
                    label: 'Spectator Sports',
                    children: [
                        {
                            value: 711211,
                            label: 'Sports Teams and Clubs'
                        },
                        {
                            value: 711212,
                            label: 'Racetracks'
                        },
                        {
                            value: 711219,
                            label: 'Other Spectator Sports'
                        }
                    ]
                }
            ]
        }
    ];

    selectNAICS = (naics, isValid) => {
        // If naics exists and is valid
        if (naics !== null && isValid) {
            const updateParams = {};
            updateParams.naics = naics;
            this.props.updateSelectedNAICS(updateParams);
        }
    }

    removeNAICS = (naics) => {
        const updateParams = {};
        updateParams.naics = naics;
        this.props.updateSelectedNAICS(updateParams);
    }

    dirtyFilters = () => {
        if (is(this.props.selectedNAICS, this.props.appliedNAICS)) {
            return null;
        }
        return Symbol('dirty NAICS');
    }

    render() {
        return (
            <div>
                <NAICSSearch
                    className="naics-search-container"
                    selectedNAICS={this.props.selectedNAICS}
                    dirtyFilters={this.dirtyFilters()}
                    selectNAICS={this.selectNAICS}
                    removeNAICS={this.removeNAICS} />
                <CheckboxTree
                    nodes={this.getNAICS()} />
            </div>
        );
    }
}

NAICSContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedNAICS: state.filters.selectedNAICS,
        appliedNAICS: state.appliedFilters.filters.selectedNAICS
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(NAICSContainer);
