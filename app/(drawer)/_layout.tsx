import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomDrawerContent from '../../components/CustomDrawerContent'

const drawerLayout = () => {
  return (
    <GestureHandlerRootView style = {{ flex: 1 }}>
        <Drawer drawerContent = { CustomDrawerContent } 
            screenOptions = {{ 
                drawerPosition: 'right', 
                headerShown: false,
                drawerActiveBackgroundColor: '#5363df',
                drawerActiveTintColor: '#fff',
                drawerLabelStyle: { marginLeft: -20 },
            }}>
            
            <Drawer.Screen
                name = "(screens)"

                options = {{
                    drawerLabel: 'Home',
                    headerTitle: 'Home',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons 
                            name = "home-outline" 
                            size = {size} 
                            color = {color} 
                        />
                    ),
                }}
            />
            
            <Drawer.Screen
                name = "(settings)"

                options = {{
                    drawerLabel: 'Settings',
                    headerTitle: 'Settings',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons 
                            name = "settings-outline" 
                            size = {size} 
                            color = {color} 
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name = "feedback"

                options = {{
                    drawerLabel: 'Feedback',
                    headerTitle: 'Send Feedback',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons 
                            name = "chatbubbles-outline" 
                            size = {size} 
                            color = {color} 
                        />
                    ),
                }}
            />
        </Drawer>
    </GestureHandlerRootView>
  )
}

export default drawerLayout