/**
 * Created by Max Kendall
 * 03/25/2020
 */
import React from 'react';
import { shallow } from 'enzyme';

import { fetchDEFCodes } from "helpers/disasterHelper";
import { DEFCheckboxTree } from "../../../../src/js/containers/search/filters/def/DEFCheckboxTree";

jest.mock("helpers/disasterHelper", () => ({
    fetchDEFCodes: jest.fn()
}));

const defaultProps = {
    counts: [{}],
    stageDef: () => {}
};

describe('DEFCheckboxTree', () => {
    it('fetchCodes on mount and only sets the nodes to the covid codes', async () => {
        fetchDEFCodes.mockImplementation(() => ({
            promise: Promise.resolve({
                data: {
                    codes: [
                        { disaster: 'covid_19', code: 'L', title: 'test' },
                        { disaster: 'non-covid_19', code: 'M', title: 'test' }
                    ]
                }
            })
        }));
        const container = shallow(<DEFCheckboxTree {...defaultProps} />);
        await container.instance().componentDidMount();

        expect(container.instance().state.nodes[0].children.some((node) => node.value === 'L')).toEqual(true);
        expect(container.instance().state.nodes[0].children.some((node) => node.value === 'M')).toEqual(false);
    });
});
