import React, { useState, useEffect, useRef, useMemo } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { SettingsCallbacksProvider } from "./contexts/SettingsCallbackContext";
import axios from "axios";

// Custom components
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Circuits from "./pages/Circuits";
import Editor from "./pages/Editor";
import Navbar from "./components/Navbar";

// Material-UI
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: 10,
      height: 10,
    },
    "*::-webkit-scrollbar-track": {
      background: "white",
    },
    "*::-webkit-scrollbar-thumb": {
      background: "grey",
    },
  },
  app: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const canvas = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function grabUser() {
      axios.get("/api/auth").then((res) => setUser(res.data)).catch();
    }

    grabUser();
  }, []);

  // Dark Mode theme
  const [darkMode, setDarkMode] = useState(user?.settings.darkMode || false);
  const toggleTheme = () => setDarkMode(!darkMode);
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            type: darkMode ? "dark" : "light",
          },
        })
      ),
    [darkMode]
  );

  return (
    <BrowserRouter>
      <UserProvider value={user}>
        <SettingsCallbacksProvider value={{ toggleTheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.app}>
              <Navbar user={user} />

              <main className={classes.content}>
                <Switch>
                  <Route exact path="/" component={Home} />

                  <Route exact path="/auth">
                    {user ? <Redirect to="/circuits" /> : <Auth setUser={setUser} />}
                  </Route>
                  <Route exact path="/account">
                    {user ? <Account /> : <Redirect to="/auth" />}
                  </Route>
                  <Route exact path="/circuits">
                    {user ? <Circuits /> : <Redirect to="/auth" />}
                  </Route>
                  <Route exact path="/editor">
                    <Editor canvas={canvas} />
                  </Route>

                  <Route component={NotFound} />
                </Switch>
              </main>
            </div>
          </ThemeProvider>
        </SettingsCallbacksProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
