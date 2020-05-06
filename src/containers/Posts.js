import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Button, View, Alert} from 'react-native';
import Post from '../components/Post';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['travel'],
});

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['travel'],
});

const Posts = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedLoaded, setRewardedLoaded] = useState(false);

  useEffect(() => {
    const interstitialListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setInterstitialLoaded(true);
      }
    });

    const rewardedListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setRewardedLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });

    interstitial.load();
    rewarded.load();

    return () => {
      interstitialListener();
      rewardedListener();
    };
  }, []);

  const onInterstitial = () => {
    if (!interstitialLoaded) {
      return Alert.alert('No more ads');
    }

    setInterstitialLoaded(false);
    return interstitial.show();
  };

  const onRewarded = () => {
    if (!rewardedLoaded) {
      return Alert.alert('No more ads');
    }

    setRewardedLoaded(false);
    return rewarded.show();
  };

  const fakeData = [...Array(20)].map((x, id) => ({id: id.toString()}));

  return (
    <SafeAreaView>
      <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <Button title="Show interstitial" onPress={onInterstitial} />
        <Button title="Show rewarded" onPress={onRewarded} />
      </View>

      <FlatList
        data={fakeData}
        renderItem={({item}) => <Post id={item.id} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Posts;
