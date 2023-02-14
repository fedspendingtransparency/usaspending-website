/**
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from '../../../../../js/containers/search/filters/recipient/RecipientNameDUNSContainer';
import SubmitHint from '../../../sharedComponents/filterSidebar/SubmitHint';
import SelectedKeyword from './SelectedKeywords';

const propTypes = {
    toggleKeywords: PropTypes.func,
    selectedKeywords: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class KeywordSearch extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    render() {
        let selectedKeywords = null;

        if (this.props.selectedkeywords.size > 0) {
            selectedKeywords = (<SelectedKeyword
                selectedKeywords={this.props.selectedkeyWords}
                toggleKeyword={this.props.toggleRKeyword} />);
        }

        return (
            <div className="recipient-filter">
                <div className="filter-item-wrap">
                    <RecipientNameDUNSContainer
                        {...this.props}
                        toggleKeyword={this.props.toggleKeywords} />
                    {selectedKeywords}
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}

KeywordSearch.propTypes = propTypes;
