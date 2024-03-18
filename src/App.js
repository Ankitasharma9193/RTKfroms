import './App.css';
import PostsList from './features/posts/PostsList';
import AddPostsForm from './features/posts/AddPostsForm';

function App() {
  return (
    <div className="App">
      FORMS
      
      <AddPostsForm />
      <PostsList />
    </div>
  );
}

export default App;
