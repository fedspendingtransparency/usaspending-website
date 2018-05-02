/**
 * StateError.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';

import Error from 'components/sharedComponents/Error';

export default class StateError extends React.Component {
    render() {
        return (
            <Error
                title="Invalid State"
                message="The state ID provided is invalid. Please check the ID and try again." />
        );
    }
}
