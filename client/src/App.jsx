import './App.css';
import BookForm from './pages/BookForm';
import BookCategory from './pages/BookCategory';
import BookReview from './pages/BookReview';
import SigninPage from './pages/SigninPage';
import SignUpPage from './pages/SignupPage';


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
