"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IRegister } from "./interface";
import { schema } from "./schema";
import { RegisterContainer } from "./style";
import { useAppDispatch } from "@/hooks";
import { AuthAction } from "@/store/authStore/AuthReducer";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const defaultValues: IRegister = {
    username: "",
    name: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegister>({ resolver: yupResolver(schema), defaultValues });

  const onLogin = async (data: IRegister) => {
    dispatch(AuthAction.loginRequest(data))
  };

  const goLogin = () => {
    router.push("/auth/login")
  };

  const onRegister = async (data: IRegister) => {
    console.log(data);
    dispatch(AuthAction.registerRequest(data));
  }

  return (
    <RegisterContainer>
      <div className="login-card">
        <h2>Register</h2>
        <div className="login-form">
          <div className="input-field">
            <div className="group-input">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="fw"
                    label="Name"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <small className="error">
                {errors && errors.name?.message}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="fw"
                    label="Username"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <small className="error">
                {errors && errors.username?.message}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="fw"
                    label="Password"
                    variant="outlined"
                    size="small"
                    type="password"
                  />
                )}
              />
              <small className="error">
                {errors && errors.password?.message}
              </small>
            </div>
          </div>
          <div className="footer">
            <p>
              You had an account? <span className="link" onClick={goLogin}>Login</span>
            </p>
            <Button variant="contained" onClick={handleSubmit(onRegister)}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </RegisterContainer>
  );
}