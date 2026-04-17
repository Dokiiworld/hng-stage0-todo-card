HNG Stage 1a – Advanced Todo Card

Overview

This project is an upgraded version of the Stage 0 Todo Card. It introduces interactivity, state management, and improved accessibility while keeping a single-card structure.

WHAT CHANGED FROM STAGE 0
Added edit mode (title, description, priority, due date)
Added status dropdown (Pending, In Progress, Done)
Implemented state persistence using localStorage
Added expand/collapse description feature
Improved live time remaining logic (updates every 30–60s)
Added overdue detection and indicator
Enhanced UI with animations, gradients, and priority styling
Status is now fully synced with checkbox and progress bar

DESIGN DECISIONS
Used status dropdown as single source of truth
Semantic HTML (article, time, button, select)
Keyboard-first navigation with logical tab order
Focus management in edit mode
Visual state changes for priority, completion, and overdue states
Lightweight vanilla JS (no frameworks)


ACCESSIBILITY NOTES
Fully keyboard navigable
Proper ARIA labels for status, expand, and overdue indicator
Live time updates use aria-live="polite"
Focus moves into edit form and returns to Edit button after save/cancel
No tabindex overrides used (natural DOM order maintained)


LIMITATIONS
Single todo card only (no multi-task list)
No backend or API integration
Uses localStorage only for persistence
No form validation rules implemented