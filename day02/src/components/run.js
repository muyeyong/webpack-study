import React from 'react'
import './run.less'
import fly from '../image/DJI_0926.png'
import { a } from '../tree-shark'
const Run = () => {
  return <>
  {a()}
  <p className='slower'> 我要去 法国</p>
  <p className='faster'>我要去 2223</p>
  <p className='faster'>我要去 泰国123</p>
  <p className='slower'>我要去 意大利11</p>
  <img className='fly' src={fly} />
  </>
}

export default Run
