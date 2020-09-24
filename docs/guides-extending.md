---
id: guides-extending
title: Extending Civet
sidebar_label: Extending Civet
---

## DataStore

The main place for bringing your own functionality to Civet is the [`DataStore`](api-core.md#datastore).
You can simply add your own functionality to it by extending the class and then accessing it from within a [`Resource`](api-core.md#resource) or from somewhere else.

However, there may be some cases where this might not be enough, for example if you need a dedicated state for each [`Resource`](api-core.md#resource) or want to manipulate the [`Resource`](api-core.md#resource) context.

If this is the case, you can use [`DataStore`](api-core.md#datastore)'s `extend` method.
This method is called when initialising the [`DataStore`](api-core.md#datastore) and provides a configuration API.

With this method, you can for example add hooks to each [`Resource`](api-core.md#resource) that uses your [`DataStore`](api-core.md#datastore).
These hooks could then be used to collect debugging information, provide your own React context values to child components or, like said above, manipulate the [`Resource`](api-core.md#resource)'s context itself.

```js
/*
Resource Hooks must always render the result of the children function.
The children function takes the (un)modified context as its only argument.

It is strongly recommended to add additional attributes to the context
instead of modifying existing ones if possible
in order to prevent other plugins or child components from breaking.
*/
function ResourceHook({ ...props, context, children }) {
  return (
    <ReactComponent>
      {children({ ...context, extendedContext: 123 })}
    </ReactComponent>
  );
}

class MyDataStore extends DataStore {
  extend(extend) {
    // This is necessary for the base class to work properly:
    super.extend(extend);

    // Register a Resource hook component
    extend.resource(ResourceHook);
  }

  // ...handleGet, etc.
}
```

:::caution
Please note that the `extend` method is called by the [BaseDataStore](api-core#basedatastore)'s constructor, so probably before your own constructor's logic is executed.

Therefore, you should not depend on `this` inside of `extend`.
:::

## Plugins

You can bundle related functionality in standalone plugins in order to make them reusable.

The [`createPlugin`](api-core.md#createplugin) function creates a plugin that can simply be called on an existing [`DataStore`](api-core.md#datastore) implementation.
You can then extend it like described above in the [DataStore section](#datastore).
