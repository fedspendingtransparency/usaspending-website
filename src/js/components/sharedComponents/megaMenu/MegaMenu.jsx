import React from 'react';
import MenuDropdowns from './dropdowns/MenuDropdowns';

const MegaMenu = () => {
    const duration = 800;
    const ease = "easeOutExpo";

    return (
        <div className="mega-menu-container">
            <MenuDropdowns
                tweenConfig={{
                    ease,
                    duration
                }} />
        </div>
    );
};

export default MegaMenu;
