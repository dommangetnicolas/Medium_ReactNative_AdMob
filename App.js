import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import React, {useEffect} from 'react';
import Posts from './src/containers/Posts';
import Interstitial from './src/containers/Interstitial';
import Rewarded from './src/containers/Rewarded';
import Banner from './src/containers/Banner';

const App = () => {
  useEffect(() => {
    admob()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
      })
      .then(() => console.log('AdMob set up succeed'))
      .catch(err => console.log(`AdMob set up failed: ${err.message}`));
  }, []);

  return <Posts />;
};

export default App;
