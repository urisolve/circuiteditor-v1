import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/electrical/resistor-us.svg";

// Material-UI components
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
  logo: {
    width: 50,
    fill: "white",
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  nav: {
    marginLeft: theme.spacing(4),
    flexGrow: 1,
    display: "flex",
  },
  link: {
    marginLeft: theme.spacing(2),
    color: "#ddd",
    fontSize: theme.spacing(2),
    textDecoration: "none",

    "&:hover": {
      color: "white",
    },
  },
  action: {
    textDecoration: "none",
    color: "white",
  },
}));

function Navbar({ user }) {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.bar}>
        <div className={classes.brand}>
          <Logo className={classes.logo} />
          <Typography className={classes.title} variant="h5" noWrap>
            Circuit Editor
          </Typography>
        </div>

        <div className={classes.nav}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/circuits" className={classes.link}>
            Circuits
          </Link>
          <Link to="/editor" className={classes.link}>
            Editor
          </Link>
        </div>

        <div>
          {user ? (
            <Link to="/account">
              <Tooltip title="My Account" arrow>
                <IconButton color="inherit">
                  <Avatar alt={user.fullName?.()} src={user.avatar} />
                </IconButton>
              </Tooltip>
            </Link>
          ) : (
            <Link to="/auth" className={classes.action}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
