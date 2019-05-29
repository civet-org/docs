---
id: api-core
title: Core
---

[NPM](https://npmjs.com/package/@civet/core) | [GitHub](https://github.com/civet-org/core)

```bash
npm install @civet/core
```

The core module provides civet's base functionality.

## `<ConfigProvider>`

Provides general configuration to its descendants using React's context API.

<!--DOCUSAURUS_CODE_TABS-->
<!--Import-->

```js
import { ConfigProvider } from "@civet/core";
```

<!--Usage-->

```jsx
<ConfigProvider dataStore={store}>...</ConfigProvider>
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Props

| Name      | Type                      | Description |
| --------- | ------------------------- | ----------- |
| dataStore | [`DataStore`](#datastore) |             |

### Context

| Name      | Type                      | Description |
| --------- | ------------------------- | ----------- |
| dataStore | [`DataStore`](#datastore) |             |

### Related

[`<ConfigConsumer>`](#configconsumer), [`<Resource>`](#resource)

## `<ConfigConsumer>`

Context consumer for [`<ConfigProvider>`](#configprovider).

<!--DOCUSAURUS_CODE_TABS-->
<!--Import-->

```js
import { ConfigConsumer } from "@civet/core";
```

<!--Usage-->

```jsx
<ConfigConsumer>
  {(context) => ...}
</ConfigConsumer>
```

<!--END_DOCUSAURUS_CODE_TABS-->

## `<Resource>`

Makes data from an [`DataStore`](#datastore) available to its descendants using React's context API.
If not explicitly specified, necessary configuration is taken from the nearest [`<ConfigProvider>`](#configprovider).

<!--DOCUSAURUS_CODE_TABS-->
<!--Import-->

```js
import { Resource } from "@civet/core";
```

<!--Usage-->

```jsx
<Resource name="persons" query={{ city: "New York" }}>
  ...
</Resource>
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Props

| Name       | Type                      | Description                                                                                                                                              |
| ---------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | `string` **(required)**   | Resource name                                                                                                                                            |
| ids        | `any[]`                   | IDs to be queried (in place of `query`)                                                                                                                  |
| query      | `any`                     | Query filter (in place of `ids`)                                                                                                                         |
| empty      | `boolean`                 | Whether to prevent fetching data                                                                                                                         |
| options    | `object`                  | [`DataStore`](#datastore) options for requests                                                                                                           |
| dataStore  | [`DataStore`](#datastore) | [`DataStore`](#datastore) to be used for requests                                                                                                        |
| persistent | `boolean` &#124; `"very"` | Whether stale data should be retained during the next request - this only applies if neither `dataStore` nor `name` have changed, unless set to `"very"` |

### Context

| Name      | Type                      | Description                                                                                       |
| --------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| name      | `string`                  | Resource name                                                                                     |
| ids       | `any[]`                   | Queried IDs                                                                                       |
| query     | `any`                     | Query filter                                                                                      |
| options   | `object`                  | [`DataStore`](#datastore) options used for the request                                            |
| dataStore | [`DataStore`](#datastore) | [`DataStore`](#datastore) to be used for requests                                                 |
| request   | `string`                  | Unique identifier for the current request                                                         |
| data      | `any[]`                   | The actual data                                                                                   |
| error     | `Error` &#124; `boolean`  | Error information about the most recent request, or `true` if no further information is available |
| isEmpty   | `boolean`                 | Whether fetching data is prevented                                                                |
| isLoading | `boolean`                 | Whether another query is currently being executed                                                 |
| isStale   | `boolean`                 | Whether the current data is stale                                                                 |
| notify    | `() => void`              | Callback to reload the current request                                                            |

### Related

[`<ResourceConsumer>`](#resourceconsumer)

## `<ResourceConsumer>`

Context consumer for [`<Resource>`](#resource).

<!--DOCUSAURUS_CODE_TABS-->
<!--Import-->

```js
import { ResourceConsumer } from "@civet/core";
```

<!--Usage-->

```jsx
<ResourceConsumer>
  {(context) => ...}
</ResourceConsumer>
```

<!--END_DOCUSAURUS_CODE_TABS-->

## `DataStore`

DataStore base class.

<!--DOCUSAURUS_CODE_TABS-->
<!--Import-->

```js
import { DataStore } from "@civet/core";
```

<!--Usage-->

```js
class CustomStore extends DataStore {
  handleGet(resource, ids, query, options) {
    return ...;
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Class members

| Name         | Arguments                                                                          | Return Type               | Description                                                                          |
| ------------ | ---------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| subscribe    | resourceName: `string`, handler: `() => void`                                      | unsubscribe: `() => void` | Subscribe to data change notifications                                               |
| notify       | resourceName: `string`                                                             | `void`                    | Notify data changes                                                                  |
| get          | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`              | `Promise<any[]>`          | Get data (uses `handleGet` internally)                                               |
| create       | resourceName: `string`, data: `any`, options: `object`                             | `Promise<void>`           | Create data (uses `handleCreate` internally)                                         |
| update       | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object` | `Promise<void>`           | Update data (uses `handleUpdate` internally)                                         |
| patch        | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object` | `Promise<void>`           | Patch data (uses `handlePatch` internally)                                           |
| remove       | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`              | `Promise<void>`           | Remove data (uses `handleRemove` internally)                                         |
| recycleItems | nextData: `any[]`, prevData: `any[]`                                               | `any[]`                   | Recycle unchanged items to prevent unneeded rerenders (see caveats for more details) |

### Abstract members

| Name         | Arguments                                                                          | Return Type                     | Description |
| ------------ | ---------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| handleGet    | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`              | `any[]` &#124; `Promise<any[]>` |             |
| handleCreate | resourceName: `string`, data: `any`, options: `object`                             | `void` &#124; `Promise<void>`   |             |
| handleUpdate | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object` | `void` &#124; `Promise<void>`   |             |
| handlePatch  | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object` | `void` &#124; `Promise<void>`   |             |
| handleRemove | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`              | `void` &#124; `Promise<void>`   |             |

### Caveats

#### Abstract functions

The functions `get`, `create`, ... internally invoke their corresponding abstract counterparts `handle...` and perform generic validation on their parameters and return values. Therefore, you should not just override them, but implement the abstract `handle...` methods instead.

#### recycleItems

React offers tools to avoid unnecessary component updates, including `React.Component.shouldComponentUpdate`, `React.PureComponent` and `React.memo`.
These tools check whether the props of a component have changed since the previous render to determine if the component needs to be updated again.
The fastest way to do this would be to use JavaScript's identity operator `===`.
This operator works great for primitives like strings or numbers, but doesn't work like expected with objects and arrays.
This is because it does not compare the value of the variables, but its memory addresses. See the example below:

```js
const a = { x: 1 };
const b = { x: 1 };
const c = a;
a === b; // -> false: not the same memory address
a === c; // -> true: same memory address
```

`recycleItems` attempts to fix this issue.
It is internally called by the [`<Resource>`](#resource) component after each fetch.
The function compares the previous items with the next ones and attempts to reapply all unchanged items from the previous array to the new one.
As a result, the following checks should succeed:

- array equality
  - if one or more items differ (compared by value): `prevData !== nextData`
  - if items were added or removed: `prevData !== nextData`
  - if the order of the arrays differs: `prevData !== nextData`
  - else: `prevData === nextData`
- item equality
  - if an item differs (compared by value): `prevItem !== nextItem`
  - else (even if it was reordered in the array): `prevItem === nextItem`

However, the default implementation may be expensive in regard to performance as it deeply compares each item by value.
This is why, if possible, you should override it with a faster approach like the following:

```js
// uses IDs and eTags instead of comparing by value
recycleItems(nextData, prevData) {
  const prevItems = [...prevData];
  const result = nextData.map(nextItem => {
    const i = prevItems.findIndex(item => item.id === nextItem.id);
    if (i >= 0) {
      const [prevItem] = prevItems.splice(i, 1);
      if (nextItem.eTag != null && prevItem.eTag === nextItem.eTag) return prevItem;
    }
    return nextItem;
  });
  if (
    prevData.length === result.length &&
    result.reduce((sum, item, i) => sum && prevData[i] === item, true)
  ) {
    return prevData;
  }
  return result;
}
```
