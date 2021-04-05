import classes from'./ActiveQuiz.module.scss'
import AnswerList from './AnswerList/AnswerList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}. </strong>
                {props.question}
                { 
                props.img ? 
                <img src={props.img} width="500" alt="Не удалось загрузить изображение(((("></img>
                : null}
            </span>
            <small>{props.answerNumber + " из " + props.quizLength}</small>
        </p>
        <AnswerList
            answers={props.answers}
            func={props.func}
            state = {props.state}
        />
        {
            props.showPromt ?
            <span>
                {props.promt}   
            </span>
            : null
        }
        
    </div>
)

export default ActiveQuiz