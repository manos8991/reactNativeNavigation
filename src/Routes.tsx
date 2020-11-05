import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { Center } from './Center';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';
interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext); //get the user from Context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //check if the user is connected or not
    AsyncStorage.getItem('user')
      .then((userString) => {
        if (userString) {
          //decode it
          login();
        }
        setLoading(false);
        console.log(`user string: ${userString}`);
      })
      .catch((err) => {
        console.log(`error : ${err}`);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="blue" />
      </Center>
    );
  }

  return <NavigationContainer>{user ? <AppTabs /> : <AuthStack />}</NavigationContainer>;
};
