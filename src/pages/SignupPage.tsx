import React from "react";

function SignupPage() {
    return (
        <div className="SignupPageContainer">
            <input type="text" className="username"></input>
            <input type="text" className="email"></input>
            <input type="text" className="password"></input>
            <button>submit</button>
        </div>
    );
}

export default SignupPage;
