import { Redirect, Route, useHistory } from 'react-router-dom';

import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react'; import React, { useEffect, useState } from 'react'
import Tab3 from './Tab3';
import Tab2 from './Tab2';
import Tab1 from './Artists';
import { ellipse, square, triangle, airplane, musicalNote, person, disc } from 'ionicons/icons';
import { basicAppData } from '../components/Store';
import { Login } from './Login';
import NoLoginArtists from './NoLoginArtists';
const Routing = () => {
    const [logged, setLogged] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<any>();
    const navigate = useHistory();
    useEffect(() => {
        if (basicAppData.getState().token === "") {
            setLogged(false)
            navigate.push('/login');

        } else {
            setLogged(true)
            console.log(basicAppData.getState().token)

        }
        const logisSubscription = basicAppData.subscribe((state) => {
            if (state.token !== "") {
                setLogged(true)
                const router = document.querySelector('ion-router');
                navigate.push('/tab1');
            }
        })
        return () => {
            logisSubscription();
        }
    }, [])

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (!response.ok) {
                throw Error(response.statusText)
            }

            const json = await response.json()
            console.log(json)
            if (json.id_token) {
                basicAppData.setState({ token: json.id_token });
            } else {
                setErrorMessage("Wird")
            }
            console.log(basicAppData.getState())
        } catch (error) {
            console.log(error)
            setErrorMessage("Wrong Username or Password")
        }
    };
    return (
        <>
            {logged &&
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/tab1">
                            <Tab1 />
                        </Route>
                        <Route exact path="/tab2">
                            <Tab2 />
                        </Route>
                        <Route path="/tab3">
                            <Tab3 />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/tab1" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon aria-hidden="true" icon={person} />
                            <IonLabel>Artist</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon aria-hidden="true" icon={ellipse} />
                            <IonLabel>Genre</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon aria-hidden="true" icon={musicalNote} />
                            <IonLabel>Track</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab4" href="/tab4">
                            <IonIcon aria-hidden="true" icon={disc} />
                            <IonLabel>Album</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            }
            {!logged &&
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/login">
                            <Login onLogin={handleLogin} errorMessage={errorMessage} />
                        </Route>
                        <Route exact path="/artists">
                            <NoLoginArtists />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">

                        <IonTabButton tab="login" href="/login">
                            <IonIcon aria-hidden="true" icon={ellipse} />
                            <IonLabel>Login</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="artists" href="/artists">
                            <IonIcon aria-hidden="true" icon={person} />
                            <IonLabel>Artist Test</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            }
        </>
    )
}

export default Routing