import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Artists.css';
import { basicAppData } from '../components/Store'
import { useEffect, useState } from 'react';
const NoLoginArtists: React.FC = () => {
  const [artists, setArtists] = useState<any>([])
  const getArtists = async () => {
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
        console.log(json)
        if (json.id_token) {
            try{
            const responseArtist = await fetch("http://localhost:8080/api/artists", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${json.id_token}`,
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
        } else {
        }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    getArtists()
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
          {artists.map((item:any) => (
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
