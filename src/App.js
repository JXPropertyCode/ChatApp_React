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

export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/login-form" component={LoginForm} />
        <Route exact path="/signup-form" component={SignUpForm} />
        {/* auth these login before letting access */}

        {/* if using exact path, the chatroom routes would result in Error 404 */}
        <Route path="/message-center" component={MessageCenter} />
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
