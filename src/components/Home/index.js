import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="Home-page-container">
      <h1>Find the Job that fits your life</h1>
      <p>Millions of people are searching for jobs</p>
      <Link to="/jobs">
        <button type="button">Find Jobs</button>
      </Link>
    </div>
  </>
)
export default Home
