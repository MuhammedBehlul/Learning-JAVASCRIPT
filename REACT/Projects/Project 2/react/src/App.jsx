import React from 'react';
import './App.css';

// InputField bileşeni: Tüm props'ları input elementine iletir.
function InputField({ label, error, ...props }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input {...props} className={`form-control ${error ? 'is-invalid' : ''}`} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

// SelectField bileşeni: Tüm props'ları select elementine iletir.
function SelectField({ label, error, options, ...props }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select {...props} className={`form-control ${error ? 'is-invalid' : ''}`}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

// Form bileşeni: Form alanlarını dinamik olarak render eder.
function Form({ fields, onSubmit, ...props }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Form gönderim işlemi burada yapılır
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {fields.map(field => {
        if (field.type === 'text' || field.type === 'password' || field.type === 'email') {
          return <InputField key={field.name} {...field} />;
        }
        if (field.type === 'select') {
          return <SelectField key={field.name} {...field} />;
        }
        // Daha fazla alan türü buraya eklenebilir
        return null;
      })}
      <button type="submit" className="btn btn-primary">Gönder</button>
    </form>
  );
}

// Formu kullanma örneği
const fields = [
  { name: 'username', label: 'Kullanıcı Adı', type: 'text', placeholder: 'Kullanıcı adınızı girin', required: true },
  { name: 'password', label: 'Şifre', type: 'password', placeholder: 'Şifrenizi girin', required: true },
  { name: 'role', label: 'Rol Seçin', type: 'select', options: [{ value: 'user', label: 'Kullanıcı' }, { value: 'admin', label: 'Yönetici' }] },
];

function App() {
  const handleFormSubmit = () => {
    console.log("Form gönderildi!");
  };

  return (
    <div className="container">
      <h1>Kayıt Formu</h1>
      <Form fields={fields} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
