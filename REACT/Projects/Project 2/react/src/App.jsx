import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import './App.css';

function Form({ fields, onSubmit, ...props }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} {...props}>
        {fields.map(field => {
          if (field.type === 'text' || field.type === 'password' || field.type === 'email') {
            return (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                fullWidth
                margin="normal"
                error={!!field.error}
                helperText={field.error}
                variant="outlined"
                value={field.value}
                onChange={field.onChange}
              />
            );
          }
          if (field.type === 'select') {
            return (
              <FormControl key={field.name} fullWidth margin="normal" error={!!field.error}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={field.label}
                >
                  {field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {field.error && <FormHelperText>{field.error}</FormHelperText>}
              </FormControl>
            );
          }
          return null;
        })}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Gönder
        </Button>
      </form>
    </Container>
  );
}

// Formu kullanma örneği
function App() {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    role: '',
  });

  const handleFieldChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const fields = [
    { 
      name: 'username', 
      label: 'Kullanıcı Adı', 
      type: 'text', 
      placeholder: 'Kullanıcı adınızı girin', 
      required: true,
      value: formValues.username,
      onChange: handleFieldChange('username')
    },
    { 
      name: 'password', 
      label: 'Şifre', 
      type: 'password', 
      placeholder: 'Şifrenizi girin', 
      required: true,
      value: formValues.password,
      onChange: handleFieldChange('password')
    },
    {
      name: 'role',
      label: 'Rol Seçin',
      type: 'select',
      options: [
        { value: 'user', label: 'Kullanıcı' },
        { value: 'admin', label: 'Yönetici' }
      ],
      value: formValues.role,
      onChange: handleFieldChange('role')
    },
  ];

  const handleFormSubmit = () => {
    console.log("Form gönderildi!", formValues);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Kayıt Formu</h1>
      <Form fields={fields} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
