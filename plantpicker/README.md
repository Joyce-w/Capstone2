
# Plant + Pot
This capstone was inspired by the new plant parents that emerged during the pandemic. Some may already have a green thumb while others are just starting. Plant + Pot visitors can take a quiz to determine what kind of plants are suited for their environment. Visitors can also create an account and create a list to save plants for certain rooms/people.

<!-- ### Plant + Pot Preview

![Big Two Preview](BigTwoPreview.gif) -->

### Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Installation:
`npm install`

Setting up database. Setup the sql database in the following order:
1. plantPickerSchema.sql
2. plants.sql
3. seed.sql


Start Server:
`npm start`

View App:
Open [http://localhost:3000/](http://localhost:3000/)

### Reflection
Plant + Pot uses Express and React. This project took ~60 hours to create a running app. This does not include any stylistic changes. 

Some problems that I encountered while completing this project:

- In the quiz portion of the app. The values to some questions such as "Do you have pets around" is denoted with "1" ,"0", and "unsure" to represent true,false, and undefined respectively when the user's answers are sent to the backend. I was unable to set "undefined" or "null" on the form as it is converted to a string once the form is sent to Express for further handling. I got around this dillema by creating further functions to convert the string values to the desired format in Express before runing a query search. 

- Had a small struggle connecting Express routes to React since it was one of my first attempts.
- Formatting the quiz correctly to yield desired data.
- Displaying error messages from the api end whenever applicable. 


Connect with me!
- [Linkedin](https://www.linkedin.com/in/hello-joycewong/)
- [GitHub](https://github.com/Joyce-w)

