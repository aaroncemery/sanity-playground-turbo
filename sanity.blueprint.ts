import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints';

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'test-function',
      event: {
        on: ['update'],
        filter: '_type == "product"',
        projection: '{_id, _type, title, workflowMetadata}',
      },
    }),
    defineDocumentFunction({
      name: 'auto-increment',
      event: {
        on: ['create'],
        filter: '_type == "product" && !defined(autoId)',
        projection: '{_id, _type, autoId}',
      },
    }),
  ],
});
