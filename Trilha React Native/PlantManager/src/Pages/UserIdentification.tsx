import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/button';
// import { Container } from './styles';

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }
  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }
  async function handleSubmit() {
    if (!name) return Alert.alert('Me diz como chamar você ');
    await AsyncStorage.setItem('@plantmanager:user', name);
    navigation.navigate('Confirmation');
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={(Platform.Version = 'android' ? 'padding' : 'height')}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.emoji}>{isFilled ? '😄' : '😃'}</Text>

              <Text style={styles.title}>Como podemos {'\n'}chamar você?</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: colors.green },
              ]}
              placeholder="Digite seu nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <View style={styles.footer}>
              <Button title="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    borderRadius: 16,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
});