import './app.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as Pages from 'pages';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { theme } from 'theme';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages.Index />
    },
    {
        path: "/experience",
        element: <Pages.Experience />
    }
])

const App: React.FC<{}> = () => {
  const routerProvider = <RouterProvider router={router} />

  const configProvider = <ChakraProvider
        theme={theme}
        children={routerProvider}
  />

  return configProvider
}

export default App
