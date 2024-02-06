import React from 'react';
import './App.css';
import InputField from './components/InputField';

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading"> Professor-Course Assignment Tool</span>
      <InputField/>
    </div>
  );
}

export default App;