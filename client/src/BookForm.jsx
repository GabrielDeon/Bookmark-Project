import { useState } from 'react';
import './BookForm.css';

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    mainCategory: '',
    subCategory: '',
    UserBook: '',
    BookSummary: '',
    BookReview: '',
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
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <div key={field} className="form-group">
          <label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text-form"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit-form">Submit</button>
    </form>
  );
};

export default BookForm;
