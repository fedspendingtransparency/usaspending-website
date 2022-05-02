/**
 * homeIconSingleton.js
 * Created by Kevin Li 3/17/17
 */

import { IconSingleton } from '../iconSingleton';

class HomeIconSingleton extends IconSingleton {
    constructor() {
        super();

        this.notificationName = 'usa-da-icons-home.loaded';
        this.svgPath = 'graphics/home_icons.svg';
    }
}

const instance = new HomeIconSingleton();
export default instance;
