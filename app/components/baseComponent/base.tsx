import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'

import { fetchData } from '../../actions/httpActions'

class Base extends React.Component<any, any>{

    constructor() {
        super();
        //we need to bind the component to the functions, so props are available.
        this.fetch = this.fetch.bind(this);
    }

    render(){
        if(!this.props.email){
            return <RaisedButton label="fetch data" onTouchTap={this.fetch}/>
        }
        return <h1>{this.props.email}</h1>
    }

    componentDidMount(){

    }

    private fetch(){
        this.props.dispatch(fetchData());
    }
}

export const BaseContainer = connect((store) => {
    return {
        email:store.appReducer.user.email
    }
})(Base);