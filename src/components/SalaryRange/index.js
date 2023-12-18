const SalaryRange = props => {
  const {salaryItem, updatedSalaryRange} = props
  const {salaryRangeId, label} = salaryItem
  const sendSalary = event => {
    updatedSalaryRange(event.target.value)
  }
  return (
    <li>
      <label htmlFor={salaryRangeId}>{label}</label>
      <input
        id={salaryRangeId}
        type="radio"
        value={salaryRangeId}
        name="user_salary"
        onChange={sendSalary}
      />
    </li>
  )
}

export default SalaryRange
