---
id: api-core
title: Core
sidebar_label: Core
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

| Type     | Description                       |
| -------- | --------------------------------- |
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

| Type     | Description                           |
| -------- | ------------------------------------- |
| `object` | [Resource context](#resourceprovider) |

## `BaseDataStore`

DataStore base class.

When implementing your own DataStore, usually you would prefer [`DataStore`](#datastore) over this class, as it already provides some general implementations.

<!--DOCUSAURUS_CODE_TABS-->
<!--Import-->

```js
import { BaseDataStore } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Class members

| Name          | Arguments                                                                                                                                                                                                                  | Return Type               | Description                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| subscribe     | resourceName: `string`, handler: `() => void`                                                                                                                                                                              | unsubscribe: `() => void` | Subscribe to data change notifications                                                                            |
| notify        | resourceName: `string`                                                                                                                                                                                                     | `void`                    | Notify data changes                                                                                               |
| get           | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)                                                                                                               | `Promise<any[]>`          | Get data (at once &#124; uses `handleGet` internally)                                                             |
| continuousGet | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta), callback: `(error: any, complete: boolean, data: any[]) => void`, abortSignal: [`AbortSignal`](#abortsignal) | `void`                    | Get data (continuously &#124; uses `handleGet` internally)                                                        |
| create        | resourceName: `string`, data: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)                                                                                                                              | `Promise<void>`           | Create data (uses `handleCreate` internally)                                                                      |
| update        | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)                                                                                                  | `Promise<void>`           | Update data (uses `handleUpdate` internally)                                                                      |
| patch         | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)                                                                                                  | `Promise<void>`           | Patch data (uses `handlePatch` internally)                                                                        |
| remove        | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: `object` &#124; [`Meta`](#meta)                                                                                                               | `Promise<void>`           | Remove data (uses `handleRemove` internally)                                                                      |
| transition    | nextData: `any[]`, prevData: `any[]`, context: `object`, prevContext: `object`                                                                                                                                             | `any[]`                   | Transition between the previous and current `data` array (see caveats for more details)                           |
| recycleItems  | nextData: `any[]`, prevData: `any[]`, context: `object`, prevContext: `object`                                                                                                                                             | `any[]`                   | Recycle unchanged items to prevent unneeded rerenders (see caveats of [`DataStore`](#datastore) for more details) |
| extend        | `{ resource: (resourcePlugin: ReactComponent) => void }`                                                                                                                                                                   | `void`                    | Extend Civet with custom functionality (see [Extending Civet](guides-extending.md#datastore) for more details)    |

### Abstract members

| Name         | Arguments                                                                                                 | Return Type                                                                                                                                 | Description                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| handleGet    | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: [`Meta`](#meta)              | `any[]` &#124; `Promise<any[]>` &#124; `(callback: (error: any, complete: boolean, data: any[]) => void, abortSignal: AbortSignal) => void` | A callback function can be returned to support continuous gets (see caveats for more details) |
| handleCreate | resourceName: `string`, data: `any`, options: `object`, meta: [`Meta`](#meta)                             | `void` &#124; `Promise<void>`                                                                                                               |                                                                                               |
| handleUpdate | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: [`Meta`](#meta) | `void` &#124; `Promise<void>`                                                                                                               |                                                                                               |
| handlePatch  | resourceName: `string`, ids: `any[]`, query: `any`, data: `any`, options: `object`, meta: [`Meta`](#meta) | `void` &#124; `Promise<void>`                                                                                                               |                                                                                               |
| handleRemove | resourceName: `string`, ids: `any[]`, query: `any`, options: `object`, meta: [`Meta`](#meta)              | `void` &#124; `Promise<void>`                                                                                                               |                                                                                               |

### Caveats

#### Abstract functions

The functions `get`, `create`, ... internally invoke their corresponding abstract counterparts `handle...` and perform generic validation on their parameters and return values. Therefore, you should not just override them, but implement the abstract `handle...` methods instead.

#### continuousGet & transitioning

`dataStore.get` resolves when the complete data is collected.
This is fine when resolving the data is really fast but can be troublesome when you want to load large data sets e.g. from a backend over a slow internet connection.
You can implement your DataStore to support continuous data fetching by returning a callback function from `handleGet` rather than the data itself.
This allows you to forward partial data to the Resource component (or other compatible clients) even if the fetch has not yet been completed.

It can be helpful to allow a transition between several updates of the component, e.g. to keep the order of the elements while the retrieval is still running.
The `Resource` component supports this by calling the `DataStore`'s `transition` method each time it resolves new data. The function is called before `recycleItems`, so you don't have to worry about it when implementing the transition.

## `DataStore`

Default DataStore implementation (based on [`BaseDataStore`](#basedatastore)).

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

| Name                         | Arguments                        | Return Type | Description                                                                                                                                           |
| ---------------------------- | -------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| recycleItemsUniqueIdentifier | item: `any`                      | `string`    | Should return a string which is uniquely identifying the same item accross multiple requests.                                                         |
| recycleItemsIsUnchanged      | nextItem: `any`, prevItem: `any` | `boolean`   | Return `true` if the item was not changed at all, e.g. both versions are completely equal. (You can do so by comparing ETags or similar if available) |

### Caveats

#### recycleItems

React offers tools to avoid unnecessary component updates, including `React.Component.shouldComponentUpdate`, `React.PureComponent` and `React.memo`.
These tools check whether the props of a component have changed since the previous render to determine if the component needs to be updated again.
The fastest way to achieve this would be to use `Object.is`, which behaves like JavaScript's strict comparison operator `===` except for a few differences.
This function works great for primitives like strings or numbers, but doesn't work like we would expect it to when used with objects and arrays.
This is because objects and arrays (which in fact are objects as well) are compared by their memory addresses instead of their contents. See the example below:

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

However, the default implementation may be expensive in regard to performance and may be inaccurate as it creates a hash over each item as its unique identifiers.
This is why, if possible, you should improve it with a faster comparing approach by overriding the methods `recycleItemsUniqueIdentifier` and `recycleItemsIsUnchanged`. You can also completely ditch the default implementation by implementing your own version of `recycleItems` which may be required if you cannot build a unique identifier.

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
  required: dataStorePropType.isRequired,
};
```

<!--Import-->

```js
import { dataStorePropType } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

## `createPlugin`

Creates a plugin from the provided configuration function.

See [Extending Civet](guides-extending.md#plugins) for further information.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
const plugin = createPlugin((BaseDataStore) => {
  function ResourceHook({ ...props, context, children }) {
    return (
      <ReactComponent>
        {children({ ...context, extendedContext: 123 })}
      </ReactComponent>
    );
  }

  class ExtendedDataStore extends BaseDataStore {
    extend(extend) {
      // This is necessary for the base class to work properly:
      super.extend(extend);

      // Register a Resource hook component
      extend.resource(ResourceHook);
    }

    // ... custom DataStore functionality
  }

  return ExtendedDataStore;
});

const DataStoreWithPlugin = plugin(SomeDataStore);
```

<!--Import-->

```js
import { createPlugin } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Function arguments

| Name             | Type                                      | Description                                                  |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------ |
| pluginDefinition | `(BaseDataStore: DataStore) => DataStore` | A function that returns an extended version of BaseDataStore |

### Return type

| Type                       | Description |
| -------------------------- | ----------- |
| `(DataStore) => DataStore` | The plugin  |

## `compose`

Composes the specified single-argument functions from right to left.

This can be especially useful when applying multiple plugins to a DataStore.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
const DataStoreWithPlugins = compose(pluginA, pluginB, pluginC)(SomeDataStore);
// This is the same as: pluginA(pluginB(pluginC(SomeDataStore)))
```

<!--Import-->

```js
import { compose } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Function arguments

| Name   | Type              | Description                  |
| ------ | ----------------- | ---------------------------- |
| ...fns | `(a: any) => any` | The functions to be composed |

### Return type

| Type              | Description            |
| ----------------- | ---------------------- |
| `(a: any) => any` | The composed functions |

## `Notifier`

Interface for handling client side notification events.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
// Basic usage
const notifier = new Notifier();
function handler() {
  console.log("Subscriber was notified");
}
const unsubscribeHandler = notifier.subscribe(handler);
console.log(notifier.isSubscribed(handler)); // true
notifier.trigger();
unsubscribeHandler();
console.log(notifier.isSubscribed(handler)); // false

// You can pass arguments to the handlers
const notifier = new Notifier();
notifier.subscribe((a, b, c) => {
  console.log("Notified:", a, b, c);
});
notifier.trigger(true, 2, "test");
```

<!--Import-->

```js
import { Notifier } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Class members

| Name         | Arguments                         | Return Type               | Description                                                          |
| ------------ | --------------------------------- | ------------------------- | -------------------------------------------------------------------- |
| subscribe    | handler: `(...args: any) => void` | unsubscribe: `() => void` | Subscribe to notifications                                           |
| isSubscribed | handler: `(...args: any) => void` | `boolean`                 | Whether the provided handler is currently subscribed to the notifier |
| trigger      | `...args: any`                    | `void`                    | Notify all currently subscribed handlers                             |

## `ChannelNotifier`

[`Notifier`](#notifier) that supports multiple separate event channels.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
// Basic usage
const notifier = new ChannelNotifier();
function handler() {
  console.log("Subscriber was notified");
}
const unsubscribeHandlerFromChA = notifier.subscribe("channel-a", handler);
console.log(notifier.isSubscribed("channel-a", handler)); // true
console.log(notifier.isSubscribed("channel-b", handler)); // false
notifier.trigger("channel-a"); // Only notify channel a
notifier.trigger(); // Notify all channels
unsubscribeHandlerFromChA();
console.log(notifier.isSubscribed("channel-a", handler)); // false

// You can pass arguments to the handlers
const notifier = new Notifier();
notifier.subscribe("channel-a", (a, b, c) => {
  console.log("Notified:", a, b, c);
});
notifier.trigger("channel-a", true, 2, "test"); // Notify all channels
notifier.trigger(null, true, 2, "test"); // Notify all channels
// Please note that the channel name is not passed to handlers by default.
```

<!--Import-->

```js
import { ChannelNotifier } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Class members

| Name         | Arguments                                          | Return Type               | Description                                                                                                                         |
| ------------ | -------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| subscribe    | handler: `(channel: string, ...args: any) => void` | unsubscribe: `() => void` | Subscribe to notifications on the specified channel                                                                                 |
| isSubscribed | handler: `(channel: string, ...args: any) => void` | `boolean`                 | Whether the provided handler is currently subscribed to the specified channel                                                       |
| trigger      | `channel: string, ...args: any`                    | `void`                    | Notify all handlers currently subscribed to the specified channel (Set the channel to `undefined` or `null` to notify all channels) |

## `AbortSignal`

Interface for handling abort requests.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
// Basic usage
const signal = new AbortSignal();
signal.listen(() => {
  console.log("Request has been aborted");
});
signal.abort();
signal.listen(() => {
  console.log(
    "This will be called immediately, as signal has already been aborted"
  );
});

// The signal can be locked if it is now longer allowed to be aborted
const signal = new AbortSignal();
signal.lock();
signal.abort(); // No listeners will be notified since the signal is already locked
```

<!--Import-->

```js
import { AbortSignal } from "@civet/core";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Class members

| Name   | Arguments              | Return Type               | Description                                           |
| ------ | ---------------------- | ------------------------- | ----------------------------------------------------- |
| listen | listener: `() => void` | unsubscribe: `() => void` | Listen for abort signals                              |
| abort  |                        | `void`                    | Abort the signal                                      |
| lock   |                        | `void`                    | Lock the signal (The signal can no longer be aborted) |

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

// Meta can create (shallowly) immutable snapshots.
const previous = { a: 1 };
const meta = new Meta();
meta.set("a", 1);
const unchanged = meta.commit(previous);
meta.set("a", 2);
const changed = meta.commit(previous);
assert(previous === unchanged);
assert(previous !== changed);
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

| Name    | Arguments                   | Return Type                     | Description                                                                                                                            |
| ------- | --------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| clear   |                             | `void`                          | Delete all keys from the object                                                                                                        |
| delete  | key: `string`               | `any`                           | Delete the specified key from the object - returns the deleted value                                                                   |
| entries |                             | `([key: string, value: any])[]` | Get all entries from the object                                                                                                        |
| get     | key: `string`               | `any`                           | Get the value for the specified key from the object                                                                                    |
| has     | key: `string`               | `boolean`                       | Check if the object has a value for the specified key                                                                                  |
| keys    |                             | `string[]`                      | Get all keys from the object                                                                                                           |
| set     | key: `string`, value: `any` | `void`                          | Set the value for the specified key. Make sure that values are immutable!                                                              |
| values  |                             | `any[]`                         | Get all values from the object                                                                                                         |
| commit  | prev: `object`              | `object`                        | Get the object as a plain JavaScript object - returns a shallow copy of the current value, or `prev` if provided and if all keys match |

### Caveats

#### Immutability

Meta does NOT make sure that the values you provide are immutable.
If you mutate an array or object which you previously passed to a Meta object, the change is also reflected in this Meta object, even when committed.
Commit only creates a shallow copy of the base object.
To guarantee that your values are truely immutable, it is recommended to use a library like immer or Immutable.js.
