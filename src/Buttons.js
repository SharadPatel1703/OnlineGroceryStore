import React from 'react'
import {Link} from "react-router-dom";

function Buttons() {
    return (
        <>
        <div className={"container"}>
         <p>this is Zee's mart web app and it provides you some regular grocery but it is way more optimized then other websites</p>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto my-5">
            <li className="btn btn-primary bg-dark text-white" type="button">
                <Link to="/NewUser" className="text-white text-decoration-none">
                    New User
                </Link>
            </li>
            <li className="btn btn-primary bg-dark text-white" type="button">
                <Link to="/exist" className="text-white text-decoration-none">
                    Existing User
                </Link>
            </li>
        </div>
        </>
    )
}

export default Buttons
