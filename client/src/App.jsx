import './App.css';
import BookForm from './BookForm';
import BookCategory from './BookCategory';
import BookReview from './BookReview';

function App() {
  return (
    <div style={{color: '#867070'}}>
      <h1>Book Form</h1>
      <BookForm />
      <hr />
      <h1>Book Category</h1>
      <BookCategory/>
      <hr />
      <h1>Book Review</h1>
      <BookReview/>
    </div>
  );
}

export default App;
