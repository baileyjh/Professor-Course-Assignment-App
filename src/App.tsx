import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import ProfessorList from './components/ProfessorList';
import { Professor } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [professor, setProfessor] = useState<string>("");
  const [professors, setProfessors]= useState<Professor[]>([]);
  const [assignedCourse, setAssignedCourse] = useState<Professor[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(professor) {
      setProfessors([...professors, {id: Date.now(), professor:professor, isDone: false}])
      setProfessor("");
    }
  };

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId===source.droppableId && destination.index===source.index) return;
    if (source.droppableId==='CoursesList') return;

    let add, 
      active = professors,
      assigned = assignedCourse;

    if(source.droppableId === 'ProfessorsList' && destination.droppableId === 'CoursesList') {
      add = active[source.index];
      assigned.splice(destination.index, 0, {id: Date.now(), professor:add?.professor, isDone: false});
      setAssignedCourse(assigned);
      setProfessors(active);
      return;
    }

    if(source.droppableId === 'ProfessorsList' && destination.droppableId === 'ProfessorsList') {
      add = active[source.index];
      active.splice(source.index, 1);
      active.splice(destination.index, 0, add);
      setAssignedCourse(assigned);
      setProfessors(active);
      return;
    } else {
      setAssignedCourse(assigned);
      setProfessors(active);
      return;
    }
};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className="heading"> Professor-Course Assignment Tool</span>
      <InputField professor={professor} setProfessor={setProfessor} handleAdd={handleAdd} />
      <ProfessorList 
        professors={professors} 
        setProfessors={setProfessors}
        assignedCourse={assignedCourse} 
        setAssignedCourse={setAssignedCourse}/> 
    </div>
    </DragDropContext>

  );
}

export default App;