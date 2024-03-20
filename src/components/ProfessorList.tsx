import React from 'react';
import { Professor, Course } from '../model';
import './styles.css';
import SingleProfessor from './SingleProfessor';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
    assignedProfessors: { [key: string]: Professor[] };
    setAssignedProfessors: React.Dispatch<React.SetStateAction<{ [key: string]: Professor[] }>>;
    courses: Course[];
}

const ProfessorList: React.FC<Props> = ({
    professors, 
    setProfessors,
    assignedProfessors,
    setAssignedProfessors,
    courses}) => {
    return (
        <div className="container">
            <Droppable droppableId= "ProfessorsList">
                {(provided, snapshot) => (
                    <div 
                        className={`professors ${snapshot.isDraggingOver?'dragactive':""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            <span className="professors_heading">Professors</span>
                            {professors.map((professor, index) => (
                                <SingleProfessor 
                                    index={index}
                                    professor={professor} 
                                    professors={professors} 
                                    key={professor.id}
                                    setProfessors={setProfessors}
                                    assignedProfessors={assignedProfessors}
                                    setAssignedProfessors={setAssignedProfessors}
                                    courses={courses}/>
                        ))}
                        {provided.placeholder}
                </div>
                )}
            </Droppable>
            {/* <Droppable droppableId= "CoursesList">
                {(provided, snapshot) => (
                    <div 
                        className={`professors courses ${snapshot.isDraggingOver?'dragcomplete':""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <span className="courses_heading">Courses</span>
                        {assignedCourse.map((professor, index) => (
                            <SingleProfessor 
                                index={index}
                                professor={professor} 
                                professors={assignedCourse} 
                                key={professor.id}
                                setProfessors={setAssignedCourse}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable> */}
        </div>
    );
};

export default ProfessorList