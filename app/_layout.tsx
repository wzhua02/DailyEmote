import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name = "index" options = {{headerShown: false }} />
      <Stack.Screen name = "(auth)" options = {{headerShown: false }} />
      <Stack.Screen name = "(tabs)" options = {{headerShown: false }} />
      <Stack.Screen name = "newEntry" options = {{presentation: 'modal' }} />
    </Stack>
  )
}

export default Layout