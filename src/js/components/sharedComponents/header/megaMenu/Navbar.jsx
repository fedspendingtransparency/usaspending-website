import React from "react";

const Navbar = ({ children, onMouseLeave }) => (
    <nav className="navbar-el" onMouseLeave={() => onMouseLeave()}>
        <ul className="navbar-list">{children}</ul>
    </nav>
);

export default Navbar;
