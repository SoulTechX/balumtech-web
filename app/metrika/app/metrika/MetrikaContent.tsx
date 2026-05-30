'use client'
import { useEffect } from 'react'

export default function MetrikaContent() {
  useEffect(() => {
    const noContext = (e: MouseEvent) => e.preventDefault()
    const noKeys = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && ['c','a','s','p','u','v'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i','j','c','k'].includes(e.key.toLowerCase())) ||
        (e.metaKey && ['c','a','s'].includes(e.key.toLowerCase()))
      ) e.preventDefault()
    }
    const noDevtools = () => {
      if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
      ) {
        document.body.innerHTML = '<div style="display:flex;height:100vh;align-items:center;justify-content:center;background:#060709;color:#E24B4A;font-family:monospace;font-size:14px">// acceso denegado</div>'
      }
    }

    document.addEventListener('contextmenu', noContext)
    document.addEventListener('keydown', noKeys)
    window.addEventListener('resize', noDevtools)

    return () => {
      document.removeEventListener('contextmenu', noContext)
      document.removeEventListener('keydown', noKeys)
      window.removeEventListener('resize', noDevtools)
    }
  }, [])

  return (
    <div
      className="select-none"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* ACÁ VA EL CONTENIDO DE LA PROPUESTA */}
    </div>
  )
}
