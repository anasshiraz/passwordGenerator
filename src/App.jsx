import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 md:py-12">
      <div className="w-full max-w-md mx-auto rounded-xl border border-slate-700 bg-slate-800/95 px-4 py-4 text-orange-400 shadow-lg sm:px-6 sm:py-5">
        <h1 className="mb-4 text-center text-xl font-semibold text-white sm:text-2xl">
          Password Generator
        </h1>

        <div className="mb-4 flex flex-col gap-2 rounded-lg sm:flex-row sm:overflow-hidden">
          <input
            type="text"
            value={password}
            className="w-full rounded-lg bg-white px-3 py-2 text-sm text-black outline-none sm:rounded-r-none sm:text-base"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:rounded-l-none sm:text-base"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:text-base">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={4}
              max={100}
              value={length}
              className="w-full cursor-pointer sm:w-56"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label htmlFor="numberInput" className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              Numbers
            </label>

            <label htmlFor="characterInput" className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
