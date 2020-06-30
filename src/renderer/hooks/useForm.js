
import { useState, useEffect } from 'react'

const useForm = (initialState) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    setState(initialState)
    return () => setState(initialState)
  }, [])

  const onChange = e => {
    setState({ ...state, [e.target.id]: e.target.value })
  }

  const set = payload => {
    setState({ ...state, ...payload })
  }

  const resetState = () => {
    setState(initialState)
  }

  return { state, resetState, onChange, set }
}

export default useForm