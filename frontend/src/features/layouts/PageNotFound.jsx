import { useLocation } from 'react-router-dom'

import ArrowLeftIcon from '../../assets/icons/arrow-left'

function PageNotFound () {
  const location = useLocation()
  const previousPage = location.state?.from?.pathname || '/'

  return (
    <div className="container-tight py-4 my-8">
      <div className="empty">
        <div className="empty-header">404</div>
        <p className="empty-title">Oops… You just found an error page</p>
        <p className="empty-subtitle text-secondary">
          We are sorry but the page you are looking for was not found
        </p>
        <div className="empty-action">
          <a href={previousPage} className="btn btn-primary">
            <ArrowLeftIcon />
            Take me home
          </a>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
