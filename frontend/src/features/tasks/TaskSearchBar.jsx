import { useRef } from 'react'
import PropTypes from 'prop-types'

function TaskSearchBar({ value, onChange, onImmediateChange }) {
  const searchDebounceRef = useRef(null)

  const handleSearchChange = (e) => {
    const searchValue = e.target.value

    onImmediateChange(searchValue)

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }

    searchDebounceRef.current = setTimeout(() => {
      onChange(searchValue)
    }, 500)
  }

  return (
    <div>
      <input type='text' placeholder='Search...' value={value} onChange={handleSearchChange} className="form-control" />
    </div>
  )
}

TaskSearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired
}

export default TaskSearchBar
