
import Home from "./src/screens/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {KeyboardProvider} from "react-native-keyboard-controller";
import DownloaderScreen from "./src/screens/DownloaderScreen";

const Stack = createNativeStackNavigator();

export default function App() {



  return (
      <KeyboardProvider>
          <NavigationContainer>
              <Stack.Navigator id="root" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Search" component={Home} />
                  <Stack.Screen name="DownloaderScreen" component={DownloaderScreen} />

              </Stack.Navigator>
          </NavigationContainer>
      </KeyboardProvider>

  );
}
