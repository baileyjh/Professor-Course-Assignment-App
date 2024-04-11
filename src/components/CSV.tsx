import React from 'react';
import './styles.css';
import { CSVLink } from "react-csv";
import { Professor, Course } from '../model';

interface Props{
    courses: Course[];
    assignedProfessors: { [key: string]: Professor[] };
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
}

const CSV: React.FC<Props> = ({courses, assignedProfessors, professors, setProfessors}) => {

    const headers = [
        {label: "SUB", key: 'course.sub'},
        {label: "NUM", key: 'course.num'},
        {label: "Sec", key: 'course.sec'},
        {label: "SECTION_TITLE", key: 'course.section_title'},
        {label: "faculty load", key: 'course.credit'},
        {label: "Last", key: 'prof.last'},
        {label: "First", key: 'prof.first'},
        {label: "Term", key: 'course.term'}
    ]

    const sortedProfessors: Professor[] = [...professors].sort((a, b) => a.last.localeCompare(b.last));

    function getData(): any {
        let data: any = []
        for (let prof of sortedProfessors){
            let byTerm: Course[] = []
            for(let key in assignedProfessors){
                let profList: Professor[] = assignedProfessors[key];
                for (let prof2 of profList){
                    let identifier = prof2.id
                    if (identifier.startsWith(prof.id)){
                        let courseId = Number(key.replace("SingleCourse", ''))
                        for (let course of courses){
                            if (course.id === courseId){
                                byTerm.push(course)
                            }
                        }
                    }
                }
            }
            const sortedByTerm: Course[] = [...byTerm].sort((a, b) => a.term.localeCompare(b.term))
            if (sortedByTerm.length === 0){
                data.push({course: { sub: '', num: '', sec: '', section_title: '', term: '', credit: prof.credits}, prof: {last: prof.last, first: prof.first}})
            } else {
                for (let course of sortedByTerm){
                    data.push({course: { sub: course.sub, num: course.num, sec: course.sec, section_title: course.course, term: course.term, credit: course.credit}, prof: {last: prof.last, first: prof.first}})
                }
                data.push({course: { sub: '', num: '', sec: '', section_title: '', term: '', credit: prof.credits}, prof: {last: '', first: ''}})
            }
            data.push({course: { sub: '', num: '', sec: '', section_title: '', term: '', credit: ''}, prof: {last: '', first: ''}})
        }
        return data
    };

    // const handleCSVExport = () => {
    //     let totals: { [id: string]: number}
    //     for (let profess of sortedProfessors){
    //         let creditTotal = 0
    //         for (let key in assignedProfessors) {
    //             let profList: Professor[] = assignedProfessors[key];
    //             for (let prof of profList) {
    //                 let identifier = prof.id
    //                 if (identifier.startsWith(profess.id)){
    //                     let courseId = Number(key.replace("SingleCourse", ''))
    //                     for (let course of courses){
    //                         if (course.id === courseId){
    //                             creditTotal= creditTotal+ Number(course.credit)
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //     }
    // } 

    const handleCSVExport = () => {
        const updatedProfessors = sortedProfessors.map((profess) => {
            let creditTotal = 0;
            for (let key in assignedProfessors) {
                let profList: Professor[] = assignedProfessors[key];
                for (let prof of profList) {
                    let identifier = prof.id;
                    if (identifier.startsWith(profess.id)) {
                        let courseId = Number(key.replace("SingleCourse", ''));
                        for (let course of courses) {
                            if (course.id === courseId) {
                                creditTotal += Number(course.credit);
                            }
                        }
                    }
                }
            }
            return {...profess, credits: String(creditTotal)};
        });
        setProfessors(updatedProfessors);
    }

    function getCSVTitle(): string {
        let date = Date.now().toString()
        return "Professor-Course Load Report "+ date + '.csv'
    }

  return (
    <div>
        <CSVLink
            data={getData()}
            headers={headers}
            filename={getCSVTitle()}
            target='_blank'>
        <button className='csv_button'
            onClick={handleCSVExport}>
            Download CSV
        </button>
        </CSVLink>
    </div>
  )
}

export default CSV;