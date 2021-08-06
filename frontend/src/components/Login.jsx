import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// Material-UI
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Grid,
  FormHelperText,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Login({ setUser }) {
  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({ mode: "onBlur" });

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Send the new user info to the server and grab the authenticated user
  const onSubmit = async (data) => {
    await axios
      .post("/api/auth/login", data)
      .then((res) => setUser(res.data))
      .then(() => history.push("/circuits"));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Login" subheader="Welcome back." />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="email"
                label="E-mail"
                placeholder="1210000@isep.ipp.pt"
                autoComplete="email"
                error={errors.email}
                inputRef={register({
                  required: "This field is required.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid e-mail address.",
                  },
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.email && errors.email?.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                error={errors.password}
                inputRef={register({
                  required: "This field is required.",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters.",
                  },
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.password && errors.password?.message}
              </FormHelperText>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Tooltip
            title={showPassword ? "Hide password" : "Show password"}
            arrow
          >
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </form>
  );
}

export default Login;
