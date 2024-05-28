import React from 'react'
import '~/assets/CustomLoading.css'

const CustomLoading = () => {
  return (
    <svg className="pl" width="6em" height="6em" viewBox="0 0 240 240">
      <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#f42f25" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
      <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#f49725" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
      <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#255ff4" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
      <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#f42582" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
    </svg>
  )
}

export default CustomLoading
