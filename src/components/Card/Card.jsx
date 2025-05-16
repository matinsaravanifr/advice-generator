import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import img from "./icon-dice.svg";
import logo2 from "./../../assets/pattern-divider-desktop.svg";
import Spinner from "../spinner/spinner";

export default function Card() {
  const [text, settext] = useState({
    id: 0,
    advice: "text",
  });
  const [isloadind, setisloding] = useState(true);
  const fetchadvice = () => {
    setisloding(true);
    axios
      .get(`https://api.adviceslip.com/advice?rand=${Math.random()}`)
      .then((res) => {
        settext(res.data.slip);
        setisloding(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchadvice();
  }, []);
  const apihandler = () => {
    fetchadvice();
  };
  return (
    <>
      <div className=" flex flex-col items-center  w-[500px] h-[250px] bg-[#2e3a44] rounded-2xl">
        <div className="h-[200px] flex items-center justify-center">
          {isloadind ? (
            <Spinner />
          ) : (
            <div className="text-center">
              <h3 className="text-[#48ffb0]">advice #{text.id}</h3>
              <h1 className="text-[#c2e2ea]">{text.advice}</h1>
            </div>
          )}
        </div>
        
        <img src={logo2} alt="logo" />
        <button
          className="relative top-[25px] bg-[#48ffb0] p-3 rounded-[50px] cursor-pointer"
          onClick={apihandler}
        >
          <img src={img} alt="click" />
        </button>
      </div>
    </>
  );
}
