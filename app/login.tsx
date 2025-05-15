import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const handleLogin = async () => {
    let hasError = false;

    if (!username.trim()) {
      setUsernameError('Username is required.');
      hasError = true;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (isRegistering) {
      if (!confirmPassword) {
        setConfirmPasswordError('Please confirm your password.');
        hasError = true;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
        hasError = true;
      } else {
        setConfirmPasswordError('');
      }
    }

    if (hasError) return;

    if (!isRegistering) {
      await login(username, password);
    } else {
      await register(username, password)
    }
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready to spread democracy?</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      {isRegistering && (
        <>
          <Text style={styles.label}>Confirm your password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
        </>
      )}

      <Button
        onPress={handleLogin}
        color="#151718"
        style={styles.button}
      >
        {isRegistering ? 'Register' : 'Log In'}
      </Button>

      {!isRegistering ? (
        <TouchableOpacity onPress={() => setIsRegistering(true)}>
          <Text style={styles.registerText}>Don’t have an account? Register</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsRegistering(false)}>
          <Text style={styles.registerText}>I already have an account.</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#151718'
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#ffe900',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffe900',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 10,
    color: '#ffe900',
  },
  error: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#878787',
  },
  button: {
    backgroundColor: '#ffe900',
    color: '#151718',
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    color: '#ffe900',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 25
  }
});