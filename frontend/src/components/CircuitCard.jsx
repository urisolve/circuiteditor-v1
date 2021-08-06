import React from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
    backgroundColor: grey[50],
  },
}));

function CircuitCard({ circuit, onDelete, onExport }) {
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.root }} elevation={3}>
      <CardActionArea>
        <CardMedia image={circuit?.thumbnail} src={circuit?.name} />
        <CardHeader
          title={circuit?.name}
          titleTypographyProps={{ noWrap: true }}
          subheader={Date(circuit?.createdAt).toString().slice(0, 24)}
        />
      </CardActionArea>
      <CardActions>
        <Tooltip title="Export" arrow>
          <IconButton onClick={onExport}>
            <GetAppIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default CircuitCard;
