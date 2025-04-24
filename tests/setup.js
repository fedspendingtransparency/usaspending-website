import '@testing-library/jest-dom';
import registerIcons from "../src/js/registerIcons";
import { TextEncoder, TextDecoder } from 'util';

if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder;
}

window.URL.createObjectURL = function () {};
registerIcons();
