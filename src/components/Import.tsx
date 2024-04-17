import React, { useState } from 'react';
import './styles.css';
import { Professor, Course } from '../model';

interface Props{
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    assignedProfessors: { [key: string]: Professor[] };
    setAssignedProfessors: React.Dispatch<React.SetStateAction<{ [key: string]: Professor[] }>>;
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const Import: React.FC<Props> = ({courses, setCourses, assignedProfessors, setAssignedProfessors, professors, setProfessors}) => {

    const [file, setFile] = useState<File | undefined>();

    const fileReader = new FileReader()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
          }
      };

    const parseCSV = (string: string) => {
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    
      let newCourses: Course[] = [], newProfessors: Professor[] = [], newAssignedProfessors: { [key: string]: Professor[] } = {}
      let professorIdCounter = 1;

      for (let row of csvRows){
        let values = row.split(",");
        if (values[0].split('"').join('') === ''){
          continue
        } else{
          let sub = values[0].split('"').join('')
          let num = values[1].split('"').join('')
          let sec = values[2].split('"').join('')
          let course = values[3].split('"').join('')
          let credits = values[4].split('"').join('')
          let lastName = values[5].split('"').join('')
          let firstName = values[6].split('"').join('')
          let term = values[7].split('"').join('')

          let fullName = firstName + " "+ lastName

          let newCourse: Course = {id: Date.now() + professorIdCounter++, course:course, isDone: false, credit: credits, term: term, sub: sub, num: num, sec: sec}
          let newProfessor: Professor = {id: Date.now().toString() + professorIdCounter++, professor:fullName, isDone: false, course: false, credits: '0', first: firstName, last: lastName}

          let alreadyProfessor = false
          for (let prof of newProfessors){
            if (prof.last === newProfessor.last && prof.first === newProfessor.first){
              alreadyProfessor = true
            }
          }

          if (!alreadyProfessor){
            newProfessors = [...newProfessors, newProfessor]
          }

          newCourses = [...newCourses, newCourse]
          newAssignedProfessors["SingleCourse"+newCourse.id] = [{id: newProfessor.id, professor: newProfessor.professor, isDone: false, course: true, credits: '0', first: newProfessor.first, last: newProfessor.last}]
        }
      }
      setCourses(newCourses)
      setProfessors(newProfessors)
      setAssignedProfessors(newAssignedProfessors)
    };
    
      const handleOnSubmit = () => {
    
        if (file) {
          fileReader.onload = function (event) {
            const csvOutput = event.target?.result
            if (typeof csvOutput === "string"){
              setCourses([]);
              setProfessors([]);
              setAssignedProfessors({});
              parseCSV(csvOutput)
            }
          };
    
          fileReader.readAsText(file);
        }
      };

      const handleButtonClick = () => {
        const fileInput = document.getElementById('csvFileInput');
        if (fileInput) {
          fileInput.click(); // Trigger file input click
        }
        handleOnSubmit();
      };

  return (
    <div>
      <input
        type={"file"}
        id={"csvFileInput"}
        accept={".csv"}
        onChange={handleOnChange}
        style={{ display: 'none' }} // Hide the file input element
      />
      <button className='import_button' onClick={handleButtonClick}>
        Import CSV
      </button>
    </div>
  )
}

export default Import;