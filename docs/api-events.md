---
id: api-events
title: Events
---

[NPM](https://npmjs.com/package/@civet/events) | [GitHub](https://github.com/civet-org/events)

```bash
npm install @civet/events
```

The events module provides advanced event handling functionality.

The [`DataStore`](api-core.md#datastore) already has basic support for handling events. However, it is limited to updating all subscribers of a specific resource.
If you need more advanced event handling, this is the place to go.

## `<ConfigProvider>`

Provides general configuration for event components to its descendants using React's context API.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
<ConfigProvider eventReceiver={receiver}>...</ConfigProvider>
```

<!--Import-->

```js
import { ConfigProvider } from "@civet/events";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Props

| Name          | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| eventReceiver | [`EventReceiver`](#eventreceiver) |             |

### Context

| Name          | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| eventReceiver | [`EventReceiver`](#eventreceiver) |             |

### Related

[`<ConfigConsumer>`](#configconsumer), [`<EventHandler>`](#eventhandler)

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
import { ConfigConsumer } from "@civet/events";
```

<!--END_DOCUSAURUS_CODE_TABS-->

## `<EventHandler>`

Subscribes to an [`EventReceiver`](#eventreceiver) to update a [`<Resource>`](api-core.md#resource) when events occur.

Necessary configuration that is not directly specified is taken from the nearest [`<ConfigProvider>`](#configprovider) and [`<Resource>`](api-core.md#resource).

You can specify which events should lead to an update by either passing `options` to the [`EventReceiver`](#eventreceiver) or using `onEvent`.
`onEvent` can also be used to directly access events allowing you to add custom event logic to your components.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```jsx
<EventHandler options={{ some: 'options' }} onEvent={(e) => console.log('Received', e)}>
  ...
</Resource>
```

<!--Import-->

```js
import { EventHandler } from "@civet/events";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Props

| Name          | Type                              | Description                                                                                                                                          |
| ------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventReceiver | [`EventReceiver`](#eventreceiver) | [`EventReceiver`](#eventreceiver) to be used                                                                                                         |
| resource      | `object`                          | Resource context to be used                                                                                                                          |
| options       | `object`                          | [`EventReceiver`](#eventreceiver) options                                                                                                            |
| onEvent       | `(event: any) => boolean`         | Callback to filter events and handle your own event logic - if `true` is returned, the event is considered as handled and the resource is not update |

## `composeHandlers`

Utility for composing multiple event handlers.
Invokes each handler from left to right, but stops immediately when a handler returns `true`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
const composedHandler = composeHandlers(
  (event) => console.log('Received', event),
  (event) => ...
);
```

<!--Import-->

```js
import { composeHandlers } from "@civet/events";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Function arguments

| Name        | Type                      | Description    |
| ----------- | ------------------------- | -------------- |
| ...handlers | `(event: any) => boolean` | Event handlers |

### Return type

| Type                      | Description       |
| ------------------------- | ----------------- |
| `(event: any) => boolean` | Composed handlers |

## `EventReceiver`

EventReceiver base class.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
class CustomReceiver extends EventReceiver {
  handleSubscribe(resource, options, handler) {
    ...
    const unsubscribe = () => {
      ...
    };
    return unsubscribe;
  }
}

const receiver = new CustomReceiver();
```

<!--Import-->

```js
import { EventReceiver } from "@civet/events";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Class members

| Name      | Arguments                                                              | Return Type               | Description         |
| --------- | ---------------------------------------------------------------------- | ------------------------- | ------------------- |
| subscribe | resource: `object`, options: `object`, handler: `(event: any) => void` | unsubscribe: `() => void` | Subscribe to events |

### Abstract members

| Name            | Arguments                                                              | Return Type               | Description |
| --------------- | ---------------------------------------------------------------------- | ------------------------- | ----------- |
| handleSubscribe | resource: `object`, options: `object`, handler: `(event: any) => void` | unsubscribe: `() => void` |             |

### Caveats

#### Abstract functions

The function `subscribe` internally invokes its abstract counterpart `handleSubscribe` and performs generic validation on its parameters and return value. Therefore, you should not just override it, but implement the abstract `handleSubscribe` method instead.

## `isEventReceiver`

Identifies [`EventReceiver`](#eventreceiver) instances.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
const er = new EventReceiver();

if (!isEventReceiver(er)) {
  throw new Error("Should be a EventReceiver instance");
}
```

<!--Import-->

```js
import { isEventReceiver } from "@civet/events";
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Function arguments

| Name          | Type  | Description              |
| ------------- | ----- | ------------------------ |
| eventReceiver | `any` | The object to be checked |

### Return type

| Type      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `boolean` | Whether `eventReceiver` is an instance of [`EventReceiver`](#eventreceiver) |

## `eventReceiverPropType`

PropType for [`EventReceiver`](#eventreceiver) instances.

<!--DOCUSAURUS_CODE_TABS-->
<!--Usage-->

```js
const propTypes = {
  optional: eventReceiverPropType,
  required: eventReceiverPropType.isRequired
};
```

<!--Import-->

```js
import { eventReceiverPropType } from "@civet/events";
```

<!--END_DOCUSAURUS_CODE_TABS-->
