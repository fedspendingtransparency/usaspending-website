/**
 * ExplorerDetailPageContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useMatch, useNavigate } from 'react-router';

import * as explorerActions from 'redux/actions/explorer/explorerActions';

import ExplorerDetailPage from 'components/explorer/detail/ExplorerDetailPage';

const propTypes = {
    setExplorerRoot: PropTypes.func,
    match: PropTypes.object
};

const ExplorerDetailPageContainer = (props) => {
    const history = useNavigate();
    const match = useMatch('/explorer/:root');
    const { root } = match.params;


    const validateRoot = (rootValue) => {
        const allowedRoots = ['budget_function', 'agency', 'object_class'];
        if (!rootValue || allowedRoots.indexOf(rootValue) === -1) {
            // not a valid root, go to the landing page
            history('/explorer', { replace: true });
        }
        else {
            // set the root
            props.setExplorerRoot(rootValue);
        }
    };


    useEffect(() => {
        validateRoot(root);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [root]);

    return (
        <ExplorerDetailPage />
    );
};

ExplorerDetailPageContainer.propTypes = propTypes;

export default connect(
    null,
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(ExplorerDetailPageContainer);
