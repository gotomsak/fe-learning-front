import React, { useState } from "react";
import { signup } from "../apis/backendAPI/userAuth";
import { User } from "../apis/backendAPI/interfaces";

function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupMessage, setSignupMessage] = useState("");

    const formChange = (event: any) => {
        switch (event.target.name) {
            case "username":
                setUsername(event.target.name);
                break;
            case "email":
                setEmail(event.target.name);
                break;
            case "password":
                setPassword(event.target.name);
                break;
        }
    };
    const signupSubmit = () => {
        const user: User = {
            username: username,
            email: email,
            password: password,
        };
        signup(user)
            .then((res) => {
                setSignupMessage("signupしました");
            })
            .catch((err) => {
                setSignupMessage(err);
            });
    };

    return (
        <div className="SignupPageContainer">
            <h1>SignupPage</h1>

            <label>
                username:
                <input
                    type="text"
                    className="username"
                    onChange={formChange}
                ></input>
            </label>
            <br />
            <label>
                email:
                <input
                    type="text"
                    className="email"
                    onChange={formChange}
                ></input>
            </label>
            <br />
            <label>
                password:
                <input
                    type="password"
                    className="password"
                    onChange={formChange}
                ></input>
            </label>
            <br />
            <button onClick={signupSubmit}>submit</button>
            <div>
                <h2>{signupMessage}</h2>
            </div>
        </div>
    );
}

export default SignupPage;
