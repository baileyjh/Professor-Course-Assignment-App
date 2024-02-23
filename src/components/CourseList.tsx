import React from 'react';
import { Course } from '../model';
import './styles.css';
import SingleCourse from './SingleCourse';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    assignedCourse: Course[];
    setAssignedCourse: React.Dispatch<React.SetStateAction<Course[]>>;
}

const CourseList: React.FC<Props> = ({
    courses, 
    setCourses, 
    assignedCourse, 
    setAssignedCourse}) => {
    return (
        <div className="container">
            <Droppable droppableId= "ProfessorsList">
                {(provided, snapshot) => (
                    <div 
                        className={`professors ${snapshot.isDraggingOver?'dragactive':""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            <span className="professors_heading">Professors</span>
                            {courses.map((course, index) => (
                                <SingleCourse
                                    index={index}
                                    course={course} 
                                    courses={courses} 
                                    key={course.id}
                                    setCourses={setCourses}/>
                        ))}
                        {provided.placeholder}
                </div>
                )}
            </Droppable>
            <Droppable droppableId= "CoursesList">
                {(provided, snapshot) => (
                    <div 
                        className={`professors courses ${snapshot.isDraggingOver?'dragcomplete':""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <span className="courses_heading">Courses</span>
                        {assignedCourse.map((course, index) => (
                            <SingleCourse
                                index={index}
                                course={course} 
                                courses={assignedCourse} 
                                key={course.id}
                                setCourses={setAssignedCourse}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default CourseList