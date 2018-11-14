import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import '../assets/css/app.css';
import React, { Component } from 'react';
import{Route} from 'react-router-dom';
import axios from 'axios';
import List from './list';
import AddItem from './add_item';
// import listData from '../dummy_data/list';
// import { randomString } from '../helpers';


const BASE_URL = 'http://api.reactprototypes.com/todos';
const API_KEY = '?key=sashakey_demo';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            list:[],
            error: ''
    }
}
    deleteItem = async (id) => {
        
        

        //'http://api.reactprototypes.com/todos'5be4a7b7d2af63260da32ac3?key=c718_demouser';
        const resp = await axios.delete(`${BASE_URL}/${id + API_KEY}`);
        
        this.getListData();
        
        // const listCopy = this.state.list.slice();

        // listCopy.splice(index, 1);

        // this.setState({
        //     list: listCopy
        // })
    }


    addItem = async (item) => {

        const resp = await axios.post(BASE_URL + API_KEY, item);
        

        this.getListData();

        // item._id = randomString(8);

        // this.setState({
        //     list: [item, ...this.state.list]
        // });
        
    }


    componentDidMount(){
        this.getListData();
    }
   
   
    async getListData(){

        //'http://api.reactprototypes.com/todos'?key=c718_demouser';

        try {
            
            const resp = await axios.get(BASE_URL + API_KEY);

            this.setState({
                list: resp.data.todos
            })

        } catch(err){
            this.setState({
                error: 'error geting todos'
            
            })
        }

        
        // axios.get(BASE_URL + API_KEY).then((resp) => {
        //     console.log('server res', resp);
            
        //     this.setState({
        //         list: resp.data.todos
        //     });

        //  }).catch((err) =>{
        //      console.log('request Error:', err.message)
        //      this.setState({
        //          error: 'Error geting todos'
        //      })
        //  });

    }

    
    render(){ 
        const {error, list } = this.state;
        
        return (
            <div>
                <div className="container">

                    <Route exact path ="/" render={()=>{
                        return <List delete={this.deleteItem} data={list} error={error}/>
                    }}/>

                    <Route path ="/add-item" render={() => {
                        return <AddItem add= {this.addItem }/>
                    }}/>
                    
                    
                </div>
         </div>
        );
    }
}

export default App;
