const EmploymentTypes = props => {
  const {employment, updatedEmploymentTypes} = props
  const {employmentTypeId, label} = employment
  const sendCategory = event => {
    updatedEmploymentTypes(event.target.value)
  }

  return (
    <li>
      <input
        id={employmentTypeId}
        type="checkbox"
        value={employmentTypeId}
        onChange={sendCategory}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentTypes
