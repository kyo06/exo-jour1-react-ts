import { useState } from 'react'

export function Button() {
  const [clicked, setClicked] = useState(false)

  return (
    <div>
      <button onClick={() => setClicked(true)}>
        Click me
      </button>

      {clicked && <p>Clicked</p>}
    </div>
  )
}