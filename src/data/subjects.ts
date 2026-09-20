import { SubjectMeta } from '../types';

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System (Module 7)',
    shortName: 'Cardiovascular',
    iconName: 'Heart',
    color: 'from-rose-500 to-red-600',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-700',
    badgeText: '100 Questions',
    description: 'Heart anatomy & apex orientation, myocardium, 4 chambers & 4 valves, systemic & pulmonary blood flow, heart sounds ("lub"/"dub"), vessel tunics, radial pulse, and lymphatic system.',
    totalQuestions: 100,
  },
  {
    id: 'tissues_integumentary',
    name: 'Tissues & Integumentary System (Module 5)',
    shortName: 'Tissues & Skin',
    iconName: 'Layers',
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
    badgeText: '100 Questions',
    description: 'Epithelial shapes & layering, connective tissue ECM, joint cartilage ("gristle"), adipose honeycomb, bone osteons & marrow, muscle subtypes (skeletal, cardiac, smooth), nervous tissue, and epidermal layers & glands.',
    totalQuestions: 100,
  },
  {
    id: 'blood_hematology',
    name: 'Blood & Hematology (Module 6)',
    shortName: 'Blood & Hematology',
    iconName: 'Droplet',
    color: 'from-red-600 to-rose-700',
    badgeBg: 'bg-red-50 border-red-200 text-red-700',
    badgeText: '100 Questions',
    description: 'Whole blood fractionation (~55% plasma, ~45% formed elements), hemoglobin dynamics, microhematocrit calculation, hemostasis triad, bruise pathology, and ABO/Rh blood groups.',
    totalQuestions: 100,
  },
  {
    id: 'respiratory',
    name: 'Respiratory System (Module 8)',
    shortName: 'Respiratory',
    iconName: 'Wind',
    color: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-700',
    badgeText: '100 Questions',
    description: 'Sequential airway pathway, Boyle’s law ventilation mechanics (active inspiration vs passive elastic recoil), alveolar diffusion, pulmonary surfactant, SpO2 reference range, asthma, and pneumonia.',
    totalQuestions: 100,
  },
];

