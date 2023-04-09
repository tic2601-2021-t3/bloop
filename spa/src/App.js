import { Layout, theme } from 'antd'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GetAll from './pages/GetAll.js';
import One from './pages/GetOne.js';
import Two from './pages/Two.js';
const { Header, Content, Footer } = Layout

const App = () => {
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
          <Route path='/Two'element={<Two/>} />
        </Routes>
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