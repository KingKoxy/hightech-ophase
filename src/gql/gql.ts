/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query GetAllContacts {\n      contactCollection {\n        items {\n          name\n          phone\n        }\n      }\n    }\n  ": typeof types.GetAllContactsDocument,
    "\n    query GetAllVideos {\n      videoCollection {\n        items {\n          title\n          url\n        }\n      }\n    }\n  ": typeof types.GetAllVideosDocument,
    "\nquery GetAllImages {\n    imageCollection {\n        items {\n            asset {\n              url\n              fileName\n            }\n        }\n    }\n}\n  ": typeof types.GetAllImagesDocument,
    "\n    query GetAllEvents {\n      eventCollection(where: { startTime_gt: \"2024-01-01T00:00:00+00:00\" }) {\n        items {\n          title\n          startTime\n          locationName\n          locationGoogleMapsLink\n        }\n      }\n    }\n  ": typeof types.GetAllEventsDocument,
};
const documents: Documents = {
    "\n    query GetAllContacts {\n      contactCollection {\n        items {\n          name\n          phone\n        }\n      }\n    }\n  ": types.GetAllContactsDocument,
    "\n    query GetAllVideos {\n      videoCollection {\n        items {\n          title\n          url\n        }\n      }\n    }\n  ": types.GetAllVideosDocument,
    "\nquery GetAllImages {\n    imageCollection {\n        items {\n            asset {\n              url\n              fileName\n            }\n        }\n    }\n}\n  ": types.GetAllImagesDocument,
    "\n    query GetAllEvents {\n      eventCollection(where: { startTime_gt: \"2024-01-01T00:00:00+00:00\" }) {\n        items {\n          title\n          startTime\n          locationName\n          locationGoogleMapsLink\n        }\n      }\n    }\n  ": types.GetAllEventsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllContacts {\n      contactCollection {\n        items {\n          name\n          phone\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetAllContacts {\n      contactCollection {\n        items {\n          name\n          phone\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllVideos {\n      videoCollection {\n        items {\n          title\n          url\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetAllVideos {\n      videoCollection {\n        items {\n          title\n          url\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAllImages {\n    imageCollection {\n        items {\n            asset {\n              url\n              fileName\n            }\n        }\n    }\n}\n  "): (typeof documents)["\nquery GetAllImages {\n    imageCollection {\n        items {\n            asset {\n              url\n              fileName\n            }\n        }\n    }\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllEvents {\n      eventCollection(where: { startTime_gt: \"2024-01-01T00:00:00+00:00\" }) {\n        items {\n          title\n          startTime\n          locationName\n          locationGoogleMapsLink\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetAllEvents {\n      eventCollection(where: { startTime_gt: \"2024-01-01T00:00:00+00:00\" }) {\n        items {\n          title\n          startTime\n          locationName\n          locationGoogleMapsLink\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;