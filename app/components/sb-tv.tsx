"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { tvChannels } from "../data/portfolio";
import { TvIcon } from "./illustrations";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function SbTv() {
  const [tvOpen, setTvOpen] = useState(false);
  const [power, setPower] = useState(true);
  const [channelIndex, setChannelIndex] = useState(0);
  const [volume, setVolume] = useState(6);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [tuning, setTuning] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const tuningTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const volumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const tune = useCallback((nextIndex: number) => {
    if (tuningTimeout.current) clearTimeout(tuningTimeout.current);
    const normalized = (nextIndex + tvChannels.length) % tvChannels.length;
    setChannelIndex(normalized);
    setTuning(true);
    setPower(true);
    tuningTimeout.current = setTimeout(() => setTuning(false), 420);
  }, []);

  const revealVolume = useCallback(() => {
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    setShowVolume(true);
    volumeTimeout.current = setTimeout(() => setShowVolume(false), 1400);
  }, []);

  const volumeUp = useCallback(() => {
    setVolume((current) => clamp(current + 1, 0, 10));
    setMuted(false);
    revealVolume();
  }, [revealVolume]);

  const volumeDown = useCallback(() => {
    setVolume((current) => clamp(current - 1, 0, 10));
    revealVolume();
  }, [revealVolume]);

  const toggleMute = useCallback(() => {
    setMuted((current) => !current);
    revealVolume();
  }, [revealVolume]);

  useEffect(() => {
    if (!tvOpen || !power) return;
    const interval = setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => clearInterval(interval);
  }, [power, tvOpen]);

  useEffect(() => {
    if (!tvOpen) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const shell = document.querySelector<HTMLElement>("[data-portfolio-shell]");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    shell?.setAttribute("inert", "");
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      shell?.removeAttribute("inert");
      previouslyFocused?.focus();
    };
  }, [tvOpen]);

  useEffect(() => {
    if (!tvOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "escape") return setTvOpen(false);
      if (key === "tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => element.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
      if (/^[1-7]$/.test(key)) {
        event.preventDefault();
        tune(Number(key) - 1);
        return;
      }
      if (key === "arrowup") {
        event.preventDefault();
        tune(channelIndex + 1);
      } else if (key === "arrowdown") {
        event.preventDefault();
        tune(channelIndex - 1);
      } else if (key === "arrowright") {
        event.preventDefault();
        volumeUp();
      } else if (key === "arrowleft") {
        event.preventDefault();
        volumeDown();
      } else if (key === "m") {
        toggleMute();
      } else if (key === "c") {
        setCaptions((current) => !current);
      } else if (key === "p" || key === " ") {
        event.preventDefault();
        setPower((current) => !current);
        setTuning(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [channelIndex, tune, toggleMute, tvOpen, volumeDown, volumeUp]);

  useEffect(() => () => {
    if (tuningTimeout.current) clearTimeout(tuningTimeout.current);
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
  }, []);

  const channel = tvChannels[channelIndex];
  const channelNumber = String(channelIndex + 1).padStart(2, "0");
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const displaySeconds = String(seconds % 60).padStart(2, "0");
  const volumeLabel = muted ? "MUTED" : `VOL ${volume}`;
  const volumePercent = muted ? 0 : volume * 10;

  return (
    <>
      <button
        className="tv-trigger"
        type="button"
        onClick={() => {
          setTvOpen(true);
          setPower(true);
          setSeconds(0);
        }}
        title="Open SB-TV"
        aria-label="Open SB-TV"
      >
        <TvIcon />
        SB-TV
      </button>

      {tvOpen && typeof document !== "undefined" && createPortal(<div
        className="tv-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="SB-TV interactive portfolio"
        ref={dialogRef}
        tabIndex={-1}
      >
      <div className="tv-overlay__inner">
        <div className="tv-toolbar">
          <span className="tv-toolbar__badge">SB-TV · 7 CHANNELS</span>
          <span className="tv-toolbar__help">↑↓ channel · ←→ volume · 1-7 · M mute · C captions · P power · Esc close</span>
          <button ref={closeButtonRef} type="button" onClick={() => setTvOpen(false)} aria-label="Close SB-TV">✕ Close</button>
        </div>

        <div className="tv-stage">
          <div className="tv-set-wrap">
            <div className="tv-set">
              <div className="tv-set__body">
                <div className="tv-display-column">
                  <div className="tv-bezel">
                    <div className="tv-screen">
                      {!power && <div className="tv-screen__standby"><span>STANDBY</span></div>}
                      {power && tuning && (
                        <div className="tv-screen__static">
                          <span>TUNING CH {channelNumber}</span>
                        </div>
                      )}
                      {power && !tuning && (
                        <div className="tv-program" style={{ background: channel.background }}>
                          <div className="tv-program__bar" style={{ background: channel.accentA }} />
                          <div className="tv-program__circle" style={{ background: channel.accentB }} />
                          <div className="tv-program__block" />
                          <div className="tv-program__copy">
                            <span className="tv-program__tag">{channel.tag}</span>
                            <h2>{channel.title}</h2>
                            <p>{channel.description}</p>
                            <span className="tv-program__stack">{channel.stack}</span>
                            {captions && <span className="tv-program__caption">{channel.caption}</span>}
                          </div>
                          <span className="tv-program__channel">CH {channelNumber}</span>
                        </div>
                      )}
                      {showVolume && power && (
                        <div className="tv-volume-osd">
                          <span>{volumeLabel}</span>
                          <span className="tv-volume-osd__track"><span style={{ width: `${volumePercent}%` }} /></span>
                        </div>
                      )}
                      <div className="tv-screen__scanlines" />
                      <div className="tv-screen__vignette" />
                      <div className="tv-screen__glare" />
                    </div>
                  </div>

                  <div className="tv-controls">
                    <span className="tv-controls__brand">SB-TV</span>
                    <div className="tv-controls__buttons">
                      <button type="button" onClick={volumeDown} aria-label="Volume down">VOL −</button>
                      <button type="button" onClick={volumeUp} aria-label="Volume up">VOL +</button>
                      <button className={muted ? "is-active" : ""} type="button" onClick={toggleMute} aria-label="Mute">MUTE</button>
                      <button type="button" onClick={() => tune(channelIndex - 1)} aria-label="Channel down">CH ▼</button>
                      <button type="button" onClick={() => tune(channelIndex + 1)} aria-label="Channel up">CH ▲</button>
                      <button className={captions ? "is-dark" : ""} type="button" onClick={() => setCaptions((current) => !current)} aria-label="Closed captions">CC</button>
                      <span className="tv-clock"><small>TIME</small>{minutes}:{displaySeconds}</span>
                      <button className="tv-power" type="button" onClick={() => { setPower((current) => !current); setTuning(false); }} aria-label="Power">
                        <span className={power ? "is-on" : ""} />⏻
                      </button>
                    </div>
                  </div>
                </div>

                <div className="tv-speaker-column">
                  <div className="tv-speaker" />
                  <div className="tv-knob" />
                  <div className="tv-knob" />
                  <span>MODEL 18-26</span>
                </div>
              </div>
            </div>
            <div className="tv-feet"><span /><span /></div>
          </div>

          <aside className="tv-side-panel">
            <div className="remote">
              <div className="remote__header">
                <span>SB-REMOTE</span>
                <button type="button" onClick={() => { setPower((current) => !current); setTuning(false); }} aria-label="Power">⏻</button>
              </div>
              <div className="remote__digits">
                {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
                  <button type="button" onClick={() => tune(number - 1)} key={number}>{number}</button>
                ))}
              </div>
              <div className="remote__rockers">
                <div>
                  <button type="button" onClick={volumeUp} aria-label="Volume up">+</button>
                  <span>VOL</span>
                  <button type="button" onClick={volumeDown} aria-label="Volume down">−</button>
                </div>
                <div>
                  <button type="button" onClick={() => tune(channelIndex + 1)} aria-label="Channel up">▲</button>
                  <span>CH</span>
                  <button type="button" onClick={() => tune(channelIndex - 1)} aria-label="Channel down">▼</button>
                </div>
              </div>
              <div className="remote__toggles">
                <button className={muted ? "is-active" : ""} type="button" onClick={toggleMute}>MUTE</button>
                <button className={captions ? "is-blue" : ""} type="button" onClick={() => setCaptions((current) => !current)}>CC</button>
              </div>
              <div className="remote__status">NOW: CH {channelNumber} — {channel.label}<br />{volumeLabel} · CC {captions ? "ON" : "OFF"}</div>
            </div>

            <div className="tv-guide">
              <span>TV GUIDE</span>
              {tvChannels.map((item, index) => (
                <button className={channelIndex === index ? "is-current" : ""} type="button" onClick={() => tune(index)} key={item.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>, document.body)}
    </>
  );
}
