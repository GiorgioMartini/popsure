import React from 'react';
import {Link, useHistory} from 'react-router-dom';

function SimpleSection ({suggestions}) {
  let history = useHistory();

  // Refactor into helper function, so it's less coupled to this component.
  function getCorrectName(name) {
    if(name === 'HEALTH_INSURANCE') {
      return 'Health Insurance'
    } else if (name === 'HOME_CONTENT') {
      return 'Home content'
    } else {
      return 'Private Liablity'
    }
  }

  return (
    <div className="shadow-5 pa3 br2">
        <p>We got your recommendation!</p>
        <p>Based on your answers this is what makes sense for you, and what you should pay.</p>
        <div className="flex flex-column">
          {suggestions && suggestions.map( (sug, i) => (
            <div key={i} className="flex-1 flex justify-between pa3">
              <p>{getCorrectName(sug.type)}</p>
              <div className='flex'>
                <p className='pr2'>€ {sug.price.amount} </p>
                <p className='pr2'>per</p>
                <p>{sug.price.periodicity}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={`bn bg-silver pa2 br2 white pointer mr3`} onClick={() => history.goBack()}>Back</button>
        <Link className='bg-light-purple pa2 br2 white no-underline pointer' to='www.popsure.com' >Go to Popsure.com</Link>
      </div>
  );
}

export default SimpleSection;