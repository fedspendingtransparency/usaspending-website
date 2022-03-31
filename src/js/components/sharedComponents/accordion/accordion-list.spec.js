import React from 'react';
import renderer from 'react-test-renderer';
import Accordion from './accordion';
import * as accordionStyles from './accordion.scss';

describe('Accordion', () => {
	const titleText = 'Placeholder Title';
	const bodyText = 'Placeholder Body';
	let component = renderer.create();
	renderer.act(() => {
		component = renderer.create(
			<Accordion title={titleText}>{bodyText}</Accordion>
		);
	});

	const instance = component.root;

	it('expect the snapshot to match', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('expects the title to be rendered.', () => {
		expect(instance.findByType('h1').children[0]).toBe(titleText);
	});

	it('expects the body content to be rendered', () => {
		expect(
			instance.findByProps({ className: accordionStyles.content }).children[0]
		).toBe(bodyText);
	});

	it('expects the accordion to toggle the "open" class when the button is clicked', async () => {
		const button = instance.findByType('button');
		const accordion = instance.findByType('section');
		expect(accordion.props.className).not.toContain(accordionStyles.open);

		renderer.act(() => {
			button.props.onClick({ stopPropagation: () => {} });
		});

		expect(accordion.props.className).toContain(accordionStyles.open);
	});
});
