import React from 'react';
import AnimatedNavbar from './AnimatedNavbar';

const MegaMenu = () => {
    const duration = 300;
    const ease = "easeOutExpo";

    return (
        <div className="mega-menu-container">
            <AnimatedNavbar
                tweenConfig={{
                    ease,
                    duration
                }} />
        </div>
    );
};

export default MegaMenu;
