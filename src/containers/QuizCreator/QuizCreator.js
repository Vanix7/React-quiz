import React from 'react'
import classes from './QuizCreator.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select' 
import {createControl, validate, validateForm} from '../../form/formFrameWork'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'


function createOptionControl (number) {
    return createControl({
        label:  `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
    }, {required: true})
}


function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
    }
}
class QuizCreator extends React.Component {
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
        number: 3,
        options: [
            {text: 1, value: 1},
            {text: 2, value: 2},
        ],
        hideImg: true,
        img: '',
        promt: ''
    }
    submitHandler = event => {
        event.preventDefault()
    }
    addQuestionHandler = (event) => {
        event.preventDefault()
        const answers = []
        const QuestOpt = this.state.formControls
        let question
        for (let key in QuestOpt) {
            if (key === 'question') {
                question = QuestOpt[key]
            } else {
                answers.push({text: QuestOpt[key].value, id: QuestOpt[key].id})
            }
        }
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            img: this.state.img,
            promt: this.state.promt,
            rightAnswerId: this.state.rightAnswerId,
            answers: answers
        }
        this.props.createQuizQuestion(questionItem)
        console.log(this.state.promt);
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
            number: 3,
            hideImg: true,
            promt: '',
            img: '',
        })
        console.log(this.state.promt);

    }
    
    createQuizHandler =  event => {
        event.preventDefault()


        
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz()

    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }
    renderControls () {
        
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]
            
            return (
                <Auxillary key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ?
                    <div>
                        {this.state.hideImg ?
                        <Button
                            type="primary"
                            onClick={this.addImg}
                        >Добавить картинку</Button>:
                        <Input
                            value={this.state.img}
                            onChange = {event => this.changeImgUrl(event.target.value)}
                        />}
                        <hr/> 
                    </div>
                      : null}
                </Auxillary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    addAnswer = () => {
        const editForm = {...this.state.formControls}
        const editSelect = [...this.state.options]
        const number = this.state.number
        editSelect.push({text: number, value: number})
        editForm[`option${number}`] = createOptionControl(number)
        this.setState({
            formControls: editForm,
            options: editSelect,
            number: number + 1
        })
    }
    addImg = () => {
        this.setState({
            hideImg: !this.state.hideImg
        })
    }
    changeImgUrl = (value) => {
        this.setState({
            img: value
        })
    }
    changePromt = (value) => {
        this.setState({
            promt: value
        })
    }
    render () {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange = {this.selectChangeHandler}
            options={this.state.options}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        { this.renderControls() }

                        { <Button
                            type="primary"
                            onClick={this.addAnswer}
                        >Добавить ответ</Button>}
                        { select }
                        {<Input
                            value={this.state.promt}
                            onChange = {event => this.changePromt(event.target.value)}
                        />}
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled = {!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled = {this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>                    
                </div>
            </div>
            
        )
    }
}

function mapStateToProp(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProp(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(QuizCreator)