// import React from 'react';
// import GlossaryDefinition from 'components/glossary/definition/GlossaryDefinition';
// import { render, screen } from '@test-utils';
// import { defaultState } from '../../../testResources/defaultReduxFilters';

// describe('GlossaryDefinition', () => {
//     // jest.setTimeout(20000);
//     it(`should update state for active tab if new entry doesn't have an Official Def`, (done) => {
//         // const completeIncrement = jest.fn();
//         const test = shallow(<GlossaryDefinition

//             total={reallyBigNumber}
//             isLoading={false}
//             completeIncrement={completeIncrement} />,

//             { initialState: { ...defaultState, agencyV2: { overview: { toptierCode: '123' } } } }
//             );

//         expect(screen.queryByText('$0.00')).toBeTruthy();
//         setTimeout(() => {
//             expect(screen.queryByText('$0.00')).toBeFalsy();
//         }, 1000); // 1 second
//         setTimeout(() => {
//             expect(screen.queryByText('$1.00 trillion')).toBeTruthy();
//             done();
//         }, 6500); // 1 second
//     });
// });
