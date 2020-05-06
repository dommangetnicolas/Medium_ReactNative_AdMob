import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, SafeAreaView} from 'react-native';
import Post from '../components/Post';

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['travel'],
});

const Rewarded = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const rewardedListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });

    rewarded.load();

    return () => {
      rewardedListener();
    };
  }, []);

  const onRewarded = () => {
    if (!loaded) {
      return Alert.alert('No more ads');
    }

    setLoaded(false);
    return rewarded.show();
  };

  const fakeData = [...Array(20)].map((x, id) => ({id: id.toString()}));

  return (
    <SafeAreaView>
      <Button title="Show rewarded" onPress={onRewarded} />

      <FlatList
        data={fakeData}
        renderItem={({item}) => <Post id={item.id} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Rewarded;
