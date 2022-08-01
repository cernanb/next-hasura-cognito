import "../../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import Nav from "../../components/Nav";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { Auth, Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import AuthContext from "../context/AuthContext";

Amplify.configure({ ...awsconfig, ssr: true });
const httpLink = createHttpLink({
  uri: "https://moving-escargot-98.hasura.app/v1/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const ses = await Auth.currentSession();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${ses?.getIdToken()?.getJwtToken()}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext>
      <ApolloProvider client={client}>
        <Nav />
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthContext>
  );
}

export default MyApp;
