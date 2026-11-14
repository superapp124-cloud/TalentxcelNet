export interface SSBWatWord {
  id: number
  word: string
  officerSentence: string
  olqDemonstrated: string
}

export interface SSBSrtScenario {
  id: number
  situation: string
  recommendedReaction: string
  olqDemonstrated: string
}

export interface SSBPpdtCard {
  id: string
  title: string
  scenarioDescription: string
  characterContext: {
    age: number
    gender: 'M' | 'F'
    mood: 'Positive' | 'Neutral'
  }
  actionPlan: string
  sampleStory: string
  keyOfficerQualities: string[]
}

export const SSB_WAT_WORDS: SSBWatWord[] = [
  { id: 1, word: 'Courage', officerSentence: 'Courage enables leaders to take calculated risks under adversity.', olqDemonstrated: 'Courage & Initiative' },
  { id: 2, word: 'Responsibility', officerSentence: 'Accepting responsibility builds unwavering team credibility.', olqDemonstrated: 'Sense of Responsibility' },
  { id: 3, word: 'Defeat', officerSentence: 'Analysis of defeat reveals lessons for future victory.', olqDemonstrated: 'Determination & Mental Stamina' },
  { id: 4, word: 'Discipline', officerSentence: 'Discipline streamlines unit synchronization during crisis.', olqDemonstrated: 'Discipline & Reliability' },
  { id: 5, word: 'Danger', officerSentence: 'Alert guards preempt danger through proactive vigilance.', olqDemonstrated: 'Vigilance & Situational Awareness' },
  { id: 6, word: 'Team', officerSentence: 'Diverse teams innovate faster through collaborative brainstorming.', olqDemonstrated: 'Team Cohesion' },
  { id: 7, word: 'Failure', officerSentence: 'Iterative refinement turns early failures into breakthroughs.', olqDemonstrated: 'Perseverance' },
  { id: 8, word: 'Command', officerSentence: 'Effective command inspires trust through personal example.', olqDemonstrated: 'Leadership By Example' },
  { id: 9, word: 'Challenge', officerSentence: 'Cadets welcome challenges to hone their tactical edge.', olqDemonstrated: 'Enthusiasm & Grit' },
  { id: 10, word: 'Fear', officerSentence: 'Rigorous combat drills conquer situational fear.', olqDemonstrated: 'Self-Confidence' },
  { id: 11, word: 'Sacrifice', officerSentence: 'Defending sovereign borders is the supreme national honour.', olqDemonstrated: 'Patriotism' },
  { id: 12, word: 'Decision', officerSentence: 'Decisive commanders act swiftly on empirical reconnaissance.', olqDemonstrated: 'Speed of Decision' },
  { id: 13, word: 'Alone', officerSentence: 'Solo navigation builds supreme self-reliance.', olqDemonstrated: 'Self-Reliance' },
  { id: 14, word: 'Obstacle', officerSentence: 'Engineers construct modular bridges to overcome terrain obstacles.', olqDemonstrated: 'Resourcefulness' },
  { id: 15, word: 'Victory', officerSentence: 'Victory crowns relentless preparation and synchronized coordination.', olqDemonstrated: 'Achievement Drive' },
]

export const SSB_SRT_SCENARIOS: SSBSrtScenario[] = [
  {
    id: 1,
    situation: 'He was traveling by train to attend his SSB interview when he noticed heavy smoke billowing from the adjoining compartment. He...',
    recommendedReaction: 'Immediately pulled the emergency chain, alerted co-passengers, grabbed the onboard fire extinguisher, guided evacuees safely, helped extinguish the fire, and resumed journey.',
    olqDemonstrated: 'Initiative, Courage & Speed of Decision',
  },
  {
    id: 2,
    situation: 'While trekking in a remote forest with his group, the leader slipped down a steep gorge and fractured his leg. He...',
    recommendedReaction: 'Applied a sturdy field splint using tree branches, administered first aid, dispatched two team members to nearest signal point, set up emergency bivouac, and guided search team to coordinates.',
    olqDemonstrated: 'Resourcefulness, Leadership & Calm under Pressure',
  },
  {
    id: 3,
    situation: 'His teammates disagreed sharply with his plan during the final stage of the Command Task. He...',
    recommendedReaction: 'Listened calmly to their input, explained the tactical merit of his approach, integrated their valid safety suggestions, and executed the mission cohesively.',
    olqDemonstrated: 'Cooperation & Social Adaptability',
  },
  {
    id: 4,
    situation: 'On his way to an urgent official examination, he saw an elderly person struck by a speeding vehicle lying injured on the road. He...',
    recommendedReaction: 'Rendered immediate pressure bandage to control bleeding, hailed a passing vehicle to transport him to nearest clinic, notified family and police, and proceeded to exam.',
    olqDemonstrated: 'Sense of Responsibility & Practical Sense',
  },
  {
    id: 5,
    situation: 'He discovered that one of his subordinate team members was secretly selling organization materials. He...',
    recommendedReaction: 'Gathered objective evidence, confronted him firmly, informed higher authorities according to SOP, and initiated procedural inquiry.',
    olqDemonstrated: 'Integrity & Moral Courage',
  },
]

export const SSB_PPDT_CARDS: SSBPpdtCard[] = [
  {
    id: 'ppdt-flood-relief',
    title: 'Disaster Relief Coordination & Village Evacuation',
    scenarioDescription: 'A hazy scene showing a young officer in uniform talking urgently with two village elders near a swollen river embankment with boats in the background.',
    characterContext: { age: 24, gender: 'M', mood: 'Positive' },
    actionPlan: 'Mobilize local boats, establish sandbag reinforcement on vulnerable embankment, evacuate women, children and livestock to village high school, organize food packets and clean water distribution.',
    sampleStory:
      'Captain Rohit, an army engineer deployed in flood-prone districts, noticed rising river levels threatening Rampur village. He immediately coordinated with the District Magistrate, mobilized his unit’s inflatable assault boats, and organized village youth into rescue teams. Under his leadership, sandbag levees were reinforced within 4 hours, and 300 vulnerable residents were relocated to high ground with medical aid and warm rations. His proactive planning prevented village inundation and ensured zero casualties.',
    keyOfficerQualities: ['Initiative', 'Organizing Ability', 'Social Adaptability', 'Liveliness & Courage'],
  },
  {
    id: 'ppdt-night-reconnaissance',
    title: 'Night Patrolling & Security Reinforcement',
    scenarioDescription: 'Two individuals in outdoor jackets examining a topographical map with a flashlight near a border watchpost.',
    characterContext: { age: 23, gender: 'M', mood: 'Positive' },
    actionPlan: 'Analyze terrain contours, identify vulnerable ingress nullahs, deploy thermal imaging sensors, coordinate patrol grid with neighboring post.',
    sampleStory:
      'Lieutenant Vikram, patrol commander at a high-altitude forward post, was tasked with sanitizing an unmonitored ravine. Studying satellite contours with his Havildar, he devised an interlocking surveillance route utilizing thermal imagers and trip-wire cameras. Leading the night patrol through adverse weather, they fortified the vulnerable sector and secured the perimeter before dawn, ensuring absolute sector sanctity.',
    keyOfficerQualities: ['Courage', 'Stamina', 'Determination', 'Tactical Acumen'],
  },
]
