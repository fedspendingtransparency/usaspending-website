/**
 * AgencyError.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';

import Error from 'components/sharedComponents/Error';

export default class AgencyError extends React.Component {
    render() {
        return (
            <Error
                title="Invalid Agency"
                message="The agency ID provided is invalid. Please check the ID and try again." />
        );
    }
}
