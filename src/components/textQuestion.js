import React, {useState} from 'react';
import {Link, useHistory, Redirect} from 'react-router-dom';

function TextQuestion ({question, next, setAnswer, actionType, hasChildren}) {
  if (next === '/email' && hasChildren === false) {
    return <Redirect to='/email' />
  }
  
  const [input, setInput] = useState('')
  let history = useHistory();
    return (
      <div className="shadow-5 pa3 br2">
        <p className='f3'>{question}</p>
        <input className='w-100 pa2 mb3' onChange={e => setInput(e.target.value)} type="text"/>
        <button className={`bn bg-silver pa2 br2 white pointer mr3 ${next === '/address' ? 'dn' : ''}`} onClick={() => history.goBack()}>Back</button>
        <Link className='bg-light-purple pa2 br2 white no-underline pointer' onClick={() => setAnswer({
          type: actionType,
          input: input,
          })} to={next} >Next</Link>
      </div>
    );
}

export default TextQuestion;
