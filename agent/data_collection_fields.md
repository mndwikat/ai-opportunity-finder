# Data collection fields

After every conversation, ElevenLabs reads the transcript and fills these 25 fields (the plan limit). Analysis language is set to English, so the data stays comparable whatever language the interview was in.

Every number field says "leave empty, do not guess". A missing value is flagged for follow-up downstream instead of being invented.

All fields use scope **Conversation** and the agent's default analysis model.

## Per task (12 fields, repeated for `task_1_` and `task_2_`)

The descriptions below are written for task 1. For task 2, replace "task 1" with "task 2" and "first" with "second".

| Identifier | Type | Enum values | Description |
|---|---|---|---|
| `task_1_name` | String | | Short name of the first task the employee described, 2 to 5 words, for example "Invoice matching", even if details or numbers are missing. Leave empty only if the employee never described any task. |
| `task_1_times_per_week` | Number | | How many times task 1 happens per week. Convert if needed: monthly divided by 4.3, daily multiplied by 5. Leave empty if never stated. Do not guess. |
| `task_1_minutes_each` | Number | | Average minutes task 1 takes each time it happens. Convert hours or days to minutes (1 working day = 480). If a range was given, use the middle. Leave empty if never stated. Use only the employee's own hands-on working time. If only the total elapsed time including waiting for others was given, leave empty. |
| `task_1_tools` | String | | Tools, systems or documents used for task 1, comma-separated. Leave empty if not mentioned. |
| `task_1_frustration` | String | | The main frustration with task 1, in one short phrase. |
| `task_1_pattern` | String | document_data_extraction, drafting_from_templates, summarizing_and_research, policy_qa_assistant, email_triage_and_replies, automated_follow_ups, report_consolidation, process_automation, no_clear_fit, not_assessed | The solution pattern of the idea the agent suggested for task 1: document_data_extraction (reads documents and fills a system), drafting_from_templates (first drafts from templates), summarizing_and_research (summaries of long documents), policy_qa_assistant (answers routine questions from policies), email_triage_and_replies (sorts messages and drafts replies), automated_follow_ups (automatic reminders chasing people), report_consolidation (gathers data into a report), process_automation (runs the standard steps of a routine multi-step process). Use no_clear_fit only if the agent judged the work to be mostly judgment, negotiation, relationships or meetings. Use not_assessed if the task was discussed but the agent suggested no idea for another reason, such as missing detail. |
| `task_1_idea` | String | | The idea the agent suggested for task 1, in one sentence, as the agent described it. Leave empty if no idea was suggested. |
| `task_1_reaction` | String | wants_it, maybe, does_not_want, not_tested | How the employee reacted to the idea for task 1. wants_it if clearly positive, maybe if positive but with significant doubts or conditions, does_not_want if negative, not_tested if no idea was suggested. |
| `task_1_time_freed_pct` | Number | | The employee's own estimate of how much of their time on task 1 the idea would free up, as a percentage from 0 to 100. Convert words: half = 50, a third = 33, most of it = 75, a little = 10. Leave empty if they gave no estimate. Do not guess. |
| `task_1_worry` | String | | The employee's main worry, objection or open question about the idea for task 1, in one sentence. If they rejected the idea, their reason. Leave empty if none. |
| `task_1_input_type` | String | documents, emails_or_messages, system_or_spreadsheet_data, conversations_or_meetings, mixed | What the employee mainly works from in task 1. documents means PDFs, scans or forms. |
| `task_1_output_type` | String | data_entry, document, report, answer_or_reply, approval_or_decision, coordination_or_chasing | What task 1 mainly produces. |

## Overall (1 field)

| Identifier | Type | Description |
|---|---|---|
| `ai_concerns` | String | The employee's main concern about using AI, in one sentence. Write "none" if they said they had none. |
