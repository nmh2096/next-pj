"use client";

import { useAppDispatch, useAppSelector } from '@/hooks';
import { NoteAction } from '@/store/noteStore/NoteReducer';
import { INote } from '@/store/noteStore/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import UpdateIcon from "@mui/icons-material/Create";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { schema } from './schema';
import { NoteListContainer } from './style';

export default function list() {
  const dispatch = useAppDispatch();
  const noteStore = useAppSelector((state) => state.note);
  const [openModal, setOpeneModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const defaultValues = {
    title: "",
    content: "",
    status: "NORMAL",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<INote>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  //* Get Note List/

  useEffect(() => {
    dispatch(NoteAction.getNoteListRequest());
  }, []);

  const handleColoseModal = () => {
    reset();
    setOpeneModal(false);
    setIsUpdate(false);
  };

  //* Create Note List/

  const createNewNote = () => {
    setIsUpdate(false);
    setOpeneModal(true);
  };

  //* Handle submit Create and Update Note /

  const handleSubmitNote = async (data: INote) => {
    console.log(isUpdate);
    if (!isUpdate) {
      dispatch(NoteAction.createNoteListRequest({
        ...data,
      }));
      setIsUpdate(false);
    } else {
      console.log(data);
      dispatch(NoteAction.updateNoteRequest({
        ...data,
        _id: noteStore.note?._id
      }))
    }
    handleColoseModal();
  };

  useEffect(() => {
    if (noteStore.note) {
      setValue("title", noteStore.note.title);
      setValue("content", noteStore.note.content);
      setValue("status", noteStore.note.status);
    }
  }, [noteStore.note])

  const handleUpdateModal = async (item: INote) => {
    dispatch(NoteAction.getNoteDetailRequest(item));
    setIsUpdate(true);
    setOpeneModal(true);
    console.log(item);
  }

  const handleDeleteModal = (item: INote) => {
    dispatch(NoteAction.getNoteDetailRequest(item));
    setDeleteNoteModal(true);
  }

  const confirmDeleteNote = () => {
    dispatch(NoteAction.deleteNoteRequest(noteStore.note?._id));
    setDeleteNoteModal(false);
  }

  return (
    <NoteListContainer>
      {noteStore.noteList.map((item, index) => (
        <div className="sigle-card" key={index}>
          <div className="header">
            <span className='title' >{item.title}</span>
            <div className="group-action">
              <UpdateIcon className='pointer' style={{ color: "orange" }} onClick={() => handleUpdateModal(item)} />
              <DeleteIcon className='pointer' style={{ color: "red" }} onClick={() => handleDeleteModal(item)} />
            </div>
          </div>
          <div className="body">
            <span className={`badge ${item.status == "IMPORTANT" ? "red-badge"
              : item.status == "HIGHLIGHT" ? "yellow-badge"
                : "green-badge"}`} >
              {item.status}
            </span>
            <span className='content' >{item.content}</span>
          </div>
        </div>
      ))
      }
      <Button
        variant="contained"
        className='btn-add'
        onClick={createNewNote}
      >+</Button>
      <Dialog open={openModal} onClose={() => setOpeneModal(true)}>
        <DialogTitle id="alert-dialog-title">
          {isUpdate ? "Update note" : "Create a new note"}
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
            <p>{isUpdate}</p>
            <div className="group-input">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextField {...field} label="Title" size="small" />
                )}
              />
              <small className="error">
                {errors.title && errors.title?.message}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <TextField {...field} label="Content" size="small" />
                )}
              />
              <small className="error">
                {errors.title && errors.content?.message}
              </small>
            </div>
            <div className="group-input">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    {...field}
                    className="fw"
                    label="Status"
                    size="small"
                    variant='outlined'
                  >
                    <MenuItem value="NORMAL">Normal</MenuItem>
                    <MenuItem value="IMPORTANT">Important</MenuItem>
                    <MenuItem value="HIGHLIGHT">Highlight</MenuItem>
                  </Select>
                )}
              />
              <small className="error">
                {errors.title && errors.status?.message}
              </small>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpeneModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(handleSubmitNote)}>
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteNoteModal}
        onClose={() => setDeleteNoteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Note"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setDeleteNoteModal(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDeleteNote}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </NoteListContainer >
  )
}
