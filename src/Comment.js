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

    async getComments(){
    const {commentId} = this.props
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


  render() {
    if (!this.state.comment) {
      return null
    }

    let {comment} = this.state

    return (
      <div>
        <table>
          <tbody>
            <tr>
        <td style = {{paddingLeft: 20 * this.props.depth}} dangerouslySetInnerHTML = {{__html: comment.text}}></td>
        {comment.kids.map((nestedCommentId, n) => (
              <Comment commentId={nestedCommentId} depth={this.props.depth + 1} />
            ))
          }
          </tr>
          </tbody>
          </table>
      </div>
    );
  }
};
  
