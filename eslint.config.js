import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import { ElMessage } from 'element-plus';

export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
    ],
  },  
  rules: {     
    semi: ['error', 'always'],
    quotes:['error','single']
  },
  // 配置ElMessage不提示报错
  globals:{
    ElMessage:'readonly',
    ElMessageBox:'readonly'
  } 
];
