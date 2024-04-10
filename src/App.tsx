import React, { useState } from 'react';
import './App.css';
import ProfessorInputField from './components/ProfessorInputField';
import CourseInputField from './components/CourseInputField';
import ProfessorList from './components/ProfessorList';
import CourseList from './components/CourseList';
import { Professor, Course } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import CSV from './components/CSV';

const App: React.FC = () => {
  const [professor, setProfessor] = useState<string>("");
  const [professors, setProfessors]= useState<Professor[]>([]);
  const [assignedCourse, setAssignedCourse] = useState<{ [key: string]: Professor[] }>({});


  const [course, setCourse] = useState<string>("");
  const [courses, setCourses]= useState<Course[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedAssignedCourse = {...assignedCourse}

    if(professor) {
      const [first, last] = professor.split(' ')
      setProfessors([...professors, {id: Date.now().toString(), professor:professor, isDone: false, course: false, credits: '0', first: first, last: last}])
      setProfessor("");
    }
    if(course) {
      setCourses([...courses, {id: Date.now(), course:course, isDone: false, credit: '0', term: '', sub: '', num: '', sec: ''}])
      updatedAssignedCourse["SingleCourse"+Date.now.toString()] = []
      setCourse("");
      setAssignedCourse(updatedAssignedCourse)
    }
  };

  const clearProgram = () => {
    setCourses([])
    setProfessors([])
    setAssignedCourse({})
  }

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId===source.droppableId && destination.index===source.index) return;
    if (source.droppableId==='CoursesList') return;

    let add: Professor, 
      active = professors,
      assigned = assignedCourse,
      courseList: Course[] = courses;

    if(source.droppableId === 'ProfessorsList' && destination.droppableId.startsWith("SingleCourse")) {
      add = active[source.index];
      assigned[destination.droppableId] = [{id: add.id + Date.now().toString(), professor:add?.professor, isDone: false, course: true, credits: '', first: add.first, last: add.last}]
      setAssignedCourse(assigned);
      setProfessors(active);

      // let courseId = Number(destination.droppableId.replace("SingleCourse", ''))
      // let totalCred: number = Number(add.credits)
      // for (let cour of courseList){
      //   if (cour.id === courseId){
      //     totalCred += Number(cour.credit)
      //   }
      // }
      // setProfessors(
      //   professors.map((professor) => (
      //       professor.id === add.id ? {...professor, credits: String(totalCred)}: professor
      //       )));
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
      <div className='buttons'>
        <button className='clear_button' onClick={clearProgram}>Clear Program</button>
        <div>
          <CSV
            courses={courses}
            assignedProfessors={assignedCourse}
            professors={professors}/>
        </div>
      </div>
      <div className="inputs">
        <ProfessorInputField professor={professor} setProfessor={setProfessor} handleAdd={handleAdd} />
        <CourseInputField course={course} setCourse={setCourse} handleAdd={handleAdd}/>
      </div>
      <div className="lists">
        <ProfessorList 
          professors={professors} 
          setProfessors={setProfessors}
          assignedProfessors={assignedCourse}
          setAssignedProfessors={setAssignedCourse}
          courses={courses}/>
        <CourseList 
          courses={courses} 
          setCourses={setCourses}
          assignedProfessors={assignedCourse}
          setAssignedProfessors={setAssignedCourse}
          setProfessors={setProfessors}/> 
      </div>
    </div>
    </DragDropContext>

  );
}

export default App;