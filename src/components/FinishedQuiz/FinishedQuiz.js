import classes from './FinishedQuiz.module.scss';
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        } 

        return total
    }, 0)
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {/* <li>
                    <strong>1. </strong>
                    How are you 
                    <i className={'fa fa-times ' + classes.error}/>
                </li>
                <li>
                    <strong>2. </strong>
                    How are you 
                    <i className={'fa fa-check ' + classes.success}/>
                </li> */}
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li 
                            key={index}
                        >
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>
            <Button onClick = {props.onRetry} type='primary'>Повторить</Button>
            <Link to="/">
                <Button type='success'>Список тестов</Button>
            </Link>
        </div>

    )
}

export default FinishedQuiz