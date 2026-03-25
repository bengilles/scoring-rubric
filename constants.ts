
export const SCORE_LEVELS = [
  { score: 5, points: 20, label: '5', subLabel: '20 Points' },
  { score: 4, points: 15, label: '4', subLabel: '15 Points' },
  { score: 3, points: 11, label: '3', subLabel: '11 Points' },
  { score: 2, points: 6, label: '2', subLabel: '6 Points' },
  { score: 1, points: 1, label: '1', subLabel: '1 Points' },
];

export const RUBRIC_DATA = [
  {
    id: 'content',
    title: 'Content and Ideas',
    descriptions: {
      5: 'Exceptionally original or interesting ideas are thoroughly developed in a way that has a lasting impact on the reader.',
      4: 'Original ideas and plot points are present and are clearly developed.',
      3: 'Clear ideas and plot points are present but may be under developed or unoriginal.',
      2: 'Clear ideas and plot points are presented but never developed.',
      1: 'The story is unfocused and/or rambling. No central themes or plot points are developed.',
    },
  },
  {
    id: 'organization',
    title: 'Organization',
    descriptions: {
      5: 'Plot points and ideas are well connected. Pacing feels just right. Things come together without feeling forced.',
      4: 'Organizational structure connects most plot points together in a satisfying and understandable way. Pacing feels appropriate to the plot.',
      3: 'Organizational structure is present and effective. The author makes themselves understood. If structure is nontraditional it feels intentional and comprehensible. Pacing may be a little too fast or a little too slow.',
      2: 'Organizational structure is present, but ineffective. Narrative is confusing and hard to follow in a way that does not feel intentional. Pacing is either much too fast or much too slow.',
      1: 'No organizational structure is present. Plot points are disconnected in a way that is not intentional',
    },
  },
  {
    id: 'language',
    title: 'Use of Language',
    descriptions: {
      5: 'Author exhibits a strong command of language. Word choice is especially satisfying or resonant.',
      4: 'Language is engaging and adds flavor to the characters and world. The language creates an atmosphere for the book.',
      3: 'Language is used correctly. The vocabulary is appropriate for the intended audience.',
      2: 'Language is used correctly. Word choice is simplistic or repetitive. Limited vocabulary is employed relative to its intended audience.',
      1: 'Demonstrates a poor understanding of the language used in the narrative. Consistent misspelling, grammar mistakes, incorrect word usage. (more than just the occasional typo)',
    },
  },
  {
    id: 'preference',
    title: 'Personal Preference',
    descriptions: {
      5: 'Absolutely loved the book.',
      4: "Liked the book, but there were elements that didn't quite work for you.",
      3: 'Generally positive toward the book, but not your thing or just failed to impress.',
      2: "Disliked the book, but can understand it's appeal to others.",
      1: 'Absolutely hated the book.',
    },
  },
  {
    id: 'recommendation',
    title: 'Recommendation Strength',
    descriptions: {
      5: 'Strong recommendation to general audiences.',
      4: 'Strong recommendation to genre fans. Weak recommendation to general audiences.',
      3: 'Weak recommendation to genre fans.',
      2: "Recommended to a very niche audience that wouldn't care about major flaws.",
      1: 'Do not recommend to anyone',
    },
  },
];
