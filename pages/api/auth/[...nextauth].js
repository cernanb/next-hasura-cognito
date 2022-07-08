import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: 10,
  },
  session: {
    jwt: true,
    maxAge: 10,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    jwt: (something) => {
      console.log(something);
      // const token = something.token;
      // first time jwt callback is run, user object is available
      const { user, token, account } = something;
      if (user || account) {
        token.token = something.account.id_token;
        token.globalAdmin = user.globalAdmin;
        token.companies = user.companies;
        token.expiry = user.expiry;
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.token = token.token;
        session.globalAdmin = token.globalAdmin;
        session.companies = token.companies;
        session.expiry = token.expiry;
      }

      return session;
    },
    signIn: async (user) => {
      return user;
    },
  },
});
