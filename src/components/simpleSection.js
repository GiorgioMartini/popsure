import React from 'react';
import {Link, useHistory} from 'react-router-dom';

function SimpleSection ({suggestions}) {
  let history = useHistory();
  return (
    <div className="shadow-5 pa3 br2">
        <p>Thanks!</p>
        {/* {JSON.stringify(suggestions, null, 2)} */}
        {suggestions && suggestions.map( sug => (
          <div className="ba">
            <p>{sug.type}</p>
            <p>{sug.price.amount}</p>
            <p>{sug.price.periodicity}</p>
          </div>
        ))}
        <button className={`bn bg-silver pa2 br2 white pointer mr3`} onClick={() => history.goBack()}>Back</button>
        <Link className='bg-light-purple pa2 br2 white no-underline pointer' to='www.popsure.com' >Go to Popsure.com</Link>
      </div>
  );
}

export default SimpleSection;