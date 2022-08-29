
function Part(props){
<p>{props.name} {props.exercises}</p>
}

function Content(props){
    return(
<div><p>
<Part name = {props.name1} exercises={props.exercises1}/>
</p>
</div>
    )
}
export default Content