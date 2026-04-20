"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import RoundUpScreen from "./components/RoundUpScreen";
import StartScreen from "./components/StartScreen";
import TrackingScreen from "./components/TrackingScreen";
import {
  clampToZero,
  formatClockTime,
  formatDuration,
  formatEventTime,
  formatPromille,
  getEventLabel,
} from "./lib/formatters";
import type { EventType, Gender, NightEvent, SavedState, Screen } from "./lib/types";

const STORAGE_KEY = "lastround-session";

const defaultSavedState: SavedState = {
  screen: "start",
  beers: 0,
  shots: 0,
  cigarettes: 0,
  gambleTotal: 0,
  showGambleInput: false,
  gambleInput: "",
  gambleDraft: 0,
  startTime: null,
  endTime: null,
  events: [],
  name: "",
  gender: "",
  weight: "",
  height: "",
  beerVolumeMl: "500",
  beerAbv: "4.5",
  shotVolumeMl: "33",
  shotAbv: "45",
};

function getInitialSavedState() {
  if (typeof window === "undefined") {
    return defaultSavedState;
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultSavedState;
  }

  try {
    return {
      ...defaultSavedState,
      ...JSON.parse(saved),
    } as SavedState;
  } catch {
    return defaultSavedState;
  }
}

export default function Home() {
  const [initialSavedState] = useState(() => getInitialSavedState());

  const [screen, setScreen] = useState<Screen>(initialSavedState.screen);

  const [name, setName] = useState(initialSavedState.name);
  const [gender, setGender] = useState<Gender>(initialSavedState.gender);
  const [weight, setWeight] = useState(initialSavedState.weight);
  const [height, setHeight] = useState(initialSavedState.height);

  const [beerVolumeMl, setBeerVolumeMl] = useState(initialSavedState.beerVolumeMl);
  const [beerAbv, setBeerAbv] = useState(initialSavedState.beerAbv);
  const [shotVolumeMl, setShotVolumeMl] = useState(initialSavedState.shotVolumeMl);
  const [shotAbv, setShotAbv] = useState(initialSavedState.shotAbv);

  const [beers, setBeers] = useState(initialSavedState.beers);
  const [shots, setShots] = useState(initialSavedState.shots);
  const [cigarettes, setCigarettes] = useState(initialSavedState.cigarettes);
  const [gambleTotal, setGambleTotal] = useState(initialSavedState.gambleTotal);

  const [events, setEvents] = useState<NightEvent[]>(initialSavedState.events);
  const [showGambleInput, setShowGambleInput] = useState(
    initialSavedState.showGambleInput
  );
  const [gambleInput, setGambleInput] = useState(initialSavedState.gambleInput);
  const [gambleDraft, setGambleDraft] = useState(initialSavedState.gambleDraft);

  const [startTime, setStartTime] = useState<Date | null>(
    initialSavedState.startTime ? new Date(initialSavedState.startTime) : null
  );
  const [endTime, setEndTime] = useState<Date | null>(
    initialSavedState.endTime ? new Date(initialSavedState.endTime) : null
  );

  const [copyMessage, setCopyMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setTick] = useState(0);

  const addEvent = (type: EventType, value?: number) => {
    const newEvent: NightEvent = {
      id: crypto.randomUUID(),
      type,
      value,
      timestamp: new Date().toISOString(),
    };

    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleBeer = () => {
    setBeers((prev) => prev + 1);
    addEvent("beer");
  };

  const handleShot = () => {
    setShots((prev) => prev + 1);
    addEvent("shot");
  };

  const handleCigarette = () => {
    setCigarettes((prev) => prev + 1);
    addEvent("cigarette");
  };

  const resetNightState = () => {
    setBeers(0);
    setShots(0);
    setCigarettes(0);
    setGambleTotal(0);
    setEvents([]);
    setShowGambleInput(false);
    setGambleInput("");
    setGambleDraft(0);
    setCopyMessage("");
  };

  const startNight = () => {
    if (!name.trim() || !gender || !weight || !height) {
      alert("Please fill in name, gender, weight, and height.");
      return;
    }

    if (!beerVolumeMl || !beerAbv || !shotVolumeMl || !shotAbv) {
      alert("Please fill in beer and shot settings.");
      return;
    }

    resetNightState();
    setStartTime(new Date());
    setEndTime(null);
    setScreen("tracking");
  };

  const openGambleInput = () => {
    setGambleInput("");
    setGambleDraft(0);
    setShowGambleInput(true);
  };

  const addQuickGambleAmount = (amount: number) => {
    setGambleDraft((prev) => prev + amount);
  };

  const commitCustomGambleAmount = () => {
    const amount = Number(gambleInput);

    if (Number.isNaN(amount) || amount === 0) return null;

    setGambleTotal((prev) => prev + amount);
    addEvent("gamble", amount);
    setShowGambleInput(false);
    setGambleInput("");
    setGambleDraft(0);

    return amount;
  };

  const clearGambleDraft = () => {
    setGambleDraft(0);
    setGambleInput("");
  };

  const cancelGamble = () => {
    setShowGambleInput(false);
    setGambleInput("");
    setGambleDraft(0);
  };

  const confirmGamble = () => {
    if (gambleDraft === 0) return;

    setGambleTotal((prev) => prev + gambleDraft);
    addEvent("gamble", gambleDraft);
    setShowGambleInput(false);
    setGambleInput("");
    setGambleDraft(0);
  };

  const endNight = () => {
    setEndTime(new Date());
    setCopyMessage("");
    setScreen("roundup");
  };

  const continueNight = () => {
    setEndTime(null);
    setCopyMessage("");
    setScreen("tracking");
  };

  const backToStart = () => {
    setScreen("start");
    resetNightState();
    setStartTime(null);
    setEndTime(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getAlcoholGramsForEvent = useCallback((event: NightEvent) => {
    const beerVolume = Number(beerVolumeMl);
    const beerStrength = Number(beerAbv);
    const shotVolume = Number(shotVolumeMl);
    const shotStrength = Number(shotAbv);

    if (event.type === "beer") {
      return beerVolume * (beerStrength / 100) * 0.789;
    }

    if (event.type === "shot") {
      return shotVolume * (shotStrength / 100) * 0.789;
    }

    return 0;
  }, [beerVolumeMl, beerAbv, shotVolumeMl, shotAbv]);

  const calculateBacAtTime = useCallback((targetTime: Date) => {
    if (!startTime) return 0;

    const bodyWeight = Number(weight);
    if (!bodyWeight || !gender) return 0;

    const r = gender === "male" ? 0.68 : 0.55;
    const beta = 0.15;

    const alcoholEvents = events
      .filter((event) => event.type === "beer" || event.type === "shot")
      .filter((event) => new Date(event.timestamp) <= targetTime);

    const totalAlcoholGrams = alcoholEvents.reduce((sum, event) => {
      return sum + getAlcoholGramsForEvent(event);
    }, 0);

    const hoursSinceStart =
      (targetTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;

    const bac = totalAlcoholGrams / (bodyWeight * r) - beta * hoursSinceStart;

    return clampToZero(bac);
  }, [events, gender, getAlcoholGramsForEvent, startTime, weight]);

  const currentBac = useMemo(() => {
    if (screen !== "tracking") return 0;
    return calculateBacAtTime(new Date());
  }, [screen, calculateBacAtTime]);

  const peakBacData = useMemo(() => {
    if (!startTime) {
      return { value: 0, time: null as Date | null };
    }

    const alcoholEvents = [...events]
      .filter((event) => event.type === "beer" || event.type === "shot")
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    let peakValue = 0;
    let peakTime: Date | null = null;

    for (const event of alcoholEvents) {
      const eventTime = new Date(event.timestamp);
      const bacAtEventTime = calculateBacAtTime(eventTime);

      if (bacAtEventTime > peakValue) {
        peakValue = bacAtEventTime;
        peakTime = eventTime;
      }
    }

    const sessionEnd = endTime ?? new Date();
    const bacAtEnd = calculateBacAtTime(sessionEnd);

    if (bacAtEnd > peakValue) {
      peakValue = bacAtEnd;
      peakTime = sessionEnd;
    }

    return {
      value: peakValue,
      time: peakTime,
    };
  }, [events, startTime, endTime, calculateBacAtTime]);

  const degeneracyScore = useMemo(() => {
    const gambleLoss = gambleTotal < 0 ? Math.abs(gambleTotal) : 0;

    const rawScore =
      beers * 8 +
      shots * 12 +
      cigarettes * 4 +
      gambleLoss * 0.35 +
      peakBacData.value * 100;

    return Math.round(rawScore);
  }, [beers, shots, cigarettes, gambleTotal, peakBacData.value]);

  const rank = useMemo(() => {
    if (degeneracyScore < 40) return "Rookie";
    if (degeneracyScore < 90) return "Veteran";
    return "Demon";
  }, [degeneracyScore]);

  const highlightText = useMemo(() => {
    if (peakBacData.value >= 1.5) return "Absolute menace behavior.";
    if (gambleTotal <= -100) return "Casino donated to by user.";
    if (shots >= 6) return "Shot-heavy performance.";
    if (beers >= 8) return "Beer marathon completed.";
    if (cigarettes >= 10) return "Chain smoking certified.";
    return "Clean chaos. Solid session.";
  }, [peakBacData.value, gambleTotal, shots, beers, cigarettes]);

  const shareText = useMemo(() => {
    return [
      "LastRound // RoundUp",
      `${name}'s Tonight's Damage Report`,
      `Rank: ${rank}`,
      `Degeneracy Score: ${degeneracyScore}`,
      `Beers: ${beers} | Shots: ${shots} | Cigarettes: ${cigarettes}`,
      `Gamble P/L: €${gambleTotal}`,
      `Peak BAC: ${formatPromille(peakBacData.value)} at ${
        peakBacData.time ? formatClockTime(peakBacData.time) : "--:--"
      }`,
      `Duration: ${formatDuration(startTime, endTime)}`,
      `${highlightText}`,
    ].join("\n");
  }, [
    name,
    rank,
    degeneracyScore,
    beers,
    shots,
    cigarettes,
    gambleTotal,
    peakBacData.value,
    peakBacData.time,
    highlightText,
    startTime,
    endTime,
  ]);

  const handleCopyShareText = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "LastRound RoundUp",
          text: shareText,
        });
        return;
      }

      await navigator.clipboard.writeText(shareText);
      setCopyMessage("Copied.");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage("Share failed.");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const dataToSave: SavedState = {
      screen,
      beers,
      shots,
      cigarettes,
      gambleTotal,
      showGambleInput,
      gambleInput,
      gambleDraft,
      startTime: startTime ? startTime.toISOString() : null,
      endTime: endTime ? endTime.toISOString() : null,
      events,
      name,
      gender,
      weight,
      height,
      beerVolumeMl,
      beerAbv,
      shotVolumeMl,
      shotAbv,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [
    screen,
    beers,
    shots,
    cigarettes,
    gambleTotal,
    showGambleInput,
    gambleInput,
    gambleDraft,
    startTime,
    endTime,
    events,
    name,
    gender,
    weight,
    height,
    beerVolumeMl,
    beerAbv,
    shotVolumeMl,
    shotAbv,
    isLoaded,
  ]);

  useEffect(() => {
    if (screen !== "tracking") return;

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, [screen]);

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-zinc-400">Loading LastRound...</p>
      </main>
    );
  }

  if (screen === "start") {
    return (
      <StartScreen
        name={name}
        setName={setName}
        gender={gender}
        setGender={setGender}
        weight={weight}
        setWeight={setWeight}
        height={height}
        setHeight={setHeight}
        beerVolumeMl={beerVolumeMl}
        setBeerVolumeMl={setBeerVolumeMl}
        beerAbv={beerAbv}
        setBeerAbv={setBeerAbv}
        shotVolumeMl={shotVolumeMl}
        setShotVolumeMl={setShotVolumeMl}
        shotAbv={shotAbv}
        setShotAbv={setShotAbv}
        startNight={startNight}
      />
    );
  }

  if (screen === "tracking") {
    return (
      <TrackingScreen
        name={name}
        gender={gender}
        weight={weight}
        height={height}
        currentBac={formatPromille(currentBac)}
        peakBacText={formatPromille(peakBacData.value)}
        beers={beers}
        shots={shots}
        cigarettes={cigarettes}
        gambleTotal={gambleTotal}
        startTimeText={formatClockTime(startTime)}
        events={events}
        showGambleInput={showGambleInput}
        gambleInput={gambleInput}
        gambleDraft={gambleDraft}
        setGambleInput={setGambleInput}
        addQuickGambleAmount={addQuickGambleAmount}
        commitCustomGambleAmount={commitCustomGambleAmount}
        clearGambleDraft={clearGambleDraft}
        handleBeer={handleBeer}
        handleShot={handleShot}
        handleCigarette={handleCigarette}
        openGambleInput={openGambleInput}
        confirmGamble={confirmGamble}
        cancelGamble={cancelGamble}
        endNight={endNight}
        getEventLabel={getEventLabel}
        formatEventTime={formatEventTime}
      />
    );
  }

  return (
    <RoundUpScreen
      rank={rank}
      degeneracyScore={degeneracyScore}
      highlightText={highlightText}
      beers={beers}
      shots={shots}
      cigarettes={cigarettes}
      gambleTotal={gambleTotal}
      peakBacText={formatPromille(peakBacData.value)}
      peakTimeText={
        peakBacData.time ? formatClockTime(peakBacData.time) : "--:--"
      }
      startTimeText={formatClockTime(startTime)}
      endTimeText={formatClockTime(endTime)}
      durationText={formatDuration(startTime, endTime)}
      copyMessage={copyMessage}
      handleCopyShareText={handleCopyShareText}
      name={name}
      gender={gender}
      weight={weight}
      height={height}
      events={events}
      getEventLabel={getEventLabel}
      formatEventTime={formatEventTime}
      backToStart={backToStart}
      continueNight={continueNight}
    />
  );
}
