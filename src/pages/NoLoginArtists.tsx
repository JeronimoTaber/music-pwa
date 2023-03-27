import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Artists.css';
import { basicAppData } from '../components/Store'
import { useEffect, useRef, useState } from 'react';
const NoLoginArtists: React.FC = () => {
  const [artists, setArtists] = useState<any>([])
  const loginToken = useRef("")
  const login = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/authenticate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin'
        })
      });
      if (!response.ok) {
        throw Error(response.statusText)
      }

      const json = await response.json()
      loginToken.current = (json.id_token)
      getArtists();

    } catch (error) {
      console.log(error)
      getArtists();
    }
  }
  const getArtists = async () => {
    console.log(loginToken.current)
    console.log('buscando art')
    try {
      const responseArtist = await fetch("http://localhost:8080/api/artists", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken.current}`,
        }
      });
      if (!responseArtist.ok) {
        throw Error(responseArtist.statusText)
      }

      const jsonArtists = await responseArtist.json()
      setArtists(jsonArtists)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    login();
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Artists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Artists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {artists.map((item: any) => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>Name: {item.name}</h2>
                <p>ID: {item.id}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NoLoginArtists;
