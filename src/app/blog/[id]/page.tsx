"use client"

import React from 'react'

export default function page({param}: any) {
  return (
    <div>
      Blog{" "}{param.id}
    </div>
  )
}
