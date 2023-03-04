import React from 'react'

export default function DefaultLayout({children, className}) {
  return (
    <main className={className} 
      style={{
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        position: "relative"
      }}>
        {children}
    </main>
  )
}
