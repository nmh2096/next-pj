"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ILogin } from "./interface";
import { schema } from "./schema";
import { LoginContainer } from "./style";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { AuthAction } from "@/store/authStore/AuthReducer";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useAppDispatch()
  const authStore = useAppSelector((state) => state.auth);
  const router = useRouter();
  const defaultValues: ILogin = {
    username: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(schema), defaultValues });

  const onLogin = async (data: ILogin) => {
    dispatch(AuthAction.loginRequest(data));
    if (!authStore.loading && authStore.success) {
      router.push("/notes/list");
    } else {
      reset();
    }
  };

  const goRegister = () => {
    router.push("/auth/register")
  };

  return (
    <LoginContainer>
      <div className="login-card">
        <h2>Login</h2>
        <div className="login-form">
          <div className="input-field">
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
              Don't have account? 
              <span className="link" onClick={goRegister}>
                Register
              </span>
            </p>
            <Button variant="contained" onClick={handleSubmit(onLogin)}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </LoginContainer>
  );
}