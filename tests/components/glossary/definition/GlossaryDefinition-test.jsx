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
                plain: 'plain 1'
            })
        };
        const entry2 = {
            term: fromJS({
                slug: 'slug 2',
                official: 'official 2'
            })
        };
        const test = shallow(<GlossaryDefinition glossary={entry1} />);
        expect(test.state().tab).toBe('plain');
        test.setState(entry2);
        expect(test.state().tab).toBe('official');
    });
});
