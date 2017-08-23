/**
 * RecipientError.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';

import Error from 'components/sharedComponents/Error';

export default class RecipientError extends React.Component {
    render() {
        return (
            <Error
                title="Invalid Recipient"
                message="The recipient ID provided is invalid. Please check the ID and try again." />
        );
    }
}
