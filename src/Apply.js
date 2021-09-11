import React,{useState} from 'react'
import axios from 'axios'
import { Col, Row, Form,Button, Container } from 'react-bootstrap'



const Apply = (props) =>{
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[phone,setPhone] = useState('')
    const[jobTitle,setJobTitle] = useState('')
    const[experience,setExperience] = useState('')
    const[skills,setSkills] = useState('')
    const [formErrors,setFormErrors] = useState({})
    const jobs = ['Front-End Developer','Node.js Developer', 'MEAN Stack Developer', 'FULL Stack Developer']
    const errors = {}

    const handleChange = (e) =>{
        const attr = e.target.name
        if(attr === 'name'){
            setName(e.target.value)
        }else if(attr === "email"){
            setEmail(e.target.value)
        }else if(attr === "phone"){
            setPhone(e.target.value)
        }else if(attr === "title"){
            setJobTitle(e.target.value)
        }else if(attr === "skills"){
            setSkills(e.target.value)
        }else if(attr === "experience"){
            setExperience(e.target.value)
        }
    }
    // console.log(skills)

    const runValidations = () =>{
        if(!name){
            if(name.trim().length === 0 ){
                errors.name = 'name cannot be blank'
            }
        } 
        if(!email){
            if(email.trim().length === 0){
                errors.email = 'email cannot be blank'
            }
        } 
        if(!phone){
            if(phone.trim().length === 0){
                errors.phone = 'phone cannot be blank'
            }
        } 
        if(!jobTitle){
            if(jobTitle.trim().length === 0){
                errors.jobTitle = 'job title cannot be blank'
            }
        } 
        if(!experience){
            if(experience.trim().length === 0){
                errors.experience = 'experience cannot be blank'
            }
        } 
        if(!skills){
            if(skills.trim().length === 0){
                errors.skills = 'skills cannot be blank'
            }
        } 


     
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const formData = {
                "name":name,
                "email":email,
                "phone":phone,
                "skills":skills,
                "jobTitle":jobTitle,
                "experience":experience
            }
            axios.post('http://dct-application-form.herokuapp.com/users/application-form',formData)
                 .then((response) =>{
                     const result = response.data
                     if(result.hasOwnProperty('errors')){
                         alert(result.errors)
                     }else{
                         alert('successfully send application')
                         setName('')
                         setEmail('')
                         setPhone('')
                         setSkills('')
                         setJobTitle('')
                         setExperience('')
                     }
                 })
                 .catch((err) =>{
                     alert(err)
                 })
        }else{
            setFormErrors(errors)
            
        }
        
    }
    const styleForm = () =>{
       return {color:"red"}
    }
    return(
        
        <Container className="mt-5">
            <Form >
                <Form.Group  as={Row} className="mb-4"  >
                <Form.Label column sm={2} style={{fontSize: 20}}>
                   Full name
                </Form.Label>
                <Col >
                <Form.Control  type="text"
                                value={name} 
                                onChange={handleChange}
                                name="name"
                    />
                {formErrors.name && <span style={styleForm()}>{formErrors.name}</span>}
               </Col>
               </Form.Group>

               <Form.Group  as={Row} className="mb-4"  >
                   <Form.Label column sm={2} style={{fontSize: 20}}>
                        Email address
                   </Form.Label>
                   <Col sm="10">
                     <Form.Control  type="text"
                                    value={email} 
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="example@email.com"
                     />
                    {formErrors.email && <span style={styleForm()}>{formErrors.email}</span>}
                   </Col>
               </Form.Group>

               <Form.Group  as={Row} className="mb-4"  >
                   <Form.Label column sm={2} style={{fontSize: 20}}>
                        Contact Number
                   </Form.Label>
                   <Col sm="10">
                     <Form.Control   type="text"
                                     value={phone} 
                                     onChange={handleChange}
                                     name="phone"
                                     placeholder="+91 9900556614"
                     />
                    {formErrors.phone && <span style={styleForm()}>{formErrors.phone}</span>}
                   </Col>
               </Form.Group>

               <Form.Group  as={Row} className="mb-4">
                    <Form.Label column sm={2} style={{fontSize: 20}}>
                            Appling for job
                    </Form.Label>
                    <Col sm="10">
                    < Form.Select value={jobTitle} onChange={handleChange} name="title">
                        <option value="">--select--</option>
                        {
                            jobs.map((job,i) =>{
                                return <option key={i} value={job}  > {job} </option>
                            })
                        }
                    </Form.Select>
                    {formErrors.jobTitle && <span style={styleForm()}>{formErrors.jobTitle}</span>}
                    </Col>
               </Form.Group>
                        
               <Form.Group  as={Row} className="mb-4"  >
                   <Form.Label column sm={2} style={{fontSize: 20}}>
                            Experience
                   </Form.Label>
                   <Col sm="10">
                     <Form.Control   type="text"
                                     value={experience} 
                                     onChange={handleChange}
                                     name="experience"
                                     placeholder="Experience (2 years, 3 months)"
                     />
                      {formErrors.experience && <span style={styleForm()}>{formErrors.experience}</span>}
                   </Col>
               </Form.Group>
               
               <Form.Group  as={Row} className="mb-4"  >
                   <Form.Label column sm={2} style={{fontSize: 20}}>
                        Technical skills
                   </Form.Label>
                   <Col sm="10">
                     <Form.Control  as="textarea"
                                    value={skills} 
                                    onChange={handleChange}
                                    name="skills"
                                    placeholder="Technical Skills"
                     />
                     {formErrors.skills && <span style={styleForm()}>{formErrors.skills}</span>}
                   </Col>
               </Form.Group>

               <Button onClick={(e) =>handleSubmit(e)}>send application</Button>

            </Form>
        </Container>
        
    )
}

export default Apply