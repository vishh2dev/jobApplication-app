import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InfoDisplay from './InfoDisplay'
import { Button } from 'react-bootstrap'

const Admin = (props) =>{
    const [users,setUsers] = useState([])
    const[title,setTitle] = useState('')
    

    useEffect(() => {
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
             .then((response) =>{
                 setUsers(response.data)
             })
    },[])
  
    const editUsers = (user) =>{
        
        const result = users.map((ele) =>{
            if(ele._id === user._id ){
                return {...ele,...user}
            }else{
                return {...ele}
            }
        })
        setUsers(result)
        
    }
    

    const handleClick = (jobTitle) =>{
        if(jobTitle === 'front'){
           
            setTitle('Front-End Developer')
            
        }else if(jobTitle === 'node'){
           
            setTitle('Node.js Developer')
            
        }else if(jobTitle === 'mean'){
          
            setTitle('MEAN Stack Developer')
            
        }else if(jobTitle === 'full'){
           
            setTitle('FULL Stack Developer')
            
        }
        
    }
   
   
    // console.log(users)
    return(
        <div>
           
            <Button  variant="outline-primary" onClick={() => { handleClick('front')}}>Front-End Developer</Button>
            <Button  variant="outline-primary" onClick={() => {handleClick('node')}}>Node.js Developer</Button>
            <Button  variant="outline-primary" onClick={() => {handleClick('mean')}}>MEAN Stack Developer</Button>
            <Button  variant="outline-primary" onClick={() => {handleClick('full')}}>FULL Stack Developer</Button>
           
           {
               title.length > 0 && <InfoDisplay users={users}
                                                title={title}
                                                editUsers={editUsers}
                                                
                                                        
                                           />
           }
        </div>
    )
}

export default Admin

