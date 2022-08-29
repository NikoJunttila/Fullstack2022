function Part(props){
    return(
    <div>
{props.part.name} {props.part.exercises}
</div>
)
}

function Content(props){
    return(
<div>
<Part part={props.content[0]} />
<Part part={props.content[1]} />
<Part part={props.content[2]} />
</div>
    )
}
export default Content