import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import ReactTestRenderer, { act } from "react-test-renderer"
import { createMockEnvironment } from "relay-test-utils"

import { MoreInfoTestsQuery } from "__generated__/MoreInfoTestsQuery.graphql"
import { MoreInfoContainer } from "../MoreInfo"

jest.unmock("react-relay")

it("Renders the Show MoreInfo screen without throwing an error", async () => {
  const env = createMockEnvironment()
  const TestRenderer = () => (
    <QueryRenderer<MoreInfoTestsQuery>
      environment={env}
      query={graphql`
        query MoreInfoTestsQuery @raw_response_type {
          show(id: "anderson-fine-art-gallery-flickinger-collection") {
            ...MoreInfo_show
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (props?.show) {
          return <MoreInfoContainer show={props.show} />
        } else if (error) {
          console.log(error)
        }
      }}
    />
  )
  ReactTestRenderer.create(<TestRenderer />)
  act(() => {
    env.mock.resolveMostRecentOperation({
      errors: [],
      data: {
        show: {
          events: [],
          partner: { __typename: "Partner" },
        },
      },
    })
  })
})
