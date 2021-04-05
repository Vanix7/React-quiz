import React, {Component} from 'react';
import { connect } from 'react-redux'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { fetchQuizById, onAnswerClick, retryQuiz1} from '../../store/actions/quiz'



class Quiz extends Component {


    componentDidMount () {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount () {
        this.props.retryQuiz()
    }
    render () {
        console.log(this.props);
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz ?
                            <Loader/>
                            : this.props.isFinished
                            ? <FinishedQuiz
                                results = {this.props.results}
                                quiz = {this.props.quiz}
                                onRetry = {this.props.retryQuiz}
                            />
                            : <ActiveQuiz
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            img={this.props.quiz[this.props.activeQuestion].img}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            func = {this.props.onAnswerClick}
                            quizLength ={this.props.quiz.length}
                            answerNumber = {this.props.activeQuestion + 1}
                            state={this.props.answerState}
                            showPromt={this.props.showPromt}
                            promt={this.props.quiz[this.props.activeQuestion].promt}
                            /> 
                    }                  
                </div>             
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results, // {[id]: 'success' 'error'}
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, // {[id]: 'success' 'error'}
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
        showPromt: state.quiz.showPromt
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        onAnswerClick: answerId => dispatch(onAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz1())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)