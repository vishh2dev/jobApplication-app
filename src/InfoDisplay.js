import React,{useState} from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import DisplayDetailsModal from './DisplayDetailsModal'
const { DateTime } = require("luxon")

const InfoDisplay = (props) =>{
    const {title,editUsers,appliedUsers} = props

    const [show, setShow] = useState(false)
    const[user,setUser] = useState({})
    const tableHeaders = ['Name','Technical skills','Experience','Applied Date','view Details','Update Application']


    const handleDetails = (id) =>{

        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
             .then((response) =>{
                 setUser(response.data)
             })
             .catch((err) =>{
                 alert(err)
             })
             setShow(true)
    }

    const handleClose = () => setShow(false)

    const updaterFunction = (id,text,title) =>{
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{ status:text})
             .then((response) =>{
                 const result = response.data
                 if(result.hasOwnProperty('errors')){
                     alert(result.errors)
                 }else{
                     editUsers(result)
                 }
             })
             .catch((err) =>{
                 alert(err)
             })
    }

    const modifyDate = (date) =>{
        const cleanDate = date.split('T')
        const dt = DateTime.fromISO(cleanDate[0])
        const humanReadable = dt.setLocale('fr').toLocaleString(dt.DATETIME_MED)
        return humanReadable
    }
    
    return(
        <div>
            <h2 className="mt-4"> Application for {title} </h2>
            <Table   >
                <thead>
                    <tr>
                        {
                            tableHeaders.map((ele,index) =>  <th key={index}> {ele} </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        appliedUsers.map((ele,i) =>{
                            return(
                                    <tr key={i}>
                                        <td> {ele.name} </td>
                                        <td> {ele.skills} </td>
                                        <td> {ele.experience} </td>
                                        <td> {modifyDate(ele.createdAt)} </td>
                                        <td>
                                        
                                            <Button onClick={() => {handleDetails(ele._id)}}>view Details</Button>

                                            </td>
                                        <td>{
                                            ele.status === 'applied'  ? (
                                                                            <div>
                                                                                <Button variant="success" onClick={() => {updaterFunction(ele._id,'shortlisted')}}>Shortlist</Button>
                                                                                <Button variant="danger" onClick={() => {updaterFunction(ele._id,'rejected')}}>Reject</Button>
                                                                            </div>
                                            ):(
                                                ele.status === 'shortlisted' ? (
                                                    <Button variant="success">shortlisted</Button>
                                                ):(
                                                    <Button variant="danger">Rejected</Button>
                                                )
                                            )

                                        }</td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
            {
                Object.keys(user).length > 0 && <DisplayDetailsModal  handleClose={handleClose}
                                                                show={show}
                                                                user={user}
                />
            }
        </div>
    )
}

export default InfoDisplay