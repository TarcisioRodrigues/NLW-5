import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
export function Welcome() {
  const navigation = useNavigation();
  function handleStart() {
    navigation.navigate('UserIdentification');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{'\n'} suas plantas{'\n'} de forma rápida
        </Text>
        <Image source={wateringImg} style={styles.image} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Text>
            <Entypo name="chevron-thin-right" style={styles.buttonIcon} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
    width: 56,
    height: 56,
    paddingHorizontal: 10,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 24,
  },
});
