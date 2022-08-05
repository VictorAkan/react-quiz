import './App.css';
import { SetupForm } from './components';
import { Modal } from './components';
import { Loading } from './components';
import { useGlobalContext } from './context/context';

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  const { question,incorrect_answers,correct_answer } = questions[index]
  let answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p>
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html:question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button 
                key={index}
                onClick={() => checkAnswer(correct_answer === answer)}
                dangerouslySetInnerHTML = {{ __html:answer }}
                />  
              )
            })}
          </div>
        </article>
        <button onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
