/**
 * TopFilterBar-test.js
 * Created by Kevin Li 1/9/17
 */

import React from 'react';
import renderer from 'react-test-renderer';
import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';

test('test', () => {
    const mockRedux = {

    };

    const component = renderer.create(
        <TopFilterBar {...mockRedux} />
    );
});