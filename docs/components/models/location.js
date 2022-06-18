function location (document) {
  const url = document.location
  const paramsIterator = new URLSearchParams(url.search).entries()
  const paramsArray = [...paramsIterator]
  const params = paramsArray.reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})

  return {
    url: url + '',
    params
  }
}

export default location
