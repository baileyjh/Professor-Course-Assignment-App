import React, { useRef } from 'react';
import './styles.css'

interface Props{
    professor: string;
    setProfessor: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const ProfessorInputField: React.FC<Props> = ({ professor, setProfessor, handleAdd }) => {
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
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                placeholder="Enter a professor"
                className="input_box" />
            <button className="input_submit_prof" type="submit">Add</button>
        </form>
    );
};

export default ProfessorInputField;