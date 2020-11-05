import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AuthNavProps, AuthParamList } from './AuthParamList';
import { AuthContext } from './AuthProvider';
import { Center } from './Center';

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

const Register = ({ navigation, route }: AuthNavProps<'Login'>) => {
  /*  */
  return (
    <Center>
      <Text>Register</Text>
      <Button
        title={route.name}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </Center>
  );
};

const Login = ({ navigation, route }: AuthNavProps<'Register'>) => {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          navigation.navigate('Register');
        }}
      >
        <Text>Register here</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#0039FF"
        onPress={() => {
          login();
        }}
      >
        <Text>Log me in</Text>
      </TouchableHighlight>
    </Center>
  );
};

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
