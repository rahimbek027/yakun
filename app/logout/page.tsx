'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Logout = () => {
  const router = useRouter()
  useEffect(() => {
    localStorage.clear()
    router.push("/")
  }, [])
  return (
    <div>
      Accountdan chiqdingiz
    </div>
  )
}

export default Logout
