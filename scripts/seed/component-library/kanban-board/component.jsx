import { useState } from 'react';
import './component.css';

const starter = [
  { id: 'brief', title: 'Write launch brief', owner: 'NS', tone: 'plum', due: 'Today' },
  { id: 'interviews', title: 'Customer interviews', owner: 'EC', tone: 'gold', due: '18 Jun' },
  { id: 'prototype', title: 'Prototype review', owner: 'JL', tone: 'blue', due: '20 Jun' },
];
const lanes = [{ id: 'planned', label: 'UP NEXT' }, { id: 'doing', label: 'IN MOTION' }, { id: 'done', label: 'LANDED' }];
const seedCards = { planned: starter.slice(0, 2), doing: [starter[2]], done: [] };
export function KanbanBoard({ initialCards = seedCards, onChange }) {
  const [cards, setCards] = useState(initialCards);
  const [draft, setDraft] = useState('');
  const move = (cardId, laneId) => {
    let moved;
    const next = Object.fromEntries(lanes.map((lane) => [lane.id, (cards[lane.id] ?? []).filter((card) => { if (card.id === cardId) { moved = card; return false; } return true; })]));
    if (moved) next[laneId] = [...(next[laneId] ?? []), moved];
    setCards(next); onChange?.(next);
  };
  const addCard = (event) => { event.preventDefault(); if (!draft.trim()) return; const card = { id: `task-${Date.now()}`, title: draft.trim(), owner: 'YO', tone: 'mint', due: 'New' }; const next = { ...cards, planned: [...(cards.planned ?? []), card] }; setCards(next); onChange?.(next); setDraft(''); };
  return <section className="cc-kanban" aria-label="Project board" data-testid="board-kanban">
    <header className="cc-kanban__head"><div><p>STUDIO / PROJECT 04</p><h2>Launch room <span>·</span> <small>{Object.values(cards).flat().length} cards</small></h2></div><form onSubmit={addCard}><input aria-label="New card title" data-testid="input-new-card" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a card…" /><button type="submit" data-testid="button-add-card" aria-label="Add card">+</button></form></header>
    <div className="cc-kanban__lanes">{lanes.map((lane) => <section key={lane.id} className="cc-kanban__lane" aria-label={lane.label} data-testid={`lane-${lane.id}`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); move(event.dataTransfer.getData('text/plain'), lane.id); }}>
      <header><span>{lane.label}</span><span className="cc-kanban__count">{(cards[lane.id] ?? []).length}</span></header>
      <div className="cc-kanban__stack">{(cards[lane.id] ?? []).map((card) => <article className="cc-kanban__card" key={card.id} draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', card.id)} data-testid={`card-task-${card.id}`}><div className={`cc-kanban__stamp cc-kanban__stamp--${card.tone}`}></div><h3>{card.title}</h3><footer><span className="cc-kanban__owner">{card.owner}</span><span>{card.due}</span></footer><label className="cc-kanban__move">Move to<select aria-label={`Move ${card.title}`} data-testid={`select-move-${card.id}`} value={lane.id} onChange={(event) => move(card.id, event.target.value)}>{lanes.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label></article>)}</div>
    </section>)}</div>
  </section>;
}