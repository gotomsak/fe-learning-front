import React, { useState, useEffect } from "react";
import { signin } from "../apis/backendAPI/index";
import { User } from "../apis/backendAPI/interfaces";
import store from "../index";
import { useHistory } from "react-router";
import ErrorViewComponent from "../components/ErrorViewComponent";
import { Input, InputLabel, Button } from "@material-ui/core";
import "./SigninPage.css";
import TopMenuBtnComponent from "../components/TopMenuBtnComponent";

function SigninPage() {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const formChange = (event: any) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
        }
    };
    const signinSubmit = () => {
        const user: User = { email: email, password: password };
        signin(user)
            .then((res) => {
                localStorage.setItem("user_id", res.data["user_id"]);
                localStorage.setItem("username", res.data["username"]);
                history.push("/");
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    };

    return (
        <div className="SigninPageContainer">
            <div className="SigninForm">
                <h1>サインイン</h1>
                <p>
                    <Input
                        type="text"
                        placeholder="email"
                        name="email"
                        onChange={formChange}
                        value={email}
                    ></Input>
                </p>
                <p>
                    <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={formChange}
                        value={password}
                    ></Input>
                </p>
                <p>
                    <Button
                        type="submit"
                        value="submit"
                        onClick={signinSubmit}
                        color="secondary"
                    >
                        submit
                    </Button>
                </p>
            </div>

            <TopMenuBtnComponent
                btnText={"新規登録"}
                path="/signup"
            ></TopMenuBtnComponent>
            {errorMessage !== "" && (
                <ErrorViewComponent
                    errMessage={errorMessage}
                ></ErrorViewComponent>
            )}
        </div>
    );
}
export default SigninPage;
