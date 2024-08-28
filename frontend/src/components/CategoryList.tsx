import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CategoryListProps {
  categories: string[];
  onAddCategory: (name: string) => void;
  onRemoveCategory: (name: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onAddCategory, onRemoveCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <TextField
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category"
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddCategory} variant="contained" color="primary" fullWidth>
        Add Category
      </Button>
      <List>
        {categories.map((category) => (
          <ListItem key={category} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onRemoveCategory(category)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
