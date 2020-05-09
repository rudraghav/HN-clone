import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import axios from "axios";
// props:
// - id
// - children[]
export default class Comment extends React.Component {

  state = {
    comment: []
  }

    async getComments(){
  
    const {commentId} = this.props

    console.log(this.props)
    
    let {data} = await axios.get("https://hacker-news.firebaseio.com/v0/item/" + commentId + ".json?print=pretty")
    let response = data

    
    this.setState({
      comment: {
        commentId,
        by: response.by,
        kids: response.kids,
        parent: response.parent,
        text : response.text,
        time: response.time,
      }
    })
  }


  componentDidMount (){
    this.getComments();
  }

  render() {
    

    
    if (!this.state.comment.kids) {
      return (
        <div>
        <table>
          <tbody>
            <tr>
        {<td style = {{paddingLeft: 20 * this.props.depth}} dangerouslySetInnerHTML = {{__html: this.state.comment.text}}></td>}
          </tr>
          </tbody>
          </table>
      </div>
      )
    }

    return (
      <div>
          
        <table>
          <tbody>
            <tr >
        <td style = {{paddingLeft: 25 * this.props.depth}} dangerouslySetInnerHTML = {{__html: this.state.comment.text}}></td>
          </tr>
          </tbody>
          </table>
           {this.state.comment.kids.map((nestedCommentId, n) => (
              <Comment commentId={nestedCommentId} depth={this.props.depth + 1.5} />
            ))
          }
      </div>
    );
  }
};
  
