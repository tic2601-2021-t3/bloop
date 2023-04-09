import { Layout, theme } from 'antd'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GetAll from './pages/GetAll.js';
import One from './pages/GetOne.js';
import Two from './pages/Post.js';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
const { Header, Content, Footer } = Layout

const App = () => {
  const { isLoading, error } = useAuth0();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
        <Navbar />
        <Routes>
          <Route path='/GetAll'element={<GetAll/>} />
          <Route path='/GetOne'element={<One/>} />
          <Route path='/Post'element={<Two/>} />
        </Routes>
        <main className="column">
        <h1>Auth0 Login</h1>
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && (
          <>
           <LoginButton />
            <LogoutButton />
            <Profile />
        </>
      )}
      </main>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <h2> Hi! This is the home page for our demo</h2>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;