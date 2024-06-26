import React, { useRef } from 'react';
import './styles.css'

interface Props{
    course: string;
    setCourse: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const CourseInputField: React.FC<Props> = ({ course, setCourse, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        handleAdd(e);
        if (inputRef.current) {
            inputRef.current.focus(); 
        }
    };
    return (
        <form className="input" onSubmit={handleSubmit}>
            <input 
                ref={inputRef}
                type="input" 
                value={course}
                onChange={(e)=>setCourse(e.target.value)}
                placeholder = "Enter a course" 
                className="input_box"/>
            <button className="input_submit_course" type="submit">Add</button>
        </form>
    );
};

export default CourseInputField;