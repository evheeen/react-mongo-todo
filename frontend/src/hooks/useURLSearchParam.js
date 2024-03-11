import { useState, useEffect }  from 'react'

function useURLSerachParam(parameter, initialValue = '') {
  const query = new URLSearchParams(window.location.search)
  const [paramValue, setParamValue] = useState(query.get(parameter) || initialValue)

  useEffect(() => {
    const newURL = paramValue ? `${window.location.pathname}?${parameter}=${paramValue}` : window.location.pathname

    window.history.pushState({}, '', newURL)
  }, [paramValue, parameter])

  return [paramValue, setParamValue]
}

export default useURLSerachParam
