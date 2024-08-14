/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [isNumAllowed, setNumAllowed] = useState(false);
  const [isCharAllowed, setCharAllowed] = useState(false);
  const [passwordLength, setPasswordLangth] = useState(8);
  const [btnName, setBtnName] = useState("Copy");
  const pswrdRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pswrd = "";
    let pswrdText = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumAllowed) pswrdText += "0123456789";
    if (isCharAllowed) pswrdText += "!@#$%&*_=[]{}|:'./";
    for (let i = 1; i <= passwordLength; i++) {
      let randomNum = Math.floor(Math.random() * pswrdText.length + 1);
      pswrd += pswrdText.charAt(randomNum);
    }
    setPassword(pswrd);
  }, [passwordLength, isCharAllowed, isNumAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, isNumAllowed, isCharAllowed]);

  const handleClick = () => {
    window.navigator.clipboard.writeText(password);
    setBtnName("Copied!");
    pswrdRef.current?.select();
    setTimeout(() => {
      setBtnName("Copy");
      // pswrdRef.current?.focus();
    }, 2000);
  };

  return (
    <div className="w-full px-4 py-2 max-w-md mx-auto mt-20 bg-gray-700 text-white rounded-md shadow-lg">
      <h1 className="text-white text-center my-2 text-2xl">
        Password Generator
      </h1>
      <div className="flex justify-center shadow rounded-lg overflow-hidden mb-3 mt-3">
        <input
          type="text"
          className="outline-none px-3 py-1 rounded-l-lg w-full text-black"
          value={password}
          placeholder="Password"
          readOnly
          ref={pswrdRef}
        />
        <button
          type="button"
          className="outline-none bg-blue-600 text-white px-4 py-1 rounded-r-lg"
          onClick={handleClick}
        >
          {btnName}
        </button>
      </div>
      <div className="flex text-sm gap-x-10 justify-center">
        {/* Input for password length 👇*/}
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            id="rangeInput"
            min={8}
            max={16}
            value={passwordLength}
            className="cursor-pointer"
            onChange={(event) => setPasswordLangth(event.target.value)}
          />
          <label htmlFor="rangeInput">Range {passwordLength}</label>
        </div>
        {/* Checkbox for Numbers 👇*/}
        <div className="flex gap-x-2 align-middle">
          <input
            type="checkbox"
            id="numAllowed"
            defaultChecked={isNumAllowed}
            onChange={() => setNumAllowed((prevState) => !prevState)}
          />
          <label htmlFor="numAllowed" className="cursor-pointer">
            Numbers
          </label>
        </div>
        {/* Checkbox for Characters 👇*/}
        <div className="flex gap-x-2 align-middle">
          <input
            type="checkbox"
            id="charAllowed"
            defaultChecked={isCharAllowed}
            onChange={() => setCharAllowed((prevState) => !prevState)}
          />
          <label htmlFor="charAllowed" className="cursor-pointer">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
