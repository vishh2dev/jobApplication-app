import React,{useState,useEffect} from 'react'
import axios from 'axios'
import InfoDisplay from './InfoDisplay'
import { Button } from 'react-bootstrap'

const Admin = (props) =>{
    const [users,setUsers] = useState([])
    const [appliedUsers,setAppliedUsers] = useState([])
    const [title,setTitle] = useState('')
    

    useEffect(() => {
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
             .then((response) =>{
                 setUsers(response.data)
             })
    },[])
  
    const editUsers = (user) =>{
        const result = users.filter((ele) =>{
            return ele.jobTitle === user.jobTitle
         })
         
         const newArr = result.map((each) =>{
             if(each._id === user._id ){
                 return {...each,...user}
             }else{
                 return {...each}
             }
         })
         setAppliedUsers(newArr)
    }
    

    const handleClick = (jobTitle) =>{
        if(jobTitle === 'front'){
           const result = users.filter((user) =>{
               return user.jobTitle === 'Front-End Developer'
              
           })
           setAppliedUsers(result)
           setTitle('Front-End Developer')
        }else if(jobTitle === 'node'){
            const result = users.filter((user) =>{
                return user.jobTitle === 'Node.js Developer'
                
            })
            setAppliedUsers(result)
            setTitle('Node.js Developer')
        }else if(jobTitle === 'mean'){
            const result = users.filter((user) =>{
                return user.jobTitle === 'MEAN Stack Developer'
                
            })
            setAppliedUsers(result)
            setTitle('MEAN Stack Developer')
            
        }else if(jobTitle === 'full'){
            const result = users.filter((user) =>{
                return user.jobTitle === 'FULL Stack Developer'
                
            })
            setAppliedUsers(result)
            setTitle('FULL Stack Developer')
           
        }
    }
    
    return(
        <div>
           
            <Button  variant="outline-primary" onClick={() => { handleClick('front')}}>Front-End Developer</Button>
            <Button  variant="outline-primary" onClick={() => {handleClick('node')}}>Node.js Developer</Button>
            <Button  variant="outline-primary" onClick={() => {handleClick('mean')}}>MEAN Stack Developer</Button>
            <Button  variant="outline-primary" onClick={() => {handleClick('full')}}>FULL Stack Developer</Button>
           
           {
               title.length > 0 && <InfoDisplay appliedUsers={appliedUsers}
                                                title={title}
                                                editUsers={editUsers}
                                                
                                                        
                                           />
           }
        </div>
    )
}

export default Admin

