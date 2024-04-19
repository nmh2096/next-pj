"use client";

import profile from '@/assets/image/9panda.jpg';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AuthAction } from '@/store/authStore/AuthReducer';
import { IAuth } from '@/store/authStore/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { schema } from './schema';
import { ProfileContainer } from './style';

export default function Profile() {
  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);
  const [openModal, setOpeneModal] = useState(false);

  useEffect(() => {
    dispatch(AuthAction.getAuthRequest());
  }, []);

  const defaultValues = {
    name: "",
    username: "",
    password: "",
  };

  const {
    control,
    reset,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<IAuth>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleColoseModal = () => {
    setOpeneModal(false);
  };

  useEffect(() => {
    if (authStore.profile) {
      setValue("name", authStore.profile.name);
      setValue("username", authStore.profile.username);
      setValue("password", authStore.profile.password);
    }
  }, [authStore.profile])

  const updateProfile = () => {
    setOpeneModal(true);
  }

  const handleSubmitProfile = async (data: IAuth) => {
    dispatch(AuthAction.getProfileRequest({
      ...data,
      _id: authStore.profile?._id
    }))
    console.log(data);
    handleColoseModal();
  };


  return (
    <ProfileContainer>
      <div className="profile-card">
        <div className="avatar-profile">
          <Avatar src={profile.src} style={{ height: '70px', width: '70px' }} />
        </div>
        <div className="profile-form">
          <div className="input-field">
            <div className="group-input">
              <h3>Name:</h3>
              <h3>{authStore.profile?.name}</h3>
            </div>
            <div className="group-input">
              <h3>Username:</h3>
              <h3>{authStore.profile?.username}</h3>
            </div>
          </div>
          <div className="footer">
            <Button variant="contained" onClick={updateProfile} >
              Update
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={openModal} onClose={() => setOpeneModal(true)}>
        <DialogTitle id="alert-dialog-title">
          Update Profile
        </DialogTitle>
        <DialogContent>
          <div
            className="update-form"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {/* <p>{isUpdate}</p> */}
            <div className="group-input">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField {...field} size="small" label="Name" >
                  </TextField>
                )}
              />
              <small className="error">
                {/* {errors} */}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <TextField {...field} size="small" label="Username" />
                )}
              />
              <small className="error">
                {/* {errors} */}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField {...field} size="small" label="Password" />
                )}
              />
              <small className="error">
                {/* {errors.title && errors.status?.message} */}
              </small>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpeneModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(handleSubmitProfile)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  )
}
