import React from "react";
import "./App.css";
import DatePick from "./datepicker";
import DatePickend from "./datepickerend";


const App = () => {
  const [tehtavat, setTehtavat] = React.useState([]);
  const [tehtava, setTehtava] = React.useState("");
  const [tehtavaEditing, setTehtavaEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("tehtavat");
    const loadedTehtavat = JSON.parse(json);
    if (loadedTehtavat) {
      setTehtavat(loadedTehtavat);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(tehtavat);
    localStorage.setItem("tehtavat", json);
  }, [tehtavat]);


  //Käsittelee lähetetyn tehtävän
  function handleSubmit(e) {
    e.preventDefault();

    const newTehtava = {
      id: new Date().getTime(),
      text: tehtava,
      completed: false,
    };
    setTehtavat([...tehtavat].concat(newTehtava));
    setTehtava("");
  }


  //Poistaa tehtävän
  function deleteTehtava(id) {
    let updatedTehtavat = [...tehtavat].filter((tehtava) => tehtava.id !== id);
    setTehtavat(updatedTehtavat);
  }


  //Vaihto funktio
  function toggleComplete(id) {
    let updatedTehtavat = [...tehtavat].map((tehtava) => {
      if (tehtava.id === id) {
        tehtava.completed = !tehtava.completed;
      }
      return tehtava;
    });
    setTehtavat(updatedTehtavat);
  }


  //Lähetä muokakaa funktio
  function submitEdits(id) {
    const updatedTehtavat = [...tehtavat].map((tehtava) => {
      if (tehtava.id === id) {
        tehtava.text = editingText;
      }
      return tehtava;
    });
    setTehtavat(updatedTehtavat);
    setTehtavaEditing(null);
  }

  return (
    <div id="tehtava-list">
      <h1>Työtehtävät</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTehtava(e.target.value)}
          value={tehtava}
        />
        <button type="submit">Lisää tehtävä</button>
      </form>
      {tehtavat.map((tehtava) => (
        <div key={tehtava.id} className="tehtava">
          <div className="tehtava-text">
            <input
              type="checkbox"
              id="completed"
              checked={tehtava.completed}
              onChange={() => toggleComplete(tehtava.id)}
            />
            {tehtava.id === tehtavaEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (

              /* Tulostaa tehtävänimen ja päivämäärät */
              <div> 
              <p>Työtehtävä: <b>{tehtava.text}</b></p>
              <DatePick></DatePick>
              <DatePickend></DatePickend>
              </div>
            )}
          </div>

          <div className="tehtava-actions">
            {tehtava.id === tehtavaEditing ? (
              <button onClick={() => submitEdits(tehtava.id)}>Lähetä muokkaus</button>
            ) : (
              <button onClick={() => setTehtavaEditing(tehtava.id)}>Muokkaa</button>
            )}
            <button onClick={() => deleteTehtava(tehtava.id)}>Poista</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;