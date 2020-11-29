import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./AnsChoiceComponent.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid, { GridSpacing } from "@material-ui/core/Grid";
const AnsChoiceComponent: React.FC<{
    answerText: string[];
    answerImg: string[];
    answerFinal: any;
}> = ({ answerText, answerImg, answerFinal }) => {
    let choice: string[] = [];
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            paper: {
                textAlign: "center",
                color: theme.palette.text.secondary,
            },
        })
    );
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const classes = useStyles();
    if (answerText[0] === "") {
        choice = [];
        answerImg.forEach((value) => {
            choice.push(value);
        });
    } else {
        choice = [];
        answerText.forEach((value) => {
            choice.push(value);
        });
    }

    const choiceResult: any = (e: any) => {
        console.log(e.currentTarget.value);
        answerFinal(e.currentTarget.value);
    };

    return (
        <div className="AnsChoiceContainer">
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {choice?.map((i, index) => {
                            return (
                                <Grid key={i} item>
                                    <div className="AnsList" key={i}>
                                        <Paper className={classes.paper}>
                                            {answerText[0] === "" ? (
                                                <Button
                                                    variant="contained"
                                                    onClick={choiceResult}
                                                    value={i}
                                                    key={i}
                                                    size="small"
                                                >
                                                    <img src={i} key={i} />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    onClick={choiceResult}
                                                    value={i}
                                                    key={i}
                                                    size="small"
                                                >
                                                    <h4>{i}</h4>
                                                </Button>
                                            )}
                                        </Paper>
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default AnsChoiceComponent;
