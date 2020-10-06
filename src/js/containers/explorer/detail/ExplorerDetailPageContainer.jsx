/**
 * ExplorerDetailPageContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as explorerActions from 'redux/actions/explorer/explorerActions';

import ExplorerDetailPage from 'components/explorer/detail/ExplorerDetailPage';

const propTypes = {
    setExplorerRoot: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
};

export class ExplorerDetailPageContainer extends React.Component {
    componentDidMount() {
        this.validateRoot(this.props.match.params.root);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.root !== this.props.match.params.root) {
            this.validateRoot(this.props.match.params.root);
        }
    }

    validateRoot(rootValue) {
        const allowedRoots = ['budget_function', 'agency', 'object_class'];
        if (!rootValue || allowedRoots.indexOf(rootValue) === -1) {
            // not a valid root, go to to the landing page
            this.props.history.replace('/explorer');
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
const ExplorerDetailPageContainerWithRouter = withRouter(ExplorerDetailPageContainer);

export default connect(
    null,
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(ExplorerDetailPageContainerWithRouter);
