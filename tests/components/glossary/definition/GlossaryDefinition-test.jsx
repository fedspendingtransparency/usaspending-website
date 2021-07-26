import React from 'react';
import GlossaryDefinition from 'components/glossary/definition/GlossaryDefinition';
import { Definition } from 'redux/reducers/glossary/glossaryReducer';
import { mount } from 'enzyme';

describe('GlossaryDefinition', () => {
    it(`should update state for active tab if new entry doesn't have a plain or an official def`, () => {
        const entry1 = {
            term: new Definition({
                slug: 'slug1',
                official: 'official only'
            })
        };
        const entry2 = {
            term: Definition({
                slug: 'slug2',
                plain: 'plain only'
            })
        };
        const test = mount(<GlossaryDefinition glossary={entry1} />);
        expect(test.state().tab).toBe('official');
        test.setProps({ glossary: entry2 });
        test.update();
        expect(test.state().tab).toBe('plain');
    });
});
