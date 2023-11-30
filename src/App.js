import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import './App.css';
import Input from './components/Input';
import TodoList from './components/TodoList';

function App() {
  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        ToDo Simple App
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: "20px", minHeight: "30vh" }}>
            <Input />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} style={{ padding: "20px", minHeight: "100vh" }}>
            <TodoList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
