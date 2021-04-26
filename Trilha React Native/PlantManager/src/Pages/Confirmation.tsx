import React, { version } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/button';
import { useNavigation } from '@react-navigation/core';

export function Confirmation() {
  const navigation = useNavigation();
  function handleSend() {
    navigation.navigate('PlantSelect');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>
        <Text style={styles.title}>Prontinho!</Text>
        <Text style={styles.subtitle}>
          Agora vamos cuidar das suas plantinhas com muito cuidado
        </Text>
        <View style={styles.footer}>
          <Button title="Começar" onPress={handleSend} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  emoji: {
    fontSize: 78,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.heading,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
