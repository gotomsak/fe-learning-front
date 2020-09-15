import React, { useState, useEffect, useRef } from "react";
import TopMenuBtnComponent from "../components/TopMenuBtnComponent";
import { useHistory } from "react-router";
import { checkSession } from "../apis/backendAPI";
import ErrorViewComponent from "../components/ErrorViewComponent";
import { signout } from "../apis/backendAPI";
import "./TopPage.css";

function TopPage() {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        checkSession()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                history.push("/signin");
            });
    }, []);
    useEffect(() => {
        console.log(errorMessage);
    }, [errorMessage]);

    const SignoutEvent = () => {
        signout()
            .then((res) => {
                history.push("/signin");
                setErrorMessage("ok");
            })
            .catch((err) => {
                setErrorMessage(err.data);
            });
    };

    return (
        <div className="TopPageContainer">
            <h1>fe-learing</h1>
            <div className="TopMenu">
                <h2>メニュー</h2>
                <TopMenuBtnComponent
                    btnText="学習を始める"
                    path="/learning"
                ></TopMenuBtnComponent>
                <TopMenuBtnComponent
                    btnText={"サインアウト"}
                    event={SignoutEvent}
                ></TopMenuBtnComponent>
            </div>

            {/* <SignoutBtnComponent setErrorMessage={setErrorMessage} />
            {errorMessage !== "" && (
                <ErrorViewComponent errMessage={errorMessage} />
            )} */}
        </div>
    );
}

export default TopPage;
