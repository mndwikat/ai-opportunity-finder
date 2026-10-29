# n8n workflow

Three nodes:

1. **Receive call from ElevenLabs** (Webhook, POST). Receives the post-call payload.
2. **Score tasks** (Code, Run Once for All Items). The code is in [`score_tasks.js`](score_tasks.js).
3. **Add to backlog** (Google Sheets, Append Row, Map Automatically, Cell Format: Let Google Sheets format).

## Setup

1. Import `workflow.json` into n8n (or build the three nodes above).
2. Connect your Google Sheets credential and select your copy of the sheet (see [`../sheets/sheet_setup.md`](../sheets/sheet_setup.md)).
3. Publish the workflow and copy the webhook's **Production URL**.
4. In ElevenLabs, go to the ElevenAgents settings, create a post-call webhook with that URL, select the **Transcript** event, and assign it to the agent.

The webhook ID in `workflow.json` has been replaced with `YOUR-WEBHOOK-ID`.

## Testing without spending call credits

Paste a sample payload as mock data in the webhook node and execute the workflow. Remove the mock data before real calls.

```json
{"type":"post_call_transcription","data":{"conversation_id":"sample_farah","agent_id":"agent_sample","conversation_initiation_client_data":{"dynamic_variables":{"employee_name":"Farah","role":"Financial Analyst","department":"Finance","company_name":"Acme Corp"}},"analysis":{"data_collection_results":{"task_1_name":{"value":"Invoice matching"},"task_1_times_per_week":{"value":150},"task_1_minutes_each":{"value":4},"task_1_tools":{"value":"Outlook, SAP, Excel"},"task_1_frustration":{"value":"Copying numbers from PDFs into Excel"},"task_1_pattern":{"value":"document_data_extraction"},"task_1_idea":{"value":"A tool that reads the supplier invoice PDFs and fills in the Excel tracker automatically, so she only checks the entries."},"task_1_reaction":{"value":"wants_it"},"task_1_time_freed_pct":{"value":50},"task_1_worry":{"value":"That it reads a number wrong and she doesn't notice."},"task_1_input_type":{"value":"documents"},"task_1_output_type":{"value":"data_entry"},"ai_concerns":{"value":"AI misreading numbers"}}}}}
```

Expected row: 460 hours per year, 50% (employee estimate), weighted 230, pattern check ok, status Ranked.
