import Header from "./components/Header"
import Total from "./components/Total"
import Content from "./components/Content"


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
console.log(course.parts)
 // <Content parts={course.parts} />

  return (
    <div>
    <Header course={course.name} />
    <Content content={course.parts} />
    <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
     
    </div>
  );
}

export default App;
