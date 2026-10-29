# Google Sheet setup

One spreadsheet, four tabs.

## Backlog (raw data, written by n8n)

Paste into A1 (tab-separated, it splits into columns):

```
date	conversation_id	employee	role	department	task	times_per_week	minutes_each	hours_per_year	pattern	idea	reaction	time_freed_pct	savings_basis	weighted_hours_saved	stays_human	worry	pattern_check	status
```

## Ranked (what a manager reads)

Cell A1:
```
=QUERY(Backlog!A1:S, "select C, D, F, K, L, I, O, P, Q where S = 'Ranked' order by O desc", 1)
```
Shows employee, role, task, idea, reaction, hours per year, weighted hours saved, what stays human and the employee's worry, ranked by weighted hours saved.

## Follow-up (missing data to chase)

Cell A1:
```
=QUERY(Backlog!A1:S, "select C, D, F, G, H, K, L where S = 'Needs follow-up'", 1)
```

## Not pursued (what not to do, and why)

Cell A1:
```
=QUERY(Backlog!A1:S, "select C, D, F, J, K, L, Q, S where S = 'Not wanted' or S = 'No clear fit'", 1)
```
