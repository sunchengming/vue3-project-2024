
import { createPinia } from 'pinia';
import persist from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(persist);

export default pinia;


// import { userUserStore } from './modules/user';
// export {userUserStore};
// import { userCountStore } from './modules/count';
// export {userCountStore};

export * from './modules/count';
export * from './modules/user';


