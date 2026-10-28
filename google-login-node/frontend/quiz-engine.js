// ==========================================================
// AGS ACADEMY - QUIZ ENGINE & INTERACTIVE RUNNER
// Handles:
// - Quiz State Management & Timer
// - Question Rendering & Realtime Feedback
// - Results Calculation, Score Persistence & Review Mode
// - Grid Filtering (All, Course Quizzes, Programming Topics)
// ==========================================================

(function() {
  const STORAGE_KEY = 'ags_quiz_history_v1';

  const state = {
    activeQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: [], // array of selected indices or null
    flagged: [],     // array of booleans
    timeRemaining: 0,// in seconds
    timerInterval: null,
    isSubmitted: false,
    isReviewMode: false,
    currentFilter: 'all', // 'all', 'course', 'programming'
    currentLevel: 'all',  // 'all', 'Beginner', 'Intermediate', 'Advanced'
    searchQuery: ''
  };

  // --------------------------------------------------------
  // STORAGE HELPERS
  // --------------------------------------------------------
  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveResult(quizId, score, total, percentage) {
    const history = getHistory();
    const existing = history[quizId] || { attempts: 0, bestScore: 0, bestPercentage: 0 };
    history[quizId] = {
      attempts: existing.attempts + 1,
      lastScore: score,
      lastTotal: total,
      lastPercentage: percentage,
      bestScore: Math.max(existing.bestScore, score),
      bestPercentage: Math.max(existing.bestPercentage, percentage),
      lastTakenAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save quiz history to localStorage', e);
    }
  }

  function getStats() {
    const history = getHistory();
    const quizzes = window.AGS_QUIZ_DATA ? Object.values(window.AGS_QUIZ_DATA) : [];
    const totalAvailable = quizzes.length;
    const completedIds = Object.keys(history);
    const completedCount = completedIds.length;
    
    let totalScoreSum = 0;
    completedIds.forEach(id => {
      totalScoreSum += history[id].bestPercentage || 0;
    });
    const avgScore = completedCount > 0 ? Math.round(totalScoreSum / completedCount) : 0;
    
    return {
      totalAvailable,
      completedCount,
      avgScore,
      remainingCount: Math.max(0, totalAvailable - completedCount)
    };
  }

  // --------------------------------------------------------
  // QUIZ GRID RENDERING
  // --------------------------------------------------------
  function getFilteredQuizzes() {
    if (!window.AGS_QUIZ_DATA) return [];
    let list = Object.values(window.AGS_QUIZ_DATA);

    if (state.currentFilter !== 'all') {
      list = list.filter(q => q.category === state.currentFilter);
    }

    if (state.currentLevel !== 'all') {
      list = list.filter(q => q.level === state.currentLevel);
    }

    if (state.searchQuery && state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(quiz => 
        quiz.title.toLowerCase().includes(q) ||
        quiz.description.toLowerCase().includes(q) ||
        (quiz.categoryLabel && quiz.categoryLabel.toLowerCase().includes(q))
      );
    }

    return list;
  }

  function renderQuizGrid() {
    const container = document.getElementById('quiz-cards-grid');
    if (!container) return;

    const history = getHistory();
    const quizzes = getFilteredQuizzes();

    // Update stats bar
    updateStatsBar();

    if (quizzes.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-[var(--line)] p-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center text-[var(--purple)] text-2xl">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="font-display font-700 text-xl text-[var(--ink)] mb-2">No Quizzes Found</h3>
          <p class="text-[var(--ink-soft)] text-sm max-w-md mx-auto mb-6">We couldn't find any quizzes matching your search or filters. Try adjusting your search term or select "All Quizzes".</p>
          <button onclick="window.AGS_QUIZ_ENGINE.resetFilters()" class="px-6 py-2.5 bg-[var(--purple)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--purple-deep)] transition">
            Clear Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = quizzes.map((quiz, idx) => {
      const result = history[quiz.id];
      const hasTaken = Boolean(result);
      const bestPercent = hasTaken ? result.bestPercentage : null;

      let levelBadgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
      if (quiz.level === 'Beginner') levelBadgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      if (quiz.level === 'Advanced') levelBadgeColor = 'bg-purple-50 text-purple-700 border-purple-200';

      const isCourseQuiz = quiz.category === 'course';
      const categoryBadge = isCourseQuiz 
        ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200"><i class="fas fa-graduation-cap text-[9px]"></i> Course Quiz</span>`
        : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"><i class="fas fa-code text-[9px]"></i> Programming</span>`;

      return `
        <div class="bg-white rounded-xl border border-[var(--line)] hover:border-purple-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
          <!-- Card Header with Gradient Accent -->
          <div class="p-3.5 sm:p-4 pb-2.5">
            <div class="flex items-start justify-between gap-2 mb-2">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${quiz.gradient} text-white flex items-center justify-center text-xs shadow-xs group-hover:scale-105 transition-transform">
                <i class="${quiz.icon}"></i>
              </div>
              <div class="flex flex-col items-end gap-0.5">
                ${categoryBadge}
                <span class="text-[9px] font-medium border px-1.5 py-0.5 rounded ${levelBadgeColor}">${quiz.level}</span>
              </div>
            </div>

            <h3 class="font-display font-semibold text-xs sm:text-sm text-[var(--ink)] mb-1 group-hover:text-[var(--purple)] transition-colors line-clamp-1" title="${quiz.title}">
              ${quiz.title}
            </h3>
            <p class="text-[11px] text-[var(--ink-soft)] leading-snug line-clamp-2 min-h-[28px] mb-2.5">
              ${quiz.description}
            </p>

            <div class="flex items-center justify-between text-[10px] text-[var(--ink-soft)] pt-2 border-t border-gray-100 font-medium">
              <span class="flex items-center gap-1"><i class="far fa-question-circle text-purple-600 text-[10px]"></i> ${quiz.questions.length} Questions</span>
              <span class="flex items-center gap-1"><i class="far fa-clock text-amber-600 text-[10px]"></i> ${quiz.timeLimitMinutes} Mins</span>
            </div>
          </div>

          <!-- Card Footer & Action Button -->
          <div class="mt-auto px-3.5 py-2 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
            <div>
              ${hasTaken ? `
                <div class="flex items-center gap-1 text-[10px] font-bold ${bestPercent >= 70 ? 'text-emerald-600' : 'text-amber-600'}">
                  <i class="fas fa-trophy text-[9px]"></i> Best: ${bestPercent}%
                </div>
                <span class="text-[9px] text-gray-400 font-medium">${result.attempts} attempt${result.attempts > 1 ? 's' : ''}</span>
              ` : `
                <span class="text-[10px] text-gray-400 font-medium flex items-center gap-1"><i class="far fa-circle text-[9px]"></i> Unattempted</span>
              `}
            </div>
            
            <button onclick="window.AGS_QUIZ_ENGINE.startQuiz('${quiz.id}')" class="px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-[var(--purple)] hover:bg-[var(--purple-deep)] shadow-xs transition flex items-center gap-1">
              ${hasTaken ? '<i class="fas fa-redo-alt text-[8px]"></i> Retake' : '<i class="fas fa-play text-[8px]"></i> Start'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function updateStatsBar() {
    const stats = getStats();
    const elAvailable = document.getElementById('quiz-stat-available');
    const elCompleted = document.getElementById('quiz-stat-completed');
    const elAvg = document.getElementById('quiz-stat-avg');
    const elRemaining = document.getElementById('quiz-stat-remaining');

    if (elAvailable) elAvailable.textContent = stats.totalAvailable;
    if (elCompleted) elCompleted.textContent = stats.completedCount;
    if (elAvg) elAvg.textContent = stats.avgScore + '%';
    if (elRemaining) elRemaining.textContent = stats.remainingCount;
  }

  // --------------------------------------------------------
  // QUIZ RUNNER LOGIC
  // --------------------------------------------------------
  function startQuiz(quizId) {
    // Check if user is paid
    const isPaid = window.isUserPaid || (!window.userEmail && localStorage.getItem('isPaidUser') === 'true');
    if (!isPaid) {
      const modal = document.getElementById('premium-modal');
      if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
          if (modal.children[1]) {
            modal.children[1].classList.remove('scale-95');
            modal.children[1].classList.add('scale-100');
          }
        }, 10);
      }
      return;
    }

    const quiz = window.AGS_QUIZ_DATA[quizId];
    if (!quiz) return;

    state.activeQuiz = quiz;
    state.currentQuestionIndex = 0;
    state.userAnswers = new Array(quiz.questions.length).fill(null);
    state.flagged = new Array(quiz.questions.length).fill(false);
    state.timeRemaining = quiz.timeLimitMinutes * 60;
    state.isSubmitted = false;
    state.isReviewMode = false;

    // Start timer
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(handleTimerTick, 1000);

    const dialog = document.getElementById('quiz-runner-dialog');
    if (dialog) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.classList.remove('hidden');
      }
    }

    renderActiveQuestion();
  }

  function handleTimerTick() {
    if (state.timeRemaining > 0) {
      state.timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(state.timerInterval);
      submitQuiz(true); // auto submit on time expired
    }
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('quiz-timer-display');
    if (!timerEl) return;
    const mins = Math.floor(state.timeRemaining / 60);
    const secs = state.timeRemaining % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerEl.textContent = formatted;

    if (state.timeRemaining < 60) {
      timerEl.className = 'font-mono text-sm font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full animate-pulse';
    } else {
      timerEl.className = 'font-mono text-sm font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full';
    }
  }

  function renderActiveQuestion() {
    const quiz = state.activeQuiz;
    if (!quiz) return;

    const qIndex = state.currentQuestionIndex;
    const totalQ = quiz.questions.length;
    const qData = quiz.questions[qIndex];

    // Header info
    document.getElementById('quiz-modal-title').textContent = quiz.title;
    document.getElementById('quiz-question-counter').textContent = `Question ${qIndex + 1} of ${totalQ}`;
    
    // Progress Bar
    const progressPercent = Math.round(((qIndex + 1) / totalQ) * 100);
    const progressEl = document.getElementById('quiz-progress-bar');
    if (progressEl) progressEl.style.width = `${progressPercent}%`;

    // Question Text & Code
    const container = document.getElementById('quiz-question-body');
    if (!container) return;

    let codeHtml = '';
    if (qData.code) {
      // Escape HTML in code snippet
      const escapedCode = qData.code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      codeHtml = `
        <div class="my-3 rounded-lg overflow-hidden border border-gray-800 bg-[#1e1e24] shadow-inner text-gray-200">
          <div class="px-3 py-1 bg-[#2a2a32] text-[10px] font-mono text-gray-400 border-b border-gray-700 flex items-center justify-between">
            <span>Code Snippet</span>
            <span class="flex gap-1">
              <span class="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
              <span class="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>
              <span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            </span>
          </div>
          <pre class="p-3 text-[11px] sm:text-xs font-mono overflow-x-auto leading-relaxed"><code>${escapedCode}</code></pre>
        </div>
      `;
    }

    const selectedOption = state.userAnswers[qIndex];
    const isFlagged = state.flagged[qIndex];

    const optionsHtml = qData.options.map((optText, optIdx) => {
      const isSelected = selectedOption === optIdx;
      let optionStateClasses = 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/40 bg-white';
      let radioClasses = 'border-gray-300 text-transparent';

      if (state.isReviewMode) {
        // In review mode: highlight correct in green, user wrong selection in red
        if (optIdx === qData.correctIndex) {
          optionStateClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
          radioClasses = 'border-emerald-500 bg-emerald-500 text-white';
        } else if (isSelected && isSelected !== qData.correctIndex) {
          optionStateClasses = 'border-red-400 bg-red-50 text-red-900';
          radioClasses = 'border-red-500 bg-red-500 text-white';
        }
      } else if (isSelected) {
        optionStateClasses = 'border-purple-600 bg-purple-50 ring-1 ring-purple-500/20 text-purple-950 font-semibold';
        radioClasses = 'border-purple-600 bg-purple-600 text-white';
      }

      const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

      return `
        <label class="flex items-center gap-2.5 p-2.5 rounded-lg border ${optionStateClasses} cursor-pointer transition-all duration-150 text-xs group select-none" onclick="window.AGS_QUIZ_ENGINE.selectOption(${optIdx})">
          <div class="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 transition-colors ${radioClasses}">
            ${letter}
          </div>
          <div class="flex-1 leading-snug">
            ${optText}
          </div>
          ${state.isReviewMode && optIdx === qData.correctIndex ? `<span class="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0"><i class="fas fa-check text-[9px]"></i> Correct</span>` : ''}
          ${state.isReviewMode && isSelected && isSelected !== qData.correctIndex ? `<span class="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded shrink-0"><i class="fas fa-times text-[9px]"></i> Your choice</span>` : ''}
        </label>
      `;
    }).join('');

    // Explanation Box if review mode
    let explanationHtml = '';
    if (state.isReviewMode) {
      explanationHtml = `
        <div class="mt-3 p-3 rounded-lg bg-amber-50/80 border border-amber-200">
          <div class="flex items-center gap-1.5 font-display font-bold text-amber-900 text-xs mb-0.5">
            <i class="fas fa-lightbulb text-amber-600 text-[11px]"></i> Explanation & Key Concept
          </div>
          <p class="text-[11px] sm:text-xs text-amber-950 leading-relaxed">
            ${qData.explanation}
          </p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="flex flex-col h-full">
        <div class="flex items-start justify-between gap-3 mb-1.5">
          <h4 class="font-display font-semibold text-sm sm:text-[15px] text-[var(--ink)] leading-snug">
            <span class="text-[var(--purple)] mr-1">Q${qIndex + 1}.</span> ${qData.question}
          </h4>
          ${!state.isReviewMode ? `
            <button onclick="window.AGS_QUIZ_ENGINE.toggleFlag()" class="shrink-0 px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition ${isFlagged ? 'bg-amber-100 text-amber-800' : 'text-gray-400 hover:text-amber-600'}" title="Flag for Review">
              <i class="fas fa-flag text-[10px]"></i> <span class="hidden sm:inline">${isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>
          ` : ''}
        </div>

        ${codeHtml}

        <div class="flex flex-col gap-2 mt-2.5">
          ${optionsHtml}
        </div>

        ${explanationHtml}
      </div>
    `;

    // Render palette
    renderQuestionPalette();

    // Update bottom nav buttons
    const prevBtn = document.getElementById('quiz-btn-prev');
    const nextBtn = document.getElementById('quiz-btn-next');
    const submitBtn = document.getElementById('quiz-btn-submit');

    if (prevBtn) prevBtn.disabled = qIndex === 0;
    
    if (nextBtn && submitBtn) {
      if (qIndex === totalQ - 1) {
        nextBtn.classList.add('hidden');
        if (!state.isReviewMode) submitBtn.classList.remove('hidden');
      } else {
        nextBtn.classList.remove('hidden');
        if (!state.isReviewMode) submitBtn.classList.add('hidden');
      }
    }
  }

  function renderQuestionPalette() {
    const palette = document.getElementById('quiz-palette-container');
    if (!palette || !state.activeQuiz) return;

    const total = state.activeQuiz.questions.length;
    palette.innerHTML = state.activeQuiz.questions.map((_, idx) => {
      const isCurrent = state.currentQuestionIndex === idx;
      const isAnswered = state.userAnswers[idx] !== null;
      const isFlagged = state.flagged[idx];

      let btnClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
      if (state.isReviewMode) {
        const isCorrect = state.userAnswers[idx] === state.activeQuiz.questions[idx].correctIndex;
        btnClass = isCorrect ? 'bg-emerald-500 text-white font-bold' : 'bg-red-500 text-white font-bold';
      } else if (isCurrent) {
        btnClass = 'bg-purple-600 text-white ring-1 ring-purple-300 font-bold';
      } else if (isAnswered) {
        btnClass = 'bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300';
      } else if (isFlagged) {
        btnClass = 'bg-amber-100 text-amber-800 font-semibold border border-amber-300';
      }

      return `
        <button onclick="window.AGS_QUIZ_ENGINE.jumpToQuestion(${idx})" class="w-6 h-6 rounded text-[10px] font-medium flex items-center justify-center transition-all ${btnClass} relative" title="Question ${idx + 1}">
          ${idx + 1}
          ${isFlagged && !state.isReviewMode ? '<span class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>' : ''}
        </button>
      `;
    }).join('');
  }

  function selectOption(index) {
    if (state.isReviewMode) return; // Read-only in review
    state.userAnswers[state.currentQuestionIndex] = index;
    renderActiveQuestion();
  }

  function toggleFlag() {
    if (state.isReviewMode) return;
    const current = state.flagged[state.currentQuestionIndex];
    state.flagged[state.currentQuestionIndex] = !current;
    renderActiveQuestion();
  }

  function nextQuestion() {
    if (!state.activeQuiz) return;
    if (state.currentQuestionIndex < state.activeQuiz.questions.length - 1) {
      state.currentQuestionIndex++;
      renderActiveQuestion();
    }
  }

  function prevQuestion() {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderActiveQuestion();
    }
  }

  function jumpToQuestion(index) {
    if (!state.activeQuiz) return;
    if (index >= 0 && index < state.activeQuiz.questions.length) {
      state.currentQuestionIndex = index;
      renderActiveQuestion();
    }
  }

  function submitQuiz(forced = false) {
    if (!state.activeQuiz) return;

    if (!forced) {
      const unanswered = state.userAnswers.filter(a => a === null).length;
      if (unanswered > 0) {
        const confirmMsg = `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Are you sure you want to submit?`;
        if (!confirm(confirmMsg)) return;
      }
    }

    if (state.timerInterval) clearInterval(state.timerInterval);

    // Calculate score
    let correctCount = 0;
    const totalQuestions = state.activeQuiz.questions.length;
    state.activeQuiz.questions.forEach((q, idx) => {
      if (state.userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Persist result
    saveResult(state.activeQuiz.id, correctCount, totalQuestions, percentage);
    updateStatsBar();

    // Show result view
    renderResultsView(correctCount, totalQuestions, percentage);
  }

  function renderResultsView(score, total, percentage) {
    const container = document.getElementById('quiz-question-body');
    if (!container) return;

    state.isSubmitted = true;

    // Header info update
    document.getElementById('quiz-question-counter').textContent = 'Assessment Finished';
    const timerEl = document.getElementById('quiz-timer-display');
    if (timerEl) timerEl.textContent = 'Completed';

    let celebration = {
      title: 'Outstanding Achievement! 🏆',
      msg: 'You have mastered this technical domain with top honors!',
      badgeColor: 'text-amber-500 bg-amber-100',
      icon: 'fas fa-medal'
    };

    if (percentage < 60) {
      celebration = {
        title: 'Keep Practicing! 💡',
        msg: 'Solid effort! Review your answers below to sharpen your knowledge.',
        badgeColor: 'text-blue-500 bg-blue-100',
        icon: 'fas fa-book-reader'
      };
    } else if (percentage < 85) {
      celebration = {
        title: 'Great Job! 🎉',
        msg: 'Strong technical understanding! Review details to achieve 100%.',
        badgeColor: 'text-emerald-500 bg-emerald-100',
        icon: 'fas fa-star'
      };
    }

    container.innerHTML = `
      <div class="py-4 text-center flex flex-col items-center max-w-sm mx-auto">
        <div class="w-12 h-12 rounded-xl ${celebration.badgeColor} flex items-center justify-center text-xl mb-2.5 shadow-xs">
          <i class="${celebration.icon}"></i>
        </div>

        <h3 class="font-display font-bold text-lg sm:text-xl text-[var(--ink)] mb-0.5">${celebration.title}</h3>
        <p class="text-[11px] text-[var(--ink-soft)] mb-4">${celebration.msg}</p>

        <!-- Score Ring Card -->
        <div class="w-full bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-3 mb-4 flex items-center justify-around">
          <div class="text-center">
            <span class="block font-display font-bold text-xl sm:text-2xl text-[var(--purple-deep)]">${percentage}%</span>
            <span class="text-[9px] font-bold text-purple-700 uppercase tracking-wider">Final Score</span>
          </div>
          <div class="h-8 w-px bg-purple-200"></div>
          <div class="text-center">
            <span class="block font-display font-bold text-xl sm:text-2xl text-emerald-600">${score}/${total}</span>
            <span class="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">Correct</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 w-full">
          <button onclick="window.AGS_QUIZ_ENGINE.reviewQuiz()" class="flex-1 py-2 px-3.5 bg-[var(--purple)] hover:bg-[var(--purple-deep)] text-white rounded-lg font-semibold text-xs shadow-xs transition flex items-center justify-center gap-1.5">
            <i class="fas fa-file-alt text-[10px]"></i> Detailed Review
          </button>
          <button onclick="window.AGS_QUIZ_ENGINE.retakeQuiz()" class="flex-1 py-2 px-3.5 bg-white border border-gray-300 hover:bg-gray-50 text-[var(--ink)] rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1.5">
            <i class="fas fa-redo-alt text-[10px]"></i> Retake Quiz
          </button>
        </div>
      </div>
    `;

    // Hide Next and Submit buttons on result screen
    const nextBtn = document.getElementById('quiz-btn-next');
    const submitBtn = document.getElementById('quiz-btn-submit');
    const prevBtn = document.getElementById('quiz-btn-prev');
    if (nextBtn) nextBtn.classList.add('hidden');
    if (submitBtn) submitBtn.classList.add('hidden');
    if (prevBtn) prevBtn.classList.add('hidden');
  }

  function reviewQuiz() {
    state.isReviewMode = true;
    state.currentQuestionIndex = 0;
    renderActiveQuestion();

    // In review mode: allow stepping through questions
    const nextBtn = document.getElementById('quiz-btn-next');
    const prevBtn = document.getElementById('quiz-btn-prev');
    const submitBtn = document.getElementById('quiz-btn-submit');
    if (nextBtn) nextBtn.classList.remove('hidden');
    if (prevBtn) prevBtn.classList.remove('hidden');
    if (submitBtn) submitBtn.classList.add('hidden');
  }

  function retakeQuiz() {
    if (!state.activeQuiz) return;
    startQuiz(state.activeQuiz.id);
  }

  function exitQuiz() {
    if (!state.isSubmitted && state.activeQuiz) {
      if (!confirm('Are you sure you want to exit? Your progress in this attempt will not be saved.')) {
        return;
      }
    }

    if (state.timerInterval) clearInterval(state.timerInterval);

    const dialog = document.getElementById('quiz-runner-dialog');
    if (dialog) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.classList.add('hidden');
      }
    }

    state.activeQuiz = null;
    renderQuizGrid();
  }

  // --------------------------------------------------------
  // FILTER HANDLERS
  // --------------------------------------------------------
  function setCategoryFilter(category) {
    state.currentFilter = category;
    document.querySelectorAll('[data-quiz-filter]').forEach(btn => {
      if (btn.getAttribute('data-quiz-filter') === category) {
        btn.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-[var(--purple)] text-white shadow-sm transition';
      } else {
        btn.className = 'px-4 py-2 rounded-xl text-xs font-semibold bg-white text-[var(--ink-soft)] border border-[var(--line)] hover:border-purple-300 transition';
      }
    });
    renderQuizGrid();
  }

  function setLevelFilter(level) {
    state.currentLevel = level;
    renderQuizGrid();
  }

  function setSearchQuery(query) {
    state.searchQuery = query;
    renderQuizGrid();
  }

  function resetFilters() {
    state.currentFilter = 'all';
    state.currentLevel = 'all';
    state.searchQuery = '';
    const searchInput = document.getElementById('quiz-search-input');
    if (searchInput) searchInput.value = '';
    const levelSelect = document.getElementById('quiz-level-filter');
    if (levelSelect) levelSelect.value = 'all';
    setCategoryFilter('all');
  }

  // Fallback for light-dismiss on browsers that don't support closedby
  function setupDialogBackdropDismiss() {
    const dialog = document.getElementById('quiz-runner-dialog');
    if (!dialog) return;

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (isDialogContent) return;
        exitQuiz();
      });
    }
  }

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    const dialog = document.getElementById('quiz-runner-dialog');
    if (!dialog || !dialog.open || !state.activeQuiz) return;

    // Number keys 1-4 or letters A-D to pick option
    if (!state.isReviewMode) {
      if (['1', '2', '3', '4'].includes(e.key)) {
        selectOption(parseInt(e.key, 10) - 1);
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        selectOption(e.key.toLowerCase().charCodeAt(0) - 97);
      }
    }

    if (e.key === 'ArrowRight') nextQuestion();
    if (e.key === 'ArrowLeft') prevQuestion();
  });

  // Export API
  window.AGS_QUIZ_ENGINE = {
    init: function() {
      setupDialogBackdropDismiss();
      renderQuizGrid();
    },
    renderQuizGrid,
    startQuiz,
    selectOption,
    toggleFlag,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    submitQuiz,
    reviewQuiz,
    retakeQuiz,
    exitQuiz,
    setCategoryFilter,
    setLevelFilter,
    setSearchQuery,
    resetFilters
  };

})();
