
import Home from "./src/screens/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {KeyboardProvider} from "react-native-keyboard-controller";
import Downloader from "./src/screens/Downloader";
import BookDetails from "./src/screens/BookDetails";

const Stack = createNativeStackNavigator();

export default function App() {



  return (
      <KeyboardProvider>
          <NavigationContainer>
              <Stack.Navigator id="root" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Search" component={Home} />
                  <Stack.Screen name="Downloader" component={Downloader} />
                  <Stack.Screen name="BookDetails" component={BookDetails} />

              </Stack.Navigator>
          </NavigationContainer>
      </KeyboardProvider>

  );
}
