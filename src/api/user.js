import request from '@/utils/request'
// 注册接口
export const userRegisterServer = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登录接口
export const userLoginServer = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 获取用户信息
export const userGetInfoServer = () => request.get('/my/userinfo')

// 更新用户信息
export const userUpdateInfoServer = (data) => request.put('/my/userinfo', data)

// 上传用户头像
export const userAvatarUploadServer = (avatar) =>
  request.patch('/my/update/avatar', avatar)

// 用户密码修改
export const userPwdChangeServer = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
