import dynamic from 'next/dynamic'
import React from 'react'
const Setting = dynamic(() => import('./Setting'))
const SettingHOC = () => {
  return (
    <Setting/>
  )
}

export default SettingHOC
