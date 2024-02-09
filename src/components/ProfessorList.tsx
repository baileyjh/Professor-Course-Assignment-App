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
        <div className="professors">
            {professors.map(professor =>(
                <SingleProfessor 
                professor={professor} 
                key={professor.id}
                professors={professors}
                setProfessors={setProfessors}
                />
            ))}
        </div>
    )
}

export default ProfessorList