import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          monthlyRevenue: { keyArgs: ['from','to','clientId'] },
          projectCountByStatus: { keyArgs: ['clientId'] },
        }
      }
    }
  })
});
