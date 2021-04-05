import axios from '../../axios/axios-quiz'
import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR, 
    FETCH_QUIZ_SUCCESS, 
    QUIZ_SET_STATE, 
    FINISH_QUIZ, 
    QUIZ_NEXT_QUESTION, 
    QUIZ_RETRY, SHOW_PROMT} from './actionTypes'



export function fetchQuizes () {
    return async dispatch => {
        dispatch (fetchQuzesStart())
        try {
            const response = await axios.get('quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key,index) => {
                quizes.push({
                    id : key,
                    name: `Тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
            
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuzesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuzesStart())

        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const quiz = response.data 
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, 
        results
    }
}
export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
        
    }
} 

export function quizNextQuestion(questionNumber) {
    return {
        type: QUIZ_NEXT_QUESTION,
        questionNumber        
    }
}

export function onAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return  
            }
        }
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (question.rightAnswerId === answerId) {

            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))
            dispatch(showPromt(false))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {

                    dispatch(finishQuiz())
                    
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                 
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
            dispatch(showPromt(true))
        }
    }
}
export function showPromt(showPromt) {
    return {
        type: SHOW_PROMT,
        showPromt
    }
}
export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz1 () {
    return {
        type: QUIZ_RETRY,
    }
}