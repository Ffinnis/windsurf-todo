import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// Create a minimalistic theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState({
    category: 'all',
    status: 'all',
    searchTerm: '',
  });

  // Add a new todo
  const addTodo = (todo) => {
    setTodos([...todos, { 
      ...todo, 
      id: Date.now(), 
      completed: false,
      color: todo.color || '#3f51b5' 
    }]);
  };

  // Start editing a todo
  const startEditTodo = (todo) => {
    setEditingTodo({
      ...todo,
      date: new Date(todo.date) // Ensure date is a Date object
    });
  };

  // Edit an existing todo
  const editTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {
        ...todo,
        ...updatedTodo,
        id: todo.id, // Ensure we keep the original ID
        completed: todo.completed // Keep completed status unless explicitly changed
      } : todo
    ));
    setEditingTodo(null);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    const matchesCategory = filter.category === 'all' || todo.category === filter.category;
    const matchesStatus = filter.status === 'all' || 
      (filter.status === 'completed' && todo.completed) ||
      (filter.status === 'active' && !todo.completed);
    const matchesSearch = todo.title.toLowerCase().includes(filter.searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ 
          bgcolor: 'background.default', 
          minHeight: '100vh', 
          pt: 4 
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Todo App
          </Typography>
          
          <TodoForm 
            onAddTodo={addTodo}
            onEditTodo={editTodo}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
            filter={filter}
            setFilter={setFilter}
          />
          
          <TodoList 
            todos={filteredTodos}
            onEditTodo={startEditTodo}
            onDeleteTodo={deleteTodo}
            onToggleComplete={toggleComplete}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
