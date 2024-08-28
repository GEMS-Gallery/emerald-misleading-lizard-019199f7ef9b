import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import CategoryList from './components/CategoryList';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';

type Note = {
  id: bigint;
  title: string;
  content: string;
  category: string | null;
};

const App: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchNotes();
  }, []);

  const fetchCategories = async () => {
    try {
      const result = await backend.getCategories();
      setCategories(result);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const result = await backend.getNotes();
      setNotes(result);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddCategory = async (name: string) => {
    try {
      const result = await backend.addCategory(name);
      if ('ok' in result) {
        fetchCategories();
      } else {
        console.error('Error adding category:', result.err);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleRemoveCategory = async (name: string) => {
    try {
      const result = await backend.removeCategory(name);
      if ('ok' in result) {
        fetchCategories();
      } else {
        console.error('Error removing category:', result.err);
      }
    } catch (error) {
      console.error('Error removing category:', error);
    }
  };

  const handleAddNote = async (title: string, content: string, category: string | undefined) => {
    try {
      const result = await backend.addNote(title, content, category === "" ? null : category);
      if ('ok' in result) {
        fetchNotes();
      } else {
        console.error('Error adding note:', result.err);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleUpdateNote = async (id: bigint, title: string, content: string, category: string | undefined) => {
    try {
      const result = await backend.updateNote(id, title, content, category === "" ? null : category);
      if ('ok' in result) {
        fetchNotes();
      } else {
        console.error('Error updating note:', result.err);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shad Note App
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <CategoryList
                categories={categories}
                onAddCategory={handleAddCategory}
                onRemoveCategory={handleRemoveCategory}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <NoteEditor
                categories={categories}
                onAddNote={handleAddNote}
                onUpdateNote={handleUpdateNote}
                selectedNote={selectedNote}
              />
            </Paper>
            <Box sx={{ mt: 3 }}>
              <NoteList
                notes={notes}
                onSelectNote={setSelectedNote}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
