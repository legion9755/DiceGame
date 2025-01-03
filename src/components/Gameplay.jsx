import { useState } from "react"
import NumberSelector from "./NumberSelector"
import RoleDice from "./RoleDice"
import TotalScore from "./TotalScore"
import styled from "styled-components"
import { Button, OutlineButton } from "../styled/button"
import Rules from "./Rules"

const Gameplay = () => {

  const [score, setScore] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("")
  const [showRules, setShowRules] = useState(false);


  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const resetScore = ()=>{
    setScore(0);
  }

  const roleDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number")
      return
    }
    setError("")
    const randomNumber = generateRandomNumber();
    setCurrentDice((prev) => randomNumber)

    if (selectedNumber === randomNumber) {
      setScore((prev) => prev + randomNumber)
    }
    else {
      setScore((prev) => prev - 2)
    }

    setSelectedNumber(undefined)
  };



  return (
    <Maincontainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          setError={setError}
          error={error}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      <RoleDice currentDice={currentDice}
        roleDice={roleDice}
      />
      <div className="btns">
        <OutlineButton onClick={resetScore}>Reset</OutlineButton>
        <Button onClick={() => setShowRules((prev) => !prev)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
      </div>

      {showRules &&<Rules />}
    </Maincontainer>
  )
}

export default Gameplay

const Maincontainer = styled.main`
  padding-top: 60px;
  padding-left:70px;
  padding-right:100px;
  .top_section{
    display: flex;
    justify-content: space-between;
    align-items: end;
    /* width: 80%; */

  }

  .btns{
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:10px;
  }
`