import { TIMEOUT_MSEC } from '../config'

let timeout

export const setGlobalTimeout = (fn) => {
  clearTimeout(timeout)
  timeout = setTimeout(fn, TIMEOUT_MSEC)
}

export const setTimeoutMsec = (fn, msec) => {
  clearTimeout(timeout)
  timeout = setTimeout(fn, msec)
}