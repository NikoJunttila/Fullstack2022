import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

function Users(){

const users = useSelector(state => state.users)
    return(
        <div>
        <h2>Users</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
           
            {users.map((a, index) =>
              <tr key ={a.id}>
                <td>{index}</td>
                <td><Link to={`/users/${a.id}`}>{a.name}</Link></td>
                <td>{a.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
}

export default Users