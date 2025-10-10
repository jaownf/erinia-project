import React, { useState } from "react";
import BestiaryGrid from "./BestiaryGrid";
import BestiaryDetails from "./BestiaryDetails";
import "./Bestiary.css";

const Bestiary: React.FC = () => {
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("Todos");

  return (
    <div className="bestiary-container">
      <a className="bestiary-title" href=""><h1 className="bestiary-title">Bestiário</h1></a>
      <div className="bestiary-controls">
        <input
          type="text"
          placeholder="Pesquisar criatura..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bestiary-search"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bestiary-filter"
        >
          <option value="Todos">Todos</option>
          <option value="Alto">Perigo Alto</option>
          <option value="Médio">Perigo Médio</option>
          <option value="Baixo">Perigo Baixo</option>
        </select>
      </div>
      <div className={`bestiary-content ${selected ? 'has-selection' : ''}`}>
        <BestiaryGrid 
          search={search} 
          filter={filter} 
          onSelect={setSelected}
          hasSelection={!!selected}
        />
        {selected && <BestiaryDetails creature={selected} />}
      </div>
    </div>
  );
};

export default Bestiary;
