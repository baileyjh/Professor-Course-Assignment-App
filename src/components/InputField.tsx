import React, { useRef } from 'react';
import './styles.css'

interface Props{
    professor: string;
    setProfessor: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ professor, setProfessor, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className="input" onSubmit={(e)=>{
            handleAdd(e)
            inputRef.current?.blur();
            }}>
            <input 
                ref={inputRef}
                type="input" 
                value={professor}
                onChange={
                    (e)=>setProfessor(e.target.value)
                }
                placeholder = "Enter an instructor" 
                className="input_box"/>
            <button className="input_submit" type="submit">Add</button>
        </form>
    );
};

export default InputField;