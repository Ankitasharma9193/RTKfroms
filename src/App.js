import './App.css';
import PostsList from './features/posts/PostsList';
import AddPostsForm from './features/posts/AddPostsForm';

function App() {
  return (
    <div className="App">
      FORMS
      <PostsList />
      <AddPostsForm />
    </div>
  );
}

export default App;
