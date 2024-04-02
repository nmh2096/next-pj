"use client";

import { useAppDispatch } from '@/hooks';
import { NoteListContainer } from './style';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { NoteAction } from '@/store/noteStore/NoteReducer';

export default function list() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(NoteAction.getNoteListRequest());
  }, []);

  const array = [1, 2, 3, 4, 5, 6, 7]

  return (
    <NoteListContainer>
      {array.map((id: any) => (
        <div className="sigle-card" key={id}>
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
    </NoteListContainer >
  )
}
