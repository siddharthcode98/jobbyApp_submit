import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import EmploymentTypes from '../EmploymentTypes'

import SalaryRange from '../SalaryRange'

import UserProfileView from '../UserProfileView'

import JobItem from '../JobItem'

const employmentTypesList = [
  {employmentTypeId: 'FULLTIME', label: 'fullTime'},
  {employmentTypeId: 'PARTTIME', label: 'partTime'},
  {employmentTypeId: 'FREELANCE', label: 'freelance'},
  {employmentTypeId: 'INTERNSHIP', label: 'internship'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10LPA and Above'},
  {salaryRangeId: '2000000', label: '20LPA and Above'},
  {salaryRangeId: '3000000', label: '30LPA and Above'},
  {salaryRangeId: '4000000', label: '40LPA and Above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: '',
    search: '',
  }
  componentDidMount() {
    this.getJobs()
  }
  updatedEmploymentTypes = category => {
    const {employmentType} = this.state
    const isThere = employmentType.includes(category)
    if (isThere) {
      const updatedTypesList = employmentType.filter(
        eachItem => eachItem !== category,
      )
      this.setState({employmentType: updatedTypesList}, this.getJobs)
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, category],
        }),
        this.getJobs,
      )
    }
  }
  updatedSalaryRange = salary => {
    // console.log(salary);
    this.setState({salaryRange: salary}, this.getJobs)
  }
  onChangeUserInput = event => {
    this.setState({search: event.target.value})
  }
  userInputEnter = () => {
    const {search} = this.state
    this.setState({search}, this.getJobs)
  }
  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentType, salaryRange, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${search}`
    const response = await fetch(jobsUrl, options)

    // console.log(data);
    if (response.ok) {
      const data = await response.json()
      const filteredData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  LoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )
  successView = () => {
    const {jobsList} = this.state
    const emptyList = jobsList.length === 0
    return (
      <>
        {emptyList ? (
          <div>
            <img
              src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
              alt='no jobs'
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        ) : (
          <ul>
            {jobsList.map(eachJob => (
              <JobItem jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
      </>
    )
  }
  failureView = () => (
    <div>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type='button' onClick={() => this.getJobs()}>
        Retry
      </button>
    </div>
  )
  ShowViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.LoadingView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    const {search} = this.state
    return (
      <div>
        <UserProfileView />
        <div>
          <h1>Type of Employment</h1>
          <ul>
            {employmentTypesList.map(eachEmployment => (
              <EmploymentTypes
                employment={eachEmployment}
                key={eachEmployment.employmentTypeId}
                updatedEmploymentTypes={this.updatedEmploymentTypes}
              />
            ))}
          </ul>
        </div>
        <div>
          <h1>Salary Range</h1>
          <ul>
            {salaryRangesList.map(eachSalary => (
              <SalaryRange
                salaryItem={eachSalary}
                key={eachSalary.salaryRangeId}
                updatedSalaryRange={this.updatedSalaryRange}
              />
            ))}
          </ul>
        </div>
        <div>
          <div>
            <input
              type='search'
              placeholder='search'
              onChange={this.onChangeUserInput}
              value={search}
            />
            <button
              type='button'
              data-testid='searchButton'
              onClick={this.userInputEnter}
            >
              <BsSearch className='search-icon' />
            </button>
          </div>
          <div>{this.ShowViews()}</div>
        </div>
      </div>
    )
  }
}

export default JobSection
