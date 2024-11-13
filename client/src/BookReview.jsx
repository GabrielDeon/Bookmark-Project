import { useState } from 'react';
import './BookReview.css';

const BookReview = () => {
  const [formData, setFormData] = useState({
    user: '',
    book: '',
    review: '',
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
    <form className='form-review' onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <div key={field} className="review-group">
          <label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text-review"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit-review">Submit</button>
    </form>
  );
};

export default BookReview;
