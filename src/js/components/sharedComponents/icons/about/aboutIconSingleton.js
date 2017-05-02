/**
 * aboutIconSingleton.js
 * Created by Destin Frasier 4/27/17
 */

import { IconSingleton } from '../iconSingleton';

class AboutIconSingleton extends IconSingleton {
    constructor() {
        super();

        this.notificationName = 'usa-da-icons-about.loaded';
        this.svgPath = 'graphics/about_icons.svg';
    }
}

const instance = new AboutIconSingleton();
export default instance;
