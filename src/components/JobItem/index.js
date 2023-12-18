import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <img src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <p>{location}</p>
        <p>{packagePerAnnum}</p>
        <p>{rating}</p>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <p>{employmentType}</p>
      </Link>
    </li>
  )
}

export default JobItem

//  id: eachJob.id,
//         companyLogoUrl: eachJob.company_logo_url,
//         employmentType: eachJob.employment_type,
//         jobDescription: eachJob.job_description,
//         location: eachJob.location,
//         packagePerAnnum: eachJob.package_per_annum,
//         rating: eachJob.rating,
//         title: eachJob.title,
