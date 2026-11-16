/**
 * @jest-environment jsdom
 *
 * TreeNodesWrapper-test.jsx
 * Created by JD House 11/09/2026
*/

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TreeNodesWrapper from 'components/sharedComponents/checkboxTree/TreeNodesWrapper';

const makeNodes = () => ([
    {
        id: 'g',
        value: 'g',
        label: 'Grandparent',
        ancestors: [],
        children: [
            {
                id: 'p1',
                value: 'p1',
                label: 'Parent 1',
                ancestors: ['g'],
                children: [
                    { id: 'c1', value: 'c1', label: 'Child 1', ancestors: ['g', 'p1'] },
                    { id: 'c2', value: 'c2', label: 'Child 2', ancestors: ['g', 'p1'] }
                ]
            },
            {
                id: 'p2',
                value: 'p2',
                label: 'Parent 2',
                ancestors: ['g'],
                children: [
                    { id: 'c3', value: 'c3', label: 'Child 3', ancestors: ['g', 'p2'] }
                ]
            }
        ]
    }
]);

const allChecked = ['g', 'p1', 'p2', 'c1', 'c2', 'c3'];
const allExpanded = ['g', 'p1', 'p2'];

const box = (label) => screen.getByLabelText(label);

describe('TreeNodesWrapper ancestor check state', () => {
    it('re-checks parent and grandparent when the last unchecked grandchild is checked again', () => {
        const nodes = makeNodes();
        render(
            <TreeNodesWrapper
                nodes={nodes}
                checked={allChecked}
                expanded={allExpanded}
                onCheck={jest.fn()}
                onExpand={jest.fn()} />
        );

        // uncheck a grandchild: parent and grandparent become indeterminate
        fireEvent.click(box('Child 1'));

        expect(box('Child 1').checked).toBe(false);
        expect(box('Parent 1').checked).toBe(false);
        expect(box('Parent 1').indeterminate).toBe(true);
        expect(box('Grandparent').checked).toBe(false);
        expect(box('Grandparent').indeterminate).toBe(true);

        // check it again: everything is fully checked, nothing indeterminate
        fireEvent.click(box('Child 1'));

        expect(box('Child 1').checked).toBe(true);
        expect(box('Parent 1').checked).toBe(true);
        expect(box('Parent 1').indeterminate).toBe(false);
        expect(box('Grandparent').checked).toBe(true);
        expect(box('Grandparent').indeterminate).toBe(false);
    });

    it('keeps the grandparent indeterminate while another branch is still incomplete', () => {
        const nodes = makeNodes();
        render(
            <TreeNodesWrapper
                nodes={nodes}
                checked={['p1', 'c1', 'c2']}
                expanded={allExpanded}
                onCheck={jest.fn()}
                onExpand={jest.fn()} />
        );

        fireEvent.click(box('Child 1'));
        fireEvent.click(box('Child 1'));

        expect(box('Parent 1').checked).toBe(true);
        expect(box('Parent 1').indeterminate).toBe(false);
        expect(box('Grandparent').checked).toBe(false);
        expect(box('Grandparent').indeterminate).toBe(true);
    });
});
