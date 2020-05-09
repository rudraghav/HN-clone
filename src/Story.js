import React from "react";
import {
  Link,
} from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
// props:
// - id
// - children[]
export default class Story extends React.Component {
  state = {
    isLoading: true,
    topComments: [],
    story: {},
    // childComments: []
  };

   async getTopComments () {
    let {kids} = this.props.location.state
    this.setState({story:this.props.location.state})
    if(kids)
    kids.map(async(id) => {
      let {data} = await axios.get("https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty"); 
      let response = data;
      let topComment = {
        id,
        by: response.by,
        kids: response.kids,
        parent: response.parent,
        text : response.text,
        time: response.time,
      }
      
      if(topComment.text)
      this.setState({topComments: this.state.topComments.concat(topComment), isLoading:false}) 

    })   
  }

  componentDidMount(){
      this.getTopComments();    
  };


  render() {



    let date = (new Date()).getTime();
    date = date/1000
    
    if(!this.state.story.url) return null

    if((!this.state.topComments) && (this.state.story.url))
    {
    return (
        <div>
            <table>
              <thead>
                <tr>
                  <th>{this.state.story.title}</th>
                
                   <td>
                    {'(' + this.state.story.url
                      .replace("http://", "")
                      .replace("https://", "")
                      .split(/[/?#]/)[0]
                      .replace("www.", "") + ')'}
                 </td>
                </tr>
              </thead>
              <tr>
                    <td>{this.state.story.score + " points"}</td>
                    <td>{"by " + this.state.story.by}</td>
                   
                    <td>{((Math.floor((date - this.state.story.time) /3600) > 0 && (Math.floor((date - this.state.story.time) /3600) > 0 ) <24)) ? ((Math.floor((date - this.state.story.time) /3600))+ "hours ago") : ''}</td>
                    <td>{(Math.floor((date - this.state.story.time) /3600) > 0 && (Math.floor((date - this.state.story.time) /3600) > 0 ) >24) ? ((Math.floor((date - this.state.story.time) /(3600*24)))+ " days ago") : ''}</td>
                    <td>{Math.floor((date - this.state.story.time) /3600) < 0 ? ((Math.floor((date - this.state.story.time) /60))+ " minutes ago") : ''}</td> 
                    <td>
                    <Link to = '/login'>
                    <button onClick = {this.hideStory}>hide</button>
                    </Link>
                    </td>
                    <td>                    
                    {this.state.story.descendants + " comments"}
                    </td>
              </tr>  
            </table>
            </div>
    )}          
    

    if((this.state.topComments) && (this.state.story.url)) {
    return (

    <div>
        <table>
          <thead>
            <tr>
              <th>{this.state.story.title}</th>
            
               <td>
                {'(' + this.state.story.url
                  .replace("http://", "")
                  .replace("https://", "")
                  .split(/[/?#]/)[0]
                  .replace("www.", "") + ')'}
             </td>
            </tr>
          </thead>
          <tr>
                <td>{this.state.story.score + " points"}</td>
                <td>{"by " + this.state.story.by}</td>
               
                <td>{((Math.floor((date - this.state.story.time) /3600) > 0 && (Math.floor((date - this.state.story.time) /3600) > 0 ) <24)) ? ((Math.floor((date - this.state.story.time) /3600))+ "hours ago") : ''}</td>
                <td>{(Math.floor((date - this.state.story.time) /3600) > 0 && (Math.floor((date - this.state.story.time) /3600) > 0 ) >24) ? ((Math.floor((date - this.state.story.time) /(3600*24)))+ " days ago") : ''}</td>
                <td>{Math.floor((date - this.state.story.time) /3600) < 0 ? ((Math.floor((date - this.state.story.time) /60))+ " minutes ago") : ''}</td> 
                <td>
                <Link to = '/login'>
                <button onClick = {this.hideStory}>hide</button>
                </Link>
                </td>
                <td>                    
                {this.state.story.descendants + " comments"}
                </td>
          </tr>  
        </table>
        

            <table>
                <tbody>
            
            <ul>
         
            {this.state.topComments.map((topComment) => (
                   <li key = {topComment.id}>
                    <Comment commentId= {topComment.id} depth ={1}/>      
                    </li>         
            ))}

              </ul>
                </tbody>
            </table>
    </div>
    )
            }
}
  
}