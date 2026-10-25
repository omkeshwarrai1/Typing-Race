'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const passages = [
  'Small steps every day can lead to remarkable progress. Stay curious, keep practising, and enjoy the journey as your skills grow with every new challenge.',
  'The fastest way to improve is to focus on accuracy first. Relax your hands, look ahead at the next word, and let a steady rhythm guide each keystroke.',
  'A quiet road stretched beyond the hills as the morning sun lit the track. Every turn offered a new chance to learn, adapt, and move a little faster.',
  'Great ideas become useful when we turn them into action. Make time to learn something new, practise with purpose, and celebrate the progress you make.',
  'Technology helps people connect, create, and solve problems. With patience and a willingness to experiment, even a difficult task can become manageable.'
];
type Difficulty = 'Chill' | 'Normal' | 'Pro';
export default function TypingGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('Normal');
  const [passageIndex, setPassageIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const target = useMemo(() => passages[passageIndex], [passageIndex]);
  useEffect(() => { try { setBest(Number(localStorage.getItem('typing-race-best') || 0)); } catch {} }, []);
  useEffect(() => { if (!startedAt || finished) return; const id = window.setInterval(() => setElapsed((Date.now() - startedAt) / 1000), 100); return () => window.clearInterval(id); }, [startedAt, finished]);
  const correctChars = typed.split('').filter((char, i) => char === target[i]).length;
  const accuracy = typed.length ? Math.round(correctChars / typed.length * 100) : 100;
  const wpm = elapsed > 0 ? Math.round((correctChars / 5) / (elapsed / 60)) : 0;
  const progress = Math.min(100, correctChars / target.length * 100);
  function onType(value: string) {
    if (finished) return;
    const next = value.slice(0, target.length);
    if (!startedAt && next.length) setStartedAt(Date.now());
    setTyped(next);
    if (next.length >= target.length) {
      const endTime = startedAt ? (Date.now() - startedAt) / 1000 : 0.1;
      setElapsed(endTime); setFinished(true);
      const finalCorrect = next.split('').filter((char, i) => char === target[i]).length;
      const finalWpm = Math.round((finalCorrect / 5) / Math.max(endTime / 60, 0.01));
      try { const old = Number(localStorage.getItem('typing-race-best') || 0); if (finalWpm > old) { localStorage.setItem('typing-race-best', String(finalWpm)); setBest(finalWpm); } } catch {}
    }
  }
  function restart(newPassage = false) { setTyped(''); setStartedAt(null); setElapsed(0); setFinished(false); if (newPassage) setPassageIndex(i => (i + 1) % passages.length); window.setTimeout(() => inputRef.current?.focus(), 0); }
  const seconds = Math.floor(elapsed); const timeLabel = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const carLeft = Math.max(2, Math.min(92, progress * 0.9 + 2));
  return <section className="game-wrap" aria-label="Typing race game"><div className="game-card"><div className="game-top"><div><span className="live-dot"/> <span className="game-label">YOUR RACE</span></div><div className="difficulty" aria-label="Choose difficulty">{(['Chill','Normal','Pro'] as Difficulty[]).map(d => <button key={d} onClick={() => {setDifficulty(d); restart();}} className={difficulty === d ? 'selected' : ''}>{d}</button>)}</div></div><div className="track" aria-label={`Race progress ${Math.round(progress)} percent`}><div className="track-line"/><div className="finish-line">FINISH</div><div className="car car-player" style={{ left: `${carLeft}%` }} aria-label="Your car">🏎️</div><div className="track-start">START</div></div><div className="stats"><div><span>WPM</span><strong>{wpm}</strong></div><div><span>ACCURACY</span><strong>{accuracy}<small>%</small></strong></div><div><span>TIME</span><strong>{timeLabel}</strong></div><div><span>BEST WPM</span><strong>{best}</strong></div></div>{finished ? <div className="result-panel" role="status"><div className="result-emoji">🏆</div><h2>Race complete!</h2><p>You typed at <strong>{wpm} WPM</strong> with <strong>{accuracy}% accuracy</strong>.</p><div className="result-actions"><button className="primary-btn" onClick={() => restart()}>Race again ↻</button><button className="secondary-btn" onClick={() => restart(true)}>New passage →</button></div></div> : <><div className="passage" aria-label="Text to type">{target.split('').map((char, i) => { let cls = ''; if (i < typed.length) cls = typed[i] === char ? 'correct' : 'incorrect'; else if (i === typed.length) cls = 'current'; return <span key={i} className={cls}>{char}</span>; })}</div><label className="input-label" htmlFor="typing-input">TYPE THE TEXT ABOVE</label><textarea id="typing-input" ref={inputRef} className="typing-input" value={typed} onChange={e => onType(e.target.value)} onPaste={e => e.preventDefault()} placeholder="Click here and start typing…" autoCapitalize="off" autoCorrect="off" spellCheck={false} rows={3} aria-describedby="typing-hint"/><div className="input-footer"><span id="typing-hint">{difficulty === 'Chill' ? 'Take your time — accuracy first.' : difficulty === 'Pro' ? 'Push your pace. Keep your accuracy sharp.' : 'Your timer starts with your first keystroke.'}</span><span>{typed.length}/{target.length} chars</span></div><div className="game-actions"><button className="primary-btn" onClick={() => inputRef.current?.focus()}>Focus typing field ↗</button><button className="secondary-btn" onClick={() => restart(true)}>Skip passage ↻</button></div></>}<div className="game-bottom"><span>⌨ No account needed</span><span>🔒 Best score saved on this device</span></div></div></section>;
}
