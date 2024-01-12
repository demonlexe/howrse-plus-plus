/* eslint-disable no-console */
import { Storage } from "@plasmohq/storage"

import { type MiscData, type Preset } from "~settingsObtainer"

const storage = new Storage()
const localStorage = new Storage({
  area: "local"
})

type Combined = Preset & MiscData

export function getData<Key extends keyof Combined, Value = Combined[Key]>(
  key: Key,
  mode?: string
) {
  if (!key && key === null) {
    return null
  }

  const getDataPromise = new Promise(
    (resolve: (value: Value) => void, reject) => {
      try {
        if (mode && mode === "local") {
          localStorage.get("" + key).then((result) => {
            // console.log("Fetching data: returning ",result[key]);
            const res = result
            // console.log("Response is ", res)
            resolve(res as Value)
          })
        } else {
          storage.get("" + key).then((result) => {
            // console.log("Fetching data: returning ",result[key]);
            const res = result
            // console.log("Response is ", res)
            resolve(res as Value)
          })
        }
      } catch (err) {
        console.log("Error getting data: " + err)
        reject(false)
      }
    }
  )

  return getDataPromise
}
export function setData<Key extends keyof Combined, Value = Combined[Key]>(
  key: Key,
  value: Value,
  mode?: string
) {
  if ((!key && key === null) || (!value && value === null)) {
    return new Promise((resolve, reject) => {
      try {
        resolve(false)
      } catch {
        reject(false)
      }
    })
  }

  const setDataPromise = new Promise((resolve, reject) => {
    try {
      if (mode && mode === "local") {
        localStorage.set("" + key, value).then(function () {
          // console.log(key,' is set succesfully to ',value);
          resolve(true)
        })
      } else {
        storage.set("" + key, value).then(function () {
          // console.log(key,' is set succesfully to ',value);
          resolve(true)
        })
      }
    } catch (err) {
      console.log("Error setting data: " + err)
      reject(false)
    }
  })

  return setDataPromise
}
