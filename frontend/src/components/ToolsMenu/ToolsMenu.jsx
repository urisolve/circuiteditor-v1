import React from 'react';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteIcon from '@material-ui/icons/Delete';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';

const useStyles = makeStyles((theme) => ({
  divider: {
    height: 35,
    margin: `auto ${theme.spacing(1)}px`,
    backgroundColor: '#ddd',
  },
}));

export const ToolsMenu = ({ canvas }) => {
  const classes = useStyles();

  /**
   * Rotate the selected figure, by 45 deg, in the specified direction.
   *
   * Gets the currently selected figure. If the figure exists, increment or
   * decrement its angle attribute by 45 degrees depending on the specified
   * direction.
   *
   * If `direction` is positive (+), rotate right; if it is negative (-),
   * rotate left.
   */
  function rotateFig(direction) {
    const selectedFigure = canvas.current
      ?.getFigures()
      .find((figure) => figure.isSelected());

    selectedFigure?.attr({
      angle: selectedFigure.attr('angle') + Math.sign(direction) * 45,
    });
  }

  // Data to build the tools menu
  const tools = [
    [
      {
        name: 'Undo',
        icon: <UndoIcon />,
        onClick: () => canvas.current?.getCommandStack().undo(),
      },
      {
        name: 'Redo',
        icon: <RedoIcon />,
        onClick: () => canvas.current?.getCommandStack().redo(),
      },
    ],
    [
      {
        name: 'Delete',
        icon: <DeleteIcon />,
        onClick: () => {
          const selectedFigure = canvas.current
            ?.getFigures()
            .find((figure) => figure.isSelected());

          if (!selectedFigure) return;
          canvas.current.remove(selectedFigure);
        },
      },
    ],
    [
      {
        name: 'Rotate Left',
        icon: <RotateLeftIcon />,
        onClick: () => rotateFig(-1),
      },
      {
        name: 'Rotate Right',
        icon: <RotateRightIcon />,
        onClick: () => rotateFig(+1),
      },
    ],
  ];

  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      {tools.map((toolGroup, index) => (
        <React.Fragment key={index}>
          {toolGroup.map((tool) => (
            <Tooltip key={tool.name} title={tool.name} arrow>
              <IconButton
                onClick={tool.onClick}
                aria-label={tool.name}
                disabled={tool.disabled || false}
              >
                {tool.icon}
              </IconButton>
            </Tooltip>
          ))}

          {/* Add a vertical divider between the toolGroups */}
          {index === tools.length - 1 || (
            <Divider className={classes.divider} orientation='vertical' />
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};
