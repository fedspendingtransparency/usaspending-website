/**
 * @jest-environment jsdom
 * 
 * ReadMore-test.jsx
 * Created by Lizzie Salita 10/13/21
 */

import React from 'react';
import ReadMore from 'components/sharedComponents/ReadMore';
import { render, screen, fireEvent } from '@test-utils';

const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const mockChildren = (<div>mock children</div>);

describe('ReadMore', () => {
    it('should truncate text based on the given character limit', () => {
        render(<ReadMore text={mockText} limit={10} />);
        expect(screen.queryByText('Lorem ipsu...')).toBeTruthy();
        expect(screen.queryByText(mockText)).toBeFalsy();
        expect(screen.queryByText('Read More')).toBeTruthy();
    });
    it('should display the full text when the "read more" button is clicked', () => {
        render(<ReadMore text={mockText} limit={10} />);
        fireEvent.click(screen.getByText('Read More'));
        expect(screen.queryByText(mockText)).toBeTruthy();
    });
    it('should display the full text and a "read less" button when initially expanded', () => {
        render(<ReadMore text={mockText} limit={10} initiallyExpanded />);
        expect(screen.queryByText('Lorem ipsu...')).toBeFalsy();
        expect(screen.queryByText(mockText)).toBeTruthy();
        expect(screen.queryByText('Read Less')).toBeTruthy();
    });
    it('should truncate the text based on the limit when "read less" is clicked', () => {
        render(<ReadMore text={mockText} limit={10} initiallyExpanded />);
        fireEvent.click(screen.queryByText('Read Less'));
        expect(screen.queryByText('Lorem ipsu...')).toBeTruthy();
        expect(screen.queryByText(mockText)).toBeFalsy();
        expect(screen.queryByText('Read More')).toBeTruthy();
    });
    it('should display the full text with no button if the text does not exceed the character limit', () => {
        render(<ReadMore text="Hello" limit={10} />);
        expect(screen.queryByText('Hello')).toBeTruthy();
        expect(screen.queryByText('Read More')).toBeFalsy();
    });
    it('should display just the "read more" button when children are provided', () => {
        render(<ReadMore>{mockChildren}</ReadMore>);
        expect(screen.queryByText('Read More')).toBeTruthy();
        expect(screen.queryByText('mock children')).toBeFalsy();
    });
    it('should display the children and a "read less" button when "read more" is clicked', () => {
        render(<ReadMore>{mockChildren}</ReadMore>);
        fireEvent.click(screen.queryByText('Read More'));
        expect(screen.queryByText('mock children')).toBeTruthy();
        expect(screen.queryByText('Read Less')).toBeTruthy();
    });
    it('should display the children and a "read less" button when initially expanded', () => {
        render(<ReadMore initiallyExpanded>{mockChildren}</ReadMore>);
        expect(screen.queryByText('mock children')).toBeTruthy();
        expect(screen.queryByText('Read Less')).toBeTruthy();
    });
});
