/**
 * AgencyLoading.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';

import Error from 'components/sharedComponents/Error';

export default class AgencyLoading extends React.Component {
    render() {
        return (
            <Error
                title="Loading..."
                message="" />
        );
    }
}
