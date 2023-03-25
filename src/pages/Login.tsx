import React, { useState } from 'react'
import { basicAppData } from '../components/Store';
import "./Login.css"
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
} from '@ionic/react';
type LoginFormProps = {
    onLogin: any
    errorMessage?: string;
};

export const Login = ({ onLogin, errorMessage }: LoginFormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onLogin(username, password);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <IonItem>
                        <IonLabel position="floating">Username:</IonLabel>
                        <IonInput type="text" value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password:</IonLabel>
                        <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
                    </IonItem>
                    <IonButton type="submit" expand="block">Login</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

