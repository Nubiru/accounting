import { useState } from 'react'
import Main from './components/Main.js'

function App() {
  const [user, setUser] = useState('')
  const [role, setRole] = useState('')

  return (
    <>
      <Main user={user} role={role} setUser={setUser} setRole={setRole} />
    </>
  )
}

export default App
