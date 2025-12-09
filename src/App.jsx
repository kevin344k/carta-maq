

import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import './App.css'
import Form from './views/Form'
import View_ul from "./views/UlDashboard";

function App() {


  return (
    <Routes>
  
     
<Route path="/ul" element={<Form />} />
      <Route path="/ul/view-ul" element={<View_ul />} />



     </Routes>
   
  )
}

export default App
