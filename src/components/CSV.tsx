import React from 'react';
import './styles.css';
import { CSVLink } from "react-csv";

const CSV: React.FC = () => {

    const headers = [
        {label: "SUB", key: 'course.sub'},
        {label: "NUM", key: 'course.num'},
        {label: "Sec", key: 'course.sec'},
        {label: "SECTION_TITLE", key: 'course.section_title'},
        {label: "Last", key: 'prof.last'},
        {label: "First", key: 'prof.first'},
        {label: "Term", key: 'course.term'}
    ]

    const data = [
        {course: { sub: "CHM", num: "100", sec: "1", section_title: "Chemistry Course", term: "Fall"}, prof: { last: "Everest", first: "Michael" }},
        {course: { sub: "MA", num: "015", sec: "2", section_title: "Mathematics Course", term: "Spring"}, prof: { last: "Aboud", first: "Anna" }},
        {course: { sub: "COM", num: "196", sec: "1", section_title: "Communication Studies Course", term: "Fall"}, prof: { last: "Dunn", first: "Deborah" }}
    ]

  return (
    <div>
        <CSVLink
            data={data}
            headers={headers}
            filename='file_name.csv'
            target='_blank'>
        <button className='csv_button'>
            Download CSV
        </button>
        </CSVLink>
    </div>
  )
}

export default CSV;