import React,{Component} from "react"
import {withRouter} from "react-router-dom"
import { Spinner, Container, Card, CardHeader, CardBody, CardFooter,Col,
    Button,CardText,
    CardSubtitle,CardTitle,
    CardImg, 
    Row} from 'reactstrap';
import Axios from "axios"
const api="https://yts.mx/api/v2/movie_details.json?movie_id="
class DetailMovie extends Component{
    constructor()
    {
        super()
        this.state={
            movie:{},
            loading:true
        }
    }
   componentDidMount()
   { 
       const movieid=this.props.match.params.id  
       Axios.get(api+movieid).then(
        res=>{
          console.log(res)
            this.setState({
               movie:res.data.data.movie,
               loading:false
            })
        }
    )
       
   }
    
    render()
    
    {
        const spinner=<Spinner color="primary" style={{marginTop:"250px",marginLeft:"650px"}}/>;
         const movie=    <Col sm="3" style={{margin:"auto"}}><Card>
                          <CardImg top width="100%" src={this.state.movie.large_cover_image} alt="Card image cap" />
                          <CardBody>
                            <CardTitle>{this.state.movie.title_english}</CardTitle>
                           <CardSubtitle>{this.state.movie.title_long}</CardSubtitle>
                        <CardText>{this.state.movie.description_intro}</CardText>
                         <hr/>
                        <h3>Full Description</h3>
                         <CardText>{this.state.movie.description_full}</CardText>
                         </CardBody>
                         </Card>
                         </Col>
        return( 
        <Container fluid> 
            <Row>
           {this.state.loading?spinner:movie}
           </Row>
          
       </Container>)
    }
}


export default withRouter(DetailMovie)