# Networking Components

This page demonstrates networking components that can be used to access remote data in a consistent way.

## Remote Data Source

The remote data source component is a clever width that loads data from an remote API URL; and allows it to be quickly rendered inside a Vue component.

### Normal Behaviour

When the component is able to load data, by default, it will render out information about the request, and the response object in a code block.

<ClientOnly>
  <networking-VuesiteRemoteDataSource
    data-source-url="https://boardgames-api.calisaurus.net/api/status" />
</ClientOnly>

```html
<ClientOnly>
  <networking-VuesiteRemoteDataSource
    data-source-url="https://boardgames-api.calisaurus.net/api/status" />
</ClientOnly>
```

### Network Error

By default, the `VuesiteRemoteDataSource` component will try to load from the url specified by `data-source-url` - if this is an invalid URL, then this will display as a **Network Error**.

<ClientOnly>
  <networking-VuesiteRemoteDataSource data-source-url="http://invalid/url" />
</ClientOnly>

```html
<ClientOnly>
  <networking-VuesiteRemoteDataSource data-source-url="http://invalid/url" />
</ClientOnly>
```

### 404 Data

If you try and load from an valid URL, but the content is not found, then this will display as a **Request failed with status code 404** error.

<ClientOnly>
  <networking-VuesiteRemoteDataSource
    data-source-url="https://boardgames-api.calisaurus.net/api/404" />
</ClientOnly>

```html
<ClientOnly>
  <networking-VuesiteRemoteDataSource
    data-source-url="https://boardgames-api.calisaurus.net/api/404" />
</ClientOnly>
```


### Tabulated Response

In this example, the response data is combined with a `<formattingTabulation />` component to be formatted into a table.

Any custom template can be provided inside the `<template v-slot-"{ response }">...</template>` tag to render the response.

<ClientOnly>
  <networking-VuesiteRemoteDataSource
    data-source-url="https://boardgames-api.calisaurus.net/api/boardgame/list">
  <template v-slot="{ response }">
    <formatting-VuesiteTabulation v-if="response.data" :items="response.data.games" />
  </template>
  </networking-VuesiteRemoteDataSource>
</ClientOnly>

```html
<ClientOnly>
  <networking-VuesiteRemoteDataSource
    data-source-url="https://boardgames-api.calisaurus.net/api/boardgame/list">
  <template v-slot="{ response }">
    <formatting-VuesiteTabulation v-if="response.data" :items="response.data.games" />
  </template>
  </networking-VuesiteRemoteDataSource>
</ClientOnly>
```
