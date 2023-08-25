import '@testing-library/jest-dom';
import registerIcons from "../src/js/registerIcons";

window.URL.createObjectURL = function () {};
registerIcons();
