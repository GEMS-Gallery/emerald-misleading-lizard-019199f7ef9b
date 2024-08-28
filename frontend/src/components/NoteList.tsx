import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Note {
  id: bigint;
  title: string;
  content: string;
  category: string | null;
}

interface NoteListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote }) => {
  return (
    <div>
      <h2>Notes</h2>
      <List>
        {notes.map((note) => (
          <ListItem key={note.id.toString()}>
            <ListItemText
              primary={note.title}
              secondary={`Category: ${note.category || 'None'}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onSelectNote(note)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NoteList;
