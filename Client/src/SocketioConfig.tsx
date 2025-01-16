// import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { Observable, ApolloLink, FetchResult } from "@apollo/client";
// import createClient from "socket.io-client";

// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/graphql",
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//   },
// });

// const socket = createClient("http://localhost:4000", {
//   transports: ["websocket"],
// });

// const socketLink = new ApolloLink((operation) => {
//   return new Observable<FetchResult>((observer) => {
//     socket.emit("subscribe", operation, (data: FetchResult) => {
//       if (data) {
//         observer.next(data);
//       }
//       observer.complete();
//     });

//     return () => {
//       socket.off("subscribe");
//     };
//   });
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   socketLink,
//   httpLink
// );

// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });

// export default client;
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { Observable, ApolloLink, FetchResult } from "@apollo/client";
import createClient from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const socket = createClient(`${API_URL}`, {
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
