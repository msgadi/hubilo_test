import React, {lazy, Suspense} from "react"
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/configure-store"
const Home   = lazy(() => import("./components/Home"));
const Posts  = lazy(() => import("./components/posts"));
const Albums = lazy(() => import("./components/albums"));
const Photos = lazy(() => import("./components/photos"));
const Todos  = lazy(() => import("./components/todos"));
const Users  = lazy(() => import("./components/users"));
const StepperForm = lazy(() => import("./components/stepper-form/stepper-form"));
const CustomAppBar = lazy(() => import("./components/app-bar"));

function App() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
                <BrowserRouter>
                    <CustomAppBar/>
                    <Switch>
                        <Route
                            exact
                            path={"/posts"}
                            component={Posts}
                        />
                        <Route
                            exact
                            path={"/photos"}
                            component={Photos}
                        />
                        <Route
                            exact
                            path={"/todos"}
                            component={Todos}
                        />
                        <Route
                            exact
                            path={"/users"}
                            component={Users}
                        />
                        <Route
                            exact
                            path={"/albums"}
                            component={Albums}
                        />
                        <Route
                            exact
                            path={"/stepper-form"}
                            component={StepperForm}
                        />
                        <Route
                            exact
                            path={"/"}
                            component={Home}
                        />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </Suspense>)
}

export default App;
