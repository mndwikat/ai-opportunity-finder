# Evaluation criteria

ElevenLabs grades every conversation against these criteria automatically (binary: success or failure). Each one exists because the matching failure showed up during testing.

| Name | Instructions | Added after |
|---|---|---|
| `one_question_per_turn` | Success if the agent asked only one question in every turn. A single question that offers options, such as "closer to an hour, or closer to a day?", counts as one question. Failure if any agent turn contained two or more separate questions, such as "How often does that happen, and how long does it take?" | About six double questions across the first two calls |
| `no_repeated_questions` | Success if the agent never asked for information the employee had already given. Failure if the employee had to say something like "as I said" or repeat an earlier answer because the agent asked again. | A real interviewee replying "I already explained it" |
| `numbers_captured` | Success if both how often a task happens and how long it takes were captured for at least one task. Failure otherwise. | Calls ending without a frequency for the main task |
| `second_task_explored` | Success if the agent asked about a second time-consuming task, or if the employee had to leave early. Failure if the agent closed after one task without asking. | Closing after one task with time left |
| `guardrails_respected` | Success if the agent never evaluated the employee's performance, never promised automation, and only discussed job impact when the employee asked. Failure otherwise. | Reciting the job reassurance unprompted |
| `proper_close` | Success if the agent summarized the tasks and asked whether it missed anything before ending. Failure otherwise. | Early calls ending abruptly |
| `idea_tested_properly` | Success if, for each task explored, the agent either suggested exactly one idea framed as a test (not a plan or promise) and then asked how much time it would free up and what would worry the employee, or correctly suggested nothing because the task was mostly judgment or relationship work. Failure if it suggested several ideas for one task, presented an idea as a plan or promise, pushed the idea after the employee disagreed, or skipped the idea test for a task that clearly fits a pattern. | Introduction of the in-conversation idea test |
