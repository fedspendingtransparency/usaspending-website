/**
 * RecipientLoading.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';

import Error from 'components/sharedComponents/Error';

export default class RecipientLoading extends React.Component {
    render() {
        return (
            <Error
                title="Loading..."
                message="" />
        );
    }
}
