import React from 'react';
import { Professor } from '../model';
import './styles.css';
import SingleProfessor from './SingleProfessor';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
    assignedCourse: Professor[];
    setAssignedCourse: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const ProfessorList: React.FC<Props> = ({
    professors, 
    setProfessors, 
    assignedCourse, 
    setAssignedCourse}) => {
    return (
        <div className="container">
            <Droppable droppableId= "ProfessorsList">
                {(provided) => (
                    <div className="professors" ref={provided.innerRef}{...provided.droppableProps}>
                        <span className="professors_heading">Professors</span>
                        {professors.map((professor, index) => (
                            <SingleProfessor 
                                index={index}
                                professor={professor} 
                                professors={professors} 
                                key={professor.id}
                                setProfessors={setProfessors}/>
                        ))}
                </div>
                )}
            </Droppable>
            <Droppable droppableId= "CoursesList">
                {(provided) => (
                    <div className="professors courses" ref={provided.innerRef}{...provided.droppableProps}>
                    <span className="courses_heading">Courses</span>
                    {assignedCourse.map((professor, index) => (
                            <SingleProfessor 
                                index={index}
                                professor={professor} 
                                professors={assignedCourse} 
                                key={professor.id}
                                setProfessors={setAssignedCourse}/>
                        ))}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ProfessorList