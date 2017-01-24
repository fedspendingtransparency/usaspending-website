/**
 * TopFilterGroupHOC.jsx
 * Created by Kevin Li 1/23/17
 */

import React from 'react';

const wrappedFilterGroup = (Component, customLogic = {
    tags: null,
    specialTags: null
}) => {
    class WrappedFilterGroup extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            console.log(Component);
            return <Component {...this.props} />;
        }
    }

    return WrappedFilterGroup;
};

export default wrappedFilterGroup;
