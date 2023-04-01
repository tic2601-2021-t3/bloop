import React, { useEffect, useState }  from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import axios from 'axios'
const { Header, Content, Footer } = Layout
const App = () => {
const [backendData, setBackendData] = useState([{}])

/* Alternative method to get data and display data
  const getEverything = (data) => {
      const result = []
      for (let i = 0; i < len(data); i++) {
        result.append((<p key={data[i]._id}>{data[i].food}</p>))
      }
      return result // will return to the frontend where getEverything(backendData) was called i.e. line 70
  }
*/

  const getAll = async () => {
    const data = await axios.get("/api/getAll")
      // console.log(data.data)
      if (backendData !== undefined){
        setBackendData(data.data)
      }
  }
  useEffect(() => {
    const data = getAll()
  }, [])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <div>
            {(
              // Alternative method to get data and display data: getEverything(backendData)
              (backendData.map((item) => (<p key={item._id}>{item.food}</p>)))
            )}
          </div>
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