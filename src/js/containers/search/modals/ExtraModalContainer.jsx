/**
 * ExtraModalContainer.jsx
 * Created by Kevin Li 5/5/17
 */

import React from 'react';

import ExtraModal from 'components/search/modals/ExtraModal';

export class ExtraModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'A link to the file is being generated.',
            message: 'Server status'
        };
    }
    render() {
        return (
            <ExtraModal
                {...this.props}
                title={this.state.title}
                message={this.state.message} />
        );
    }
}

export default ExtraModalContainer;
