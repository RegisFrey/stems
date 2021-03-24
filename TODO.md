Various things that could be useful to add

- Real Tests
- Examples
- Documentation
- Benchmarks
- Weighted Choices
  assign choices weights to make some more common than others
  * with custom weighting functions
  * dynamic weighting functions
    weight based on depth (to encourage closure in exploding grammars)
    or based on other variable choices
    questions on best api / notation https://github.com/galaxykate/tracery/issues/5
- Prevent Repeats
- Variable Based Choice
  use variables to influence choice selection
- Variable Creation and Manipulation
  choices can set or modify variables
- Seeded Choices
  provide complete or partial variable sets and expand text using those
- Recorders
  allow attaching a `recorder` that documents the path through the grammar + chance and variable selection at each step
- Evaluator
  write an `evaluator` that takes a grammar, checks for missing or unused stemReferences, checks for missing or unused modifiers, and calculates # of variations, rarities of leaves, or whatever else is useful or interesting
- Editor / Workbench
  a UI to build, edit, analyize grammars
- Plurilization Modifier?
- Partial Plurilization Modifier?
- Titlecase Modifier?
- Other modifiers? "ing" modifier? first plural?
- Localization Support / Workflow?

Q: how many modifiers (none, current defaults, all) do we build in vs. encourage users to add when they use? Do we provide modifiers but leave them off default (better for treeshaking). Do we have an include all built in modifiers mode, e.g. for a realtime workbench scenerio where we can know up front which will be used in a grammar?