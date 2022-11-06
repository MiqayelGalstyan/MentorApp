import Header from '@src/shared/ui/Header';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import React from 'react';
import {Text, View} from 'react-native';

const RelatedInfo = (): JSX.Element => {
  return (
    <>
      <Header backIconVisible title="Related Information" />
      <MainWrapper>
        <View>
          <Text>Related Info</Text>
        </View>
      </MainWrapper>
    </>
  );
};

export default RelatedInfo;
