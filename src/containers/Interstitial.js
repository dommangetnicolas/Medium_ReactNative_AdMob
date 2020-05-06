import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from '@react-native-firebase/admob';
import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, SafeAreaView} from 'react-native';
import Post from '../components/Post';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['travel'],
});

const Interstitial = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interstitialListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });

    interstitial.load();

    return () => {
      interstitialListener();
    };
  }, []);

  const onInterstitial = () => {
    if (!loaded) {
      return Alert.alert('No more ads');
    }

    setLoaded(false);
    return interstitial.show();
  };

  const fakeData = [...Array(20)].map((x, id) => ({id: id.toString()}));

  return (
    <SafeAreaView>
      <Button title="Show interstitial" onPress={onInterstitial} />

      <FlatList
        data={fakeData}
        renderItem={({item}) => <Post id={item.id} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Interstitial;
