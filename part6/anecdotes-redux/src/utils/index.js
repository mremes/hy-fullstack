import { TIMEOUT_MSEC } from '../config'

let timeout

export const setGlobalTimeout = (fn) => {
  clearTimeout(timeout)
  timeout = setTimeout(fn, TIMEOUT_MSEC)
}