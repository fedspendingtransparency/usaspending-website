/**
 * ExplorerDetailPageContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as explorerActions from 'redux/actions/explorer/explorerActions';

import ExplorerDetailPage from 'components/explorer/detail/ExplorerDetailPage';

const propTypes = {
    params: PropTypes.object,
    setExplorerRoot: PropTypes.func
};

export class ExplorerDetailPageContainer extends React.Component {
    componentWillMount() {
        this.validateRoot(this.props.params.root);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.root !== this.props.params.root) {
            this.validateRoot(nextProps.params.root);
        }
    }

    validateRoot(rootValue) {
        const allowedRoots = ['budget_function', 'agency', 'object_class'];
        if (!rootValue || allowedRoots.indexOf(rootValue) === -1) {
            // not a valid root, go to to the landing page
            //Router.history.replace('/explorer');
        }
        else {
            // set the root
            this.props.setExplorerRoot(rootValue);
        }
    }

    render() {
        return (
            <ExplorerDetailPage />
        );
    }
}

ExplorerDetailPageContainer.propTypes = propTypes;

export default connect(
    null,
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(ExplorerDetailPageContainer);
