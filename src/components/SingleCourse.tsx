import React, { useEffect, useState, useRef } from 'react'
import { Course, Professor } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Droppable } from 'react-beautiful-dnd'
import SingleProfessor from './SingleProfessor'

interface Props{
    index: number;
    course: Course
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    assignedProfessors: { [key: string]: Professor[] };
    setAssignedProfessors: React.Dispatch<React.SetStateAction<{ [key: string]: Professor[] }>>;
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const SingleCourse: React.FC<Props> = ({
    index,
    course,
    courses,
    setCourses,
    assignedProfessors, 
    setAssignedProfessors,
    setProfessors
    }) => {

        const [edit, setEdit] = useState<boolean>(false)
        const [editCourse, setEditCourse] = useState<string>(course.course)
        
        const handleDone = (id: number) => {
            setCourses(courses.map((course) => 
            course.id===id?{...course, isDone:!course.isDone}: course))
        };
    
        const handleDelete = (id: number) => {
            setCourses(courses.filter((course) => course.id !== id));
        };
    
        const handleEdit = (e: React.FormEvent, id: number) => {
            e.preventDefault();
    
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, course:editCourse}: course
                    )));
            
                    setEdit(false);
        };

        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) =>{
            const { value } = e.target
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, credit:value}: course
                    )));
        }
    
        useEffect(() => {
            inputRef.current?.focus();
        }, [edit]);
    
        const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="container">
            <Droppable droppableId= {"SingleCourse"+course.id.toString()}>
                {(provided, snapshot) => (
                    <form 
                        className={`courses_single ${snapshot.isDraggingOver?'dragcomplete':""}`}
                        onSubmit={(e) => handleEdit(e, course.id)}
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                            <div className='header'>
                            {edit? (
                                <input 
                                    ref={inputRef} 
                                    value={editCourse} 
                                    onChange={(e) => setEditCourse(e.target.value)} 
                                    className="single_course_heading"/>
                                ): course.isDone ? (
                                <s className="single_course_heading">{ course.course }</s>
                                ): (
                                <span className="single_course_heading">{ course.course }</span>
                                )}
                        <div className="course_credits">
                            <label className='select_label'>
                                Credits:
                                <select className='select_box'
                                        onChange={(e) => handleSelectChange(e, course.id)}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </label>
                        </div>
                        <div className='icons-container'>
                            <span 
                                className='icon_course' 
                                onClick={() => {
                                    if (!edit && !course.isDone) {
                                    setEdit(!edit);
                                }}}>
                                <AiFillEdit />
                            </span>
                            <span className='icon_course'  onClick={() => handleDelete(course.id)}>
                                <AiFillDelete />
                            </span>
                            <span className='icon_course' onClick={() => handleDone(course.id)}>
                                <MdDone />
                            </span>
                        </div>
                        </div>
                            {assignedProfessors["SingleCourse"+course.id.toString()]?.map((professor, index) => (
                                <SingleProfessor 
                                    index={index}
                                    professor={professor} 
                                    professors={assignedProfessors["SingleCourse"+course.id.toString()]} 
                                    key={professor.id}
                                    setProfessors={setProfessors}
                                    assignedProfessors={assignedProfessors}
                                    setAssignedProfessors={setAssignedProfessors}
                                    courses={courses}/>
                        ))}
                        {provided.placeholder}
                </form>
                )}
            </Droppable>
        </div>
    );
};

export default SingleCourse