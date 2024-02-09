import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import ProfessorList from './components/ProfessorList';
import { Professor } from './model';

const App: React.FC = () => {
  const [professor, setProfessor] = useState<string>("");
  const [professors, setProfessors]= useState<Professor[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(professor) {
      setProfessors([...professors, {id: Date.now(), professor:professor, isDone: false}])
      setProfessor("");
    }
  };

  console.log(professors);

  return (
    <div className="App">
      <span className="heading"> Professor-Course Assignment Tool</span>
      <InputField professor={professor} setProfessor={setProfessor} handleAdd={handleAdd} />
      <ProfessorList professors={professors} setProfessors={setProfessors}/> 
    </div>
  );
}

export default App;