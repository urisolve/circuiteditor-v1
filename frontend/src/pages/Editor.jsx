import React from "react";

// Custom components
import CompLib from "../components/CompLib";
import ToolsMenu from "../components/ToolsMenu";
import Canvas from "../components/Canvas";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  canvas: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
}));

function Editor({ canvas }) {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <CompLib />
      <div className={classes.canvas}>
        <ToolsMenu canvas={canvas} />
        <Canvas canvas={canvas} />
      </div>
    </div>
  );
}

export default Editor;
