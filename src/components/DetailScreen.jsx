import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button onPress={() => navigation.push('Details')}>
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  );
};

export default DetailScreen;
