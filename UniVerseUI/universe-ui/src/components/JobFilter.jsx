import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";

const JobFilter = ({filterType, setFilter, filter, changeFilter, removeFilter, filterOptions}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setFilter(option);
    setIsOpen(false); 
  };

  return (
    <div onClick={toggleDropdown} className={filterType === filter.title ? 'filter' : 'filter-selected'}>
      {filterType}
      <IoIosArrowDown className='filter-arrow'/>
      {isOpen && 
      <ul className="dropdown-menu">
        <li 
          onClick={() => {
            handleOptionClick(filter.title); 
            removeFilter(filter.type);
          }}>
          Clear...
        </li>
        {filterOptions.map((option, index) =>
        <li 
          key={index} 
          onClick={() => {
            handleOptionClick(option); 
            changeFilter(filter.type, option);
          }}>
          {option}
        </li>
        )}
      </ul>
      }
    </div>
  )
}

export default JobFilter
