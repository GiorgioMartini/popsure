import React, {useState} from 'react';
import {Link, useHistory, Redirect} from 'react-router-dom';

function TextQuestion ({question, next, setAnswer, actionType, state, value }) {
  if (next === '/email' && state.hasChildren === false) {
    return <Redirect to='/email' />
  }
  
  const [input, setInput] = useState(state[value]
    ? state[value]
    : '')
  const inputValue = localStorage.getItem(`popsure_${value}`)
    ? localStorage.getItem(`popsure_${value}`)
    : input
  const history = useHistory();

  function handleChange(e) {
    setInput(e.target.value)
    setAnswer({
      type: actionType,
      input: e.target.value,
    })
    localStorage.setItem(`popsure_${value}`, event.target.value);
  }
  
  return (
    <div className="shadow-5 pa3 br2">
        <p className='f3 question'>{question}</p>
        <input value={inputValue} className='w-100 pa2 mb3' onChange={e => handleChange(e)} type="text"/>
        <button className={`bn bg-silver pa2 br2 white pointer mr3 ${next === '/address' ? 'dn' : ''}`} onClick={() => history.goBack()}>Back</button>
        <Link className='bg-light-purple pa2 br2 white no-underline pointer' onClick={() => setAnswer({
          type: actionType,
          input: input,
          })} to={next} >Next</Link>
      </div>
  );
}

export default TextQuestion;
