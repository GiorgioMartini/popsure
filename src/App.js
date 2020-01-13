import React, {useReducer, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TextQuestion from './components/textQuestion';
import BooleanQuestion from './components/booleanQuestion';
import NumericQuestion from './components/numericQuestion';
import SelectOptionQuestion from './components/selectOptionQuestion';
import SimpleSection from './components/simpleSection';
/* eslint-disable-next-line */
import Tachyons from "tachyons/css/tachyons.min.css";
import axios from 'axios'
import './App.css';

axios.defaults.headers.post['header1'] = 'Content-Type: application/json'
const url = 'https://challenge-dot-popsure-204813.appspot.com/'

function questionnaireReducer(state, action) {
  // Maybe better use useState as we only add one value to the sate at a time.
  if (action.type === 'ADD_NAME') {
    return {
      ...state,
      firstName: action.input,
    }
  } else if (action.type === 'ADD_ADDRESS') {
    return {
      ...state,
      address: action.input,
    }
  } else if (action.type === 'ADD_OCCUPATION') {
    return {
      ...state,
      occupation: action.input,
    }
  } else if (action.type === 'HAS_CHILDREN') {
    return {
      ...state,
      hasChildren: action.input,
    }
  } else if (action.type === 'ADD_NUMBER_OF_CHILDREN') {
    return {
      ...state,
      numberOfChildren: action.input,
    }
  } else if (action.type === 'ADD_EMAIL') {
    return {
      ...state,
      email: action.input,
    }
  } else {
    throw new Error('That action type is not supported')
  }
}

  const routes = [
    {
      value: 'firstName',
      path: '/',
      component: TextQuestion,
      question: `What's your first name?`,
      next: '/address', 
      actionType: 'ADD_NAME',
    },
    {
      value: 'address',
      path: '/address',
      component: TextQuestion,
      question: `What's your address?`,     
      next: '/occupation',
      actionType: 'ADD_ADDRESS',
    },
    {
      value: 'occupation',
      path: '/occupation',
      component: SelectOptionQuestion,
      question: `What's your occupation?`,     
      next: '/children',
      actionType: 'ADD_OCCUPATION',
      options: ['EMPLOYED', 'SELF_EMPLOYED', 'STUDENT']

    },
    {
      value: 'hasChildren',
      path: '/children',
      component: BooleanQuestion,
      question: 'Do you have children',     
      next: '/number-of-children',
      actionType: 'HAS_CHILDREN',
    },
    {
      value: 'numberOfChildren',
      path: '/number-of-children',
      component: NumericQuestion,
      question: 'How many children do you have?',     
      next: '/email',
      actionType: 'ADD_NUMBER_OF_CHILDREN',
    },
    {
      value: 'email',
      path: '/email',
      component: TextQuestion,
      question: `What's your email?`,     
      next: '/complete',
      actionType: 'ADD_EMAIL',
    },
  ]

  function App() {
    // TODO Make a localstorage helper to keep it DRY.
    const [state, dispatch] = useReducer(questionnaireReducer, {
      firstName: localStorage.getItem('popsure_firstName') ? localStorage.getItem('popsure_firstName') : null,
      address: localStorage.getItem('popsure_address') ? localStorage.getItem('popsure_address') : null,
      numberOfChildren: localStorage.getItem('popsure_numberOfChildren') ? parseInt(localStorage.getItem('popsure_numberOfChildren'), 10) : null,
      occupation: localStorage.getItem('popsure_occupation') ? localStorage.getItem('popsure_occupation') : null,
      email: localStorage.getItem('popsure_email') ? localStorage.getItem('popsure_email') : null,
      hasChildren: localStorage.getItem('popsure_hasChildren') ? localStorage.getItem('popsure_hasChildren') : null,
  })

  const [suggestions, setSuggestion] = useState(null)

  function getSuggestion(answers) {
    const data = {...answers}
    delete data.hasChildren

    fetch(url + 'user', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
      fetch(url + 'recommendation', {
        headers: {
          'Authorization': `Bearer ${data.jwt}`,
          'Content-Type': 'application/json',
        }
      }) 
      .then((res) => res.json())
      .then((sug) => {
        setSuggestion(sug)
      })
      .catch((e) => console.log('error: ', e))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function setAnswer(action) {
    if (action.type === 'ADD_EMAIL') {
      dispatch(action)
      getSuggestion(state)
    }
    dispatch(action)
  }
  
  return (
    <Router>
      <div className="mw8 center pa3">
        <h1 className='mb0'>Popsure</h1>
        <p className='silver mt2 mb4'>Insurance made easy for people who don’t speak German</p>
        {routes.map(({path, component: C, question, next, actionType, value, options}, i) => (
          <Route
            exact
            key={i}
            path={path}
            render={(props) => <C {...props} options={options} value={value} state={state} actionType={actionType} setAnswer={(action) => setAnswer(action)} next={next} question={question}/>}
          />
        ))}
        <Switch>
          <Route exact path="/complete">
            <SimpleSection suggestions={suggestions} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
