// /src/setupTests.js
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage('./scratch');