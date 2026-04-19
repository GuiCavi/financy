---
description: This workflow validates a web prototype using the Antigravity internal browser
---

# Validate Prototype Workflow

This workflow guides the agent to automatically test and validate a running web prototype utilizing the internal `browser_subagent` tool.

## Step 1: Identify the Local URL
First, determine the local URL where the prototype is running. By default, check common ports like 3000, 5173, etc., or use the URL provided in the user's browser state if it's active. Ask the user if the correct URL is unclear.

## Step 2: Formulate Validation Scenario
Based on the current context (e.g., the component being edited, like a form or page), define a specific interaction scenario to test. Determine what elements should be present, what buttons should be clicked, and what the expected outcome is.

## Step 3: Execute Browser Subagent
Invoke the `browser_subagent` tool to interact with and validate the prototype.
When setting up the tool call, you MUST provide:
- `TaskName`: A human-readable title (e.g., "Validating Registration Form").
- `Task`: A highly detailed set of instructions telling the subagent exactly what to do. Specify elements to look for, actions to perform (clicking, typing), and a clear stopping condition (e.g., "Stop after submitting the form and verifying the success message appears").
- `TaskSummary`: A short 1-2 sentence summary of the goal.
- `RecordingName`: A descriptive name for the WebP video recording (e.g., "registration_form_validation").

## Step 4: Analyze Subagent Results
After the subagent returns, carefully review its report to evaluate the outcome.
Verify if the subagent was able to complete the assigned task, or if it encountered issues like missing elements, non-functional buttons, or console errors.

## Step 5: Summarize Findings
Summarize the validation results for the user. Highlight what worked correctly, clearly state any defects or strange behaviors found by the subagent, and suggest any necessary code fixes to resolve the issues.
