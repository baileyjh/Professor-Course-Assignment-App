import React, { useState } from 'react';
import './App.css';
import ProfessorInputField from './components/ProfessorInputField';
import CourseInputField from './components/CourseInputField';
import ProfessorList from './components/ProfessorList';
import CourseList from './components/CourseList';
import { Professor, Course } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [professor, setProfessor] = useState<string>("");
  const [professors, setProfessors]= useState<Professor[]>([]);
  const [assignedCourse, setAssignedCourse] = useState<Professor[]>([])

  const [course, setCourse] = useState<string>("");
  const [courses, setCourses]= useState<Course[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(professor) {
      setProfessors([...professors, {id: Date.now(), professor:professor, isDone: false}])
      setProfessor("");
    }
    if(course) {
      setCourses([...courses, {id: Date.now(), course:course, isDone: false}])
      setCourse("");
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
      <ProfessorInputField professor={professor} setProfessor={setProfessor} handleAdd={handleAdd} />
      <CourseInputField course={course} setCourse={setCourse} handleAdd={handleAdd}/>
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