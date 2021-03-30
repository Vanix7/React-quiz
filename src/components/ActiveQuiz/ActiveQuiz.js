import classes from'./ActiveQuiz.module.scss'
import AnswerList from './AnswerList/AnswerList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}. </strong>
               {props.question}
            </span>
            <small>{props.answerNumber + " из " + props.quizLength}</small>
        </p>
        <AnswerList
            answers={props.answers}
            func={props.func}
            state = {props.state}
        />
    </div>
)

export default ActiveQuiz