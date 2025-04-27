import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
// import { postType } from './postType'
// import { authorType } from './authorType'
import { productTypes } from './productTypes'
import { orderTypes } from './orderTypes'
import { salesType } from './salesType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productTypes, orderTypes, salesType],
}
