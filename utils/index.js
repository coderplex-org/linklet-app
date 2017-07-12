const truncateString = (str, num) => {
  // Clear out that junk in your trunk
  if (str.length > num && num <= 3) {
    return str.slice(0, num) + '...'
  } else if (str.length > num) {
    return str.slice(0, num - 3) + '...'
  }
  return str
}

const checkStatus = res => {
  if (res.ok) {
    return res
  }
  return res.json().then(err => {
    console.log(err)
    return Promise.reject(new Error(err.message || err.code))
  })
}

export { truncateString, checkStatus }
