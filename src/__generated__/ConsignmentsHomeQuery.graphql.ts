/* tslint:disable */
/* eslint-disable */
/* @relayHash 56e0d7181e458301a211b4221006a290 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConsignmentsHomeQueryVariables = {};
export type ConsignmentsHomeQueryResponse = {
    readonly targetSupply: {
        readonly " $fragmentRefs": FragmentRefs<"ConsignmentsHome_targetSupply">;
    } | null;
};
export type ConsignmentsHomeQuery = {
    readonly response: ConsignmentsHomeQueryResponse;
    readonly variables: ConsignmentsHomeQueryVariables;
};



/*
query ConsignmentsHomeQuery {
  targetSupply {
    ...ConsignmentsHome_targetSupply
  }
}

fragment ArtistList_targetSupply on TargetSupply {
  microfunnel {
    artist {
      name
      href
      image {
        cropped(width: 76, height: 70) {
          url
          width
          height
        }
      }
      id
    }
  }
}

fragment ConsignmentsHome_targetSupply on TargetSupply {
  ...RecentlySold_targetSupply
  ...ArtistList_targetSupply
}

fragment RecentlySold_targetSupply on TargetSupply {
  microfunnel {
    artworksConnection(first: 1) {
      edges {
        node {
          slug
          internalID
          href
          artistNames
          image {
            imageURL
          }
          realizedPrice
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ConsignmentsHomeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "targetSupply",
        "storageKey": null,
        "args": null,
        "concreteType": "TargetSupply",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ConsignmentsHome_targetSupply",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ConsignmentsHomeQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "targetSupply",
        "storageKey": null,
        "args": null,
        "concreteType": "TargetSupply",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "microfunnel",
            "storageKey": null,
            "args": null,
            "concreteType": "TargetSupplyMicrofunnelItem",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(first:1)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  }
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtworkEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "slug",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "internalID",
                            "args": null,
                            "storageKey": null
                          },
                          (v0/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "artistNames",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "imageURL",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "realizedPrice",
                            "args": null,
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artist",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  },
                  (v0/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "cropped",
                        "storageKey": "cropped(height:70,width:76)",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 70
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 76
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "url",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "width",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "height",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  (v1/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ConsignmentsHomeQuery",
    "id": "cd70ac229f693eaff793a2a1ed2c6bad",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = '7aa92ad35577443568a188ada7493a11';
export default node;
