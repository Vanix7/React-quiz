import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.scss'
import axios from  '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

export default class QuizList extends React.Component {
    state = {
        quizes: [],
        loader: true
    }
    
    renderQuizes() {
        return this.state.quizes.map((quiz, index)=> {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink
                        to={'/quiz/' + quiz.id}
                    >
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key,index) => {
                quizes.push({
                    id : key,
                    name: `Тест №${index + 1}`
                })
            })

            this.setState({
                quizes,
                loader: false
            })
        } catch(e) {
            console.log(e);
        }
    }
    render () {
        return (
            <div
                className={classes.QuizList}
            >
                <div>
                    <h1>Список тестов</h1>
                    {this.state.loader ? <Loader></Loader>
                    : <ul>
                        {this.renderQuizes()}
                    </ul> }
                </div>
            </div>
        )
    }
}
