import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Main from './Pages/Main';

function App() {

  return (
    // <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path='/main' element={<Main/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
