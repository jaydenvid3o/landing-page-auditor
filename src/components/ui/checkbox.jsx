import React from "react"

export function Checkbox({ className = "", ...props }) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border border-slate-300 text-blue-600 focus:ring-blue-400 ${className}`}
      {...props}
    />
  )
}

