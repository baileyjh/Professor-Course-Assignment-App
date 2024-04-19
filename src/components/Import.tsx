import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import { Professor, Course } from '../model';
import Papa from 'papaparse';

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

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0])
            e.target.value = '';;
          }
      };

const parseCSV = useCallback((csvString: string) => {
    Papa.parse(csvString, {
        complete: function(results) {
            const csvRows = results.data;
            let newCourses: Course[] = [], newProfessors: Professor[] = [], newAssignedProfessors: { [key: string]: Professor[] } = {}
            let professorIdCounter = 1;

            for (let i = 1; i < csvRows.length; i++) { // Start from index 1 to skip header row
                const row: string = csvRows[i] as string;
                if (row[0] === ''){
                  continue
                } else {
                  const sub = row[0];
                  const num = row[1];
                  const sec = row[2];
                  const course = row[3];
                  const credits = row[4];
                  const lastName = row[5];
                  const firstName = row[6];
                  const term = row[7];

                  const fullName = firstName + " " + lastName;

                  const newCourse: Course = { id: Date.now() + professorIdCounter++, course: course, isDone: false, credit: credits, term: term, sub: sub, num: num, sec: sec };
                  const newProfessor: Professor = { id: Date.now().toString() + professorIdCounter++, professor: fullName, isDone: false, course: false, credits: '0', first: firstName, last: lastName };

                  let alreadyProfessor = false
                  for (let prof of newProfessors) {
                    if (prof.last === newProfessor.last && prof.first === newProfessor.first) {
                        alreadyProfessor = true
                    }
                  }

                  if (!alreadyProfessor) {
                    newProfessors = [...newProfessors, newProfessor]
                  }

                  newCourses = [...newCourses, newCourse]
                  newAssignedProfessors["SingleCourse" + newCourse.id] = [{ id: newProfessor.id + 1, professor: newProfessor.professor, isDone: false, course: true, credits: '0', first: newProfessor.first, last: newProfessor.last }]
                }
              }
              setCourses(newCourses)
              setProfessors(newProfessors)
              setAssignedProfessors(newAssignedProfessors)
          },
         });
  }, [setCourses, setProfessors, setAssignedProfessors]);

    

      const handleButtonClick = () => {
        const fileInput = document.getElementById('csvFileInput');
        if (fileInput) {
          fileInput.click(); // Trigger file input click
        }
      };

      useEffect(() => {
        const fileReader = new FileReader();
    
        const handleFileLoad = (event: ProgressEvent<FileReader>) => {
            const csvOutput = event.target?.result;
            if (typeof csvOutput === "string") {
                setCourses([]);
                setProfessors([]);
                setAssignedProfessors({});
                parseCSV(csvOutput);
            }
        };
    
        if (file) {
            fileReader.onload = handleFileLoad;
            fileReader.readAsText(file);
        }
    
        // Cleanup function
        return () => {
            fileReader.onload = null; // Remove event listener
        };
    }, [file, parseCSV, setCourses, setProfessors, setAssignedProfessors]);
    

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