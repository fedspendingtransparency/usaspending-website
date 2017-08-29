/**
 * DetailLoading.jsx
 * Created by Lizzie Salita 8/29/17
 */

import React from 'react';

import Error from 'components/sharedComponents/Error';

export default class DetailLoading extends React.Component {
    render() {
        return (
            <Error
                title="Loading..."
                message="" />
        );
    }
}
