/**
 * @jest-environment jsdom
 * 
 * keyboardEventsHelper-test.js
 * Created by Lizzie Salita 6/27/19
 */

import * as keyboardEventsHelper from 'helpers/keyboardEventsHelper';

describe('createOnKeyDownHandler', () => {
    it('returns a function that is only invoked when it is passed an event with the space/enter keycodes', () => {
        const cb = jest.fn();
        const args = ["test1", "test2", "test3"];
        const onKeyDownHandler = keyboardEventsHelper.createOnKeyDownHandler(cb, args);
        onKeyDownHandler({ keyCode: 1 });
        onKeyDownHandler({ keyCode: 2 });
        onKeyDownHandler({ keyCode: 3 });
        onKeyDownHandler({ keyCode: 4 });
        onKeyDownHandler({ keyCode: 5 });
        onKeyDownHandler({ keyCode: 6 });
        onKeyDownHandler({ keyCode: 13 }); // enter
        onKeyDownHandler({ keyCode: 32 }); // space
        expect(cb).toHaveBeenCalledTimes(2);
        expect(cb).toHaveBeenCalledWith("test1", "test2", "test3");
    });
});
