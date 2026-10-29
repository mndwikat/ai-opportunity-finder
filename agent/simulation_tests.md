# Simulation tests

Built with ElevenLabs' Tests feature. In each simulation, an AI plays the employee for a full conversation (max 25 turns), and an evaluator judges the result against the success criteria. Each test was run 3 times, because model behaviour varies between runs.

## Test 1: Vague employee (Omar, HR Coordinator)

**Scenario**
```
You are Omar, an HR coordinator. You are a vague, hesitant speaker.

When first asked about your typical week, say only: "Oh, lots of different things really, it depends on the week." Do not list tasks until the interviewer asks a follow-up.

When asked what fills your week, mention payroll first and say: "Payroll, but that's all automated in Workday now, so not much work there."

When asked for another task, say onboarding, and in that same answer list all the steps: contracts, forms, setting people up in Workday, and emailing IT for laptops.

When asked how often onboarding happens, first say "quite a lot", then "it depends". Only give "about 5 a month" if the interviewer offers a range or asks about a specific recent period like last month.

When asked how long it takes, first say "a while". Give "about half a day each" only after the interviewer offers a range.

Your biggest frustration is chasing people for signatures with repeated reminder emails.

Only mention your second task, policy questions about holidays and sick leave (about 20 a week, a few minutes each), if the interviewer asks whether there is another task.

If the interviewer asks for something you already said, reply "as I said" and repeat it.
```

**Success criteria**
- The agent never asks for information Omar already gave.
- The agent gets a number for how often onboarding happens.
- The agent moves on from payroll because it is automated.
- The agent asks about a second task.
- The agent ends with a summary.

## Test 2: Worried employee (Laura, Customer Service Agent)

**Scenario**
```
You are Laura, a customer service agent.

Your very first reply, before answering anything, must be: "Wait, before I answer, is this going to be used to replace my job?"

You answer about 60 customer emails a day, mostly order status and returns, 3 to 4 minutes each, using Zendesk and the order system. Order status follows clear rules; returns sometimes need judgment about exceptions.

In your third or fourth reply, whatever the interviewer asks, you must add: "Honestly, the worst part is my manager. He's always on my back about response times."

When asked about frustrations, say you type the same answers all day. If asked what you would hand over, say drafting order status replies, though you would still check them.

After about eight exchanges, say: "Sorry, I have to jump on a call in a minute."
```

**Success criteria**
- The agent answers the job question honestly without promising anything.
- The agent steers back politely from the comment about the manager.
- The agent does not bring up job reassurance again unless Laura raises it herself.
- When Laura says she has to leave, the agent asks about AI concerns, gives at most a one-sentence summary, and closes.

## Test 3: Cooperative employee (Farah, Financial Analyst)

**Scenario**
```
You are Farah, a financial analyst who gives clear answers with numbers. You match about 150 supplier invoices a week against purchase orders, about 4 minutes each, using SAP, Outlook and Excel. It is mostly rules, with judgment for mismatches. Your frustration is copying numbers by hand into Excel. Your second task is a monthly budget report for 8 departments that takes about two days, using SAP exports, Excel and PowerPoint. You worry AI might approve a wrong invoice.
```

**Success criteria**
```
The agent covers two tasks in depth, asks only one question per turn, paraphrases before moving to the second task, asks about AI concerns, and ends with a summary.
```

## Results

| Stage | Pass rate |
|---|---|
| First prompt | 6/9 |
| After prompt fixes and corrected test criteria | 8/9 |

Two of the three early failures were problems with the tests themselves (an over-strict criterion, and a simulated user who never made the comment being tested), not with the agent. The remaining agent failure, accepting "every time there's an onboarding" as a frequency, led to the non-numeric answer rule in the prompt.

These tests were written for the discovery-only version of the agent. They still cover the core interviewing behaviour, and should be extended with idea-test scenarios.
