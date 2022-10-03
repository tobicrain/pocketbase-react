PocketBase React SDK
======================================================================
[![Npm package version](https://badgen.net/npm/v/pocketbase-react)](https://npmjs.com/package/pocketbase-react)

Unofficial React SDK (React, React Native, Expo) for interacting with the [PocketBase JS SDK](https://github.com/pocketbase/js-sdk).


- [Installation](#installation)
- [Usage](#usage)
- [Caveats](#caveats)
- [Development](#development)


## Installation

### React Native or Expo


```sh
# Using npm
npm install pocketbase-react  --save

#Using yarn
yarn add pocketbase-react
```
```tsx
import { Pocketbase } from 'pocketbase-react';
```

---
> 🔧 React Native doesn't have native `EventSource` implementation, so in order to use the realtime service you'll need to load a `EventSource` polyfill.
> I recommend [EventSource/eventsource](https://github.com/EventSource/eventsource)
> ```sh
> # Using npm
> npm install eventsource --save
>
> # Using yarn
> yarn add eventsource
> ```
> ```js 
> // EventSource.ts
> var Source = require('event-source');
> global.EventSource = Source;
> ```

## Usage

```tsx
// App.tsx
import { Pocketbase } from 'pocketbase-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = AsyncStorage
const serverURL = "YOUR_SERVER_URL"
const collections = ['COLLECTION_NAME_01', 'COLLECTION_NAME_02']
const credentials = {
    username: 'YOUR_EMAIL',
    password: 'YOUR_PASSWORD'
}

<Pocketbase
    storage={storage}
    serverURL={serverURL}
    initialCollections={collections}
    credentials={credentials}>
    <APP />
</Pocketbase>
```

## Caveats
```tsx
import { useAppContent } = "pocketbase-react";
```
### Records
Reading the records value directly accesses the Redux Store.

The value will be changed automatically by the following actions:
- [Initial Fetch](#initialfetch)
- [Initial Collections](#usage)
- [Subscribe](#subscribe)
- [Refetch](#refetch)

**Without** Initial Fetch
```tsx
// Corresponds to the stored Redux value, simply reads without making further PocketBase requests
const { records } = useAppContent("COLLECTION_NAME_01")
```
**With** Initial Fetch <a name="initialfetch"></a>
```tsx
// When initializing, the desired table is queried once and updated in Redux, records corresponds to the stored Redux value
const { records } = useAppContent("COLLECTION_NAME_01", true)
```

### Actions
```tsx
const { actions } = useAppContent("COLLECTION_NAME_01")
```

> *All following actions are performed on the desired table, in this case -> COLLECTION_NAME_01*
>
> ⚠️ **All actions will not return anything, they will just modify the Redux value according to their intention**

Subscribe <a name="subscribe"></a>
```tsx
actions.subscribe();
```
Unsubscribe
```tsx
actions.unsubscribe();
```
Refetch <a name="refetch"></a>
```tsx
actions.refetch();
```
Create
```tsx
const object = {};
actions.create(object);
```
Update
```tsx
const id = "SOME_ID";
const object = {};
actions.update(id, object);
```
DELETE
```tsx
const id = "SOME_ID";
actions.delete(id);
```

## Development

By using
```sh
npm run build
# or
yarn build
```
You will get a folder called dist, which you can use to replace node_modules/pocketbase-react/dist in your React project.

***Maybe someone finds a better way to integrate the package in development with a project***
