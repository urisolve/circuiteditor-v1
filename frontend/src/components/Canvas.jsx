import React, { useEffect } from "react";
//import defaultCircuit from "../data/test-circuit.js";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// Include Draw2D
import "import-jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.css";
import jquery from "jquery";
import draw2d from "draw2d";
window.$ = window.jQuery = jquery;

const useStyles = makeStyles((theme) => ({
  canvasHolder: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    position: "relative",
    width: "80%",
    height: "80%",
  },
}));

function Canvas({ canvas }) {
  const classes = useStyles();

  useEffect(() => {
    // Initialize the canvas
    canvas.current = new draw2d.Canvas("canvas")
      .installEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy())
      .installEditPolicy(new draw2d.policy.canvas.ShowDotEditPolicy())
      .installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy())
      .installEditPolicy(
        new draw2d.policy.connection.DragConnectionCreatePolicy({
          createConnection: () =>
            new draw2d.Connection()
              .setRouter(new draw2d.layout.connection.CircuitConnectionRouter())
              .attr({ color: "gray" }),
        })
      );

    // Default Circuit
    //const reader = new draw2d.io.json.Reader();
    //reader.unmarshal(canvas.current, defaultCircuit);
  }, [canvas]);

  useEffect(() => {
    // Create the figures
    const source = new draw2d.shape.analog.VoltageSupplyHorizontal();
    const resistor1 = new draw2d.shape.analog.ResistorVertical();
    const resistor2 = new draw2d.shape.analog.ResistorVertical();

    // Add them to the canvas
    canvas.current.add(source, 100, 100);
    canvas.current.add(resistor1, 300, 200);
    canvas.current.add(resistor2, 500, 200);

    // Add 'NO RESCALING' policy to all figures
    canvas.current
      .getFigures()
      .map((figure) =>
        figure.installEditPolicy(
          new draw2d.policy.figure.AntSelectionFeedbackPolicy()
        )
      );

    const createConnection = () =>
      new draw2d.Connection()
        .setRouter(new draw2d.layout.connection.CircuitConnectionRouter())
        .attr({ color: "#0d47a1" });

    let c = createConnection();
    c.setSource(source.getHybridPort(0));
    c.setTarget(resistor1.getHybridPort(0));
    canvas.current.add(c);

    c = createConnection();
    c.setSource(source.getHybridPort(1));
    c.setTarget(resistor1.getHybridPort(1));
    canvas.current.add(c);

    c = createConnection();
    c.setSource(source.getHybridPort(0));
    c.setTarget(resistor2.getHybridPort(0));
    canvas.current.add(c);

    c = createConnection();
    c.setSource(source.getHybridPort(1));
    c.setTarget(resistor2.getHybridPort(1));
    canvas.current.add(c);
  }, [canvas]);

  /**
   * Detect key inputs
   */
  useEffect(() => {
    function handleInput(event) {
      // Rotate component
      if (event.key.toUpperCase() === "R") {
        // Grab the selected figure
        const selectedFigure = canvas.current
          .getFigures()
          .find((figure) => figure.isSelected());

        // Rotate the figure 90 degrees
        if (selectedFigure) {
          selectedFigure.attr({
            angle: selectedFigure.attr("angle") + 45,
          });
        }
      }
    }

    document.addEventListener("keydown", handleInput, false);

    return () => {
      document.removeEventListener("keydown", handleInput, false);
    };
  });

  return (
    <div className={classes.canvasHolder}>
      <Paper id="canvas" elevation={3} className={classes.canvas} />
    </div>
  );
}

export default Canvas;
