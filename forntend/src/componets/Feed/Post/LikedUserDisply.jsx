import * as React from 'react';



//MUI
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {CardHeader , Avatar } from '@mui/material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function LikedUserDisply({open , setOpen , likes}) {
 

    const handleClose = () => {
        setOpen(false);
      };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Liked user
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {
            likes.map((u)=>(
              <>
              <CardHeader
                avatar={
                  <Avatar src={u.profilePhoto} aria-label="recipe">
                  </Avatar>
                }
                title={u.name}
                subheader={"@"+u.userName}
              />
              </>
            ))
          }
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
