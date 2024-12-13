import React from 'react'
import './input.css';
import './index.css'
import GridComponent from './components/GridComponent/GridTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <GridComponent />
    </div>
  )
}

export default App