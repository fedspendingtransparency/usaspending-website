import React from 'react';
import GlossaryDefinition from 'components/glossary/definition/GlossaryDefinition';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

describe('GlossaryDefinition', () => {
    // jest.setTimeout(20000);
    it(`should update state for active tab if new entry doesn't have an Official Def`, () => {
        const entry1 = {
            term: fromJS({
                slug: 'slug 1',
                official: 'official 1'
            })
        };
        const entry2 = {
            term: fromJS({
                slug: 'slug 2',
                plain: 'plain 2'
            })
        };
        const test = shallow(<GlossaryDefinition glossary={entry1} />);
        const testState = test.state;

        console.log(JSON.stringify(testState));

        expect(testState.tab === 'official');
        test.setState(entry2);
        expect(testState.tab === 'plainf');
    });
});
