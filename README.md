# Professor-Course Assignment Tool

**Westmont College Spring 2024**

**CS 128 Information Retrieval and Big Data**

*Assistant Professor* Mike Ryu (mryu@westmont.edu) 

## Author Information
* **Name**: Bailey Hall
* **Email**: bahall@westmont.edu

## License Information

This project is licensed under the MIT License - see the LICENSE file for details

Copyright (c) 2024 baileyjh

## Project Description

The Professor-Course Assignment Tool is a program that is created for the department chairs at Westmont College. It is their responsibility to create a report for the Provost’s Office of which courses their department will offer and which professors will be teaching those courses. Rather than manipulating data in a spreadsheet which is the current process for the chairs, the Professor-Course Assignment Tool will be a program with a simple, easy-to-understand, graphical interface with drag-and-drop elements corresponding to professors and courses.

All that the department chairs will have to do is drag a professor element into a course container to assign them to each other. The program will contain logic that restricts the number of professor-course assignments according to Westmont College policy, and department chairs will have the ability to add and remove elements corresponding to courses and professors in the program. Finally, when the chair is satisfied with their professor-course assignments, the program will be able to export a correctly formatted report of the data ready to be sent to the Provost’s Office.


## Instructions for Software Utilization



## Specifications

This program will have a couple of significant components.

The first is the drag-and-drop feature which is a part of the frontend. Elements corresponding to professors will be able to be dragged into containers corresponding to courses. Both professors and courses will be labeled. There will also be a ‘clear’ feature that can reset to program/unassign all professors from courses.

Still on the frontend, there will be a feature with the ability for department chairs to add or remove elements in the beginning or in circumstances of someone leaving, a new hire, a new course offering, or a course drop.

For the backend, there will need to be some logic involved regarding the drag-and-drop. Per Westmont policy, each faculty member can only be assigned a certain amount of credits to teach. Each course element in the program will contain information about how many units it is so that when a professor element is dragged into a course, the program will be able to keep track of the total units assigned to a professor and prevent any over-booking. 

I plan on mainly using React to program the Professor-Course Assignment Tool. There are many helpful tools including React-CSV (for exporting the spreadsheet report) and React DnD (for drag-and-drop). I may look into CSS for styling. I am hoping to avoid using a DBMS since there isn’t a large amount of data involved in this project and instead use localStorage.

## Credits

1) The initial idea for this program was presented to me by Dr. Michael Everest meverest@westmont.edu, interim Dean in the Office of the Provost at Westmont College for the 2023-2024 academic year.
2) "React Tutorial For Beginners" by developedbyed: https://www.youtube.com/watch?v=dGcsHMXbSOA
3) "React Typescript Tutorial with Project | Learn React JS with Typescript [2021] by RoadsideCOder: https://www.youtube.com/watch?v=knqz3_rPcKk
4) "React Drag and Drop Tutorial | React Beautiful DnD Tutorial" by RoadsideCOder: https://www.youtube.com/watch?v=uEVHJf30bWI 
5) 
