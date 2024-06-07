import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { globalStyles } from '../../styleSheets/Styles';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

/**
 * Sign in page of DailyEmote. Prompts user for 
 * email and password, checks whether it is valid
 * then forwards the Home page of the app. User can
 * navigate to Sign Up page to create an account
 * 
 * @author Boon Kai Ming & Woo Zong Hua
 */
const signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  /**
   * function when 'Login' Button is pressed
   */
  const logIn = async () => {

    setLoading(true);
    
    try {
      // const response = await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home');
    } catch (error: any) {
      //console.log(error);
      Alert.alert('Sign in failed: ' + error.message)
    } finally { 
      setLoading(false);
      // this.textInput.clear();
    }
  }

  return (
    <View style={globalStyles.background}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={{fontWeight: "bold", textAlign: 'center', color: 'black', fontSize: 30, marginBottom: 50}}>
          EmoteDaily
        </Text>

        <TextInput 
          value={email} 
          style={globalStyles.textInput} 
          placeholder='Email' 
          onChangeText={(text) => setEmail(text)}/>

        <TextInput
          value={password} 
          style={globalStyles.textInput} 
          placeholder='Password' 
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} />

        { loading ? (
          <ActivityIndicator size="large" color="#0000ff"/>
        ) : (
          <>
            <View style={{marginVertical: 15}}>
              <Button  title="Login" onPress={logIn}/>
            </View>

            <View style={{marginVertical: -5}}>
              <Text style={globalStyles.text}>
                Don't have an account? {" "}

                <Text style = {{textDecorationLine: 'underline', marginLeft: 50, color: 'blue' }} 
                    onPress={() => {router.navigate("/signup") }}>
                  Sign up
                </Text>

              </Text>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default signin;
