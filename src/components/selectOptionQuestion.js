import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

function SelectOptionQuestion ({question, next, setAnswer, actionType, value, state, options}) {
  const [input, setInput] = useState('')
  function handleChange({target}) {
    setInput(target.value)
    setAnswer({
      type: actionType,
      input: target.value,
    })
    localStorage.setItem(`popsure_${value}`, target.value);
  }
  const inputValue = localStorage.getItem(`popsure_${value}`) ? localStorage.getItem(`popsure_${value}`) : input
  const history = useHistory();
  
  return (
    <div className="shadow-5 pa3 br2">
      <p className='f3'>{question}</p>
      <select onChange={(e) => handleChange(e)}>
        {options.map( opt => (
          <option selected={inputValue === opt} key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <button className='bn bg-silver pa2 br2 white pointer mr3' onClick={() => history.goBack()}>Back</button>
      <Link className='bg-light-purple pa2 br2 white no-underline pointer' onClick={() => setAnswer({
        type: actionType,
        input: inputValue,
        })} to={next} >Next</Link>
    </div>
  );
}

export default SelectOptionQuestion;
