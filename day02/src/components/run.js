import React from 'react'
import './run.less'
import fly from '../image/DJI_0926.png'
import { a } from '../tree-shark'
const Run = () => {
  const loadDynamicImport = () => {
    import('../dynamic-import').then(({ dafault: _})=> {
      console.log('dynamic', _)
    })
  }
  return <>
  {a()}
  <p className='slower'> 我要去 法国</p>
  <p className='faster'>我要去 2223</p>
  <p className='faster'>我要去 泰国123</p>
  <p className='slower'>我要去 意大利11</p>
  <img className='fly' src={fly} />
  <button onClick={loadDynamicImport}>点击加载异步JS</button>
  </>
}

export default Run
