import React,{Component} from 'react';

export class Home extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h2>Welcome to the Registration homepage!</h2>
                <p>Navigate on the 'Registrations' tab to see registrations, add new ones, edit/delete existing ones.</p>
            </div>
        )
    }
}
export default Home;