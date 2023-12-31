import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import routes from "@/router/index.js";
import { ConfigProvider } from 'zarm';

import NavBar from '@/components/Nav';

function App() {
  const location = useLocation();
  const { pathname } = location;
  const navPaths = ['/', '/data', '/user'];

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setShowNav(navPaths.includes(pathname));
  }, [pathname]);

  return <>
    <ConfigProvider primaryColor={'#007fff'}>
      <>
        <Routes>
          {
            routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component/>} />)
          }
        </Routes>
      </>
    </ConfigProvider>
    <NavBar showNav={ showNav }/>
  </>
}

export default App;