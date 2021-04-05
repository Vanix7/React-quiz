
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import Logout from './components/Logout/Logout'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';  
import { autoLogin } from './store/actions/auth'
import {Component} from 'react'

class App extends Component {
  
  componentDidMount() {
    this.props.autoLogin()

  }
  render() {
    let routes = (
      <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
          <Redirect to={'/'}/>
        </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={QuizList} exact DDDD/>
          <Redirect to={'/'}/> 
        </Switch>
      )
    }
    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth1.token
  }
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
// export default connect(mapStateToProps, mapDispatchToProps)(App)
