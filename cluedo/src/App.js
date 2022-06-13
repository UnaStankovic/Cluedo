import logo from './logo.svg';
import './App.css';
import React,{ useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { MainPage } from './pages/main-page/main-page';
import { GameTable } from './pages/game-table/game-table';

export const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      
       <div className='content-wrap'>
                    <Routes>
                      <Route exact path="/"  element={<MainPage />}/>
                      <Route exact path="/game"  element={<GameTable />}/>
                        {/* <Route path="/login" index element={<Login />}/> */}
                       
                        {/* <Route path="/game" element={<UserPanel/>}>
                            <Route index path='/game/endgame' element={<UserData/>}/>
                           
                            <Route path='*' element={<UserData/>}/> 
                        </Route>*/}
                
                      {/* 404 */}
                      <Route path='*' element={<Navigate to="/" />}/>
                    </Routes>
                
            </div>
    </div>
  );
}

export default App;
