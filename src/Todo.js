import React from 'react'
import {List,ListItem,ListItemText} from '@material-ui/core'

function Todo(props) {
  return (
    <List>
      <ListItem>
        <ListItemText primary={props.text} secondary="Dummy deadline" />
      </ListItem>
    </List>
  );
}

export default Todo
