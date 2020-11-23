
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RegisterIcons from "../src/js/RegisterIcons";

window.URL.createObjectURL = function () {};
RegisterIcons();

// In Enzyme 3, shallow now by default triggers life cycle methods :thumbs-up: but this ruins all our tests :thumbs-down:
configure({ adapter: new Adapter(), disableLifecycleMethods: true });
