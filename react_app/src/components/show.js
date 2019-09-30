import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Add} from './add';
import {Edit} from './edit';

export class Show extends Component{

    constructor(props){
        super(props);
        this.state={regs:[], addRegShow : false, editRegShow : false}
    }

    // Listen for changes
    componentDidMount() {
        this.refreshList();
    }

    // Refresh elements of page
    refreshList() {
        fetch('http://localhost:3333/getall')
        .then(response => response.json()
        .then(data => {
            this.setState({regs:data["data"]});
        }))
    }

    // Delete one registration (clicked on the table)
    deleteRegistration(regid){
        if(window.confirm('Delete registration??')){
            fetch('http://localhost:3333/delete/' + regid,{
                method:'DELETE',
                headers:{'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
            })
            // Reload the window
            window.location.reload();
        }
    }

    render(){
        const {regs, regid, regfirst, reglast, regage} = this.state;
        // Add registration Modal window state set
        let addRegClose = () => this.setState({addRegShow:false});
        // Edit registration Modal window state set
        let editRegClose = () => this.setState({editRegShow:false});

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First</th>
                            <th>Last</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regs.map(reg=>
                            <tr>
                                <td>{reg.id}</td>
                                <td>{reg.first}</td>
                                <td>{reg.last}</td>
                                <td>{reg.age}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                        className='mr-2' variant='info'
                                        onClick = {() => this.setState({editRegShow:true, regid:reg.id, regfirst:reg.first, reglast:reg.last, regage:reg.age})}
                                        >
                                            Edit
                                        </Button>
                                        <Button className='mr-2'
                                        onClick={() => this.deleteRegistration(reg.id)}
                                        variant='dark'>
                                            Delete
                                        </Button>
                                        <Edit
                                        show = {this.state.editRegShow}
                                        onHide = {editRegClose}
                                        regid = {regid}
                                        regfirst = {regfirst}
                                        reglast = {reglast}
                                        regage = {regage}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            <ButtonToolbar>
                <Button 
                    variant='primary'
                    onClick={() => this.setState({addRegShow: true})}>
                    Add registration
                </Button>

                <Add show={this.state.addRegShow}
                onHide={addRegClose}/>

            </ButtonToolbar>
            </div>
        )
    }
}
export default Show;