import React, { useState, useEffect } from "react";

//URL
import { URL } from "../../../util/URL";

//mui
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Modal, Box } from "@mui/material";
import { EditRoadSharp } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";

//SweetAlrt
import { SweetAlrt } from "../../../util/SweetAlrt";

//style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

//EditChild
function EditChild({ userData, setUserData }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Edit DOB
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit date of birth?
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <div className="">
              <p>
                This can only be changed a few times.
                <br />
                Make sure you enter the age of the <br />
                person using the account.{" "}
              </p>
              <input
                type="date"
                onChange={(e) =>
                  setUserData({ ...userData, dob: e.target.value })
                }
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditProfile({ loggedInUser }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    userName: loggedInUser.userName,
    name: loggedInUser.name,
    bio: loggedInUser.bio,
    location: loggedInUser.location,
    website: loggedInUser.website,
    dob: loggedInUser.dob,
  });
  const [loding, setLoding] = useState(false);

  const handleClickOpen = () => {
    setUserData({
      userName: loggedInUser.userName,
      name: loggedInUser.name,
      bio: loggedInUser.bio,
      location: loggedInUser.location,
      website: loggedInUser.website,
      dob: loggedInUser.dob,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async () => {
    setLoding(true);
    try {
      fetch(`${URL}/user/profileEdit/${loggedInUser.email}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log('done', data);
          SweetAlrt("Edit profile succesfully", "success");
          setLoding(false);
          handleClose();
        });
    } catch (error) {
      SweetAlrt("Edit profile fail", "error");
      console.log("error : " + error);
      setLoding(false);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} className="me-3 border border-2">
        <EditIcon />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form className="fill-content">
            <TextField
              className="text-field mb-3"
              fullWidth
              label="userName"
              id="fullWidth"
              variant="outlined"
              value={userData.userName}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
            />
            <TextField
              className="text-field mb-3"
              fullWidth
              label="Name"
              id="fullWidth"
              variant="outlined"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <TextField
              className="text-field mb-3"
              fullWidth
              label="Bio"
              id="fullWidth"
              variant="outlined"
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
            />
            <TextField
              className="text-field mb-3"
              fullWidth
              label="Location"
              id="fullWidth"
              variant="outlined"
              value={userData.location}
              onChange={(e) =>
                setUserData({ ...userData, location: e.target.value })
              }
            />
            <TextField
              className="text-field mb-3"
              fullWidth
              label="Website"
              id="fullWidth"
              variant="outlined"
              value={userData.website}
              onChange={(e) =>
                setUserData({ ...userData, website: e.target.value })
              }
            />

            <div className="birthdate-section">
              <p>
                Birth Date :{" "}
                {loggedInUser?.dob ? (
                  <h2>{loggedInUser.dob}</h2>
                ) : (
                  <h2>
                    {userData.dob ? userData.dob : "Add your date of birth"}
                  </h2>
                )}
              </p>
              <EditChild userData={userData} setUserData={setUserData} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          {loding ? (
            <Button
              autoFocus
              variant="contained"
              color={"success"}
              disabled
            >
              <CircularProgress size="1.5rem" />
            </Button>
          ) : (
            <Button
              autoFocus
              variant="contained"
              color={"success"}
              onClick={handleEdit}
            >
              Save and Edit
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
