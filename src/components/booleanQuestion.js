import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

function BooleanQuestion ({question, next, setAnswer, actionType}) {
  const [input, setInput] = useState('')

  function handleChange({target}) {
    setInput(target.value)
    
  }

  let history = useHistory();
    return (
      <div className="shadow-5 pa3 br2">
        <p className='f3'>{question}</p>
        <input checked={input === 'yes'} type="radio" onChange={(e) => handleChange(e)} name="has-children" value="yes" /> Yes<br/>
        <input checked={input === 'no'} className='mb4' onChange={(e) => handleChange(e)} type="radio" name="has-children" value="no" /> No<br/>
        <button className='bn bg-silver pa2 br2 white pointer mr3' onClick={() => history.goBack()}>Back</button>
        <Link className='bg-light-purple pa2 br2 white no-underline pointer' onClick={() => setAnswer({
          type: actionType,
          input: input === 'yes' ? true : false,
          })} to={next} >Next</Link>
      </div>
    );
}

export default BooleanQuestion;
