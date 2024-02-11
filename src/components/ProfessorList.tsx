import React from 'react';
import { Professor } from '../model';
import './styles.css';
import SingleProfessor from './SingleProfessor';

interface Props{
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const ProfessorList: React.FC<Props> = ({professors, setProfessors}) => {
    return (
        <div className="container">
            <div className="professors">
                <span className="professors_heading">Professors</span>
                {professors.map((professor) => (
                        <SingleProfessor 
                            professor={professor} 
                            professors={professors} 
                            key={professor.id}
                            setProfessors={setProfessors}/>
                    ))}
            </div>
            <div className="professors courses">
                <span className="courses_heading">Courses</span>
                {professors.map((professor) => (
                        <SingleProfessor 
                            professor={professor} 
                            professors={professors} 
                            key={professor.id}
                            setProfessors={setProfessors}/>
                    ))}
            </div>
        </div>
    );
};

export default ProfessorList