import React, { useEffect, useState, useRef } from 'react'
import { Course } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    course: Course;
    courses: Course[]
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const SingleCourse = ({index, course, courses, setCourses }: Props) => {

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

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const inputRef = useRef<HTMLInputElement>(null);

    return ( 
        <Draggable draggableId={course.id.toString()} index={index}>
            {(provided, snapshot) => (
            <form 
                className={`professors_single ${snapshot.isDragging? 'drag': ''}`}
                onSubmit={(e) => handleEdit(e, course.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                {edit? (
                    <input 
                        ref={inputRef} 
                        value={editCourse} 
                        onChange={(e) => setEditCourse(e.target.value)} 
                        className="professors_single-text"/>
                    ): course.isDone ? (
                    <s className="professors_single-text">{ course.course }</s>
                    ): (
                    <span className="professors_single-text">{ course.course }</span>
                    )}
            <div>
                <span 
                    className='icon' 
                    onClick={() => {
                        if (!edit && !course.isDone) {
                        setEdit(!edit);
                    }}}>
                    <AiFillEdit />
                </span>
                <span className='icon'  onClick={() => handleDelete(course.id)}>
                    <AiFillDelete />
                </span>
                <span className='icon' onClick={() => handleDone(course.id)}>
                    <MdDone />
                </span>
            </div>
            </form>
            )}
        </Draggable>
    
    )
}

export default SingleCourse