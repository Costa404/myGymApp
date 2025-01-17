import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { Observable, ApolloLink, FetchResult } from "@apollo/client";
import createClient from "socket.io-client";
const httpLink = new HttpLink({
  uri: "https://mygymapp.onrender.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});
const socketUrl = import.meta.env.VITE_SOCKET_URL;

const socket = createClient(socketUrl, {
  transports: ["websocket"],
});

const socketLink = new ApolloLink((operation) => {
  return new Observable<FetchResult>((observer) => {
    socket.emit("subscribe", operation, (data: FetchResult) => {
      if (data) {
        observer.next(data);
      }
      observer.complete();
    });
    return () => {
      socket.off("subscribe");
    };
  });
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  socketLink,
  httpLink
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
export default client;
