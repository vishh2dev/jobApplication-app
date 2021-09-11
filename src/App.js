import React from 'react'
import { Link,Route } from 'react-router-dom'
import {Container,Col, Row,} from 'react-bootstrap'
import Home from './Home'
import Apply from './Apply'
import Admin from './Admin'



const App = (props) =>{

   return(
     <>
     
      <Container>
        <>
          <Row className="mt-4">
            <Col className="mb-5"><h2><Link to="/apply">Apply for job</Link></h2></Col> 
            <Col><h2><Link to="/admin">Admin DashBoard</Link></h2></Col>
          </Row> 
         </>
      </Container>
   
     <Route path="/apply" component={Apply}/>
     <Route path="/admin" component={Admin}  />
     </>
   )
}

export default App

{/* <Route path="/front-end-developer" component={FrontEndDeveloper}/>
       <Route path="/node-js-developer" component={NodeJsDeveloper} /> */}