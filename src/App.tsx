import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CreatePost from "./ui/pages/CreatePost";
import Home from "./ui/pages/Home";
import Login from "./ui/pages/Login";
import PostView from "./ui/pages/PostView";
import Profile from "./ui/pages/Profile";
import ProfileEdit from "./ui/pages/ProfileEdit";
import Register from "./ui/pages/Register";
import Share from "./ui/pages/Share";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/profile-edit">
            <ProfileEdit />
          </Route>

          <Route path="/:author/:postId/comments">
            <PostView />
          </Route>

          <Route path="/:author/:postId/share">
            <Share />
          </Route>

          <Route path="/create-post">
            <CreatePost />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
