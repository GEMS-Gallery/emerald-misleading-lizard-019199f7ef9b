import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface NoteEditorProps {
  categories: string[];
  onAddNote: (title: string, content: string, category: string | null) => void;
  onUpdateNote: (id: bigint, title: string, content: string, category: string | null) => void;
  selectedNote: { id: bigint; title: string; content: string; category: string | null } | null;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ categories, onAddNote, onUpdateNote, selectedNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setCategory(selectedNote.category);
    } else {
      setTitle('');
      setContent('');
      setCategory(null);
    }
  }, [selectedNote]);

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      if (selectedNote) {
        onUpdateNote(selectedNote.id, title, content, category);
      } else {
        onAddNote(title, content, category);
      }
      setTitle('');
      setContent('');
      setCategory(null);
    }
  };

  return (
    <div>
      <h2>{selectedNote ? 'Edit Note' : 'Add New Note'}</h2>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        fullWidth
        margin="normal"
      />
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        label="Content"
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category || ''}
          onChange={(e) => setCategory(e.target.value as string)}
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {selectedNote ? 'Update Note' : 'Add Note'}
      </Button>
    </div>
  );
};

export default NoteEditor;
