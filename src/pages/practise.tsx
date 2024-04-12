import { useState, useEffect, useRef } from "react";
import rock from "../svg/buttonRock.svg";
import scissor from "../svg/buttonScissors.svg";
import paper from "../svg/buttonPaper.svg";
import you from "../svg/YOU.svg";
import ai from "../svg/AI.svg";
import Image from "next/image";

type Choice = "rock" | "paper" | "scissors";

const choices: Choice[] = ["rock", "paper", "scissors"];

export default function Home() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [cpuChoice, setCpuChoice] = useState<Choice | null>(null);
  const [roundEnded, setRoundEnded] = useState(false);
  const [usercore, setUserScore] = useState(0);
  const [cpuscore, setCpuscore] = useState(0);
  const [started, setStarted] = useState(false);
  const [title, setTitle] = useState("");
  const intervalRef = useRef<any>(null);
  const [timer, setTimer] = useState(10);

  const handleUserChoice = (choice: Choice) => {
    setUserChoice(choice);
    const cpuRandoms = Math.floor(Math.random() * 3);
    setCpuChoice(choices[cpuRandoms]);
    setTimer(10);
    if (choice === "rock" && choices[cpuRandoms] === "scissors") {
      setUserScore(usercore + 1);
    } else if (choice === "rock" && choices[cpuRandoms] === "paper") {
      setCpuscore(cpuscore + 1);
    }
    if (choice === "paper" && choices[cpuRandoms] === "rock") {
      setUserScore(usercore + 1);
    } else if (choice === "paper" && choices[cpuRandoms] === "scissors") {
      setCpuscore(cpuscore + 1);
    }
    if (choice === "scissors" && choices[cpuRandoms] === "paper") {
      setUserScore(usercore + 1);
    } else if (choice === "scissors" && choices[cpuRandoms] === "rock") {
      setCpuscore(cpuscore + 1);
    }
    if (usercore === 5) {
      alert("userwin");
      setUserScore(0);
      setCpuscore(0);
    } else if (cpuscore === 5) {
      alert("cpuwin");
      setUserScore(0);
      setCpuscore(0);
    }
  };
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  if (started) startTimer();

  if (roundEnded) stopTimer();
  if (!intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  useEffect(() => {
    if (timer === 0) {
      const playerRandoms = Math.floor(Math.random() * 3);
      const playerRandomChoice = choices[playerRandoms];
      handleUserChoice(playerRandomChoice);
    }
  }, [timer]);
  useEffect(() => {
    if (cpuscore === 3 || usercore === 3) {
      setUserScore(0);
      setCpuscore(0);
    }
  }, []);

  console.log({ userChoice, cpuChoice, usercore, cpuscore });
  return (
    // <div className="h-screen grid place-teams center bg-[#90caff]">
    //   <div>
    //     <h1 className="fixed top-8 right-8 text-4xl">{timer}</h1>
    //     <div className="flex flex-row w-screen ">
    //       <div className="text-center flex felx-col left-[950px] top-[275px] absolute text-white text-5xl ">
    //         <div className="text-center">
    //           <Image className="" src={you} alt="" />
    //           <div className="text-center text-white text-[160px] font-normal font-[Seymour One]">
    //             {usercore}
    //           </div>
    //         </div>
    //       </div>{" "}
    //       <div className="text-center flex felx-col left-[1250px] top-[275px] absolute text-white text-5xl">
    //         <div>
    //           <Image src={ai} alt="" />
    //           <div className="text-center text-white text-[160px] font-normal font-['Seymour One']">
    //             {cpuscore}
    //           </div>
    //         </div>
    //       </div>{" "}
    //     </div>
    //     <div className="w-[222px] h-[222px] left-[880px] top-[796px] absolute rounded-[500px] flex flex-row">
    //       <div
    //         className={`${userChoice !== "scissors" && "opacity-30"} ${
    //           userChoice === null && "opacity-100"
    //         }`}
    //         onClick={() => {
    //           handleUserChoice("scissors");
    //         }}
    //       >
    //         <div className="w-[178px] h-[178px]">
    //           {" "}
    //           <Image src={scissor} alt="" />
    //         </div>
    //       </div>
    //       <div
    //         className={`${userChoice !== "rock" && "opacity-30"} ${
    //           userChoice === null && "opacity-100"
    //         }`}
    //         onClick={() => {
    //           handleUserChoice("rock");
    //         }}
    //       >
    //         <div className="w-[178px] h-[178px]">
    //           <Image src={rock} alt="" />
    //         </div>
    //       </div>
    //       <div
    //         className={`${userChoice !== "paper" && "opacity-30"} ${
    //           userChoice === null && "opacity-100"
    //         }`}
    //         onClick={() => {
    //           handleUserChoice("paper");
    //         }}
    //       >
    //         <div className="w-[178px] h-[178px]">
    //           <Image src={paper} alt="" />
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       className="fixed -right-24 -bottom-14 z-10"
    //       style={{
    //         transform:
    //           "scaleX(-1) translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(45deg) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
    //       }}
    //     >
    //       <Image
    //         alt={"player-choice"}
    //         src={`/human-${userChoice || "rock"}.png`}
    //         width={400}
    //         height={900}
    //       />
    //     </div>
    //     <div className="fixed -left-24 -bottom-14 z-10 rotate-45">
    //       <Image
    //         alt={"bot-choice"}
    //         src={`/robot-${cpuChoice || "rock"}.png`}
    //         width={400}
    //         height={900}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="h-screen grid place-items-center bg-[#9DCAFF]">
      <div>
        <h1 className="fixed top-8 right-8 text-4xl">{timer}</h1>
        <h1 className="fixed top-10 right-[30%] text-4xl text-center">
          {usercore}
          <div className="text-xl">You</div>
        </h1>
        <h1 className="fixed top-10 left-[30%] text-4xl">
          {cpuscore}
          <div className="text-xl">Ai</div>
        </h1>
        <div className="fixed bottom-24 left-[50%] -translate-x-[50%]">
          {started &&
            (!roundEnded ? (
              <>
                <h1 className="text-4xl">Choose Your Movement</h1>
                <div className="relative z-50">
                  {choices.map((choice) => (
                    <button
                      key={choice}
                      className="hover:rotate-12 duration-300"
                      onClick={() => handleUserChoice(choice)}
                    >
                      <Image
                        alt={choice}
                        src={`/button-${choice}.png`}
                        width={222}
                        height={222}
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {title && <h1 className="text-4xl text-center">{title}</h1>}
                <div className="relative z-50">
                  <div>
                    <div
                      className="border-2 border-white p-4 px-6  uppercase text-3xl cursor-pointer mt-6"
                      onClick={() => {
                        setTimer(10);
                        startTimer();
                        setRoundEnded(false);
                      }}
                    >
                      Next round
                    </div>
                  </div>
                </div>
              </>
            ))}
          {!started && (
            <div>
              <div
                className="border-2 border-white p-4 px-6  uppercase text-3xl cursor-pointer"
                onClick={() => setStarted(true)}
              >
                start game
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="fixed -right-24 -bottom-14 z-10"
        style={{
          transform:
            "scaleX(-1) translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(45deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
        }}
      >
        <Image
          alt={"player-choice"}
          src={`/human-${userChoice || "rock"}.png`}
          width={400}
          height={900}
        />
      </div>
      <div className="fixed -left-24 -bottom-14 z-10 rotate-45">
        <Image
          alt={"bot-choice"}
          className="duration-300 transition-all"
          src={`/robot-${cpuChoice || "rock"}.png`}
          width={400}
          height={900}
        />
      </div>
    </div>
  );
}
