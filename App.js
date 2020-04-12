import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {AdEventType, InterstitialAd, TestIds} from '@react-native-firebase/admob';

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
                interstitial.show()
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

    return (
        <SafeAreaView>

        </SafeAreaView>
    )
};

export default App;
