import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import LearningPage from "./pages/LearningPage";
import SignupPage from "./pages/SignupPage";
import TopPage from "./pages/TopPage";
import SigninPage from "./pages/SigninPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import FrequencyPage from "./pages/FrequencyPage";
import ManualPage from "./pages/ManualPage";
import GymPage from "./pages/GymPage";
const App = () => {
    return (
        <div className="App">
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={TopPage} />
                    <Route path="/learning" component={LearningPage} />
                    <Route
                        path="/questionnaire"
                        component={QuestionnairePage}
                    />
                    <Route path="/gym" component={GymPage} />
                    <Route path="/frequency" component={FrequencyPage} />
                    <Route path="/manual" component={ManualPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/signin" component={SigninPage} />
                </Switch>
            </React.Fragment>
        </div>
    );
};

export default App;
