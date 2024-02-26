import React from 'react';
import { Course, Professor } from '../model';
import './styles.css';
import SingleCourse from './SingleCourse';

interface Props{
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    // assignedProfessors: Professor[]
    // setAssignedProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
    // assignedCourse: Course[];
    // setAssignedCourse: React.Dispatch<React.SetStateAction<Course[]>>;
    assignedProfessors: { [key: string]: Professor[] };
    setAssignedProfessors: React.Dispatch<React.SetStateAction<{ [key: string]: Professor[] }>>;
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const CourseList: React.FC<Props> = ({
    courses, 
    setCourses, 
    assignedProfessors,
    setAssignedProfessors,
    setProfessors
    }) => {
    return (
        <div className="container">
          <div className={`courses`}>
                <span className="courses_heading">Courses</span>
                    {courses.map((course, index) => (
                        <SingleCourse
                            key={course.id}
                            index={index}
                            course={course}
                            courses={courses}
                            setCourses={setCourses}
                            assignedProfessors={assignedProfessors}
                            setAssignedProfessors={setAssignedProfessors}
                            setProfessors={setProfessors}/>
                        ))}
            </div>
        </div>
    );
};

export default CourseList