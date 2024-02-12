import React, { useEffect, useState, useRef } from 'react'
import { Professor } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    professor: Professor;
    professors: Professor[]
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const SingleProfessor = ({index, professor, professors, setProfessors }: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editProfessor, setEditProfessor] = useState<string>(professor.professor)
    
    const handleDone = (id: number) => {
        setProfessors(professors.map((professor) => 
        professor.id===id?{...professor, isDone:!professor.isDone}: professor))
    };

    const handleDelete = (id: number) => {
        setProfessors(professors.filter((professor) => professor.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setProfessors(
            professors.map((professor) => (
                professor.id === id ? {...professor, professor:editProfessor}: professor
                )));
        
                setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const inputRef = useRef<HTMLInputElement>(null);

    return ( 
        <Draggable draggableId={professor.id.toString()} index={index}>
            {(provided) => (
            <form 
                className="professors_single" 
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
            <div>
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
            </div>
            </form>
            )}
        </Draggable>
    
    )
}

export default SingleProfessor