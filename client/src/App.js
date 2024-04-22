import './App.css';
import { Routes , Route } from 'react-router-dom';
import IndexPage from "./scenes/indexPage"
import LoginPage from './scenes/loginPage';
import RegisterPage from './scenes/registerPage';
import CreatePost from './scenes/createPost';
import PostPage from './scenes/postPage';
import EditPost from './scenes/editPost';
import Layout from "./components/layout"

function App() {
  return (
    <div className='app' >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
