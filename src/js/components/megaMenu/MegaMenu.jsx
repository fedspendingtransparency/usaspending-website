import React from 'react';
import AnimatedNavbar from './AnimatedNavbar';

const MegaMenu = () => {
    const duration = 300, ease = "easeOutExpo";

    return (
        <div className="mega-menu-container">
            <AnimatedNavbar
                tweenConfig={{
                    ease: ease,
                    duration: duration
                }}
            />
        </div>
    );
}

export default MegaMenu;
