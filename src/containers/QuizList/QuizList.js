import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import classes from './QuizList.module.scss'
import {fetchQuizes} from '../../store/actions/quiz'
// import rootReducer from '../../store/reducers/rootReducer'


class QuizList extends React.Component {
    
    
    renderQuizes() {
        return this.props.quizes.map((quiz, index)=> {
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

    componentDidMount() {
        this.props.fetchQuizes()
        // try {
        //     const response = await axios.get('quizes.json')
        //     const quizes = []
        //     Object.keys(response.data).forEach((key,index) => {
        //         quizes.push({
        //             id : key,
        //             name: `Тест №${index + 1}`
        //         })
        //     })

        //     this.setState({
        //         quizes,
        //         loader: false
        //     })
        // } catch(e) {
        //     console.log(e);
        // }
    }
    render () {
        return (
            <div
                className={classes.QuizList}
            >
                <div>
                    <h1>Список тестов</h1>
                    {this.props.loading && this.props.quizes.length !== 0  ? <Loader></Loader>
                    : <ul>
                        {this.renderQuizes()}
                    </ul> }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)