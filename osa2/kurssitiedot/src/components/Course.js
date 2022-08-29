function Header(props){
    return(
    <h3>{props.header}</h3>
    )
}
function Total({parts}){
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((x,y)=> x+y, 0)
    return(
        <div>
            <b>total of {sum} exercises</b>
        </div>

    )
}

function Content({parts}){
    return (
        <div>
          {parts.map((x) => <Part part = {x} key = {x.id}/>)}
        </div>
      )
}
function Part(props){
    return(
            <p>
                {props.part.name} {props.part.exercises}
            </p>
    )
}

function Course(props){
    return(
        <div>
            <Header header={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts = {props.course.parts} />
        </div>
    )
}
export default Course