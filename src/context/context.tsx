import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
const table:any = {
    sports: 21,
    history: 23,
    politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';
const url = '';
const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';
const AppContext = React.createContext([] as any);

const AppProvider = ({ children }:any) => {
    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [correct, setCorrect] = useState(0);
    const [error, setError] = useState(false);
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: 'sports',
        difficulty: 'easy',
    });
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchQuestions = async (url: string) => {
        setWaiting(false)
        setLoading(true)
        const res = await axios(url).catch(err => console.log(err))
        if (res) {
            const data = res.data.results;
            if (data > 0) {
                setQuestions(data);
                setLoading(false);
                setError(false);
                setWaiting(false);
            } else {
                setWaiting(true);
                setError(true);
            }
        } else {
            setWaiting(true);
        }
    };
    const nextQuestion = () => {
            setIndex((oldIndex) => {
                const index = oldIndex + 1;
                if (index > questions.length - 1) {
                    openModal();
                    return 0;
                } else {
                    return index;
                }
            })
        };
        const checkAnswer = (value: any) => {
            if (value) {
                setCorrect(oldState => oldState + 1);
            } else {
                nextQuestion();
            }
        };
        const openModal = () => {
            setIsModalOpen(true);
        };
        const closeModal = () => {
            setCorrect(0);
            setIsModalOpen(false);
            setWaiting(true);
        };
        const handleChange = (e: any) => {
            const name = e.target.name;
            const value = e.target.value;
            setQuiz({ ...quiz, [name]: value });
        };
        const handleSubmit = (e:any) => {
            e.preventDefault()
            const { amount, category, difficulty } = quiz
            const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
            fetchQuestions(url)
        };
    return (
        <AppContext.Provider
        value = {{
            waiting,
            loading,
            questions,
            index,
            correct,
            error,
            isModalOpen,
            nextQuestion,
            checkAnswer,
            closeModal,
            quiz,
            handleChange,
            handleSubmit,
        }}
        >
            { children }
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider };