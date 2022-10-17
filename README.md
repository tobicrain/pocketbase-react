PocketBase React SDK
======================================================================
[![Npm package version](https://badgen.net/npm/v/pocketbase-react)](https://npmjs.com/package/pocketbase-react)

Unofficial React SDK (React, React Native, Expo) for interacting with the [PocketBase JS SDK](https://github.com/pocketbase/js-sdk).


- [Installation](#installation)
- [Usage](#usage)
- [Caveats](#caveats)
- [Development](#development)


## Installation

### React, React Native or Expo


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
> 🔧 React Native / Expo doesn't have native `EventSource` implementation, so in order to use the realtime service you'll need to load a `EventSource` polyfill.
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

const serverURL = "YOUR_SERVER_URL"
const collections = ['COLLECTION_NAME_01', 'COLLECTION_NAME_02']
const webRedirectURL = "http://..."
const mobileRedirectURL = "expo://..." // for example

<Pocketbase
      serverURL={serverURL}
      initialCollections={collections}
      webRedirectURL={webRedirectURL}
      mobileRedirectURL={mobileRedirectURL}
      openURL={async (url) => {
        // for example expo WebBrowser
        await WebBrowser.openBrowserAsync(url);
      }}>
    <APP />
</Pocketbase>
```

## Caveats
```tsx
import { useAppContent, useAuth } from "pocketbase-react";
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

### Auth
```tsx
const { actions } = useAuth()
```

Register with Email <a name="subscribe"></a>
```tsx
await actions.registerWithEmail(email: string, password: string);
```
Sign-In with Email
```tsx
await actions.signInWithEmail(email: string, password: string);
```
Sign-In with Provider
```tsx
await actions.signInWithProvider(provider: string);
```
Submit Provider Result 
```tsx
await actions.submitProviderResult(url: string);
```
Sign-Out
```tsx
actions.signOut();
```
Send password reset email
```tsx
await actions.sendPasswordResetEmail(email: string);
```
Send email verification
```tsx
await actions.sendEmailVerification(email: string);
```
Update profile
```tsx
await actions.updateProfile(id: string, record: {});
```
Update profile
```tsx
await actions.updateEmail(email: string);
```
Delete user
```tsx
await actions.deleteUser(id: string);
```