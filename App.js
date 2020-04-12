import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {AdEventType, InterstitialAd, TestIds} from '@react-native-firebase/admob';
import Post from "./src/components/Post";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-1961781251976352/8135973027';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const App = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadedListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setLoaded(true);
                // interstitial.show()
            }
        });

        interstitial.load();

        return () => {
            loadedListener();
        };
    }, []);

    if (!loaded) {
        return null;
    }

    const fakeData = [...Array(20)].map((x, id) => ({id: id.toString()}));

    return (
        <SafeAreaView>
            <FlatList
                data={fakeData}
                renderItem={({item}) => <Post id={item.id}/>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
};

export default App;
