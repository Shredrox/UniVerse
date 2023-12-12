import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../api/jobsApi';
import JobsIcon from '../assets/icons/icon-job.svg';
import SearchIcon from '../assets/icons/icon-search-outline.svg'
import JobOffer from '../components/JobOffer';
import JobFilter from '../components/JobFilter';
import Loading from '../components/fallbacks/Loading'

const Jobs = () => {
  const {data: jobOffers, isLoading, isError, error} = useQuery({ 
    queryKey: ["jobOffers"],
    queryFn: () => getJobs(),
  });

  const [jobType, setJobType] = useState('Job Type');
  const [jobLevel, setJobLevel] = useState('Experience Level');
  const [jobLocation, setJobLocation] = useState('Location');
  const [jobSalary, setJobSalary] = useState('Salary');

  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    requirements: '',
    location: '',
  });

  const changeFilter = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  const removeFilter = (filterType) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters[filterType] = '';
    setSelectedFilters(updatedFilters);
  };

  const clearFilters = () =>{
    setSelectedFilters('');
    setJobType('Job Type');
    setJobLevel('Experience Level');
    setJobLocation('Location');
    setJobSalary('Salary');
  }

  const filteredJobOffers = jobOffers?.filter(item => {
    return Object.keys(selectedFilters).every(filterType => {
      if (selectedFilters[filterType] === '') {
        return true; 
      }
      return item[filterType] === selectedFilters[filterType];
    });
  });

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className='jobs-container'>
      <div className='job-filters-container'>
        <div className='job-filters'>
          <JobFilter 
            filterType={jobType}
            setFilter={setJobType}
            filter={{title: 'Job Type', type: 'type'}} 
            changeFilter={changeFilter} 
            removeFilter={removeFilter}
            filterOptions={
              [
                'Full Time',
                'Part Time'
              ]
            }
          />
          <JobFilter
            filterType={jobLevel}
            setFilter={setJobLevel} 
            filter={{title: 'Experience Level', type: 'requirements'}} 
            changeFilter={changeFilter}
            removeFilter={removeFilter}
            filterOptions={
              [
                'Senior',
                'Mid',
                'Junior',
                'Internship'
              ]
            }
          />
          <JobFilter 
            filterType={jobLocation}
            setFilter={setJobLocation} 
            filter={{title: 'Location', type: 'location'}} 
            changeFilter={changeFilter}
            removeFilter={removeFilter}
            filterOptions={
              [
                'Sofia',
                'Plovdiv',
                'Mars'
              ]
            }
          />
          <JobFilter 
            filterType={jobSalary}
            setFilter={setJobSalary} 
            filter={{title: 'Salary', type: 'salary'}} 
            changeFilter={changeFilter}
            removeFilter={removeFilter}
            filterOptions={
              [
                '1000',
                '2000',
                '3000'
              ]
            }
          />
          <button onClick={() => clearFilters()} className='confirm-button'>Clear Filters</button>
        </div>

        <img src={SearchIcon}/>
      </div>
      <div className="job-list-container">
        <h2><img src={JobsIcon} alt="JobsIcon" /> Job Results:</h2>
        <div className='job-list'>
          {filteredJobOffers.length > 0 ?
          filteredJobOffers?.map((job, index) => 
            <JobOffer key={index} job={job}/>
          )
          :
          <div>No items for selected filters.</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
