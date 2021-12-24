import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const array = new Uint8Array(anecdotes.length);

const Buttons = ({ handleClick, handleVote }) => {
  return (
    <>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </>
  );
};

const Anecdote = ({ anecdotes, selected, votes, handleClick, handleVote }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <Buttons handleClick={handleClick} handleVote={handleVote} />
      <p>has {votes[selected]} votes</p>
    </>
  );
};

const WinnerComment = ({ anecdotes, winnerComment, mostVoted }) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[winnerComment]}</p>
      <p>has {mostVoted} votes</p>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(array);

  const handleClick = () => {
    let randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
  };

  const handleVote = () => {
    let copiedVotes = [...votes];
    copiedVotes[selected] += 1;
    setVotes(copiedVotes);
  };

  let mostVoted = Math.max(...votes);
  let winnerComment = votes.indexOf(mostVoted);

  return (
    <div>
      <Anecdote
        anecdotes={anecdotes}
        selected={selected}
        votes={votes}
        handleClick={handleClick}
        handleVote={handleVote}
      />

      {!(votes.reduce((acc, cur) => acc + cur) === 0) && (
        <WinnerComment
          anecdotes={anecdotes}
          winnerComment={winnerComment}
          mostVoted={mostVoted}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
