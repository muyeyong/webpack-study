import React from 'react'
import './run.less'
import fly from './image/DJI_0926.png'
const Run = () => {
  return <>
  <p className='slower'> 我要去 漂亮国</p>
  <p className='faster'>我要去 土耳其</p>
  <p className='faster'>我要去 泰国</p>
  <p className='slower'>我要去 意大利</p>
  <img className='fly' src={fly} />
  </>
}

export default Run
