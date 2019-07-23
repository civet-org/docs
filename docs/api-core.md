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

Provides general configuration for core components to its descendants using React's context API.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
<ConfigProvider dataStore={store}>...</ConfigProvider>
```

<!--Import-->

```js
import { ConfigProvider } from "@civet/core";
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

[`<ConfigConsumer>`](#configconsumer), [`<Resource>`](#resource), [`useConfigContext`](#useconfigcontext)

## `<ConfigConsumer>`

Context consumer for [`<ConfigProvider>`](#configprovider).

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
<ConfigConsumer>
  {(context) => ...}
</ConfigConsumer>
```

<!--Import-->

```js
import { ConfigConsumer } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

## `useConfigContext`

Context hook for [`<ConfigProvider>`](#configprovider).

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
const configContext = useConfigContext();
```

<!--Import-->

```js
import { useConfigContext } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Function arguments

None

### Return type

| Type      | Description                                                     |
| --------- | --------------------------------------------------------------- |
| `object` | [Config context](#configprovider) |

## `<Resource>`

Makes data from an [`DataStore`](#datastore) available to its descendants using a [`<ResourceProvider>`](#resourceprovider).

Necessary configuration that is not directly specified is taken from the nearest [`<ConfigProvider>`](#configprovider).

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
<Resource name="persons" query={{ city: "New York" }}>
  ...
</Resource>
```

<!--Import-->

```js
import { Resource } from "@civet/core";
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

See [`<ResourceProvider>`](#resourceprovider)

### Related

[`<ResourceProvider>`](#resourceprovider), [`<ResourceConsumer>`](#resourceconsumer), [`useResourceContext`](#useresourcecontext)

## `<ResourceProvider>`

Provides resource context to its descendants using React's context API.

In most cases you should use [`<Resource>`](#resource) instead.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
<ResourceProvider value={resourceContext}>...</ResourceProvider>
```

<!--Import-->

```js
import { ResourceProvider } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Props

| Name  | Type     | Description      |
| ----- | -------- | ---------------- |
| value | `object` | Resource context |

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
| meta      | `object`                  | Metadata                                                                                          |
| error     | `Error` &#124; `boolean`  | Error information about the most recent request, or `true` if no further information is available |
| isEmpty   | `boolean`                 | Whether fetching data is prevented                                                                |
| isLoading | `boolean`                 | Whether another query is currently being executed                                                 |
| isStale   | `boolean`                 | Whether the current data is stale                                                                 |
| notify    | `() => void`              | Callback to reload the current request                                                            |

### Related

[`<Resource>`](#resource), [`<ResourceConsumer>`](#configconsumer), [`useResourceContext`](#useresourcecontext)

## `<ResourceConsumer>`

Context consumer for [`<ResourceProvider>`](#resourceprovider).

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
<ResourceConsumer>
  {(context) => ...}
</ResourceConsumer>
```

<!--Import-->

```js
import { ResourceConsumer } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

## `useResourceContext`

Context hook for [`<ResourceProvider>`](#resourceprovider).

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
const resourceContext = useResourceContext();
```

<!--Import-->

```js
import { useResourceContext } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Function arguments

None

### Return type

| Type      | Description                                                     |
| --------- | --------------------------------------------------------------- |
| `object` | [Resource context](#resourceprovider) |

## `DataStore`

DataStore base class.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
class CustomStore extends DataStore {
  handleGet(resource, ids, query, options, meta) {
    return ...;
  }
}

const store = new CustomStore();
```

<!--Import-->

```js
import { DataStore } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Class members

| Name         | Arguments                                                                                                                 | Return Type               | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| subscribe    | resourceName: `string`, handler: `() => void`                                                                             | unsubscribe: `() => void` | Subscribe to data change notifications                                               |
| notify       | resourceName: `string`                                                                                                    | `void`                    | Notify data changes                                                                  |
| get          | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)              | `Promise<any[]>`          | Get data (uses `handleGet` internally)                                               |
| create       | resourceName: `string`, data: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)                             | `Promise<void>`           | Create data (uses `handleCreate` internally)                                         |
| update       | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta) | `Promise<void>`           | Update data (uses `handleUpdate` internally)                                         |
| patch        | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta) | `Promise<void>`           | Patch data (uses `handlePatch` internally)                                           |
| remove       | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)              | `Promise<void>`           | Remove data (uses `handleRemove` internally)                                         |
| recycleItems | nextData: `any[]`, prevData: `any[]`                                                                                      | `any[]`                   | Recycle unchanged items to prevent unneeded rerenders (see caveats for more details) |

### Abstract members

| Name         | Arguments                                                                                                 | Return Type                     | Description |
| ------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| handleGet    | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: [`Meta`](#meta)              | `any[]` &#124; `Promise<any[]>` |             |
| handleCreate | resourceName: `string`, data: `any`, options: `object`, meta: [`Meta`](#meta)                             | `void` &#124; `Promise<void>`   |             |
| handleUpdate | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: [`Meta`](#meta) | `void` &#124; `Promise<void>`   |             |
| handlePatch  | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: [`Meta`](#meta) | `void` &#124; `Promise<void>`   |             |
| handleRemove | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: [`Meta`](#meta)              | `void` &#124; `Promise<void>`   |             |

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

## `isDataStore`

Identifies [`DataStore`](#datastore) instances.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
const ds = new DataStore();

if (!isDataStore(ds)) {
  throw new Error("Should be a DataStore instance");
}
```

<!--Import-->

```js
import { isDataStore } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Function arguments

| Name      | Type  | Description              |
| --------- | ----- | ------------------------ |
| dataStore | `any` | The object to be checked |

### Return type

| Type      | Description                                                     |
| --------- | --------------------------------------------------------------- |
| `boolean` | Whether `dataStore` is an instance of [`DataStore`](#datastore) |

## `dataStorePropType`

PropType for [`DataStore`](#datastore) instances.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
const propTypes = {
  optional: dataStorePropType,
  required: dataStorePropType.isRequired
};
```

<!--Import-->

```js
import { dataStorePropType } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

## `Meta`

Metadata key value map.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
// Basic usage
const meta = new Meta();
meta.set("test", 1);
const result = meta.commit();
console.log(result.test);

// Meta can be based on an existing object
const base = {};
const baseMeta = new Meta(base);
baseMeta.set("test", 1);
assert(base.test === baseMeta.get("test"));

// Meta can handle basic immutability
const previousMeta = { a: 1 };
const unchanged = new Meta({ a: 1 });
const changed = new Meta({ a: 2 });
assert(previousMeta === unchanged.commit(previousMeta));
assert(previousMeta !== changed.commit(previousMeta));
```

<!--Import-->

```js
import { Meta } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Constructor

| Arguments      | Description                                    |
| -------------- | ---------------------------------------------- |
| base: `object` | All changes get applied to `base` if it is set |

### Class members

| Name    | Arguments                   | Return Type                     | Description                                                                                                                                       |
| ------- | --------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| clear   |                             | `void`                          | Delete all keys from the object                                                                                                                   |
| delete  | key: `string`               | `any`                           | Delete the specified key from the object - returns the deleted value                                                                              |
| entries |                             | `([key: string, value: any])[]` | Get all entries from the object                                                                                                                   |
| get     | key: `string`               | `any`                           | Get the value for the specified key from the object                                                                                               |
| has     | key: `string`               | `boolean`                       | Check if the object has a value for the specified key                                                                                             |
| keys    |                             | `string[]`                      | Get all keys from the object                                                                                                                      |
| set     | key: `string`, value: `any` | `void`                          | Set the value for the specified key                                                                                                               |
| values  |                             | `any[]`                         | Get all values from the object                                                                                                                    |
| commit  | prev: `object`              | `object`                        | Get the object as a plain JavaScript object - returns a copy of the current value, or `prev` if it is set and matches the current object by value |
