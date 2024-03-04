import React from 'react'
import PropTypes from 'prop-types'
function Navbar(props) {
    return (
        <>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 mx-auto text-white">{props.name}</span>
                </div>
            </nav>
        </>
    )
}

export default Navbar