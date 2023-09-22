/**
 * @jest-environment jsdom
 * 
 * CellWithModal-test.jsx
 * Created by Lizzie Salita 11/24/20
 */

import React from 'react';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import { render, screen, fireEvent } from '@test-utils';

const openModal = jest.fn();
describe('CellWithModal', () => {
    it('should render the expand modal button', () => {
        render(<CellWithModal data="name" openModal={openModal} />);
        expect(screen.queryByRole('button')).toBeTruthy();
    });
    it('should open the modal on click', () => {
        render(<CellWithModal data="name" openModal={openModal} />);
        fireEvent.click(screen.getByRole('button'));
        expect(openModal).toHaveBeenCalled();
    });
});
