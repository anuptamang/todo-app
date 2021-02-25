import React, {useState} from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Button,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import db from './firebase'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [input, setInput] = useState(props.todo.todo);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const deleteTodo = (event) => {
    db.collection('todos').doc(props.todo.id).delete();
    setOpenDelete(false);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    }, {merge: true})

    setOpenEdit(false);
  }

  return (
    <>
      <Modal
        aria-labelledby="edit-title"
        aria-describedby="edit-description"
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEdit}>
          <div className={classes.paper}>
            <h2 id="edit-title">Update this todo</h2>
            <form id="edit-description">
              <FormControl>
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                onClick={updateTodo}
                variant="contained"
                color="primary"
              >
                Update Todo
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className={classes.modal}
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDelete}>
          <div className={classes.paper}>
            <h2 id="delete-title">Delete this todo?</h2>
            <div id="delete-description">
              <FormControl>
                <Input value={input} disabled />
              </FormControl>
              <Button onClick={deleteTodo} variant="contained" color="secondary">
                Delete Todo
              </Button>
              <Button onClick={handleCloseDelete} variant="contained" color="primary">
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AssignmentTurnedInIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <EditIcon onClick={handleOpenEdit} />
            </IconButton>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon onClick={handleOpenDelete} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
}

export default Todo
