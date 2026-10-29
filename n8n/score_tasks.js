// n8n Code node: "Score tasks"
// Mode: Run Once for All Items
//
// Input: the ElevenLabs post-call webhook payload (post_call_transcription).
// Output: one row per task, appended to the "Backlog" sheet.
//
// Everything here is fixed rules. No LLM is called after the conversation,
// so every number can be traced back to what the employee said.

const raw = $input.first().json;
const body = raw.body ?? raw;
const d = body.data ?? {};
const vars = d.conversation_initiation_client_data?.dynamic_variables ?? {};
const dc = d.analysis?.data_collection_results ?? {};

const val = (k) => {
  const x = dc[k]?.value;
  return x === undefined || x === null || x === '' ? null : x;
};
const num = (x) => (x === null || isNaN(Number(x)) ? null : Number(x));

// Pattern library: default savings (used only when the employee gave no estimate),
// output types that fit the pattern, and what stays with a person.
const PATTERNS = {
  document_data_extraction: { pct: 50, outputs: ['data_entry'], human: 'Checks extracted entries and handles mismatches' },
  drafting_from_templates: { pct: 30, outputs: ['document', 'answer_or_reply', 'report'], human: 'Reviews and approves every draft' },
  summarizing_and_research: { pct: 30, outputs: ['document', 'report', 'approval_or_decision', 'answer_or_reply'], human: 'Verifies sources and makes the final judgment' },
  policy_qa_assistant: { pct: 40, outputs: ['answer_or_reply'], human: 'Handles exceptions and unusual questions' },
  email_triage_and_replies: { pct: 30, outputs: ['answer_or_reply', 'coordination_or_chasing'], human: 'Reviews replies before sending' },
  automated_follow_ups: { pct: 30, outputs: ['coordination_or_chasing', 'approval_or_decision'], human: 'Handles escalations when reminders are ignored' },
  report_consolidation: { pct: 40, outputs: ['report'], human: 'Reviews the numbers and writes the commentary' },
  process_automation: { pct: 40, outputs: ['coordination_or_chasing', 'document', 'data_entry', 'approval_or_decision'], human: 'Makes the decisions and approves each case' },
  no_clear_fit: { pct: 0, outputs: [], human: 'The whole task stays with the person' },
  not_assessed: { pct: 0, outputs: [], human: 'To be assessed in follow-up' },
};

// How much each reaction counts in the ranking.
const WEIGHT = { wants_it: 1, maybe: 0.5, does_not_want: 0, not_tested: 0 };

const rows = [];
for (const n of [1, 2]) {
  const task = val(`task_${n}_name`);
  if (!task) continue;

  // Hours per year = times per week x minutes each x 46 working weeks / 60
  const freq = num(val(`task_${n}_times_per_week`));
  const mins = num(val(`task_${n}_minutes_each`));
  const hours = freq !== null && mins !== null ? Math.round((freq * mins * 46) / 60) : null;

  const pattern = val(`task_${n}_pattern`) ?? 'not_assessed';
  const p = PATTERNS[pattern] ?? PATTERNS.not_assessed;
  const reaction = val(`task_${n}_reaction`) ?? 'not_tested';

  // The employee's own estimate comes first; the pattern default is a labelled fallback.
  const empPct = num(val(`task_${n}_time_freed_pct`));
  const pct = empPct ?? p.pct;
  const basis = empPct !== null ? 'Employee estimate' : 'Pattern assumption';

  const saved = hours !== null ? Math.round((hours * pct) / 100) : null;
  const weighted = saved !== null ? Math.round(saved * (WEIGHT[reaction] ?? 0)) : null;

  // Rules check: does the agent's chosen pattern fit what the task produces?
  const output = val(`task_${n}_output_type`);
  const input = val(`task_${n}_input_type`);
  let check;
  if (pattern === 'no_clear_fit' || pattern === 'not_assessed') check = 'n/a';
  else if (!output) check = 'unknown';
  else {
    check = p.outputs.includes(output) ? 'ok' : 'review';
    if (pattern === 'document_data_extraction' && input && !['documents', 'emails_or_messages', 'mixed'].includes(input)) check = 'review';
  }

  let status;
  if (pattern === 'not_assessed') status = 'Needs follow-up';
  else if (pattern === 'no_clear_fit') status = 'No clear fit';
  else if (reaction === 'does_not_want') status = 'Not wanted';
  else if (reaction === 'not_tested' || hours === null) status = 'Needs follow-up';
  else status = 'Ranked';

  rows.push({
    date: new Date().toISOString().slice(0, 10),
    // Short clickable label that opens the transcript in ElevenLabs.
    // Requires "Cell Format: Let Google Sheets format" in the Google Sheets node.
    conversation_id: d.conversation_id
      ? `=HYPERLINK("https://elevenlabs.io/app/agents/agents/${d.agent_id}/history/${d.conversation_id}", "${d.conversation_id.slice(-6)}")`
      : '',
    employee: vars.employee_name ?? '',
    role: vars.role ?? '',
    department: vars.department ?? '',
    task,
    times_per_week: freq ?? '',
    minutes_each: mins ?? '',
    hours_per_year: hours ?? '',
    pattern,
    idea: val(`task_${n}_idea`) ?? '',
    reaction,
    time_freed_pct: pct,
    savings_basis: basis,
    weighted_hours_saved: weighted ?? '',
    stays_human: p.human,
    worry: val(`task_${n}_worry`) ?? '',
    pattern_check: check,
    status,
  });
}

return rows.map((r) => ({ json: r }));
