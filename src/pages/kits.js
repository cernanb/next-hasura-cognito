import { gql, useQuery } from "@apollo/client";
import { getSession } from "next-auth/react";

const GET_KITS = gql`
  query getKits {
    health_kits {
      id
      is_completed
    }
  }
`;

const Kits = () => {
  const { loading, error, data } = useQuery(GET_KITS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return <h1>Hello</h1>;
};

export default Kits;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
