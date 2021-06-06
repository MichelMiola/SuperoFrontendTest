import React from 'react';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {createHashHistory} from 'history';
import {TarefaListView} from "./view/TarefaListView";

import './App.css';
import {Routes} from "./core/constants/routes";
import {TarefaInfoView} from "./view/TarefaInfoView";

const history = createHashHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact component={TarefaListView} path={Routes.TAREFA_LIST}/>
                <Route exact component={TarefaInfoView} path={Routes.TAREFA_ADD}/>
                <Route exact component={TarefaInfoView} path={Routes.TAREFA_EDIT}/>
            </Switch>

            <Redirect from="*" to={Routes.TAREFA_LIST}/>
        </Router>
    );
}

export default App;
