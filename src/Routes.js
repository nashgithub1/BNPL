import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
export const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path = "/"></Route>
                    <WelcomePage />
            </Switch>

        </Router>

    )
}