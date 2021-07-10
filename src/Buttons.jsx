import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
const color = "#000000";
const useStyles = makeStyles((theme) => ({
  buttons: {
    color: color,
    fontWeight: "700",
    border: `2px solid ${color}`,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Buttons({ isRunning, isWaiting, wait, reset, start }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup aria-label="outlined secondary button group">
        <Button onClick={start} className={classes.buttons}>
          {!isRunning | isWaiting ? "Start" : "Stop"}
        </Button>
        <Button ref={wait} className={classes.buttons}>
          Wait
        </Button>
        <Button onClick={reset} className={classes.buttons}>
          Reset
        </Button>
      </ButtonGroup>
    </div>
  );
}
