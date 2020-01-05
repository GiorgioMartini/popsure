import React, {useReducer} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TextQuestion from './components/textQuestion';
import BooleanQuestion from './components/booleanQuestion';
/* eslint-disable-next-line */
import Tachyons from "tachyons/css/tachyons.min.css";
import './App.css';

function questionnaireReducer(state, action) {
  if (action.type === 'ADD_NAME') {
    return {
      ...state,
      name: action.input,
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
  } else if (action.type === 'NUMBER_OF_CHILDREN') {
    return {
      ...state,
      numOfChildren: action.input,
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
      path: '/',
      component: TextQuestion,
      question: `What's your first name?`,
      next: '/address', 
      actionType: 'ADD_NAME',
    },
    {
      path: '/address',
      component: TextQuestion,
      question: `What's your address?`,     
      next: '/occupation',
      actionType: 'ADD_ADDRESS',
    },
    {
      path: '/occupation',
      component: TextQuestion,
      question: `What's your occupation?`,     
      next: '/children',
      actionType: 'ADD_OCCUPATION',

    },
    {
      path: '/children',
      component: BooleanQuestion,
      question: 'Do you have children',     
      next: '/number-of-children',
      actionType: 'HAS_CHILDREN',
    },
    {
      path: '/number-of-children',
      component: TextQuestion,
      question: 'How many children do you have?',     
      next: '/email',
      actionType: 'NUMBER_OF_CHILDREN',
    },
    {
      path: '/email',
      component: TextQuestion,
      question: `What's your email?`,     
      next: '/complete',
      actionType: 'GO_TO_HOMEPAGE',
    },
  ]

function App() {
  const [state, dispatch] = useReducer(questionnaireReducer, {
    name: null,
    address: null,
    occupation: null,
    hasChildren: null,
    numOfChildren: null,
    email: null,
  })

  // function setAnswer(action) {
  //   dispatch(action)
  // }

  return (
    <Router>
      <div className="mw8 center pa3">
        <h1 className='mb0'>Popsure</h1>
        <p className='silver mt2 mb4'>Insurance made easy for people who don’t speak German</p>
        {routes.map(({path, component: C, question, next, actionType}, i) => (
          <Route
            exact
            key={i}
            path={path}
            render={(props) => <C {...props} hasChildren={state.hasChildren} actionType={actionType} setAnswer={(action) => dispatch(action)} next={next} question={question}/>}
          />
        ))}
        <p className='di'>Name:</p><span>{state.name}</span><br/>
        <p className='di'>Adress:</p><span>{state.address}</span><br/>
        <p className='di'>Ocupation:</p><span>{state.occupation}</span><br/>
        <p className='di'>Has Children:</p><span>{state.hasChildren}</span><br/>
        <p className='di'>Num of children:</p><span>{state.numOfChildren}</span><br/>
        <p className='di'>Email:</p><span>{state.email}</span><br/>
      </div>
    </Router>
  )
}

export default App;
