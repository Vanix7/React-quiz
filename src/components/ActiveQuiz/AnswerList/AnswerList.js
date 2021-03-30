import classes from './AnswerList.module.scss';
import AnswerItem from './AnswerItem/AnswerItem'

const AnswerList = props => {
    // console.log(props.state);
    return (
    <ul className = {classes.AnswerList}>
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    key={index}
                    answer={answer}
                    func={props.func}
                    state = {props.state ? props.state[answer.id] : null}
                />
            )
        })}
    </ul>
    )
}

export default AnswerList