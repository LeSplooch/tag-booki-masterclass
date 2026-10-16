// ============================================================================
// FICHIER : src/components/Step6OralSimulator.jsx
// RÔLE : Composant de l'Étape 6 (Simulation du Grand Oral de 30 minutes face à Sarah).
//
// 🎓 COURS REACT POUR TAG :
// - Ce composant contient un vrai chronomètre en temps réel construit avec
//   `useState` et `useEffect` (`setInterval`).
// - Il inclut aussi le simulateur de questions-réponses avec Sarah (la CTO)
//   sur les 7 thèmes officiels de ta feuille de route !
// ============================================================================

import React, { useState, useEffect } from 'react';
import { PRESENTATION_TIMELINE, SARAH_QUESTIONS } from '../data/courseData';

export default function Step6OralSimulator({ isCompleted, onCompleteStep }) {
  // 1. États pour le Chronomètre officiel de Soutenance (30 minutes = 1800 secondes)
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // 2. États pour cocher les étapes du conducteur de présentation (15 min)
  const [checkedChecklist, setCheckedChecklist] = useState({});

  // 3. États pour les cartes de questions de Sarah (10 min de discussion)
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredQuestions, setMasteredQuestions] = useState({});

  // Effet qui fait avancer le chronomètre de 1 seconde toutes les 1000ms quand timerRunning est true
  useEffect(() => {
    if (!timerRunning) return undefined;
    const intervalId = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    // Fonction de nettoyage ("cleanup") quand on met en pause ou quitte la page
    return () => clearInterval(intervalId);
  }, [timerRunning]);

  // Formatage des secondes en MM:SS
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Détermination de la phase actuelle de l'oral selon le temps écoulé
  const getCurrentOralPhase = () => {
    if (secondsElapsed < 15 * 60) {
      return {
        name: 'Phase 1 : Présentation des livrables (00:00 – 15:00)',
        color: '#0065FC',
      };
    }
    if (secondsElapsed < 25 * 60) {
      return {
        name: 'Phase 2 : Discussion & Questions de Sarah (15:00 – 25:00)',
        color: '#d97706',
      };
    }
    return {
      name: 'Phase 3 : Débriefing hors jeu de rôle (25:00 – 30:00)',
      color: '#10b981',
    };
  };

  const phase = getCurrentOralPhase();
  const currentQ = SARAH_QUESTIONS[activeQuestionIdx] || SARAH_QUESTIONS[0];
  const masteredCount = Object.values(masteredQuestions).filter(Boolean).length;

  const selectQuestion = (idx) => {
    setActiveQuestionIdx(idx);
    setShowHint(false);
    setShowAnswer(false);
  };

  return (
    <div className="step-container">
      {/* BANNIÈRE DU SIMULATEUR D'ORAL (AVEC CHRONOMÈTRE 30 MIN) */}
      <div className="context-banner oral-banner">
        <div className="context-banner-left">
          <div className="scenario-pill">
            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
            <span>Étape 6 (10 min) • Répétition Générale de ta Soutenance</span>
          </div>
          <h2>
            Le Grand Oral face à Sarah (30 min : 15m Présentation + 10m Questions + 5m Débrief)
          </h2>
          <p>
            Utilise le chronomètre et le conducteur ci-dessous pour répéter ta
            présentation de 15 minutes, puis entraîne-toi avec ton prof sur les{' '}
            <strong>7 questions officielles de Sarah</strong> !
          </p>
        </div>

        {/* CHRONOMÈTRE INTERACTIF DE SOUTENANCE */}
        <div className="oral-timer-widget">
          <div className="timer-phase-tag" style={{ color: phase.color }}>
            {phase.name}
          </div>
          <div className="timer-clock">{formatTime(secondsElapsed)} / 30:00</div>
          <div className="timer-controls">
            <button
              type="button"
              className="btn-timer primary"
              onClick={() => setTimerRunning(!timerRunning)}
            >
              <i
                className={`fa-solid ${timerRunning ? 'fa-pause' : 'fa-play'}`}
                aria-hidden="true"
              ></i>
              {timerRunning ? 'Pause' : 'Lancer Chrono'}
            </button>
            <button
              type="button"
              className="btn-timer"
              onClick={() => setSecondsElapsed(15 * 60)}
              title="Aller directement aux questions de Sarah (15:00)"
            >
              Aller à 15:00 (Questions)
            </button>
            <button
              type="button"
              className="btn-timer"
              onClick={() => {
                setTimerRunning(false);
                setSecondsElapsed(0);
              }}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PARTIE 1 : LE CONDUCTEUR MINUTE PAR MINUTE DES 15 MIN DE PRÉSENTATION
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Partie 1 de l&apos;Oral (15 minutes) • Présentation des livrables
            </span>
            <h3>Ton Plan de Présentation en 4 Étapes Chrono</h3>
          </div>
        </div>

        <div className="timeline-grid">
          {PRESENTATION_TIMELINE.map((block) => (
            <div className="timeline-card" key={block.id}>
              <div className="timeline-card-header">
                <span className="time-pill">{block.time}</span>
                <h4>{block.title}</h4>
              </div>

              <div className="checklist-items">
                {block.checklist.map((itemText, idx) => {
                  const key = `${block.id}-${idx}`;
                  const done = !!checkedChecklist[key];
                  return (
                    <label
                      key={key}
                      className={`checklist-row ${done ? 'done' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() =>
                          setCheckedChecklist((prev) => ({
                            ...prev,
                            [key]: !prev[key],
                          }))
                        }
                      />
                      <span>{itemText}</span>
                    </label>
                  );
                })}
              </div>

              <div className="speech-model-box">
                <div className="speech-label">
                  <i className="fa-solid fa-quote-left" aria-hidden="true"></i>{' '}
                  Exemple de phrase d&apos;accroche à dire à l&apos;oral :
                </div>
                <p>{block.speechBubble}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          PARTIE 2 : LES 7 QUESTIONS OFFICIELLES DE SARAH (10 MIN DE DISCUSSION)
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Partie 2 de l&apos;Oral (10 minutes) • Jeu de Rôle avec Sarah, CTO @Booki
            </span>
            <h3>Simulateur des 7 Questions Officielles de l&apos;Évaluateur</h3>
          </div>
          <div className="score-pill">
            Sujets maîtrisés :{' '}
            <strong>
              {masteredCount} / {SARAH_QUESTIONS.length}
            </strong>
          </div>
        </div>

        <div className="sarah-q-selector">
          {SARAH_QUESTIONS.map((q, idx) => {
            const isMastered = !!masteredQuestions[q.id];
            return (
              <button
                key={q.id}
                type="button"
                className={`q-nav-btn ${
                  activeQuestionIdx === idx ? 'active' : ''
                } ${isMastered ? 'mastered' : ''}`}
                onClick={() => selectQuestion(idx)}
              >
                <span className="q-num">Q{idx + 1}</span>
                <span className="q-short">
                  {q.topic.replace(/Sujet Officiel #\d+ — /, '')}
                </span>
                {isMastered && (
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                )}
              </button>
            );
          })}
        </div>

        <div className="sarah-roleplay-stage">
          <div className="sarah-dialog-header">
            <div className="persona-avatar sarah large">S</div>
            <div>
              <span className="sarah-topic-badge">{currentQ.topic}</span>
              <h4>Sarah (CTO @Booki) te pose cette question :</h4>
            </div>
          </div>

          <blockquote className="sarah-question-quote">
            {currentQ.question}
          </blockquote>

          <div className="sarah-action-buttons">
            <button
              type="button"
              className="btn-preset"
              onClick={() => setShowHint(!showHint)}
            >
              <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>{' '}
              {showHint ? 'Masquer l’indice' : '1. Besoin d’un indice ?'}
            </button>

            <button
              type="button"
              className="btn-preset success"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <i className="fa-solid fa-eye" aria-hidden="true"></i>{' '}
              {showAnswer
                ? 'Masquer la réponse modèle'
                : '2. Révéler les points clés & la réponse parfaite'}
            </button>

            <button
              type="button"
              className={`btn-check-audit ${
                masteredQuestions[currentQ.id] ? 'checked' : ''
              }`}
              onClick={() =>
                setMasteredQuestions((prev) => ({
                  ...prev,
                  [currentQ.id]: !prev[currentQ.id],
                }))
              }
            >
              <i
                className={`fa-solid ${
                  masteredQuestions[currentQ.id]
                    ? 'fa-circle-check'
                    : 'fa-thumbs-up'
                }`}
                aria-hidden="true"
              ></i>{' '}
              {masteredQuestions[currentQ.id]
                ? 'Question maîtrisée ✅'
                : 'Je sais répondre à cette question !'}
            </button>
          </div>

          {showHint && (
            <div className="hint-callout">
              <strong>💡 Indice pour structurer ta réponse :</strong>{' '}
              {currentQ.hint}
            </div>
          )}

          {showAnswer && (
            <div className="answer-reveal-grid">
              <div className="answer-points-box">
                <h5>✅ Les points techniques attendus par l&apos;évaluateur :</h5>
                <ul className="clean-bullet-list">
                  {currentQ.keyPoints.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="code-ref-pill">
                  <strong>📍 Quoi montrer dans ton code VS Code :</strong>{' '}
                  {currentQ.codeReference}
                </div>
              </div>

              <div className="ideal-speech-box">
                <h5>🎙️ Réponse modèle formulée naturellement :</h5>
                <p className="ideal-speech-text">{currentQ.idealAnswer}</p>
              </div>
            </div>
          )}

          <div className="q-pagination-row">
            <button
              type="button"
              className="btn-preset"
              disabled={activeQuestionIdx === 0}
              onClick={() => selectQuestion(activeQuestionIdx - 1)}
            >
              ← Question précédente
            </button>
            <span>
              Question {activeQuestionIdx + 1} sur {SARAH_QUESTIONS.length}
            </span>
            <button
              type="button"
              className="btn-preset"
              disabled={activeQuestionIdx === SARAH_QUESTIONS.length - 1}
              onClick={() => selectQuestion(activeQuestionIdx + 1)}
            >
              Question suivante →
            </button>
          </div>
        </div>

        <div className="step-footer-actions">
          <button
            type="button"
            className={`btn-complete-step ${isCompleted ? 'completed' : ''}`}
            onClick={onCompleteStep}
          >
            <i
              className="fa-solid fa-trophy"
              aria-hidden="true"
            ></i>
            {isCompleted
              ? '🎉 Félicitations Tag ! Tu es 100% prête pour ta soutenance Booki !'
              : 'Terminer l’entraînement & Célébrer ma préparation 🏆'}
          </button>
        </div>
      </section>
    </div>
  );
}
