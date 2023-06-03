import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ChakraProvider } from "@chakra-ui/react";
import * as Pages from "pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { theme } from "theme";
import "./app.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Pages.Index />,
	},
	{
		path: "/experience",
		element: <Pages.Experience />,
	},
]);

const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
});

const App: React.FC<{}> = () => {
	const routerProvider = <RouterProvider router={router} />;

	const configProvider = (
		<ChakraProvider theme={theme} children={routerProvider} />
	);

	const apolloProvider = (
		<ApolloProvider client={apolloClient} children={configProvider} />
	);

	return apolloProvider;
};

export default App;
