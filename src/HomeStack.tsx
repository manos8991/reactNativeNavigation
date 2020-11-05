import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from './AuthProvider';
import { Center } from './Center';
import { HomeParamList, HomeStackNavProps } from './HomeParamList';
import faker from 'faker';
interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

const Feed = ({ navigation }: HomeStackNavProps<'Feed'>) => {
  return (
    <Center>
      <FlatList
        style={{ width: '100%' }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate('Product', { name: item });
              }}
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
};

const Product = ({ route, navigation }: HomeStackNavProps<'Product'>) => {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title={`Edit `}
        onPress={() => {
          navigation.navigate('EditProduct', { name: route.params.name });
        }}
      />
    </Center>
  );
};

const apiCall: any = (x: any) => {
  return x;
};

const EditProduct = ({ route, navigation }: HomeStackNavProps<'EditProduct'>) => {
  const submit = useRef(() => {});
  const [formState] = useState();

  submit.current = () => {
    //api call with a new form state
    apiCall(formState);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text>{route.params.name}</Text>
    </Center>
  );
};

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={({ route }) => ({
          headerTitle: `Edit : ${route.params.name}`,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  //Submit the form
                  route.params.submit?.current();
                }}
                style={{ paddingRight: 10 }}
              >
                <Text style={{ color: 'red' }}>Done</Text>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({ route }) => ({
          headerTitle: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
};
