import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import Post from '../components/Post';

const Banner = () => {
  const fakeData = [...Array(20)].map((x, id) => ({id: id.toString()}));

  return (
    <SafeAreaView>
      <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />

      <FlatList
        data={fakeData}
        renderItem={({item}) => <Post id={item.id} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Banner;
