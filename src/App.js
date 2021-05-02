import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import NoPageFound from "./component/NoPageFound";
import Author from './pages/author'
import AuthorDetails from './pages/author/authorDetails'
import AuthorPost from './pages/author/post'
import Post from './pages/post'

function App() {
  return (
      <div className='App'>
          <Router>
          <Switch>
              <Route path="/" component={Author} exact />
              <Route path="/author/:authorId" component={AuthorDetails} exact />
              <Route path="/author/:authorId/post/:postId" component={AuthorPost} exact />
              <Route path="/posts" component={Post} exact />
              <Route path="/" component={NoPageFound}/>
          </Switch>
      </Router>
      </div>
  );
}

export default App;
