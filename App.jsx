function App() {
    function nanoid() {
        const key = (Math.random() + Math.random()).toString().split(".")[1]
        return key
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : generateNewDie()
        }))
        !gameStart ? setSteps(0) : setSteps(step => step + 1)
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i <
            10; i++) { newDice.push(generateNewDie()) }
        return newDice
    }

    function holdDice(id) {
        setStart(true)
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [gameStart, setStart] = React.useState(false)
    const [steps, setSteps] = React.useState(0)
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            if (tenzies) { setDice(allNewDice()) }
            setStart(false)
        }
        else {
            setTenzies(false)
        }
    }, [dice])

    function Die(props) {
        const styles = { backgroundColor: props.isHeld ? "#59E391" : "white" }
        return (
            <div
                className="die-face"
                style={styles}
                onClick={props.holdDice} >
                <h2 className="die-num" > {props.value} </h2>
            </div >
        )
    }
    const diceElements = dice.map(die => (
        <Die key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />))
    return (
        <main>
            <div className="top-right-corner" > </div>
            <div className="steps" >
                Steps: {steps}
            </div>
            <h1 className="title" > Tenzies </h1>
            <p className="instructions" >
                Roll until all dice are the same.Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dice-container" > {diceElements} </div>
            {tenzies && <p className="won" > You won! </p>}
            <button className="roll-dice" onClick={rollDice} > {tenzies ? "New Game" : "Roll"} </button>

            <div className="bottom-left-corner" > </div> </main >
    )
}
ReactDOM.render(<App />, document.getElementById('mydiv'))