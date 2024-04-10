import React, { useEffect, useState, useRef } from 'react'
import { Professor, Course } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    professor: Professor;
    professors: Professor[]
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
    assignedProfessors: { [key: string]: Professor[] };
    setAssignedProfessors: React.Dispatch<React.SetStateAction<{ [key: string]: Professor[] }>>;
    courses: Course[];
}

const SingleProfessor = ({index, professor, professors, setProfessors, assignedProfessors, setAssignedProfessors, courses }: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editProfessor, setEditProfessor] = useState<string>(professor.professor)
    
    const handleDone = (id: string) => {
        setProfessors(professors.map((professor) => 
        professor.id===id?{...professor, isDone:!professor.isDone}: professor))
    };

    const handleDelete = (id: string) => {
        let newAssignedProfessors
        newAssignedProfessors = assignedProfessors

        for (let key in newAssignedProfessors) {
            let newValue, array
            array = newAssignedProfessors[key]
            newValue = array.filter((professor) => !professor.id.toString().startsWith(id.toString()))
            newAssignedProfessors[key] = newValue
        }
        setAssignedProfessors(newAssignedProfessors)
        setProfessors(professors.filter((professor) => professor.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: string) => {
        e.preventDefault();

        setProfessors(
            professors.map((professor) => (
                professor.id === id ? {...professor, professor:editProfessor}: professor
                )));
        
                setEdit(false);
    };

    function getCreditTotal(): number {
        let newAssignedProfessors
        newAssignedProfessors = assignedProfessors

        let creditTotal
        creditTotal = 0

        for (let key in newAssignedProfessors) {
            let profList: Professor[] = newAssignedProfessors[key];
            for (let prof of profList) {
                let identifier = prof.id
                if (identifier.startsWith(professor.id)){
                    let courseId
                    courseId = Number(key.replace("SingleCourse", ''))
                    for (let course of courses){
                        if (course.id === courseId){
                            creditTotal= creditTotal+ Number(course.credit)
                        }
                    }
                }
            }
        }
        // let identity = professor.id
        // let string_credits = String(creditTotal)
        // setProfessors(
        //     professors.map((professor) => (
        //         professor.id === identity ? {...professor, credits: string_credits}: professor
        //         )));

        return creditTotal
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const inputRef = useRef<HTMLInputElement>(null);

    return ( 
        <Draggable draggableId={professor.id.toString()} index={index}>
            {(provided, snapshot) => (
            <form 
                className={`professors_single ${snapshot.isDragging? 'drag': ''}`}
                onSubmit={(e) => handleEdit(e, professor.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                {edit? (
                    <input 
                        ref={inputRef} 
                        value={editProfessor} 
                        onChange={(e) => setEditProfessor(e.target.value)} 
                        className="professors_single-text"/>
                    ): professor.isDone ? (
                    <s className="professors_single-text">{ professor.professor }</s>
                    ): (
                    <span className="professors_single-text">{ professor.professor }</span>
                    )}
            {!professor.course && <div>
                <span className='credit_amount'>Credits Assigned: {getCreditTotal()}</span>
                <span 
                    className='icon' 
                    onClick={() => {
                        if (!edit && !professor.isDone) {
                        setEdit(!edit);
                    }}}>
                    <AiFillEdit />
                </span>
                <span className='icon'  onClick={() => handleDelete(professor.id)}>
                    <AiFillDelete />
                </span>
                <span className='icon' onClick={() => handleDone(professor.id)}>
                    <MdDone />
                </span>
            </div>}
            </form>
            )}
        </Draggable>
    
    )
}

export default SingleProfessor