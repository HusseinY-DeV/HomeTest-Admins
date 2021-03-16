import React , {useEffect,useState} from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import styled from "styled-components";
import Sidenav from './components/Sidenav/Sidenav';
import Profile from './components/Profile/Profile';
import Admin from './components/Admin/Admin';
import Post from './components/Post/Post';
import EachPost from './components/Post/EachPost';
import Footer from './components/Footer/Footer';
import Test from './components/Test/Test';
import Booking from './components/Booking/Booking';
import Book from './components/Booking/Book';



const AppContainer = styled.div`
position:relative;
`;


function App() {

  const [render,setRender] = useState(false);
  const [auth,setAuth] = useState(false);
  const [menu,setMenu] = useState(false);
  const [page,setPage] = useState("HomeTest"); 
  const token = localStorage.getItem("token");
  
  useEffect(() => {  

    if(token)
    {
      setAuth(true);
    }else {
      setAuth(false);
    }
  
  }, [render]);

  return (
    <AppContainer>
      {auth && <Nav page={page} menu={menu} setMenu={setMenu}  />}
      {auth && <Sidenav menu={menu} setMenu={setMenu} setRender={setRender} />}
        <Switch>
          <Route exact path="/">
            <Login  setRender={setRender} />
          </Route>
          <Route exact path="/profile">
            <Profile setPage={setPage} setRender={setRender} />
          </Route>
          <Route exact path="/admins">
            <Admin setPage={setPage} setRender={setRender} />
          </Route>
          
          <Route exact path="/posts">
            <Post setPage={setPage} setRender={setRender} />
          </Route>
          
          <Route exact path="/posts/:id" render={props => <EachPost setPage={setPage} {...props} />}>
          </Route>

          <Route  exact path="/tests" render={props => <Test setPage={setPage}  {...props} />} >
          </Route>

          <Route  exact path="/bookings" render={props => <Booking setPage={setPage}  {...props} />} >
          </Route>

          <Route  exact path="/bookings/:id" render={props => <Book setPage={setPage}  {...props} />} >
          </Route>

        </Switch>
        <Footer />
    </AppContainer>
  );
}

export default App;
