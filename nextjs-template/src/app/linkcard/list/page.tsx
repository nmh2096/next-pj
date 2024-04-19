"use client";

import { useAppDispatch, useAppSelector } from '@/hooks';
import { CardAction } from '@/store/linkcardStore/LinkCardReducer';
import { ICard } from '@/store/linkcardStore/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import UpdateIcon from "@mui/icons-material/Create";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { schema } from './schema';
import { LinkCardContainer } from './style';
import Link from 'next/link';

export default function list() {

  const dispatch = useAppDispatch();
  const cardStore = useAppSelector((state) => state.card);
  const [openModal, setOpeneModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteCardModal, setDeleteCardModal] = useState(false);
  const defaultValues = {
    title: "",
    url: "",
    status: "LEARNED",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ICard>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    dispatch(CardAction.getCardListRequest())
  }, []);

  useEffect(() => {
    if(cardStore.card) {
      setValue("title", cardStore.card.title)
      setValue("url", cardStore.card.url)
      setValue("status", cardStore.card.status)
    }
  }, [cardStore.card])

  const handleColoseModal = () => {
    reset();
    setOpeneModal(false);
    setIsUpdate(false);
  };

  console.log();


  const handleUpdateModal = async (item: ICard) => {
    dispatch(CardAction.getCardDetailRequest(item))
    setIsUpdate(true);
    setOpeneModal(true);
    console.log(item);
    
  };

  const handleDeleteModal = (item: ICard) => {

  };

  const createNewCard = () => {
    setIsUpdate(false);
    setOpeneModal(true);
  };

  const handleSubmitCard = (data: ICard) => {
    if (!isUpdate) {
      dispatch(CardAction.createCardListRequest({
        ...data,
      }));
      setIsUpdate(false);
    } else {
      console.log(data);
      dispatch(CardAction.updateCardRequest({
        ...data,
        _id: cardStore.card?._id
      }))
    }
    handleColoseModal();
  };

  const confirmDeleteCard = () => {

  };

  return (
    <LinkCardContainer>

      {cardStore.cardList.map((item, index) => (
        <div className="sigle-card" key={index}>
          <div className="header">
            <span className='title' >{item.title}</span>
            <div className="group-action">
              <UpdateIcon className='pointer' style={{ color: "orange" }} onClick={() => handleUpdateModal(item)} />
              <DeleteIcon className='pointer' style={{ color: "red" }} onClick={() => handleDeleteModal(item)} />
            </div>
          </div>
          <div className="body">
            <span className={`badge ${item.status == "TO LEARN" ? "red-badge"
              : item.status == "LEARNING" ? "yellow-badge"
                : "green-badge"}`} >
              {item.status}
            </span>
            <Link className='url' href= {item.url} target='_blank' >{item.url}</Link>
          </div>
        </div>
      ))
      }
      <Button
        variant="contained"
        className='btn-add'
        onClick={createNewCard}
      >+</Button>
      <Dialog open={openModal} onClose={() => setOpeneModal(true)}>
        <DialogTitle id="alert-dialog-title">
          {isUpdate ? "Update card" : "Create a new card"}
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
                name="url"
                render={({ field }) => (
                  <TextField {...field} label="Url" size="small" />
                )}
              />
              <small className="error">
                {errors.title && errors.url?.message}
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
                    <MenuItem value="TO LEARN">To Learn</MenuItem>
                    <MenuItem value="LEARNING">Learning</MenuItem>
                    <MenuItem value="LEARNED">Learned</MenuItem>
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
          <Button onClick={handleSubmit(handleSubmitCard)}>
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteCardModal}
        onClose={() => setDeleteCardModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Card"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this card?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setDeleteCardModal(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDeleteCard}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </LinkCardContainer >
  )
}
