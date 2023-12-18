const SimilarJobs=(props)=>{
  const {eachJob}=props
    return(
      <li>
        <img
          src={eachJob.companyLogoUrl}
          alt="similar job company logo"
        />
        <p>{eachJob.rating}</p>
        <p>{eachJob.location}</p>
        <h1>Description</h1>
        <p>{eachJob.jobDescription}</p>
        <h1>{eachJob.title}</h1>
        <p>{eachJob.employmentType}</p>
      </li>
    )
}

export default SimilarJobs;