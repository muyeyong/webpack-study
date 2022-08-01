/* 
  同步钩子
  异步钩子
 */
const { SyncHook, AsyncSeriesHook } = require('tapable')

class Dog {
  constructor() {
    this.hooks = {
      run: new SyncHook(['run']),
      sleep: new AsyncSeriesHook(['sleep']),
      eat: new AsyncSeriesHook(['eat'])
    }
  }
}

const newDog = new Dog()

newDog.hooks.run.tap('runPlugin', () => {
  console.log('dog runing...')
})

newDog.hooks.sleep.tapPromise('sleepPlugin', () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('dog sleep...')
      resolve()
    }, 1000)
  })
})

newDog.hooks.eat.tapAsync('eatPlugin', (arg1,callback) => {
  setTimeout(() => {
    callback()
  }, 1000)
})

newDog.hooks.run.call('123', () => {

})
newDog.hooks.eat.callAsync('123', () => {
  
})
newDog.hooks.sleep.callAsync('234', () => {

})