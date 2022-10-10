export function getPocketbase() {
    if (typeof document !== 'undefined') {
        return require('pocketbase/dist/pocketbase.cjs.js');
    } else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return require('pocketbase/dist/pocketbase.cjs');
    }
}