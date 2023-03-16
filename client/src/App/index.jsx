import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import Loader from './layout/Loader';
import ScrollToTop from './layout/ScrollToTop';
import routesOnePage from '../route';
import routes from '../routes';
import { Redirect } from 'react-router-dom';
import Config from '../config';
const AdminLayout = lazy(() => import('./layout/AdminLayout'));
const AppAdmin = () => {
    const location = useLocation();
    return (<>
            <ScrollToTop>
                <Suspense fallback={<Loader />}>
                    <Route path={routesOnePage.map((x) => x.path)}>
                        <Switch location={location} key={location.pathname}>
                            {routesOnePage.map((route, index) => {
            return route.component ? (<Route key={index} path={route.path} exact={route.exact} render={(props) => <route.component {...props}/>}/>) : null;
        })}
                        </Switch>
                    </Route>
                    <Route path={routes.map((x) => x.path)}>
                        <AdminLayout />
                    </Route>
                    <Route path={'/consola'} exact>
                        <Redirect to={Config.defaultPath}/>
                    </Route>
                </Suspense>
            </ScrollToTop>
            <div className="backdrop"/>
        </>);
};
export default AppAdmin;

