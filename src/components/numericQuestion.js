import React, {useState} from 'react';
import {Link, useHistory, Redirect} from 'react-router-dom';

function NumericQuestion ({question, next, setAnswer, actionType, value, state}) {
  debugger
  if (next === '/email' && state.hasChildren === false) {
    return <Redirect to='/email' />
  }

  const [input, setInput] = useState('')
  function handleChange({target}) {
    setInput(parseInt(target.value, 10))
    setAnswer({
      type: actionType,
      input: parseInt(target.value, 10),
    })
    localStorage.setItem(`popsure_${value}`, parseInt(target.value, 10));
  }

  const inputValue = localStorage.getItem(`popsure_${value}`) ? localStorage.getItem(`popsure_${value}`) : input

  let history = useHistory();
    return (
      <div className="shadow-5 pa3 br2">
        <p className='f3'>{question}</p>
        <input value={inputValue} type='number' onChange={e => handleChange(e)}/>
        <button className='bn bg-silver pa2 br2 white pointer mr3' onClick={() => history.goBack()}>Back</button>
        <Link className='bg-light-purple pa2 br2 white no-underline pointer' onClick={() => setAnswer({
          type: actionType,
          input: input,
          })} to={next} >Next</Link>
      </div>
    );
}

export default NumericQuestion;
