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

    const handleOnSubmit = () => {
    
        if (file) {
          fileReader.onload = function (event) {
            const csvOutput = event.target?.result
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
    // <div>
    //     <form>
    //         <input
    //             type={"file"}
    //             id={"csvFileInput"}
    //             accept={".csv"}
    //             onChange={handleOnChange}/>
    //         <button className='import_button'
    //             onClick={(e) => {
    //             handleOnSubmit(e);}}>
    //             Import CSV
    //         </button>
    //     </form>
    // </div>
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