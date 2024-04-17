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

    const handleDelete = (id: string, last: string, first: string) => {
        let newAssignedProfessors = {...assignedProfessors}

        for (let key in newAssignedProfessors) {
            let newValue, array
            array = newAssignedProfessors[key]
            newValue = array.filter((professor) => !(professor.last === last && professor.first === first))
            newAssignedProfessors[key] = newValue
        }
        setAssignedProfessors(newAssignedProfessors)
        setProfessors(professors.filter((professor) => professor.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: string, last: string, first: string) => {
        e.preventDefault();

        let newAssignedProfessors = {...assignedProfessors}

        let newFirst: string, newLast: string

        if(editProfessor.includes(' ')){
            [newFirst, newLast] = editProfessor.split(' ')
        } else{
            newFirst = ''
            newLast = editProfessor
        }

        for (let key in newAssignedProfessors) {
            let newValue: Professor[], array: Professor[]
            array = newAssignedProfessors[key]
            for (let prof of array){
                if (prof.last === last && prof.first === first){
                    newValue = array.map((profess) =>({...profess, professor:editProfessor, last: newLast, first: newFirst}));
                    newAssignedProfessors[key] = newValue
                }
            }
        }

        setAssignedProfessors(newAssignedProfessors)

        setProfessors(
            professors.map((professor) => (
                professor.id === id ? {...professor, professor:editProfessor, last: newLast, first: newFirst}: professor
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
                if (prof.last === professor.last && prof.first === professor.first){
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
                onSubmit={(e) => handleEdit(e, professor.id, professor.last, professor.first)}
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
                <span className='icon'  onClick={() => handleDelete(professor.id, professor.last, professor.first)}>
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