import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./components/messageBox.css";
import LoginForm from "./pages/LoginForm";
import "./index.css";
import SignUpForm from "./pages/SignUpForm";
import MessageCenter from "./pages/MessageCenter";
import AccountCreated from "./pages/AccountCreated";
import LoginSuccess from "./pages/LoginSuccess";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import UserProfile from "./pages/UserProfile";
import ChatroomLists from "./pages/ChatroomLists";
import ConfirmEmail from './pages/ConfirmEmail'
import ChangeEmail from './pages/ChangeEmail'
import ChangePassword from './pages/ChangePassword'


export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/login-form" component={LoginForm} />
        <Route exact path="/signup-form" component={SignUpForm} />
        {/* auth these login before letting access */}


        <Route exact path='/confirm/:id' component={ConfirmEmail} />
        <Route exact path="/change-email/:id" component={ChangeEmail} />
        <Route exact path="/change-password/:id" component={ChangePassword} />


        {/* if using exact path, the chatroom routes would result in Error 404 */}
        {/* <Route path="/message-center/" component={MessageCenter} /> */}
        <Route exact path="/message-center/" component={MessageCenter} />
        <Route path="/message-center/:roomId" component={MessageCenter} />
        <Route exact path="/chatroom-lists/" component={ChatroomLists} />

        <Route path="/user-profile" component={UserProfile} />

        <Route exact path="/account-created" component={AccountCreated} />

        <Route exact path="/login-success" component={LoginSuccess} />

        <Route exact path="/logout" component={Logout} />
        {/* always put the default '/' path to the end or else it would access it first thing */}
        <Route exact path="/" component={LoginForm} />

        {/* If no address matches, it will default to 404 error */}
        <Route exact path="*" component={Error} />
      </Switch>
    </Router>
  );
}
