import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Loader from "react-loader-spinner";
import Story from './Story';


const api = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
});

export default class HackerHome extends React.Component {
  state = {
    isLoading: true,
    stories: [],
    commonDomain: {},
    count: 31,
  };

   moreStories = () => {
     this.setState({count: this.state.count + 30});
     this.getTopStories();
  }

  async getTopStories() {
    const { data } = await api.get();
    var storyIds = data.splice(0, this.state.count);

    storyIds.map(async (id) => {
      let { data } = await axios.get(
        "https://hacker-news.firebaseio.com/v0/item/" +
          id +
          ".json?print=pretty"
      );
      let response = data;

    let story =  {
        id,
        //deleted: response.deleted,
        //type: response.type,
        by: response.by,
        time: response.time,
        text: response.text,
        //dead: response.dead,
        parent: response.parent,
        //poll: response.poll,
        kids: response.kids,
        url: response.url,
        score: response.score,
        title: response.title,
        //parts: response.parts,
        descendants: response.descendants,
      };

      // let domain = "poop.com" + id
      // let {commonDomain} = this.state

      // let newDomainArray = []
      // if (domain in commonDomain) {
      //   newDomainArray = commonDomain[domain].concat(story)
      // } else {
      //   newDomainArray = [].concat(story)
      // }

      if (story.url)
        this.setState({
          stories: this.state.stories.concat(story),
          isLoading: false,
          // commonDomain: {
          //   ...commonDomain,
          //   [domain]: newDomainArray
          // }
        });
    });
  }

  componentDidMount() {
    this.getTopStories();
  }

  render() {
    let date = (new Date()).getTime();
    date = date/1000
    return (
      <div>
      <table>
        <tbody>
        <ol>
        {this.state.stories.map((story, n) => (
            <li value = {1 + n} key = {story.id}>
            <table>
              <thead>
                <tr>
                  <th>{story.title}</th>
                
                   <td>
                    {'(' + story.url
                      .replace("http://", "")
                      .replace("https://", "")
                      .split(/[/?#]/)[0]
                      .replace("www.", "") + ')'}
                 </td>
                </tr>
              </thead>
              <tbody>
              <tr>
                    <td>{story.score + " points"}</td>
                    <td>{"by " + story.by}</td>
                   
                    <td>{((Math.floor((date - story.time) /3600) > 0 && (Math.floor((date - story.time) /3600) > 0 ) <24)) ? ((Math.floor((date - story.time) /3600))+ "hours ago") : ''}</td>
                    <td>{(Math.floor((date - story.time) /3600) > 0 && (Math.floor((date - story.time) /3600) > 0 ) >24) ? ((Math.floor((date - story.time) /(3600*24)))+ " days ago") : ''}</td>
                    <td>{Math.floor((date - story.time) /3600) < 0 ? ((Math.floor((date - story.time) /60))+ " minutes ago") : ''}</td> 
                    <td>
                    <Link to = '/login'>
                        <button onClick = {this.hideStory}>hide</button>
                    </Link>
                    </td>
                    <td>
                    <Link to={{ pathname :'/Story', state: story}}>
                       {story.descendants + " comments"}
                    </Link>
                    </td>
              </tr>
              </tbody>
              </table>
         </li>
      ))}
       </ol>
 <button onClick = {this.moreStories}>more</button>
          </tbody>
           </table>
      </div>
    );
  }
}
