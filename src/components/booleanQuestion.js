import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

function BooleanQuestion ({question, next, setAnswer, actionType, value, state}) {
  const [input, setInput] = useState(state[value]
    ? state[value]
    : '')

  function handleChange({target}) {
    setInput(target.value)
    setAnswer({
      type: actionType,
      input: target.value === 'yes' ? true : false,
    })
    localStorage.setItem(`popsure_${value}`, target.value);
  }

  const inputValue = localStorage.getItem(`popsure_${value}`) ? localStorage.getItem(`popsure_${value}`) : input
  let history = useHistory();
 
  return (
    <div className="shadow-5 pa3 br2">
      <p className='f3'>{question}</p>
      <input checked={inputValue === 'yes'} type="radio" onChange={(e) => handleChange(e)} value="yes" /> Yes<br/>
      <input checked={inputValue === 'no'} className='mb4' onChange={(e) => handleChange(e)} type="radio" value="no" /> No<br/>
      <button className='bn bg-silver pa2 br2 white pointer mr3' onClick={() => history.goBack()}>Back</button>
      <Link className='bg-light-purple pa2 br2 white no-underline pointer' onClick={() => setAnswer({
        type: actionType,
        input: input === 'yes' ? true : false,
        })} to={next} >Next</Link>
    </div>
  );
}

export default BooleanQuestion;
