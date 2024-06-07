import { Alert, View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { globalStyles } from '../../styleSheets/Styles';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useRouter } from 'expo-router';

/**
 * Sign up page of DailyEmote. Prompts user for 
 * username, email and password, checks whether 
 * it is valid then forwards the Home page of the 
 * app. User can navigate back to Sign In page.
 * 
 * @Author Boon Kai Ming & Woo Zong Hua
 */
const signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  const auth = FIREBASE_AUTH;

  /**
   * function when 'Sign Up' Button is pressed
   */
  const signUp = async () => {
    if (username === "" || email === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password); 
      Alert.alert('Check your email!');
      router.replace("/index");
      
    } catch (error: any) {
      console.log(error);
      //alert('Sign up failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={globalStyles.background}>
      <KeyboardAvoidingView behavior="padding">
        
        <TextInput 
          value={username} 
          style={globalStyles.textInput} 
          placeholder='Enter Username' 
          onChangeText={(text) => setUsername(text)}/>

        <TextInput 
          value={email} 
          style={globalStyles.textInput} 
          placeholder='Enter Email' 
          onChangeText={(text) => setEmail(text)}/>

        <TextInput 
          value={password} 
          style={globalStyles.textInput} 
          placeholder='Enter Password' 
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}/>

        { loading ? (
          <ActivityIndicator size="large" color="#0000ff"/>
        ) : (
          <>
            <View style={{marginVertical: 5}}>
              <Button title="Sign Up" onPress={signUp}/>
            </View>

            <View style={{marginVertical: 5}}>
              <Button title="Back" onPress={() => router.navigate('/signin')}/>
              </View>
          </>
        )}
        <Text style={{textDecorationLine: 'underline', textAlign: 'center', color: 'white', fontSize: 15, paddingTop: 10}}
            onPress={() => router.navigate('/tnc')}>
          Terms and Conditions apply
        </Text>

      </KeyboardAvoidingView>
    </View>
  );
};

export default signup;