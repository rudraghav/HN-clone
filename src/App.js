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
import moment from  "moment";


const api = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
});

export default class HackerHome extends React.Component {
  state = {
    isLoading: true,
    stories: [],
    commonDomain: {},
    count: 30,
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
      <body display='block' margin= '8px'>
      <div >
     
        <center>
      <table id= "hnmain" border= "0" cellPadding= "0" cellSpacing= "0" width= "85%" bgcolor= "f6f6ef" boxSizing= 'border-box'> 
        <tbody borderSpacing='2px'>
          <tr borderSpacing = '2px'>
            <td bgcolor= "ff6600" borderSpacing='2px'>
              <table style={{boxSizing:'border-box',padding:'2px', borderSpacing: 0, fontFamily:'Verdana, Geneva, sansserif', textAlign:'start', border:'0', cellPadding: '0', cellSpacing: '0', width: '100%'}}>
                <tbody style= {{verticalAlign: 'middle'}}>
                  <tr>
                    <td style={{width:18, paddingRight:4, borderSpacing:2}}>
                      <Link to = '/'>
                        <img src = "https://news.ycombinator.com/y18.gif" style={{border:'1px white solid', width:"18px" , height:"18px", borderSpacing:2 }}></img>
                      </Link>
                    </td>
                    <td style= {{lineHeight: '12pt', height:'10px', borderSpacing:2}}>
                      <span>
                        <b style={{marginRight:5, borderSpacing:2}}>
                          <Link to = "/" style={{color:'black', textDecoration: 'none', fontSize:'10pt'}}>Hacker News</Link>
                        </b>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr id= "pagespace" title style= {{height:10}}></tr>
          <tr style={{borderSpacing:2, display: 'inline'}}>
            <td style={{fontFamily:'Verdana, Geneva, sansserif', fontSize:'10pt', color:'#828282', display:'table-cell'}}>
              <table style={{display:'inline'}}border='0' cellSpacing='0' cellPadding='0' boxSizing= 'border-box' display= 'table' borderCollapse= 'separate' boxSizing= 'border-box' whiteSpace= 'normal' lineHeight= 'normal' fontWeight= 'normal' fontSize= 'medium' fontStyle= 'normal' textAlign= 'start'>
             
              <tbody style={{display:'table-row-group', verticalAlign:'middle' , textAlign:'start' ,borderSpacing:'2px'}}>
             
        <ol style={{paddingLeft: 25, margin:0}}>
        {this.state.stories.map((story, n) => (
          
            <li value = {1 + n} key = {story.id}>
               <tr style={{display:'table-row'}}>
                <td fontFamily='Verdana, Geneva, sansserif' fontSize= '10pt' color='#828282' >
                  <a href= {story.url}>{story.title}</a>
                  <span style={{fontSize:'8pt'}} > (
                    <a className= 'website' href={'https://news.ycombinator.com/from?site=' + story.url
                      .replace("http://", "")
                      .replace("https://", "")
                      .split(/[/?#]/)[0]
                      .replace("www.", "")} style={{color:'#828282'}}>{story.url
                      .replace("http://", "")
                      .replace("https://", "")
                      .split(/[/?#]/)[0]
                      .replace("www.", "")}</a>
                      )
                      </span>
                 </td>
                </tr>
              <tr>
                    <td style={{fontSize:'7pt'}} >
                   <span >{story.score + " points"}</span>
                   <span >{" by " + story.by}</span>
                    {/* <td>
                    <Link to = '/login'>
                        <button onClick = {this.hideStory}>hide</button>
                    </Link>
                    </td> */}
                     <span >{" " + moment.unix(story.time).fromNow() + " "}</span>
                     <span className = 'comments'>
                    <Link to={{pathname :'/Story', state: story}}>
                       {story.descendants + " comments"}
                    </Link>
                    </span>
                    </td>
              </tr>
         </li>
   
      ))}
       </ol>
       
 <button onClick = {this.moreStories}>more</button>
 </tbody>
 </table>
 </td>
 </tr>
          </tbody>
           </table>
           </center>
          
      </div>
      </body>
    );
  }
}
