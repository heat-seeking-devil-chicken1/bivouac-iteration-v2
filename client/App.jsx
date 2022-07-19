import React, {useState} from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import SignupScreen from "./screens/signupScreen";
import LoginScreen from "./screens/loginScreen";
import DashboardScreen from "./screens/dashboardScreen";
import NavBar from "./components/navBar";
import AddHikeScreen from "./screens/addHikeScreen";
// import EditHikeScreen from "./screens/editHikeScreen";
import "./index.css";

const App = () => {

  const [user, setUser] = useState()

  return (
    <div className="App">
      <Router>
      <NavBar />
        <Routes>
          <Route path='/addhike' element={<ProtectedRoute><AddHikeScreen /></ProtectedRoute>} />
          <Route path='/signup' element={<SignupScreen />} />  
          <Route path='/login' element={<LoginScreen/>} />   
          {/* <Route path='/edithike' element={<EditHikeScreen/>} />              */}
          <Route path='/' element={<ProtectedRoute><DashboardScreen/></ProtectedRoute>} />            
        </Routes>    
      </Router>
    </div>
  );
}

export function ProtectedRoute(props){

  if (localStorage.getItem('user'))
  { 
    return props.children
    
  } else {

   return <Navigate to='/login'/>
  }

}

export default App;