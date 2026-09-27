/*
 * Profile facts. Each one is countable from a public source:
 *   years      — first role in June 2019 (resume)
 *   companies  — the five employers in the work history (resume)
 *   leading    — Lead Full Stack Developer since January 2023 (resume)
 *   packages   — packages maintained by ~beyonder.sb on npm
 */
export const profileFactsData = [
  { id: "fact-years", value: 7, suffix: "+", label: "Years building production software" },
  {
    id: "fact-companies",
    value: 5,
    suffix: "",
    label: "Companies, in Morocco and remote for the US",
  },
  { id: "fact-lead", value: 3, suffix: "+", label: "Years leading an engineering team" },
  { id: "fact-npm", value: 8, suffix: "", label: "Packages published on npm" },
] as const;
