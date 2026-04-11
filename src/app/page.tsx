"use client";

import { useEffect, useMemo, useState } from "react";
import StartScreen from "./components/StartScreen";
import TrackingScreen from "./components/TrackingScreen";
import RoundUpScreen from "./components/RoundUpScreen";

type Screen = "start" | "tracking" | "roundup";
type Gender = "male" | "female" | "";
type EventType = "beer" | "shot" | "cigarette" | "gamble";

type NightEvent = {
  id: string;
  type: EventType;
  value?: number;
  timestamp: string;
};

type SavedState = {
  screen: Screen;
  beers: number;
  shots: number;
  cigarettes: number;
  gambleTotal: number;
  showGambleInput: boolean;
  gambleInput: string;
  gambleDraft: number;
  startTime: string | null;
  endTime: string | null;
  events: NightEvent[];
  name: string;
  gender: Gender;
  weight: string;
  height: string;
  beerVolumeMl: string;
  beerAbv: string;
  shotVolumeMl: string;
  shotAbv: string;
};

const STORAGE_KEY = "lastround-session";

function clampToZero(value: number) {
  return value < 0 ? 0 : value;
}

function formatPromille(value: number) {
  return `${value.toFixed(2)}‰`;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");

  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [beerVolumeMl, setBeerVolumeMl] = useState("500");
  const [beerAbv, setBeerAbv] = useState("4.5");
  const [shotVolumeMl, setShotVolumeMl] = useState("33");
  const [shotAbv, setShotAbv] = useState("45");

  const [beers, setBeers] = useState(0);
  const [shots, setShots] = useState(0);
  const [cigarettes, setCigarettes] = useState(0);
  const [gambleTotal, setGambleTotal] = useState(0);

  const [events, setEvents] = useState<NightEvent[]>([]);
  const [showGambleInput, setShowGambleInput] = useState(false);
  const [gambleInput, setGambleInput] = useState("");
  const [gambleDraft, setGambleDraft] = useState(0);

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [copyMessage, setCopyMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setTick] = useState(0);

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--";

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatEventTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = () => {
    if (!startTime || !endTime) return "--";

    const diffMs = endTime.getTime() - startTime.getTime();
    const totalMinutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

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

  const startNight = () => {
    if (!name.trim() || !gender || !weight || !height) {
      alert("Please fill in name, gender, weight, and height.");
      return;
    }

    if (!beerVolumeMl || !beerAbv || !shotVolumeMl || !shotAbv) {
      alert("Please fill in beer and shot settings.");
      return;
    }

    setBeers(0);
    setShots(0);
    setCigarettes(0);
    setGambleTotal(0);
    setEvents([]);
    setShowGambleInput(false);
    setGambleInput("");
    setGambleDraft(0);
    setCopyMessage("");
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

  const addCustomGambleAmount = () => {
    const amount = Number(gambleInput);

    if (isNaN(amount) || amount === 0) return;

    setGambleDraft((prev) => prev + amount);
    setGambleInput("");
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
    setBeers(0);
    setShots(0);
    setCigarettes(0);
    setGambleTotal(0);
    setEvents([]);
    setShowGambleInput(false);
    setGambleInput("");
    setGambleDraft(0);
    setStartTime(null);
    setEndTime(null);
    setCopyMessage("");
    localStorage.removeItem(STORAGE_KEY);
  };

  const getEventLabel = (event: NightEvent) => {
    if (event.type === "beer") return "🍺 Beer";
    if (event.type === "shot") return "🥃 Shot";
    if (event.type === "cigarette") return "🚬 Cigarette";
    if (event.type === "gamble") {
      const sign = event.value && event.value > 0 ? "+" : "";
      return `🎰 Gamble ${sign}${event.value}`;
    }
    return event.type;
  };

  const getAlcoholGramsForEvent = (event: NightEvent) => {
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
  };

  const calculateBacAtTime = (targetTime: Date) => {
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
  };

  const currentBac = useMemo(() => {
    if (screen !== "tracking") return 0;
    return calculateBacAtTime(new Date());
  }, [
    events,
    screen,
    weight,
    gender,
    startTime,
    beerVolumeMl,
    beerAbv,
    shotVolumeMl,
    shotAbv,
  ]);

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
  }, [
    events,
    startTime,
    endTime,
    weight,
    gender,
    beerVolumeMl,
    beerAbv,
    shotVolumeMl,
    shotAbv,
  ]);

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
      `LastRound // RoundUp`,
      `${name}'s Tonight's Damage Report`,
      `Rank: ${rank}`,
      `Degeneracy Score: ${degeneracyScore}`,
      `Beers: ${beers} | Shots: ${shots} | Cigarettes: ${cigarettes}`,
      `Gamble P/L: €${gambleTotal}`,
      `Peak BAC: ${formatPromille(peakBacData.value)} at ${
        peakBacData.time ? formatTime(peakBacData.time) : "--:--"
      }`,
      `Duration: ${getDuration()}`,
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
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed: SavedState = JSON.parse(saved);

      setScreen(parsed.screen);
      setBeers(parsed.beers);
      setShots(parsed.shots);
      setCigarettes(parsed.cigarettes);
      setGambleTotal(parsed.gambleTotal);
      setShowGambleInput(parsed.showGambleInput);
      setGambleInput(parsed.gambleInput);
      setGambleDraft(parsed.gambleDraft ?? 0);
      setStartTime(parsed.startTime ? new Date(parsed.startTime) : null);
      setEndTime(parsed.endTime ? new Date(parsed.endTime) : null);
      setEvents(parsed.events ?? []);
      setName(parsed.name ?? "");
      setGender(parsed.gender ?? "");
      setWeight(parsed.weight ?? "");
      setHeight(parsed.height ?? "");
      setBeerVolumeMl(parsed.beerVolumeMl ?? "500");
      setBeerAbv(parsed.beerAbv ?? "4.5");
      setShotVolumeMl(parsed.shotVolumeMl ?? "33");
      setShotAbv(parsed.shotAbv ?? "45");
    }

    setIsLoaded(true);
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
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
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
        beers={beers}
        shots={shots}
        cigarettes={cigarettes}
        gambleTotal={gambleTotal}
        startTimeText={formatTime(startTime)}
        events={events}
        showGambleInput={showGambleInput}
        gambleInput={gambleInput}
        gambleDraft={gambleDraft}
        setGambleInput={setGambleInput}
        addQuickGambleAmount={addQuickGambleAmount}
        addCustomGambleAmount={addCustomGambleAmount}
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
      peakTimeText={peakBacData.time ? formatTime(peakBacData.time) : "--:--"}
      startTimeText={formatTime(startTime)}
      endTimeText={formatTime(endTime)}
      durationText={getDuration()}
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