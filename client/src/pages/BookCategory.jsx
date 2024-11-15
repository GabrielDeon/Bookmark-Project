import { useState } from 'react';
import '../styles/BookCategory.css';

const BookCategory = () => {
  const [formData, setFormData] = useState({
    category_name: '',
    mainBooks: '',
    subBooks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className='form-category' onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <div key={field} className="category-group">
          <label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text-category"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit-category">Submit</button>
    </form>
  );
};

export default BookCategory;