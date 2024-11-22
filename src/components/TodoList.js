import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Checkbox, 
  Box,
  Typography,
  Paper
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Edit as EditIcon 
} from '@mui/icons-material';
import { format } from 'date-fns';

const TodoList = ({ 
  todos, 
  onEditTodo, 
  onDeleteTodo, 
  onToggleComplete 
}) => {
  if (todos.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px' 
        }}
      >
        <Typography variant="body1" color="textSecondary">
          No todos yet. Start adding some!
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {todos.map((todo) => (
        <Paper 
          key={todo.id}
          elevation={2}
          sx={{ mb: 2, bgcolor: todo.color || '#3f51b5' }}
        >
          <ListItem 
            sx={{ 
              color: 'white',
              opacity: todo.completed ? 0.7 : 1,
            }}
            secondaryAction={
              <Box>
                <IconButton 
                  edge="end" 
                  aria-label="edit"
                  onClick={() => onEditTodo(todo)}
                  sx={{ color: 'white', mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => onDeleteTodo(todo.id)}
                  sx={{ color: 'white' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              sx={{ 
                color: 'white',
                '&.Mui-checked': { color: 'white' } 
              }}
            />
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: 'white'
                }}>
                  {todo.title}
                </Typography>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.5 }}
                  >
                    {todo.description}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Category: {todo.category} | Due: {format(new Date(todo.date), 'MMM dd, yyyy')}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default TodoList;
