import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

function NumericQuestion ({question, next, setAnswer, actionType, value}) {
  const [input, setInput] = useState('')
  function handleChange({target}) {
    setInput(parseInt(target.value))
    setAnswer({
      type: actionType,
      input: parseInt(target.value),
    })
    localStorage.setItem(`popsure_${value}`, parseInt(event.target.value));
  }

  const inputValue = localStorage.getItem(`popsure_${value}`) ? localStorage.getItem(`popsure_${value}`) : input

  let history = useHistory();
    return (
      <div className="shadow-5 pa3 br2">
        <p className='f3'>{question}</p>
        <input type='number' onChange={e => handleChange(e)}/>
        <button className='bn bg-silver pa2 br2 white pointer mr3' onClick={() => history.goBack()}>Back</button>
        <Link className='bg-light-purple pa2 br2 white no-underline pointer' onClick={() => setAnswer({
          type: actionType,
          input: input,
          })} to={next} >Next</Link>
      </div>
    );
}

export default NumericQuestion;
