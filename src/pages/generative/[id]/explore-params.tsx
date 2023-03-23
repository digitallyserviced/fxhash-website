import { GetServerSideProps, NextPage } from "next"
import { createApolloClient } from "services/ApolloClient"
import { GenerativeToken } from "types/entities/GenerativeToken"
import { Qu_genToken } from "queries/generative-token"
import { ExploreParams } from "containers/Generative/ExploreParams"

interface Props {
  token: GenerativeToken
}

const ExploreParamsFromId: NextPage<Props> = ({ token }) => {
  return <ExploreParams token={token} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context?.params || {}
  let token = null
  const apolloClient = createApolloClient()
  if (id) {
    const { data } = await apolloClient.query({
      query: Qu_genToken,
      fetchPolicy: "no-cache",
      variables: { id: parseInt(id as string) },
    })
    if (data) {
      token = data.generativeToken
    }
  }

  return {
    props: {
      token: token,
    },
    notFound: !token || token.inputBytesSize === 0,
  }
}

export default ExploreParamsFromId
