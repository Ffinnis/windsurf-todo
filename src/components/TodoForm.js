import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const INITIAL_TODO = {
  title: '',
  description: '',
  date: new Date(),
  category: 'personal',
  color: '#3f51b5'
};

const TodoForm = ({ 
  onAddTodo, 
  onEditTodo, 
  editingTodo, 
  setEditingTodo, 
  filter, 
  setFilter 
}) => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState(INITIAL_TODO);

  // Update form when editingTodo changes
  useEffect(() => {
    if (editingTodo) {
      setTodo(editingTodo);
      setOpen(true);
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo) {
      onEditTodo(editingTodo.id, todo);
    } else {
      onAddTodo(todo);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setTodo(INITIAL_TODO);
    setEditingTodo(null);
  };

  const handleAddNewClick = () => {
    setEditingTodo(null);
    setTodo(INITIAL_TODO);
    setOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={filter.category}
              label="Category"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="shopping">Shopping</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filter.status}
              label="Status"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Search"
            name="searchTerm"
            value={filter.searchTerm}
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>

      {/* Add Todo Button */}
      <Button 
        variant="contained" 
        fullWidth 
        onClick={handleAddNewClick}
        sx={{ mb: 2 }}
      >
        Add New Todo
      </Button>

      {/* Add/Edit Todo Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          {editingTodo ? 'Edit Todo' : 'Add New Todo'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={todo.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={todo.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Date"
                    value={todo.date}
                    onChange={(newValue) => 
                      setTodo(prev => ({ ...prev, date: newValue }))
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={todo.category}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value="personal">Personal</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="shopping">Shopping</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  type="color"
                  value={todo.color}
                  onChange={handleChange}
                  sx={{
                    '& input[type="color"]': {
                      width: '100%',
                      height: '50px',
                      padding: '0 2px'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
          >
            {editingTodo ? 'Save Changes' : 'Add Todo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoForm;
