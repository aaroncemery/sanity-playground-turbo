import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints';

export default defineBlueprint({
  resources: [
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
