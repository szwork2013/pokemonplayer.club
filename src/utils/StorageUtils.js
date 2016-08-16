// import MemoryStorage from 'memorystorage'
// let storage;
//
// if (typeof localStorage !== 'undefined') {
//     storage = localStorage
// } else {
//     storage = new MemoryStorage('tiramisu-web')
// }
//
// export const get = (key) => {
//     // Check validation here
//     let item = JSON.parse(storage.getItem(key));
//     if (item) {
//         if (item.createAt + item.expires_in * 1000 < Date.now()) {
//             //remove from storage
//             storage.removeItem(key)
//             item = null
//         }
//     }
//     return item
// };
//
// export const put = (key, value) => {
//     return storage.setItem(key, value)
// };
//
// export const remove = (key) => {
//     return storage.removeItem(key)
// };
//
// export const clear = () => {
//     storage.clear()
// };
//
