import axios from  'axios'

export default axios.create({
    baseURL: 'https://react-quiz-7e09d-default-rtdb.firebaseio.com/'
})