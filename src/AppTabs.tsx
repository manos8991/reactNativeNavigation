import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from './AppParamList';
import { Center } from './Center';
import { Button, Text } from 'react-native';
import { AuthContext } from './AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';

const Tabs = createBottomTabNavigator<AppParamList>();
interface AppTabsProps {}

const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Center>
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          logout();
        }}
      />
    </Center>
  );
};

const Search = () => {
  return (
    <Center>
      <Text>Search</Text>
    </Center>
  );
};

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'Home';

          if (route.name === 'Home') {
            return <MaterialCommunityIcons name="home-outline" size={24} color="black" />;
          } else if (route.name === 'Search') {
            return <MaterialIcons name="search" size={24} color="black" />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'bue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Search" component={Search} />
    </Tabs.Navigator>
  );
};
