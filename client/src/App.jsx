import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <React.Fragment>
      <div className='relative w-full min-h-screen'>
        <Navbar />
        <Home />
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default App;