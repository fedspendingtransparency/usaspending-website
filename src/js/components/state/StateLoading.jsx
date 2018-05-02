/**
 * StateLoading.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';

import Error from 'components/sharedComponents/Error';

export default class StateLoading extends React.Component {
    render() {
        return (
            <Error
                title="Loading..."
                message="" />
        );
    }
}
