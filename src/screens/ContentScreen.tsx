import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { increment, updateMessage } from '../store/dummySlice';

const HomeScreen = () => {
  const { message, count } = useAppSelector(state => state.dummy);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Data:</Text>
      <Text>Message: {message}</Text>
      <Text>Count: {count}</Text>

      <Button title="Increment Count" onPress={() => dispatch(increment())} />
      <Button
        title="Change Message"
        onPress={() => dispatch(updateMessage('New Message from HomeScreen'))}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
});
