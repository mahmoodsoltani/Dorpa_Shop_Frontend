import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { userActions } from "../../app/service/useAggregate/userSlice";

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: users } = useSelector((state: RootState) => state.userR);
  useEffect(() => {
    dispatch(
      userActions.getAllUser({
        pageNumber: null,
        pageSize: null,
        sortBy: "id",
        isAscending: true,
        searchTerm: null,
        searchBy: null,
      })
    );
  }, []);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (user: any) => {
    setEditingUser({ ...user });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser({ ...editingUser, isAdmin: e.target.checked });
  };

  const handleSaveClick = () => {};

  const handleDeleteClick = (id: number) => {};

  return (
    <div className='user-management'>
      <h1>User Management</h1>
      <div className='user-list'>
        {users.items.map((user) => (
          <div key={user.id} className='user-row'>
            <div className='user-column'>
              {user.firstName + " " + user.lastName}
            </div>
            <div className='user-column'>{user.email}</div>
            <div className='user-column'>{user.is_Admin ? "Yes" : "No"}</div>
            <div className='user-actions'>
              <IconButton onClick={() => handleClickOpen(user)} color='primary'>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(user.id)}
                color='secondary'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            value={editingUser?.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin='dense'
            name='family'
            label='Family'
            type='text'
            fullWidth
            variant='standard'
            value={editingUser?.family || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin='dense'
            name='email'
            label='Email'
            type='email'
            fullWidth
            variant='standard'
            value={editingUser?.email || ""}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editingUser?.isAdmin || false}
                onChange={handleAdminChange}
              />
            }
            label='Is Admin'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
