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
    constructor(props) {
        super(props);
        this.state = {
            naics: []
        };
    }

    componentDidMount() {
        this.fetchNAICS();
    }

    fetchNAICS = () => {
        const naics = [
            {
                naics: '11',
                naics_description: 'Agriculture, Forestry, Fishing and Hunting',
                count: 20,
                children: [
                    {
                        naics: '1111',
                        naics_description: 'Oilseed and Grain Farming',
                        count: 2,
                        children: [
                            {
                                naics: '111111',
                                naics_description: 'More Oilseed Stuff and Grain Farming',
                                count: 0
                            },
                            {
                                naics: '111112',
                                naics_description: 'Even More Oilseed Stuff and Grain Farming',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1112',
                        naics_description: 'Vegetable and Melon Farming',
                        count: 2,
                        children: [
                            {
                                naics: '111211',
                                naics_description: 'Potato Farming',
                                count: 0
                            },
                            {
                                naics: '111219',
                                naics_description: 'Other Vegetable (except Potato) and Melon Farming',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1114',
                        naics_description: 'Greenhouse, Nursery, and Floriculture Production',
                        count: 2,
                        children: [
                            {
                                naics: '111411',
                                naics_description: 'More Greenhouse, Nursery, and Floriculture Production',
                                count: 0
                            },
                            {
                                naics: '111412',
                                naics_description: 'Even More Greenhouse, Nursery, and Floriculture Production',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1119',
                        naics_description: 'Other Crop Farming',
                        count: 2,
                        children: [
                            {
                                naics: '111911',
                                naics_description: 'More Other Crop Farming',
                                count: 0
                            },
                            {
                                naics: '111912',
                                naics_description: 'Even More Other Crop Farming',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1121',
                        naics_description: 'Cattle Ranching and Farming',
                        count: 2,
                        children: [
                            {
                                naics: '112111',
                                naics_description: 'More Cattle Ranching and Farming',
                                count: 0
                            },
                            {
                                naics: '112112',
                                naics_description: 'Even More Cattle Ranching and Farming',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1122',
                        naics_description: 'Hog and Pig Farming',
                        count: 2,
                        children: [
                            {
                                naics: '112211',
                                naics_description: 'More Hog and Pig Farming',
                                count: 0
                            },
                            {
                                naics: '112212',
                                naics_description: 'Even More Hog and Pig Farming',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1123',
                        naics_description: 'Poultry and Egg Production',
                        count: 2,
                        children: [
                            {
                                naics: '112311',
                                naics_description: 'More Poultry and Egg Production',
                                count: 0
                            },
                            {
                                naics: '112312',
                                naics_description: 'Even More Poultry and Egg Production',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1124',
                        naics_description: 'Sheep and Goat Farming',
                        count: 2,
                        children: [
                            {
                                naics: '112411',
                                naics_description: 'More Sheep and Goat Farming',
                                count: 0
                            },
                            {
                                naics: '112412',
                                naics_description: 'Even More Sheep and Goat Farming',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1125',
                        naics_description: 'Aquaculture',
                        count: 2,
                        children: [
                            {
                                naics: '112511',
                                naics_description: 'More Aquaculture',
                                count: 0
                            },
                            {
                                naics: '112512',
                                naics_description: 'Even More Aquaculture',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '1129',
                        naics_description: 'Other Animal Production',
                        count: 2,
                        children: [
                            {
                                naics: '112911',
                                naics_description: 'More Other Animal Production',
                                count: 0
                            },
                            {
                                naics: '112912',
                                naics_description: 'Even More Other Animal Production',
                                count: 0
                            }
                        ]
                    }
                ]
            },
            {
                naics: '21',
                naics_description: 'Mining, Quarrying, and Oil and Gas Extraction',
                count: 7,
                children: [
                    {
                        naics: '2111',
                        naics_description: 'Oil and Gas Extraction',
                        count: 2,
                        children: [
                            {
                                naics: '211120',
                                naics_description: 'Crude Petroleum Extraction',
                                count: 0
                            },
                            {
                                naics: '211130',
                                naics_description: 'Natural Gas Extraction',
                                count: 0
                            }
                        ]
                    },
                    {
                        naics: '2121',
                        naics_description: 'Coal Mining',
                        count: 3,
                        children: [
                            {
                                naics: '212111',
                                naics_description: 'Bituminous Coal and Lignite Surface Mining',
                                count: 0
                            },
                            {
                                naics: '212112',
                                naics_description: 'Bituminous Coal Underground Mining',
                                count: 0
                            },
                            {
                                naics: '212113',
                                naics_description: 'Anthracite Mining',
                                count: 0
                            }
                        ]
                    }
                ]
            },
            {
                naics: '54',
                naics_description: 'Professional, Scientific, and Technical Services',
                count: 2,
                children: [
                    {
                        naics: '5411',
                        naics_description: 'Legal Services',
                        count: 0
                    },
                    {
                        naics: '5412',
                        naics_description: 'Accounting, Tax Preparation, Bookkeeping, and Payroll Services',
                        count: 0
                    }
                ]
            },
            {
                naics: '55',
                naics_description: 'Management of Companies and Enterprises',
                count: 1,
                children: [
                    {
                        naics: '5511',
                        naics_description: 'Management of Companies and Enterprises',
                        count: 0
                    }
                ]
            },
            {
                naics: '56',
                naics_description: 'Administrative and Support and Waste Management and Remediation Services',
                count: 2,
                children: [
                    {
                        naics: '5611',
                        naics_description: 'Office Administrative Services',
                        count: 0
                    },
                    {
                        naics: '5612',
                        naics_description: 'Facilities Support Services',
                        count: 0
                    }
                ]
            },
            {
                naics: '61',
                naics_description: 'Educational Services',
                count: 2,
                children: [
                    {
                        naics: '6111',
                        naics_description: 'Elementary and Secondary Schools',
                        count: 0
                    },
                    {
                        naics: '6112',
                        naics_description: 'Junior Colleges',
                        count: 0
                    }
                ]
            },
            {
                naics: '62',
                naics_description: 'Health Care and Social Assistance',
                count: 2,
                children: [
                    {
                        naics: '6211',
                        naics_description: 'Offices of Physicians',
                        count: 0
                    },
                    {
                        naics: '6212',
                        naics_description: 'Offices of Dentists',
                        count: 0
                    }
                ]
            },
            {
                naics: '71',
                naics_description: 'Arts, Entertainment, and Recreation',
                count: 5,
                children: [
                    {
                        naics: '7111',
                        naics_description: 'Performing Arts Companies',
                        count: 0
                    },
                    {
                        naics: '7112',
                        naics_description: 'Spectator Sports',
                        count: 3,
                        children: [
                            {
                                naics: '711211',
                                naics_description: 'Sports Teams and Clubs',
                                count: 0
                            },
                            {
                                naics: '711212',
                                naics_description: 'Racetracks',
                                count: 0
                            },
                            {
                                naics: '711219',
                                naics_description: 'Other Spectator Sports',
                                count: 0
                            }
                        ]
                    }
                ]
            }
        ];
        this.setState({ naics });
    };

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
        const nodeKeys = {
            value: 'naics',
            label: 'naics_description'
        };
        const { naics } = this.state;
        return (
            <div>
                <NAICSSearch
                    className="naics-search-container"
                    selectedNAICS={this.props.selectedNAICS}
                    dirtyFilters={this.dirtyFilters()}
                    selectNAICS={this.selectNAICS}
                    removeNAICS={this.removeNAICS} />
                <CheckboxTree
                    nodes={naics}
                    nodeKeys={nodeKeys} />
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
