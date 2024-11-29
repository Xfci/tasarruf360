import { useEffect, useState } from 'react'
import { firebase, db, ref, get } from '../../config'

export const DatabaseScript = async ({ name }) => {
    /*const [dataState,setDataState] = useState(true);

    const sayac = {
        electric: {
            electric: 0,
            state: true,
            usedElectric: 0
        },
        water: {
            water: 0,
            state: true,
            usedWater: 0
        },
        gas: {
            gas: 0,
            state: true,
            usedGas: 0
        }
    }

    const fetchData = async () => {
        const dbRef = ref(db, 'userInfo/'); // Firebase'deki yol
        try {
            const snapshot = await get(dbRef);
            snapshot.forEach(element => {
                const key = element.key;
                if (name == key) {
                    setDataState(false);
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

    if (dataState == true) {
        await firebase.database().ref('userInfo/' + name + '/').set({
            sayac
        });
    }*/

    //Hatalı fonksiyon duzeltilecek
}