

import React, { useState } from "react";
import { usePokemonStore } from "../../store/pokemonStore";

export default function ChatOverlay() {
  const { data, setData } = usePokemonStore();
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);

  const handleCommand = () => {
    if (!command.trim()) return;

    let updatedData = [...data];
    let output = "";


    if (/set hp to (\d+) for all pokemon of type '(.+)'/i.test(command)) {
      const [, hpValue, type] = command.match(
        /set hp to (\d+) for all pokemon of type '(.+)'/i
      );
      updatedData = updatedData.map((p) =>
        p.types.toLowerCase().includes(type.toLowerCase())
          ? { ...p, hp: Number(hpValue) }
          : p
      );
      output = `✅ Set HP to ${hpValue} for all Pokémon of type '${type}'.`;
    }

    
    else if (/delete rows where generation is (\d+)/i.test(command)) {
      const [, gen] = command.match(/delete rows where generation is (\d+)/i);
      updatedData = updatedData.filter((p) => String(p.generation) !== gen);
      output = `🗑️ Deleted all rows where generation is ${gen}.`;
    }

   
    else if (
      /update ability to '(.+)' where name is '(.+)'/i.test(command)
    ) {
      const [, ability, name] = command.match(
        /update ability to '(.+)' where name is '(.+)'/i
      );
      updatedData = updatedData.map((p) =>
        p.name.toLowerCase() === name.toLowerCase()
          ? { ...p, ability }
          : p
      );
      output = `✨ Updated ability to '${ability}' where name is '${name}'.`;
    }

    else {
      output = "⚠️ Command not recognized!";
    }

   
    setData(updatedData);

    
    setHistory((prev) => [...prev, { command, output }]);

    // Reset input
    setCommand("");
  };

  return (
    <div className="mb-6 p-4 bg-indigo-50 border rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">🧑‍💻 AI Editing Assistant</h2>

     
      <div className="flex gap-2">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Type a command, e.g. set hp to 100 for all pokemon of type 'grass'"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleCommand}
          className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Run
        </button>
      </div>

   
      <div className="mt-3 space-y-1 text-sm">
        {history.map((h, i) => (
          <div key={i} className="p-2 bg-white rounded border">
            <div><strong>Command:</strong> {h.command}</div>
            <div className="text-green-700">{h.output}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
