"use client";

import { useAppDispatch, useAppSelector } from '@/hooks';
import { NoteAction } from '@/store/noteStore/NoteReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IList } from './interface';
import { schema } from './schema';
import { NoteListContainer } from './style';
import { INote } from '@/store/noteStore/interface';


export default function list() {

  const dispatch = useAppDispatch();
  const noteStore = useAppSelector((state) => state.note);
  const [updateModal, setUpdateModal] = useState(false);
  const defaultList = {
    id: "",
    title: "",
    content: "",
    status: "",
  };

  // const options: [
  //   { value: "IMPORTANT", text: "Important" },
  //   { value: "HIGHLIGHT", text: "Highlight" },
  //   { value: "NORMAL", text: "Normal" }
  // ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IList>({
    resolver: yupResolver(schema),
    defaultValues: defaultList,
  });

  const {
    control: controlUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm<IList>({
    resolver: yupResolver(schema),
    defaultValues: defaultList,
  });

  useEffect(() => {
    dispatch(NoteAction.getNoteListRequest());
  }, []);

  const createNewNote = () => {
    setUpdateModal(true);
    console.log();
    
  };

  const handleSubmitNote = async (data: IList) => {
    console.log(data);
    dispatch(NoteAction.createNoteListRequest({
      ...data,
    }));
    reset();
  };

  return (
    <NoteListContainer>
      {noteStore.noteList.map((item, index) => (
        <div className="sigle-card" key={index}>
          <div className="header">
            <span className='title' >Title</span>
            <div className="group-action">
              <CreateIcon className='pointer' style={{ color: "orange" }} />
              <DeleteIcon className='pointer' style={{ color: "red" }} />
            </div>
          </div>
          <div className="body">
            <span className='badge' >TODO</span>
            <span className='content' >Content</span>
          </div>
        </div>
      ))}
      <Button
        variant="contained"
        className='btn-add'
        onClick={createNewNote}
      >+</Button>
      <Dialog open={updateModal} onClose={() => setUpdateModal(true)}>
        <DialogTitle id="alert-dialog-title">Update Todo</DialogTitle>
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
            <div className="group-input">
              <Controller
                control={controlUpdate}
                name="title"
                render={({ field }) => (
                  <TextField {...field} label="Title" size="small" />
                )}
              />
              <small className="error">
                {errorsUpdate.title && errorsUpdate.title.message}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={controlUpdate}
                name="content"
                render={({ field }) => (
                  <TextField {...field} label="Content" size="small" />
                )}
              />
              <small className="error">
                {errorsUpdate.title && errorsUpdate.title.message}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={controlUpdate}
                name="status"
                render={({ field }) => (
                  <TextField {...field} label="Status" size="small" />
                )}
              />
              <small className="error">
                {errorsUpdate.title && errorsUpdate.title.message}
              </small>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setUpdateModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(handleSubmitNote)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </NoteListContainer >
  )
}
