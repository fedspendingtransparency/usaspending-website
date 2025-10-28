import React from "react";

const MenuDropdownWrapper = ({ children, onMouseLeave }) => (
    <nav className="navbar-el" onMouseLeave={() => onMouseLeave()}>
        <ul className="navbar-list">{children}</ul>
    </nav>
);

export default MenuDropdownWrapper;
