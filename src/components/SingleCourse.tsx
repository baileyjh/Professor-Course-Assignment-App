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
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const SingleCourse: React.FC<Props> = ({
    index,
    course,
    courses,
    setCourses,
    assignedProfessors, 
    setAssignedProfessors,
    professors,
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
    
        const handleCourseEdit = (e: React.FormEvent, id: number) => {
            e.preventDefault();
    
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, course:editCourse}: course
                    )));
            
                    setEdit(false);
        };

        const handleSelectCreditChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) =>{
            const { value } = e.target
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, credit:value}: course
                    )));
        }

        const handleSelectTermChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) =>{
            const { value } = e.target
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, term:value}: course
                    )));
        }

        const handleSelectSubChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) =>{
            const { value } = e.target
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, sub:value}: course
                    )));
        }

        const handleInputNumChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
            const { value } = e.target
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, num:value}: course
                    )));
          }

        const handleInputSecChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
            const { value } = e.target
            setCourses(
                courses.map((course) => (
                    course.id === id ? {...course, sec:value}: course
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
                        onSubmit={(e) => handleCourseEdit(e, course.id)}
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                            <div className='header'>
                                <div className='course_title'>
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
                                <div className='course_key'>
                                    <label className='sub_label'>
                                        <select className='select_box'
                                                onChange={(e) => handleSelectSubChange(e, course.id)}>
                                            <option value="none" selected disabled hidden></option>
                                            <option value="AN">AN</option>
                                            <option value="APP">APP</option>
                                            <option value="ART">ART</option>
                                            <option value="BIO">BIO</option>
                                            <option value="CHM">CHM</option>
                                            <option value="COM">COM</option>
                                            <option value="CS">CS</option>
                                            <option value="EB">EB</option>
                                            <option value="ED">ED</option>
                                            <option value="EN">EN</option>
                                            <option value="ENG">ENG</option>
                                            <option value="ENV">ENV</option>
                                            <option value="ETN">ETN</option>
                                            <option value="FLM">FLM</option>
                                            <option value="FR">FR</option>
                                            <option value="GS">GS</option>
                                            <option value="GER">GER</option>
                                            <option value="GLS">GLS</option>
                                            <option value="GRK">GRK</option>
                                            <option value="HB">HB</option>
                                            <option value="HIS">HIS</option>
                                            <option value="IS">IS</option>
                                            <option value="KNS">KNS</option>
                                            <option value="LS">LS</option>
                                            <option value="MA">MA</option>
                                            <option value="ME">ME</option>
                                            <option value="MUA">MUA</option>
                                            <option value="NUR">NUR</option>
                                            <option value="PHI">PHI</option>
                                            <option value="PEA">PEA</option>
                                            <option value="PHS">PHS</option>
                                            <option value="PHY">PHY</option>
                                            <option value="POL">POL</option>
                                            <option value="PSY">PSY</option>
                                            <option value="RS">RS</option>
                                            <option value="SOC">SOC</option>
                                            <option value="SP">SP</option>
                                            <option value="TA">TA</option>
                                        </select>
                                        —
                                        <input 
                                            className="number_input_box"
                                            onChange={(e) => handleInputNumChange(e, course.id)}/>
                                        —
                                        <input 
                                            className="section_input_box"
                                            onChange={(e) => handleInputSecChange(e, course.id)}/>
                                    </label>
                                </div>
                                </div>
                        <div className="selects">
                            <label className='credit_label'>
                                Credits:
                                <select className='select_box'
                                        onChange={(e) => handleSelectCreditChange(e, course.id)}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                                Term:
                                <select className='select_box'
                                        onChange={(e) => handleSelectTermChange(e, course.id)}>
                                    <option value="none" selected disabled hidden></option>
                                    <option value="fall">Fall</option>
                                    <option value="spring">Spring</option>
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