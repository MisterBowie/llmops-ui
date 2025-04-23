import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义账户类型接口
interface Account {
  name: string
  email: string
  avatar: string
}
const initAccount = {
  name: 'vv',
  email: '948929519@qq.com',
  avatar: '',
}
export const useAccountStore = defineStore('account', () => {
  const account = ref({ ...initAccount })

  function update(params: Partial<Account>) {
    Object.assign(account.value, params)
  }

  function clear() {
    account.value = { ...initAccount }
  }
  return { account, update, clear }
})
