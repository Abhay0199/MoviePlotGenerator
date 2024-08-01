import React from 'react';

const Navbar = () => {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#5F9EA0'
    };

    const brandStyle = {
        fontSize: '2rem',
        color: 'white',
        textAlign: 'center'
    };

    return (
        <div>

            <div style={navbarStyle}>
                <span style={brandStyle}>Movies</span>
            </div>


        </div>
    );
}

export default Navbar;
