import './App.css';
import { UserContextProvider } from './context/userContext';
import { Routes , Route } from 'react-router-dom';
import Layout from './scenes/layout';
import IndexPage from "./scenes/indexPage"
import LoginPage from './scenes/loginPage';
import RegisterPage from './scenes/registerPage';
import CreatePost from './scenes/createPost';
import PostPage from './scenes/postPage';
import EditPost from './scenes/editPost';

function App() {
  return (
    <div className='app' >
    <UserContextProvider>
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
    </UserContextProvider>
    </div>
  );
}

export default App;
