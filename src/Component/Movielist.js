import React,{Component} from "react"
import Axios from "axios"
import {withRouter, Link} from "react-router-dom"
import { Spinner, Container, Card, CardHeader, CardBody, CardFooter,Col,
    Button,CardText,
    CardSubtitle,CardTitle,
    CardImg, 
    Row} from 'reactstrap';

const api="https://yts.mx/api/v2/list_movies.json?limit=16&page="


class MovieList extends Component{
    constructor()
    {
        super()
        this.state={
            page:1,
            loading:true,
            movies:[]
        }
    }
   
    fetch=()=>{
        Axios.get(api+this.state.page).then(
            res=>{
              
                this.setState({
                   movies:res.data.data.movies,
                   loading:false
                })
            }
        )
    }
    componentDidMount()

    {
        this.fetch()     
  
    }
     handlenext=()=>{
        let a= this.state.page+1
        this.setState({
            page:a,
            loading:false
        })
         
        setTimeout(() => {
            this.fetch()
          }, 3000); 
             
       
            
     }
     handleprev=()=>{
         const a= this.state.page-1
          this.setState({
              page:a,
              loading:false
          })
          this.fetch()
     }
    render()
    {
         const spinner=<Spinner color="primary" style={{marginTop:"250px",marginLeft:"650px"}}/>;
         const movie=  this.state.movies.map(data=>{
                      return(
                <Col sm="3"xs="6" style={{marginTop:10}} key={data.id}>
                    <Card>
                        <CardImg style={{height:300}}top width="100%" src={data.large_cover_image} alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{fontWeight:"bold"}}>{data.title_english}</CardTitle>
                        <CardSubtitle style={{textDecoration:"underline"}}>{data.title_long}</CardSubtitle>
                        <CardText style={{height:200,overflow:"hidden"}}>{data.summary}</CardText>
                        <Link to={"/movie/"+data.id}><Button color="primary">View</Button></Link>
                        </CardBody>
                    </Card>
                </Col>
             )
         })
        return(
            <Container fluid> 
                <Row>
               {this.state.loading?spinner:movie}
               </Row>
               {this.state.loading?null:this.state.page==1?<Button color="primary" onClick={()=>this.handlenext()}> Next</Button>:<div><Button color="primary" onClick={()=>this.handleprev()}>Previous</Button> <Button color="primary" onClick={()=>this.handlenext()}> Next</Button></div>}
           </Container>
        )
    }
}

export default withRouter(MovieList);