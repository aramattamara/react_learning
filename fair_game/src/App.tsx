import React, {useEffect, useState} from 'react';
import './App.css';

const getRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

enum Result {
    Correct,
    Wrong
}

function App() {
    const[color, setColor] = useState("");
    const[answers, setAnswers] = useState<string[]>([]);
    const[result, setResult] = useState<Result | undefined>(
        undefined
    )

    const generateColors = () => {
        getRandomColor();
        const actualColor = getRandomColor()
        setColor(actualColor);
        setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(
            () => 0.5 - Math.random()
        ))

    }

    useEffect(() => {
        generateColors();
    }, []);

    const handleAnswerClicked = (answer:string) => {
        if (answer === color) {
            setResult(Result.Correct)
            generateColors();
        } else {
            setResult(Result.Wrong)
        }

    }

  return (
    <div className="App">
        <div>
            <div className="guess-me" style={{ background: color }}></div>

            {answers.map(answer => (
                <button
                    onClick={()=>handleAnswerClicked(answer)}
                    key={answer}>{answer}
                </button>
            ))}
            {result == Result.Correct && <div className="correct">Correct!</div>}
            {result == Result.Wrong && <div className="wrong">Wrong answer!</div>}
        </div>
    </div>
  );
}

export default App;
