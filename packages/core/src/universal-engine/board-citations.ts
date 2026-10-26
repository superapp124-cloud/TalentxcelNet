import type { SubjectCode } from './types'
import type { BoardCode } from '../math-engine/types'

export interface SubjectBoardCitations {
  boardCode: BoardCode
  boardName: string
  status: 'verified' | 'aligned' | 'provisional'
  coveragePercentage: number
  framework: string
  textbooks: string[]
  examReferences: string[]
  pedagogicalFocus: string
}

export function getSubjectBoardCitations(
  subjectCode: SubjectCode,
  classNumber: number,
  boardCode: BoardCode
): SubjectBoardCitations {
  const isSenior = classNumber >= 9
  const isHigherSenior = classNumber >= 11

  if (boardCode === 'CBSE') {
    switch (subjectCode) {
      case 'science':
        return {
          boardCode: 'CBSE',
          boardName: 'Central Board of Secondary Education (CBSE)',
          status: 'verified',
          coveragePercentage: 100,
          framework: isHigherSenior
            ? 'CBSE Senior Secondary Science (Physics, Chemistry & Biology 2026-27)'
            : 'CBSE Class 9-10 Composite Science Curriculum',
          textbooks: isHigherSenior
            ? [
                `NCERT Physics Class ${classNumber} (Parts 1 & 2)`,
                `NCERT Chemistry Class ${classNumber} (Parts 1 & 2)`,
                `NCERT Biology Class ${classNumber}`,
                `NCERT Exemplar Problems (Physics, Chemistry, Biology)`,
                `Pradeep’s Fundamental Physics & Modern’s ABC Chemistry`,
              ]
            : [
                `NCERT Science Class ${classNumber}`,
                `NCERT Exemplar Problems in Science Class ${classNumber}`,
                `Lakhmir Singh & Manjit Kaur: Physics Class ${classNumber}`,
                `Lakhmir Singh & Manjit Kaur: Chemistry Class ${classNumber}`,
                `Lakhmir Singh & Manjit Kaur: Biology Class ${classNumber}`,
              ],
          examReferences: [
            `CBSE Board Exam Solved Papers (2014-2024)`,
            `CBSE Competency-Based Assessment Questions (SQP Archive)`,
            `CBSE Science Olympiad & Practical Skills Assessment`,
          ],
          pedagogicalFocus: 'Conceptual mastery, numerical derivations, chemical equation balancing, organ diagrams and laboratory inquiry.',
        }

      case 'english':
        return {
          boardCode: 'CBSE',
          boardName: 'Central Board of Secondary Education (CBSE)',
          status: 'verified',
          coveragePercentage: 100,
          framework: 'CBSE English Language and Literature Curriculum',
          textbooks: isSenior
            ? [
                classNumber === 9
                  ? 'NCERT Beehive & Moments (Supplementary Reader)'
                  : classNumber === 10
                  ? 'NCERT First Flight & Footprints Without Feet'
                  : classNumber === 11
                  ? 'NCERT Hornbill & Snapshots'
                  : 'NCERT Flamingo & Vistas',
                'High School English Grammar & Composition by Wren & Martin (S. Chand)',
                'CBSE Applied Grammar & Analytical Composition Question Bank',
              ]
            : [
                `NCERT English Honeydew / Marigold Class ${classNumber}`,
                'Wren & Martin Elementary English Grammar',
                'Junior Reading Comprehension & Vocabulary Drills',
              ],
          examReferences: [
            'CBSE Board Reading & Grammar Section Solved Papers (2014-2024)',
            'CBSE Discursive & Case-Based Analytical Passage Archive',
          ],
          pedagogicalFocus: 'Rigorous syntactic accuracy, reported speech transformation, reading comprehension inference and structured composition.',
        }

      case 'hindi':
        return {
          boardCode: 'CBSE',
          boardName: 'केन्द्रीय माध्यमिक शिक्षा बोर्ड (CBSE)',
          status: 'verified',
          coveragePercentage: 100,
          framework: 'CBSE मानक हिंदी पाठ्यक्रम (कोर्स-अ एवं कोर्स-ब)',
          textbooks: isSenior
            ? [
                classNumber <= 10 ? 'NCERT क्षितिज एवं कृतिका (भाग 1 व 2)' : 'NCERT अंतरा एवं अंतराल (भाग 1 व 2)',
                'सरस्वती मानक हिंदी व्याकरण एवं रचना (डॉ. हरिश्चंद्र)',
                'व्याकरण पराग एवं व्यावहारिक हिंदी रचना',
                'माध्यमिक हिंदी प्रश्न बैंक एवं सीबीएसई बोर्ड समाधान',
              ]
            : [
                `NCERT वसंत / रिमझिम कक्षा ${classNumber}`,
                'प्राथमिक मानक हिंदी व्याकरण एवं वर्तनी बोध',
                'अपठित गद्यांश एवं व्यावहारिक शब्द भंडार संग्रह',
              ],
          examReferences: [
            'CBSE बोर्ड परीक्षा विगत 10 वर्षों के हल प्रश्न पत्र (2014-2024)',
            'CBSE मानक व्याकरण एवं पद परिचय प्रश्न बैंक',
          ],
          pedagogicalFocus: 'संधि, समास, रस, अलंकार, पद परिचय, वाक्य रूपांतरण एवं शुद्ध वर्तनी पर आधारित मानक मूल्यांकन।',
        }

      case 'social_science':
        return {
          boardCode: 'CBSE',
          boardName: 'Central Board of Secondary Education (CBSE)',
          status: 'verified',
          coveragePercentage: 100,
          framework: 'CBSE Social Science Curriculum (History, Geography, Civics & Economics)',
          textbooks: isSenior
            ? [
                `NCERT India and the Contemporary World (History Class ${classNumber})`,
                `NCERT Contemporary India (Geography Class ${classNumber})`,
                `NCERT Democratic Politics (Civics Class ${classNumber})`,
                `NCERT Understanding Economic Development (Class ${classNumber})`,
                'CBSE Map Work Atlas & Cartographic Exercise Book',
              ]
            : [
                `NCERT Our Pasts & The Earth Our Habitat Class ${classNumber}`,
                `NCERT Social and Political Life Class ${classNumber}`,
                'Junior Geography & Civics Skills Workbook',
              ],
          examReferences: [
            'CBSE Board Social Science Solved Question Papers (2014-2024)',
            'CBSE Source-Based & Case-Based Assessment Archive',
          ],
          pedagogicalFocus: 'Chronological historical causality, spatial geographic analysis, constitutional democratic frameworks and economic development indicators.',
        }

      case 'math':
      default:
        return {
          boardCode: 'CBSE',
          boardName: 'Central Board of Secondary Education (CBSE)',
          status: 'verified',
          coveragePercentage: 100,
          framework: isSenior ? 'CBSE Core & Applied Mathematics Curriculum' : 'NCERT Mathematics Syllabus',
          textbooks: [
            `NCERT Mathematics Class ${classNumber}`,
            `NCERT Exemplar Problems Class ${classNumber}`,
            `RD Sharma Mathematics (Class ${classNumber})`,
            `RS Aggarwal Mathematics (Class ${classNumber})`,
          ],
          examReferences: [
            `CBSE Board 10-Year Solved Papers (2014-2024)`,
            `CBSE Exemplar & HOTS Question Archive`,
          ],
          pedagogicalFocus: 'Formula derivations, step-by-step proofs, algebraic computation, Euclidean geometry and calculus foundations.',
        }
    }
  }

  if (boardCode === 'CISCE') {
    switch (subjectCode) {
      case 'science':
        return {
          boardCode: 'CISCE',
          boardName: 'Council for the Indian School Certificate Examinations (ICSE / ISC)',
          status: 'aligned',
          coveragePercentage: 92,
          framework: isHigherSenior ? 'ISC Class 11-12 Physics, Chemistry & Biology' : 'ICSE Class 9-10 Science Framework',
          textbooks: isSenior
            ? [
                `Selina Concise Physics (Dr. R.P. Goyal & Vipul Goyal, Class ${classNumber})`,
                `Selina Concise Chemistry (Dr. S.P. Singh, Class ${classNumber})`,
                `Selina Concise Biology (Dr. H.S. Vishnoi, Class ${classNumber})`,
                'Kalyani Publishers ICSE Science Workbooks',
              ]
            : [
                `Selina Primary Science Class ${classNumber}`,
                'Understanding General Science (Frank EMU)',
              ],
          examReferences: [
            'ICSE 10-Year Solved Question Papers (2014-2024)',
            'CISCE Specimen Diagnostic Examination Papers',
          ],
          pedagogicalFocus: 'Rigorous laboratory observations, balanced chemical equations with color changes, optical ray diagrams, and detailed anatomical descriptions.',
        }

      case 'english':
        return {
          boardCode: 'CISCE',
          boardName: 'Council for the Indian School Certificate Examinations (ICSE / ISC)',
          status: 'aligned',
          coveragePercentage: 94,
          framework: 'ICSE English Language & Literature (Papers 1 & 2)',
          textbooks: isSenior
            ? [
                `Total English Class ${classNumber} by Pamela & Xavier Pinto (Morning Star)`,
                'High School English Grammar by Wren & Martin',
                classNumber <= 10
                  ? 'The Merchant of Venice & Treasure Chest of Poems & Stories'
                  : 'Julius Caesar / Macbeth & Prism Collection of ISC Essays',
              ]
            : [
                `Elementary English Grammar & Total English Junior Class ${classNumber}`,
                'Classic Graded Readers & Comprehension Skills',
              ],
          examReferences: [
            'ICSE English Language Paper 1 Solved Archives (2014-2024)',
            'ICSE Literature in English Paper 2 Model Solutions',
          ],
          pedagogicalFocus: 'Transformation of sentences without changing meaning, prepositional mastery, synthesis of sentences, and in-depth textual Shakespearean analysis.',
        }

      case 'hindi':
        return {
          boardCode: 'CISCE',
          boardName: 'काउंसिल फॉर द इंडियन स्कूल सर्टिफिकेट एग्जामिनेशंस (ICSE)',
          status: 'aligned',
          coveragePercentage: 90,
          framework: 'ICSE द्वितीय भाषा हिंदी (Second Language Hindi)',
          textbooks: isSenior
            ? [
                'साहित्य सागर: संक्षिप्त कहानियाँ एवं पद्य संग्रह (एवरग्रीन पब्लिकेशन्स)',
                'सरस हिंदी व्याकरण (एवरग्रीन पब्लिकेशन्स)',
                'एकांकी सुमन / नया रास्ता (उपन्यास संग्रह)',
                'ICSE हिंदी 10-वर्षीय हल प्रश्न पत्र',
              ]
            : [
                `सरल हिंदी व्याकरण एवं बाल भारती कक्षा ${classNumber}`,
                'हिंदी बोध एवं व्यावहारिक मुहावरा अभ्यास',
              ],
          examReferences: [
            'ICSE हिंदी बोर्ड परीक्षा विगत 10 वर्षों के हल प्रश्न पत्र',
            'CISCE मॉडल स्पेसिमेन पेपर्स एवं अंकन योजना',
          ],
          pedagogicalFocus: 'साहित्यिक व्याख्या, गद्यांश-पद्यांश के संदर्भ सहित प्रश्नोत्तर, मुहावरों का सटीक प्रयोग एवं व्यावहारिक निबंध रचना।',
        }

      case 'social_science':
        return {
          boardCode: 'CISCE',
          boardName: 'Council for the Indian School Certificate Examinations (ICSE)',
          status: 'aligned',
          coveragePercentage: 91,
          framework: 'ICSE History, Civics & Geography Curriculum',
          textbooks: isSenior
            ? [
                `Total History & Civics Class ${classNumber} by Dolly Ellen Sequeira (Morning Star)`,
                `Total Geography Class ${classNumber} by Jasmine Rachel (Morning Star)`,
                'ICSE Topographical Survey Map (Eastings, Northings & 4-Figure/6-Figure Grid)',
                'ICSE Indian Map Study & Climate Data Analysis',
              ]
            : [
                `Junior History & Civics Class ${classNumber} (Frank EMU)`,
                `Junior Geography of the World Class ${classNumber}`,
              ],
          examReferences: [
            'ICSE History & Civics 10-Year Solved Board Papers',
            'ICSE Geography 10-Year Solved Board Papers',
          ],
          pedagogicalFocus: 'Topographical map reading, 6-figure coordinates, conventional signs, climatic graphs, United Nations charter and Indian Parliamentary procedures.',
        }

      case 'math':
      default:
        return {
          boardCode: 'CISCE',
          boardName: 'Council for the Indian School Certificate Examinations (ICSE / ISC)',
          status: 'aligned',
          coveragePercentage: 92,
          framework: 'ICSE & ISC Mathematics Curriculum',
          textbooks: [
            `Selina Concise Mathematics by Dr. R.K. Bansal (Class ${classNumber})`,
            `Understanding ICSE Mathematics by M.L. Aggarwal (APC, Class ${classNumber})`,
            'Frank Modern Certificate Mathematics',
          ],
          examReferences: [
            'ICSE / ISC 10-Year Solved Examination Papers',
            'CISCE Specimen Diagnostic Question Archive',
          ],
          pedagogicalFocus: 'Commercial mathematics (GST, Banking, Shares), matrix algebra, geometric constructions, coordinate geometry proofs, and statistics.',
        }
    }
  }

  // IB (PYP / MYP / DP)
  switch (subjectCode) {
    case 'science':
      return {
        boardCode: 'IB',
        boardName: 'International Baccalaureate (IB MYP & DP Sciences)',
        status: 'provisional',
        coveragePercentage: 86,
        framework: isHigherSenior
          ? 'IB DP Physics, Chemistry & Biology SL/HL Guide'
          : 'IB MYP Sciences Scope & Sequence (Criteria A–D)',
        textbooks: isHigherSenior
          ? [
              'Physics for the IB Diploma by K.A. Tsokos (Cambridge University Press)',
              'Chemistry for the IB Diploma by Catrin Brown & Mike Ford (Pearson)',
              'Biology for the IB Diploma by Andrew Allott & David Mindorff (Oxford)',
              'IB DP Science Data Booklets & Experimental Guides',
            ]
          : [
              `Oxford IB MYP Sciences: A Concept-Based Approach (Years 1-5)`,
              'Haese & Harris MYP Sciences Workbooks',
              'IB MYP Criteria A (Knowing), B (Inquiring), C (Processing), D (Reflecting)',
            ],
    examReferences: [
      'IB DP Past Examination Papers (May/Nov TZ1 & TZ2)',
      'IB MYP eAssessment Specimen On-Screen Tasks',
    ],
    pedagogicalFocus: 'Inquiry-based scientific methodology, error analysis, hypothesis testing, data graphing, societal impacts and ethical evaluations.',
  }

    case 'english':
      return {
        boardCode: 'IB',
        boardName: 'International Baccalaureate (IB MYP & DP Language & Literature)',
        status: 'provisional',
        coveragePercentage: 88,
        framework: 'IB Language & Literature (Criteria A–D & DP Higher Level Essay)',
        textbooks: isSenior
          ? [
              'English A: Language and Literature for the IB Diploma (Oxford / Cambridge)',
              'IB DP English Language and Literature Course Companion (Brad Philpot)',
              'IB MYP Language & Literature Criteria A-D Analytical Guides',
            ]
          : [
              'IB PYP / MYP Language Scope & Sequence Inquiry Portfolios',
              'International Contextual Literature & Rhetoric Readers',
            ],
        examReferences: [
          'IB DP English Paper 1 Guided Textual Analysis & Paper 2 Comparative Essays',
          'IB MYP Language & Literature eAssessment Exemplars',
        ],
        pedagogicalFocus: 'Authorial choices, stylistic and linguistic analysis, multimodal text comparison, and global issues integration.',
      }

    case 'hindi':
      return {
        boardCode: 'IB',
        boardName: 'International Baccalaureate (IB Language Acquisition / B)',
        status: 'provisional',
        coveragePercentage: 82,
        framework: 'IB MYP Hindi Language Acquisition & DP Hindi B SL/HL',
        textbooks: [
          'IB DP Hindi B Course Companion & Textual Perspectives',
          'IB MYP Hindi Language Acquisition Phases 1–5 Tasks',
          'Cultural Contexts, Idiomatic Mastery & Analytical Comprehension',
        ],
        examReferences: [
          'IB DP Hindi B May/Nov Past Exam Papers',
          'IB MYP Hindi Acquisition Criteria Assessments',
        ],
        pedagogicalFocus: 'अंतर्राष्ट्रीय संदर्भों में हिंदी भाषा प्रयोग, सांस्कृतिक अभिव्यक्ति, आलोचनात्मक बोध एवं लिखित संप्रेषण।',
      }

    case 'social_science':
      return {
        boardCode: 'IB',
        boardName: 'International Baccalaureate (IB MYP Individuals & Societies / DP)',
        status: 'provisional',
        coveragePercentage: 85,
        framework: 'IB MYP Individuals & Societies & IB DP History/Geography/Economics',
        textbooks: isSenior
          ? [
              'Oxford IB Diploma: History of the Americas & 20th Century World Causes',
              'Cambridge IB DP Geography & Global Change',
              'Oxford IB DP Economics (Jocelyn Blink & Ian Dorton)',
              'IB MYP Individuals & Societies Concept-Based Learning Companion',
            ]
          : [
              'IB PYP Where We Are in Place and Time Inquiry Units',
              'IB MYP Individuals & Societies Criteria A-D Workbooks',
            ],
        examReferences: [
          'IB DP History / Geography / Economics Past Papers',
          'IB MYP Individuals & Societies eAssessment Tasks',
        ],
        pedagogicalFocus: 'Multiple historical perspectives, source reliability and bias evaluation, cartographic spatial reasoning, and micro/macroeconomic models.',
      }

    case 'math':
    default:
      return {
        boardCode: 'IB',
        boardName: 'International Baccalaureate (IB MYP & DP Mathematics)',
        status: 'provisional',
        coveragePercentage: 85,
        framework: 'IB DP Mathematics: Analysis & Approaches (AA) and Applications & Interpretation (AI)',
        textbooks: [
          'Oxford IB DP Mathematics: Analysis and Approaches (AA) SL/HL',
          'Cambridge IB DP Mathematics: Applications and Interpretation (AI) SL/HL',
          'Haese & Harris IB MYP Standard & Extended Mathematics',
        ],
        examReferences: [
          'IB DP May/Nov TZ1/TZ2 Past Papers & Mark Schemes',
          'IB MYP eAssessment On-Screen Mathematical Tasks',
        ],
        pedagogicalFocus: 'Conceptual investigations, proof by induction, geometric modeling, binomial distributions, and calculus applications.',
      }
  }
}
