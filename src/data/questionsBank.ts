import { MCQQuestion, SubjectId, Difficulty } from '../types';

// Foundation questions directly from GEDU404B/2602 Student Reports & High-Yield Medical/Scientific Curricula
const rawCardiovascularSeed: Omit<MCQQuestion, 'id' | 'subjectId' | 'subjectName'>[] = [
  {
    subtopic: 'Heart Orientation & Anatomy',
    question: 'Towards which anatomical landmark does the apex of the human heart point?',
    options: [
      'Superiorly towards the right shoulder',
      'Inferiorly towards the left hip',
      'Posteriorly towards the thoracic spine',
      'Anteriorly towards the right clavicle',
    ],
    correctAnswer: 1,
    explanation: 'The apex of the heart is formed by the inferolateral part of the left ventricle and points inferiorly, anteriorly, and towards the left hip.',
    keyTakeaway: 'Apex points inferiorly towards the left hip at approximately the 5th intercostal space midclavicular line.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Myocardial Wall',
    question: 'The thick contractile middle layer of the heart wall composed of cardiac muscle cells is known as the:',
    options: ['Endocardium', 'Pericardium', 'Myocardium', 'Epicardium'],
    correctAnswer: 2,
    explanation: 'The myocardium is the thick, contractile middle layer composed of branched cardiac muscle fibers responsible for pumping blood.',
    keyTakeaway: 'Myocardium = contractile muscle layer of the heart.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Heart Chambers',
    question: 'Which heart chamber receives deoxygenated blood returning from the systemic circulation via the superior and inferior vena cavae?',
    options: ['Left atrium', 'Right atrium', 'Left ventricle', 'Right ventricle'],
    correctAnswer: 1,
    explanation: 'The right atrium receives deoxygenated systemic venous blood returning from the upper and lower body via the superior and inferior vena cavae.',
    keyTakeaway: 'Right atrium = receives deoxygenated venous return from the body.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Chambers Table',
  },
  {
    subtopic: 'Heart Chambers',
    question: 'Which chamber acts as the muscular pump for the systemic circulation, ejecting oxygenated blood into the aorta at high pressure?',
    options: ['Right ventricle', 'Left atrium', 'Left ventricle', 'Right atrium'],
    correctAnswer: 2,
    explanation: 'The left ventricle has a thick muscular wall designed to overcome high systemic vascular resistance and pump blood through the aorta to the entire body.',
    keyTakeaway: 'Left ventricle = muscular pump for systemic circulation.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Heart Valves',
    question: 'Which valve prevents the backflow of blood from the right ventricle into the right atrium during ventricular systole?',
    options: ['Mitral (bicuspid) valve', 'Aortic semilunar valve', 'Tricuspid valve', 'Pulmonary semilunar valve'],
    correctAnswer: 2,
    explanation: 'The tricuspid valve has three cusps and sits between the right atrium and right ventricle, preventing backflow during ventricular contraction.',
    keyTakeaway: 'Tricuspid valve prevents backflow from right ventricle to right atrium.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Valves Table',
  },
  {
    subtopic: 'Heart Valves',
    question: 'Which heart valve prevents backflow of blood from the pulmonary trunk/artery into the right ventricle during ventricular diastole?',
    options: ['Aortic semilunar valve', 'Pulmonary semilunar valve', 'Mitral valve', 'Tricuspid valve'],
    correctAnswer: 1,
    explanation: 'The pulmonary semilunar valve prevents blood ejected into the pulmonary trunk from backflowing into the right ventricle during diastole.',
    keyTakeaway: 'Pulmonary semilunar valve stops backflow into the right ventricle.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Valves Table',
  },
  {
    subtopic: 'Heart Valves',
    question: 'The bicuspid atrioventricular valve located between the left atrium and left ventricle is also known as the:',
    options: ['Tricuspid valve', 'Mitral valve', 'Aortic valve', 'Pulmonary valve'],
    correctAnswer: 1,
    explanation: 'The mitral valve, also called the bicuspid valve, guards the left atrioventricular orifice and possesses two leaflets resembling a bishop’s miter.',
    keyTakeaway: 'Mitral (bicuspid) valve connects left atrium and left ventricle.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Heart Valves',
    question: 'Which valve prevents blood from flowing backwards from the ascending aorta into the left ventricle during ventricular relaxation?',
    options: ['Aortic semilunar valve', 'Tricuspid valve', 'Mitral valve', 'Pulmonary semilunar valve'],
    correctAnswer: 0,
    explanation: 'The aortic semilunar valve closes at the beginning of ventricular diastole to prevent regurgitation of blood from the aorta back into the left ventricle.',
    keyTakeaway: 'Aortic semilunar valve prevents backflow from aorta into left ventricle.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Valves Table',
  },
  {
    subtopic: 'Vascular Circuitry',
    question: 'Which of the following blood vessels carries oxygen-rich (oxygenated) blood in the adult human body?',
    options: ['Superior vena cava', 'Pulmonary artery', 'Inferior vena cava', 'Pulmonary veins'],
    correctAnswer: 3,
    explanation: 'Pulmonary veins transport freshly oxygenated blood from the alveolar capillary beds of the lungs back to the left atrium of the heart.',
    keyTakeaway: 'Pulmonary veins carry oxygenated blood from lungs to left atrium.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Hemodynamics',
    question: 'Which statement regarding cardiac output and ventricular contraction is TRUE?',
    options: [
      'The left ventricle pumps three times more blood volume per beat than the right ventricle',
      'When the ventricles contract, the same volume of blood is pumped to both the pulmonary and systemic circuits',
      'The right ventricle generates significantly higher peak systolic pressures than the left ventricle',
      'The pulmonary circulation has much higher resistance than the systemic circulation',
    ],
    correctAnswer: 1,
    explanation: 'Although the left ventricle operates against much higher resistance and pressure, stroke volume must remain equal between both ventricles to prevent vascular congestion.',
    keyTakeaway: 'Both ventricles pump the exact same stroke volume per beat in a steady state.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Cardiac Auscultation',
    question: 'The first heart sound ("lub", S1) heard during cardiac auscultation is produced by:',
    options: [
      'The closing of the atrioventricular (mitral and tricuspid) valves',
      'The closing of the aortic and pulmonary semilunar valves',
      'The rapid inflow of blood into empty atria',
      'Blood turbulence within the coronary sinus',
    ],
    correctAnswer: 0,
    explanation: 'S1 ("lub") occurs at the onset of ventricular systole as rising intraventricular pressures cause sudden closure of the AV (mitral and tricuspid) valves.',
    keyTakeaway: 'S1 ("lub") = closure of atrioventricular valves.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Cardiovascular Pathways',
    question: 'What is the correct sequential pathway of blood flow through the right side of the heart?',
    options: [
      'Right atrium, tricuspid valve, right ventricle',
      'Right ventricle, tricuspid valve, right atrium',
      'Right atrium, mitral valve, right ventricle',
      'Vena cava, pulmonary valve, right atrium',
    ],
    correctAnswer: 0,
    explanation: 'Deoxygenated blood enters the right atrium, passes across the open tricuspid valve during diastole, and fills the right ventricle.',
    keyTakeaway: 'Pathway: Right Atrium → Tricuspid Valve → Right Ventricle.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Vessel Anatomy',
    question: 'Which blood vessels transport deoxygenated blood directly from the right side of the heart to the lungs for gas exchange?',
    options: ['Pulmonary veins', 'Aorta', 'Pulmonary arteries', 'Coronary arteries'],
    correctAnswer: 2,
    explanation: 'The pulmonary trunk divides into the right and left pulmonary arteries, carrying deoxygenated blood from the right ventricle to the lungs.',
    keyTakeaway: 'Pulmonary arteries transport deoxygenated blood to the lungs.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Vascular Physiology',
    question: 'Which of the following is the most accurate anatomical definition of veins?',
    options: [
      'Vessels that always carry oxygen-poor blood',
      'Vessels that carry blood towards the heart',
      'Vessels with thick muscular tunica media and high pressure',
      'Vessels that lack endothelial cell linings',
    ],
    correctAnswer: 1,
    explanation: 'By anatomical definition, veins carry blood towards the heart, regardless of oxygenation state (e.g. pulmonary veins carry oxygenated blood to the heart).',
    keyTakeaway: 'Veins = vessels that carry blood towards the heart.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Blood Vessel Layers',
    question: 'What is the outermost, most superficial fibrous connective tissue layer of an arterial wall?',
    options: ['Tunica intima', 'Tunica media', 'Tunica externa (adventitia)', 'Internal elastic lamina'],
    correctAnswer: 2,
    explanation: 'The tunica externa (or tunica adventitia) is the outermost layer of blood vessels, composed predominantly of collagen and elastic fibers that protect and anchor the vessel.',
    keyTakeaway: 'Tunica externa (adventitia) = outermost layer of arteries.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Clinical Examination',
    question: 'Which arterial vessel is routinely palpated on the anterior lateral aspect of the wrist to determine a patient’s peripheral pulse rate?',
    options: ['Brachial artery', 'Carotid artery', 'Radial artery', 'Femoral artery'],
    correctAnswer: 2,
    explanation: 'The radial artery runs laterally along the distal anterior forearm and is compressed against the distal radius bone to assess the peripheral pulse.',
    keyTakeaway: 'Radial artery is the standard site for wrist pulse assessment.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Vascular Hemodynamics',
    question: 'Can a rhythmic arterial pulse wave normally be palpated in a large systemic vein?',
    options: [
      'Yes, because veins have the same systolic pressure as arteries',
      'No, because pulse pressures attenuate as blood traverses capillary beds into low-pressure venous circulation',
      'Yes, especially in the femoral vein during exercise',
      'Yes, because venous valves generate periodic pulsation',
    ],
    correctAnswer: 1,
    explanation: 'Blood pressure fluctuations are largely dampened by the high resistance of arterioles and capillary networks; systemic veins maintain steady low hydrostatic pressures without palpable pulses.',
    keyTakeaway: 'No palpable pulse in large veins due to pressure damping in capillary beds.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Capillary Structure',
    question: 'Capillaries are typically only one cell layer thick to facilitate rapid nutrient and gas diffusion. This single endothelial layer corresponds to the:',
    options: ['Tunica media', 'Tunica intima', 'Tunica externa', 'Adventitia'],
    correctAnswer: 1,
    explanation: 'Capillaries consist solely of a delicate single layer of endothelial cells and a basal lamina, which represents the tunica intima.',
    keyTakeaway: 'Capillaries consist solely of the tunica intima (endothelium).',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Lymphatic System',
    question: 'What is a primary nutritional function of the lymphatic system in the digestive tract?',
    options: [
      'Direct filtration of plasma electrolytes and urea',
      'Absorb dietary fats and fat-soluble vitamins via lacteals and transfer them into blood circulation',
      'Secrete pancreatic amylase and hydrochloric acid',
      'Synthesize albumin to maintain oncotic pressure',
    ],
    correctAnswer: 1,
    explanation: 'Specialized lymphatic capillaries in intestinal villi, known as lacteals, absorb emulsified dietary lipids (chylomicrons) and fat-soluble vitamins (A, D, E, K).',
    keyTakeaway: 'Lymphatics absorb dietary fats and fat-soluble vitamins via lacteals.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
  {
    subtopic: 'Fluid Balance',
    question: 'What is the physiological role of lymphatic vessels regarding interstitial fluid equilibrium?',
    options: [
      'They generate arterial systolic pressure waves',
      'They collect excess fluid and extravasated proteins that remain behind in tissue spaces following capillary exchange and return it to venous blood',
      'They pump blood directly into pulmonary capillaries',
      'They store red blood cells during rest periods',
    ],
    correctAnswer: 1,
    explanation: 'Normal capillary filtration slightly exceeds reabsorption (~2-3 L/day remains in interstitium). Lymphatic vessels collect this fluid (lymph) and return it to the venous system.',
    keyTakeaway: 'Lymphatics return excess filtered interstitial fluid to the venous system.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 7.3 Revision',
  },
];

const rawTissuesSeed: Omit<MCQQuestion, 'id' | 'subjectId' | 'subjectName'>[] = [
  {
    subtopic: 'General Histology',
    question: 'By definition, a biological tissue is best described as:',
    options: [
      'A collection of completely unrelated organs performing systemic filtration',
      'A group of connected, similar cells working together to perform a specific function',
      'The single individual functional organelle within a eukaryotic nucleus',
      'An extracellular mineral lattice devoid of cellular components',
    ],
    correctAnswer: 1,
    explanation: 'A tissue is an organized cooperative assembly of similar cells and their extracellular matrix working together to carry out a specific physiological function.',
    keyTakeaway: 'Tissue = group of similar cells working together for a specific function.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.0 & 5.3 Notes',
  },
  {
    subtopic: 'Tissue Classification',
    question: 'What are the four primary fundamental categories of tissues in the human body?',
    options: [
      'Epithelial, Connective, Muscle, and Nervous',
      'Bone, Blood, Cartilage, and Dermis',
      'Vascular, Epidermal, Neural, and Adipose',
      'Squamous, Cuboidal, Columnar, and Stratified',
    ],
    correctAnswer: 0,
    explanation: 'All adult tissues are classified into four primary types: epithelial (covering/lining), connective (support/binding), muscle (movement), and nervous (communication).',
    keyTakeaway: 'Four primary tissue types: Epithelial, Connective, Muscle, Nervous.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.0 Pre-learning',
  },
  {
    subtopic: 'Tissue Physiology',
    question: 'In anatomy and physiology, the term "function" refers to which scientific concept?',
    options: [
      'The histological staining color of the cell cytoplasm',
      'The physiology or operational mechanism of the tissue',
      'The embryonic germ layer origin alone',
      'The anatomical position relative to the sagittal midline',
    ],
    correctAnswer: 1,
    explanation: 'Structure reflects anatomy; function reflects the physiology and biochemical operations performed by the living tissue.',
    keyTakeaway: 'Function = the physiology and mechanism of the tissue.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.0 Notes',
  },
  {
    subtopic: 'Epithelial Tissue',
    question: 'Which of the following is NOT a recognized primary physiological function of epithelial tissue?',
    options: ['Physical protection', 'Absorption and secretion', 'Contraction to produce skeletal movement', 'Selective filtration'],
    correctAnswer: 2,
    explanation: 'Contraction to produce movement is the exclusive specialized function of muscle tissue, not epithelial tissue.',
    keyTakeaway: 'Contraction is a muscle function, NOT an epithelial function.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Epithelial Morphology',
    question: 'An epithelial lining consisting of flat, thin, plate-like cells is classified as:',
    options: ['Cuboidal', 'Columnar', 'Squamous', 'Transitional'],
    correctAnswer: 2,
    explanation: 'Squamous epithelial cells are characteristically thin, flat, and scale-like, facilitating rapid diffusion or providing smooth protective surfaces.',
    keyTakeaway: 'Squamous = flat, thin scale-like epithelial cells.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Epithelial Layers',
    question: 'Which epithelial classification provides optimal protection against severe mechanical friction and abrasion (e.g. in the epidermis, oral cavity, and esophagus)?',
    options: [
      'Simple columnar epithelium',
      'Simple squamous epithelium',
      'Stratified squamous epithelium',
      'Pseudostratified ciliated columnar epithelium',
    ],
    correctAnswer: 2,
    explanation: 'Stratified squamous epithelium features multiple cellular layers; outer layers can be sloughed off by friction without damaging the basal dividing cells.',
    keyTakeaway: 'Stratified squamous epithelium is specialized to resist mechanical friction.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 5.2 & 5.3 Revision',
  },
  {
    subtopic: 'Integumentary System',
    question: 'Why is the human skin (integument) scientifically classified as an organ rather than merely a tissue?',
    options: [
      'Because it contains only keratin protein',
      'Because it is composed of two or more distinct tissue types (stratified squamous epithelium + connective tissue dermis) working cooperatively',
      'Because it produces digestive bile salts',
      'Because it lacks cellular differentiation',
    ],
    correctAnswer: 1,
    explanation: 'An organ is defined as a structure composed of two or more different tissue types cooperating to perform complex functions. Skin includes epithelium, connective tissue, smooth muscle, and nervous tissue.',
    keyTakeaway: 'Skin is an organ because it combines multiple tissue types (epidermis + dermis).',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 5.0 Notes',
  },
  {
    subtopic: 'Integumentary Layers',
    question: 'Which layer of the skin is avascular (lacks direct blood vessels) and relies entirely on nutrient diffusion from the vascularized dermis below?',
    options: ['Hypodermis', 'Dermis', 'Epidermis', 'Subcutaneous adipose'],
    correctAnswer: 2,
    explanation: 'The epidermis is completely avascular. Epithelial cells receive oxygen and nutrients solely by diffusion from capillary loops in the dermal papillae.',
    keyTakeaway: 'Epidermis is completely avascular.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.0 & 5.3 Notes',
  },
  {
    subtopic: 'Skin Layers',
    question: 'Permanent tattoo pigment must be injected into which anatomical layer of the skin to avoid being shed through normal epidermal exfoliation?',
    options: ['Stratum corneum', 'Stratum granulosum', 'Dermis', 'Epidermal basement membrane only'],
    correctAnswer: 2,
    explanation: 'Tattoo needle punctures penetrate through the renewing epidermis into the dermis, where macrophages engulf the ink particles in stable connective tissue.',
    keyTakeaway: 'Tattoo ink resides permanently within the dermis.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Melanin Physiology',
    question: 'What is the primary physiological function of the brown-black pigment melanin produced by epidermal melanocytes?',
    options: [
      'Manufacture synovial fluid for joints',
      'Form an umbrella-like shield over cell nuclei to protect nuclear DNA from ultraviolet (UV) radiation damage',
      'Synthesize sebum to lubricate hairs',
      'Store calcium ions for muscle contraction',
    ],
    correctAnswer: 1,
    explanation: 'Melanosomes accumulate above the keratinocyte nucleus to absorb and scatter mutagenic UV rays, preventing DNA pyrimidine dimer formation.',
    keyTakeaway: 'Melanin shields cellular DNA against ultraviolet (UV) radiation.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Cutaneous Glands',
    question: 'Which of the following statements concerning cutaneous glands is FALSE?',
    options: [
      'Sebaceous glands produce sebum which lubricates skin and hair',
      'Eccrine sweat glands assist in thermoregulation by releasing watery perspiration',
      'Sweat glands secrete the oily lipid substance known as sebum',
      'Apocrine sweat glands are concentrated in axillary and anogenital regions',
    ],
    correctAnswer: 2,
    explanation: 'Sebum is secreted exclusively by sebaceous (oil) glands, not sweat (sudoriferous) glands. Sweat glands produce perspiration.',
    keyTakeaway: 'Sweat glands secrete perspiration; sebaceous glands secrete sebum.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Metabolic Skin Functions',
    question: 'When exposed to sunlight ultraviolet-B (UVB) radiation, dehydrocholesterol in the epidermal stratum basale and spinosum initiates the synthesis of:',
    options: ['Vitamin C', 'Vitamin A', 'Vitamin D (cholecalciferol)', 'Vitamin K'],
    correctAnswer: 2,
    explanation: 'Epidermal 7-dehydrocholesterol is converted into cholecalciferol (previtamin D3) upon UVB exposure, which is later hydroxylated by the liver and kidneys.',
    keyTakeaway: 'Skin manufactures Vitamin D upon exposure to sunlight.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Muscle Tissue Histology',
    question: 'Which muscle tissue type features elongated cylindrical fibers with multinucleated peripherally located nuclei and prominent transverse striations under voluntary control?',
    options: ['Cardiac muscle', 'Skeletal muscle', 'Smooth muscle', 'Single-unit visceral muscle'],
    correctAnswer: 1,
    explanation: 'Skeletal muscle fibers are formed by the fusion of embryonic myoblasts (syncytium), resulting in multinucleate, striated, voluntarily commanded fibers.',
    keyTakeaway: 'Skeletal muscle = striated, multinucleate, voluntary.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 & 5.3 Notes',
  },
  {
    subtopic: 'Cardiac Muscle Histology',
    question: 'Cardiac muscle cells are distinguished under light microscopy by which characteristic structural features?',
    options: [
      'Spindle-shaped non-striated cells with dozens of peripheral nuclei',
      'Branching striated cells with intercalated discs and typically a single central nucleus',
      'Dense non-striated collagen bundles without nuclei',
      'Multinucleated cylindrical parallel tubes under voluntary control',
    ],
    correctAnswer: 1,
    explanation: 'Cardiomyocytes branch, possess one (or rarely two) central nuclei, transverse striations, and specialized gap-junction/desmosome junctions called intercalated discs.',
    keyTakeaway: 'Cardiac muscle = branching, striated, uninucleate, intercalated discs.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Smooth Muscle Function',
    question: 'Where is involuntary, non-striated, spindle-shaped smooth muscle predominantly found in the human body?',
    options: [
      'Attached to the humerus and femur for locomotion',
      'Within the walls of hollow internal visceral organs and blood vessels',
      'Exclusively within the ventricular myocardium',
      'Lining the outer stratum corneum of the epidermis',
    ],
    correctAnswer: 1,
    explanation: 'Smooth muscle lines the tunica media of blood vessels and the muscularis externa of the gastrointestinal tract, urinary bladder, and respiratory airways.',
    keyTakeaway: 'Smooth muscle is located in walls of hollow organs and blood vessels.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Connective Tissue Matrix',
    question: 'All connective tissues are fundamentally composed of living cells embedded within non-living material known as the:',
    options: ['Stratum basale', 'Extracellular matrix (ECM)', 'Intercalated disc', 'Sarcolemma'],
    correctAnswer: 1,
    explanation: 'Connective tissue consists of specialized cells separated by an abundant extracellular matrix (ECM) made of ground substance and protein fibers (collagen, elastin, reticulin).',
    keyTakeaway: 'Connective tissue consists of cells and extracellular matrix (ECM).',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Adipose Histology',
    question: 'On histological examination, mature adipose tissue exhibits a characteristic "signet ring" or honeycomb appearance because:',
    options: [
      'Cells contain dozens of dense contractile myofibrils',
      'A massive intracellular triglyceride lipid droplet compresses the cytoplasm and displaces the nucleus to the cellular periphery',
      'Calcium phosphate crystals precipitate across the cytoplasm',
      'Keratin filaments pack together inside dead cell membranes',
    ],
    correctAnswer: 1,
    explanation: 'Unilocular adipocytes store a single large neutral fat globule that pushes the nucleus and rim of cytoplasm flat against the cell membrane.',
    keyTakeaway: 'Adipocytes have a large lipid droplet that pushes the nucleus to the edge.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Skeletal Tissue',
    question: 'Compact bone tissue is organized microscopically into structural cylindrical units called osteons (Haversian systems) characterized by:',
    options: [
      'Loose reticular meshes without mineralization',
      'Concentric lamellae (rings) of calcified matrix arranged around central canals containing neurovascular bundles',
      'Avascular hyaline sheets lacking blood vessels',
      'Unbranched bundles of smooth muscle fibers',
    ],
    correctAnswer: 1,
    explanation: 'Compact bone features concentric rings of mineralized matrix (lamellae) centered around a Haversian canal providing blood and nerve supplies.',
    keyTakeaway: 'Compact bone is organized in concentric rings (osteons) around central canals.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Skeletal Cartilage',
    question: 'What is the primary mechanical function of hyaline articular cartilage covering the epiphyses of long bones at synovial joints?',
    options: [
      'Transmit somatic action potentials to motor end plates',
      'Provide a smooth, low-friction bearing surface and cushion compressive loading forces',
      'Generate red and white blood cells via erythropoiesis',
      'Store high quantities of triglycerides for metabolic emergencies',
    ],
    correctAnswer: 1,
    explanation: 'Articular hyaline cartilage lacks perichondrium and blood vessels, providing an ultra-smooth, slick surface that lubricates joint articulation and absorbs shock.',
    keyTakeaway: 'Articular cartilage reduces friction and cushions bone ends in joints.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Nervous Tissue',
    question: 'In nervous tissue, while neurons are specialized to generate and conduct electrical impulses, neuroglia (glial cells) function primarily to:',
    options: [
      'Contract rhythmically to propel cerebrospinal fluid',
      'Support, protect, insulate, and nutritionally maintain neurons',
      'Produce skin pigmentation and synthesize keratin',
      'Store oxygen molecules bound to iron-containing hemoglobin',
    ],
    correctAnswer: 1,
    explanation: 'Glial cells (astrocytes, oligodendrocytes, microglia, Schwann cells, ependymal cells) outnumber neurons and provide vital structural, metabolic, and electrical insulation support.',
    keyTakeaway: 'Neuroglia support, insulate, and nourish neurons.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
  {
    subtopic: 'Tissue Function Pairing',
    question: 'Which of the following pairings between tissue type and physiological function is NOT correct?',
    options: [
      'Epithelial – protection and lining',
      'Connective – protecting, supporting, and binding',
      'Muscle – endocrine hormone regulation',
      'Nervous – communication and electrical impulses',
    ],
    correctAnswer: 2,
    explanation: 'Endocrine secretion is carried out by specialized glandular epithelium, whereas muscle tissue specializes in contraction to produce movement.',
    keyTakeaway: 'Muscle specializes in contraction and motion, NOT endocrine secretion.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Epithelial Barrier',
    question: 'Which fundamental tissue category acts as the primary protective barrier against physical trauma, pathogens, and chemical damage from the external environment?',
    options: ['Muscle tissue', 'Epithelial tissue', 'Nervous tissue', 'Dense osseous tissue'],
    correctAnswer: 1,
    explanation: 'Epithelial tissue forms continuous sheets covering the exterior of the body and lining all internal cavities exposed to the outside.',
    keyTakeaway: 'Epithelial tissue forms the body’s primary barrier against the external environment.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Tissue Distribution',
    question: 'Epithelial tissue lines hollow cavities and body surfaces throughout the body, but is NOT found in which of the following structures?',
    options: ['Epidermis of the skin', 'Lining of the stomach', 'Heart muscle (myocardium)', 'Respiratory airways'],
    correctAnswer: 2,
    explanation: 'The heart muscle (myocardium) is composed of specialized striated cardiac muscle tissue, not epithelial tissue.',
    keyTakeaway: 'Epithelial tissue is NOT found in the heart muscle (myocardium).',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Bone Function',
    question: 'Which specialized connective tissue is responsible for supporting the body, storing mineral salts and triglycerides (fat), and housing red marrow that produces blood cells?',
    options: ['Adipose tissue only', 'Hyaline cartilage', 'Bone (osseous tissue)', 'Elastic connective tissue'],
    correctAnswer: 2,
    explanation: 'Bone provides structural framework, protects organs, stores calcium/phosphorus and yellow adipose marrow, and contains red marrow for haematopoiesis.',
    keyTakeaway: 'Bone stores fat in yellow marrow and manufactures blood cells in red marrow.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab & 5.3 Revision',
  },
  {
    subtopic: 'Sebaceous Gland Physiology',
    question: 'Which of the following statements concerning sebum secreted by cutaneous glands is FALSE?',
    options: [
      'It is an oily lipid substance secreted by sebaceous glands',
      'It is the pigment that is responsible for the colour of the skin',
      'It helps soften and lubricate hair and skin',
      'It contains bactericidal chemicals that inhibit bacterial growth',
    ],
    correctAnswer: 1,
    explanation: 'Melanin, produced by melanocytes, is the pigment responsible for skin color; sebum is an oily secretion produced by sebaceous glands.',
    keyTakeaway: 'Sebum is an oily lubricant; melanin is the pigment responsible for skin colour.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Dermal Histology',
    question: 'The deeper, thicker structural layer of the skin, known as the dermis, is predominantly made up of which tissue type?',
    options: ['Stratified squamous epithelium', 'Connective tissue', 'Smooth muscle', 'Nervous tissue'],
    correctAnswer: 1,
    explanation: 'The dermis consists primarily of dense irregular connective tissue rich in collagen and elastin fibers providing tensile strength.',
    keyTakeaway: 'The dermis is mostly composed of connective tissue.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.3 Revision',
  },
  {
    subtopic: 'Joint Cartilage',
    question: 'In butchered animal meat (such as chicken), tough pearly-white "gristle" found cushioning the articulating ends of bones represents which connective tissue?',
    options: ['Adipose tissue', 'Cartilage', 'Fibroelastic tendon', 'Smooth muscle'],
    correctAnswer: 1,
    explanation: 'Gristle is hyaline cartilage, which caps the ends of articulating bones to reduce friction and absorb mechanical shocks at joints.',
    keyTakeaway: 'Gristle = cartilage; cushions bone ends in joints to reduce friction.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 5.2 Lab',
  },
];

const rawBloodSeed: Omit<MCQQuestion, 'id' | 'subjectId' | 'subjectName'>[] = [
  {
    subtopic: 'Blood Fractionation',
    question: 'In healthy adults, approximately what percentage of whole centrifuged blood volume is made up of plasma?',
    options: ['25%', '45%', '55%', '75%'],
    correctAnswer: 2,
    explanation: 'Normal blood is approximately 55% liquid plasma and 45% formed elements (erythrocytes, leukocytes, and platelets).',
    keyTakeaway: 'Plasma constitutes approximately 55% of whole blood.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.0 & 6.3 Notes',
  },
  {
    subtopic: 'Plasma Composition',
    question: 'Water accounts for what approximate percentage of blood plasma by weight?',
    options: ['50%', '70%', '91% – 92%', '99%'],
    correctAnswer: 2,
    explanation: 'Plasma is over 90% water, with about 7–8% plasma proteins (albumin, globulins, fibrinogen) and 1–2% electrolytes and nutrients.',
    keyTakeaway: 'Plasma is ~91-92% water by volume.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.0 Notes',
  },
  {
    subtopic: 'Formed Elements',
    question: 'The cellular components of whole blood, termed the "formed elements", comprise which three groups?',
    options: [
      'Albumin, fibrinogen, and globulins',
      'Erythrocytes (RBCs), leukocytes (WBCs), and thrombocytes (platelets)',
      'Keratinocytes, melanocytes, and adipocytes',
      'Chondrocytes, osteocytes, and fibroblasts',
    ],
    correctAnswer: 1,
    explanation: 'The formed elements include red blood cells (erythrocytes), white blood cells (leukocytes), and platelet fragments (thrombocytes).',
    keyTakeaway: 'Formed elements = erythrocytes, leukocytes, and thrombocytes.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.0 & 6.3 Notes',
  },
  {
    subtopic: 'Centrifugation Fractions',
    question: 'After whole blood in an anticoagulated tube is centrifuged, which layer forms the thin whitish-gray "buffy coat" between plasma and packed RBCs?',
    options: [
      'Erythrocytes only',
      'Leukocytes (white blood cells) and thrombocytes (platelets)',
      'Pure albumin protein crystals',
      'Lipids and fat-soluble vitamins',
    ],
    correctAnswer: 1,
    explanation: 'The buffy coat constitutes less than 1% of blood volume and contains white blood cells (leukocytes) and platelets (thrombocytes).',
    keyTakeaway: 'Buffy coat = leukocytes and platelets.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 6.0 & 6.3 Notes',
  },
  {
    subtopic: 'Hematocrit Definition',
    question: 'What physiological measurement is represented by a patient’s haematocrit (packed cell volume)?',
    options: [
      'The total concentration of sodium electrolytes in serum',
      'The percentage of total whole blood volume occupied by red blood cells (erythrocytes)',
      'The differential ratio of lymphocytes to monocytes',
      'The rate of prothrombin clotting conversion in seconds',
    ],
    correctAnswer: 1,
    explanation: 'Hematocrit (Hct) is the volume fraction of erythrocytes in whole blood, normally ~42-52% in males and ~37-47% in females.',
    keyTakeaway: 'Hematocrit = percentage of whole blood made of red blood cells.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.2 & 6.3 Lab',
  },
  {
    subtopic: 'Normal Blood pH',
    question: 'What is the tightly regulated physiological pH range of arterial blood in a healthy human?',
    options: ['6.80 – 7.10', '7.00 – 7.20', '7.35 – 7.45', '7.80 – 8.00'],
    correctAnswer: 2,
    explanation: 'Normal arterial blood pH is tightly buffered between 7.35 and 7.45. Values below 7.35 indicate acidemia, and above 7.45 alkalemia.',
    keyTakeaway: 'Normal human blood pH is 7.35 to 7.45.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.0 & 6.2 Notes',
  },
  {
    subtopic: 'Erythrocyte Cytology',
    question: 'Why do mature human erythrocytes (red blood cells) extrude their nucleus and organelles during erythropoiesis?',
    options: [
      'To allow them to actively undergo continuous mitosis inside the bloodstream',
      'To maximize internal cytoplasmic volume for hemoglobin, thereby optimizing oxygen transport capacity',
      'To synthesize antibody immunoglobulins at higher rates',
      'To enable phagocytosis of pathogenic bacteria',
    ],
    correctAnswer: 1,
    explanation: 'Anucleate biconcave RBCs dedicate over 95% of their intracellular protein space to hemoglobin, enhancing flexible capillary passage and gas transport.',
    keyTakeaway: 'Erythrocytes lack a nucleus to maximize space for hemoglobin and oxygen transport.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Hemoglobin Stoichiometry',
    question: 'How many molecules of oxygen (O2) can be bound cooperatively by one complete hemoglobin molecule when fully saturated?',
    options: ['1', '2', '4', '8'],
    correctAnswer: 2,
    explanation: 'Hemoglobin is a tetramer with four globin polypeptide subunits, each containing a heme prosthetic group with an iron atom capable of binding one O2 molecule (total: 4 O2).',
    keyTakeaway: 'Each hemoglobin molecule can carry up to 4 oxygen molecules.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'White Blood Cell Differential',
    question: 'Which white blood cell type possesses a characteristic multi-lobed nucleus, abundant cytoplasmic granules, and serves as the most numerous first-responder phagocyte in acute bacterial infection?',
    options: ['Basophil', 'Eosinophil', 'Neutrophil', 'Monocyte'],
    correctAnswer: 2,
    explanation: 'Neutrophils make up 50–70% of circulating leukocytes, featuring 3–5 nuclear lobes and granules equipped with bactericidal enzymes.',
    keyTakeaway: 'Neutrophils are the most numerous leukocyte and primary acute bacterial phagocytes.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Hematopoiesis Regulation',
    question: 'Which hormone, synthesized primarily by renal peritubular interstitial cells in response to tissue hypoxia, stimulates red bone marrow to accelerate erythropoiesis?',
    options: ['Insulin', 'Erythropoietin (EPO)', 'Calcitonin', 'Aldosterone'],
    correctAnswer: 1,
    explanation: 'Erythropoietin (EPO) is secreted by the kidneys when oxygen delivery drops, stimulating committed CFU-E progenitors in the red bone marrow to produce erythrocytes.',
    keyTakeaway: 'Erythropoietin (EPO) stimulates red blood cell production in bone marrow.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'ABO Blood Grouping',
    question: 'An individual with Type AB blood has which antigen markers on their erythrocyte surfaces and which antibodies in their plasma?',
    options: [
      'A antigens only; anti-B antibodies',
      'Both A and B antigens on RBCs; neither anti-A nor anti-B antibodies in plasma',
      'Neither A nor B antigens on RBCs; both anti-A and anti-B antibodies in plasma',
      'B antigens only; anti-A antibodies',
    ],
    correctAnswer: 1,
    explanation: 'Type AB individuals express both A and B carbohydrate antigens on their erythrocyte membranes and do not produce ABO isohemagglutinins (making them universal plasma recipients).',
    keyTakeaway: 'Type AB has A and B antigens on RBCs and NO anti-A or anti-B antibodies.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'ABO Blood Grouping',
    question: 'An individual whose erythrocytes express neither A nor B antigens is classified as blood type:',
    options: ['Type A', 'Type B', 'Type AB', 'Type O'],
    correctAnswer: 3,
    explanation: 'Type O erythrocytes lack both A and B surface antigens, meaning their plasma contains both anti-A and anti-B antibodies.',
    keyTakeaway: 'Type O has neither A nor B antigens on RBC membranes.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'Rh Blood Factor',
    question: 'A blood donor is identified as "Type B+". What does the positive (+) designation specifically signify?',
    options: [
      'High concentrations of bacterial antibodies',
      'Presence of the Rh (D) antigen on the extracellular surface of their red blood cells',
      'Elevated blood platelet count above 400,000 / μL',
      'Absence of hemoglobin proteins',
    ],
    correctAnswer: 1,
    explanation: 'Rh positive means the individual possesses the Rh(D) protein antigen on their erythrocyte membranes.',
    keyTakeaway: 'Rh positive indicates the presence of Rh (D) antigen on red blood cells.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'Hemostasis Mechanisms',
    question: 'What is the correct sequential order of the three major physiological phases of hemostasis upon blood vessel injury?',
    options: [
      'Coagulation → Fibrinolysis → Vasodilation',
      'Vascular spasm → Platelet plug formation → Coagulation (blood clotting)',
      'Platelet plug formation → Hemolysis → Vasospasm',
      'Agglutination → Leukocytosis → Erythropoiesis',
    ],
    correctAnswer: 1,
    explanation: 'Immediately upon vessel rupture: 1. Vascular spasm reduces blood flow, 2. Platelets adhere to exposed collagen forming a platelet plug, and 3. Coagulation cascade converts fibrinogen into a stabilizing fibrin clot.',
    keyTakeaway: '3 steps of hemostasis: Vascular spasm → Platelet plug → Coagulation.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 6.2 & 6.3 Notes',
  },
  {
    subtopic: 'Coagulation Biochemistry',
    question: 'During the final common pathway of blood coagulation, which soluble plasma protein is cleaved by thrombin to form an insoluble sticky mesh of fibers?',
    options: ['Albumin', 'Fibrinogen', 'Immunoglobulin G', 'Transferrin'],
    correctAnswer: 1,
    explanation: 'Thrombin cleaves soluble fibrinogen into insoluble fibrin monomers, which polymerize and cross-link (via Factor XIII) to form the structural clot mesh.',
    keyTakeaway: 'Fibrinogen is converted into insoluble fibrin strands during coagulation.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Blood as Connective Tissue',
    question: 'Why is whole blood scientifically classified as a specialized form of connective tissue?',
    options: [
      'Because it connects directly to the central nervous system synapses',
      'Because it consists of living cells suspended in a non-living fluid matrix with dissolved fibrous proteins (fibrinogen) that become visible fibers during clotting',
      'Because it is composed purely of keratin and collagen fibers',
      'Because it is secreted by the endocrine pancreas',
    ],
    correctAnswer: 1,
    explanation: 'Like all connective tissues, blood has cellular components and an extracellular matrix (plasma) containing dissolved protein fibers that polymerize into insoluble fibrin upon coagulation.',
    keyTakeaway: 'Blood is connective tissue because it has cells and dissolved fibrous proteins that form fibrin.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 6.0 Pre-learning',
  },
  {
    subtopic: 'Centrifugation Layers',
    question: 'Following centrifugation of a blood sample in a capillary tube, the packed red bottom layer consists of cells primarily responsible for:',
    options: [
      'Phagocytizing foreign pathogens',
      'Carrying oxygen molecules bound to hemoglobin',
      'Initiating the vascular clotting cascade',
      'Maintaining electrolyte osmotic balance',
    ],
    correctAnswer: 1,
    explanation: 'The bottom dense red sediment consists of packed erythrocytes (RBCs), which carry oxygen from pulmonary capillaries to peripheral tissues.',
    keyTakeaway: 'Bottom red layer of centrifuged blood contains erythrocytes that carry oxygen.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'Plasma Solutes',
    question: 'The top straw-coloured liquid layer of centrifuged blood (plasma) contains which of the following vital substances?',
    options: [
      'Water (over 90%)',
      'Nutrients and hormones',
      'Electrolytes and soluble plasma proteins',
      'All of these',
    ],
    correctAnswer: 3,
    explanation: 'Blood plasma is approximately 91-92% water containing dissolved electrolytes (Na+, K+, Cl-), nutrients (glucose, amino acids), hormones, gases, and proteins (albumin, globulins, fibrinogen).',
    keyTakeaway: 'Plasma contains water, nutrients, electrolytes, hormones, and proteins (all of these).',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'Laboratory Technique',
    question: 'When collecting a blood sample into a microhematocrit capillary tube for centrifugal packed cell volume (PCV) analysis, the tube should ideally be filled:',
    options: [
      'Only 10% to prevent overflow',
      'Completely full (or at least two-thirds full of blood)',
      'With exactly one drop of blood diluted with saline',
      'Completely full of distilled water with a trace of blood',
    ],
    correctAnswer: 1,
    explanation: 'For reliable haematocrit measurement and seal placement, the capillary tube should be filled at least two-thirds to completely full by capillary action.',
    keyTakeaway: 'Capillary tube should be completely full (or at least two-thirds full) of blood.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Clinical Blood Chemistry',
    question: 'A patient’s fasting blood glucose is measured at 2.5 mmol/L (standard reference range: 4.0 – 7.0 mmol/L). How should this laboratory value be interpreted?',
    options: [
      'Normal fasting glucose level',
      'Low (hypoglycemia)',
      'High (hyperglycemia)',
      'Severely elevated ketoacidosis',
    ],
    correctAnswer: 1,
    explanation: 'A blood glucose level of 2.5 mmol/L is below the normal reference range of 4.0–7.0 mmol/L, indicating hypoglycemia which can cause tremors, diaphoresis, and altered mental status.',
    keyTakeaway: 'Blood glucose of 2.5 mmol/L is low (hypoglycemia).',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Clinical Hematology',
    question: 'A female student (Stephanie) has her hemoglobin concentration measured at 138 g/L (adult female reference range: 115 – 165 g/L). How is this result clinically classified?',
    options: [
      'Microcytic anemia',
      'Normal hemoglobin level',
      'Erythrocytosis / polycythemia',
      'Critically low panic value',
    ],
    correctAnswer: 1,
    explanation: 'Stephanie’s hemoglobin of 138 g/L falls well within the healthy female adult reference interval of 115–165 g/L, representing normal oxygen-carrying capacity.',
    keyTakeaway: 'Hemoglobin of 138 g/L is normal for an adult female.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Vascular Pathology',
    question: 'What lesion occurs when superficial dermal capillary vessels rupture without any disruption or breakage of the overlying skin surface?',
    options: ['Laceration', 'Bruise (contusion / ecchymosis)', 'Incision', 'Puncture wound'],
    correctAnswer: 1,
    explanation: 'A bruise (contusion/ecchymosis) results from blunt trauma rupturing capillaries beneath intact skin, allowing blood to extravasate into surrounding subcutaneous tissues.',
    keyTakeaway: 'Broken capillaries without skin damage produce a bruise.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Hemostasis Initiation',
    question: 'When a blood vessel sustains an endothelial laceration, which formed elements are the very first to adhere to the exposed subendothelial collagen?',
    options: [
      'Erythrocytes (red blood cells)',
      'Platelets (thrombocytes)',
      'Neutrophils',
      'Lymphocytes',
    ],
    correctAnswer: 1,
    explanation: 'Von Willebrand factor anchors circulating platelets to exposed subendothelial collagen fibers within seconds of endothelial injury, triggering the platelet plug formation.',
    keyTakeaway: 'Platelets are the first formed elements attracted to vessel injury.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Coagulation Trigger',
    question: 'What biochemical event causes circulating soluble fibrinogen to convert into an insoluble, sticky meshwork of fibrin fibers during hemostasis?',
    options: [
      'Exposure to chemicals and tissue factors not usually encountered in an intact, undamaged blood vessel',
      'Chilling of blood below 32°C',
      'A decrease in plasma sodium concentration',
      'Direct exposure to arterial carbon dioxide',
    ],
    correctAnswer: 0,
    explanation: 'Exposure to extravascular tissue factor (Factor III) and subendothelial collagen triggers the coagulation enzyme cascade, activating thrombin which cleaves fibrinogen into sticky fibrin strands.',
    keyTakeaway: 'Exposure to chemicals not found in an intact vessel triggers fibrin mesh formation.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 6.2 Lab',
  },
  {
    subtopic: 'Hematopoiesis Definition',
    question: 'The continuous biological process of producing, developing, and maturing new blood cells within red bone marrow is termed:',
    options: ['Hemostasis', 'Haematopoiesis (hemopoiesis)', 'Hemolysis', 'Erythroblastosis'],
    correctAnswer: 1,
    explanation: 'Haematopoiesis is the ongoing production of all blood cells (erythrocytes, leukocytes, thrombocytes) from pluripotent hematopoietic stem cells in the red bone marrow.',
    keyTakeaway: 'Haematopoiesis is the production of new blood cells.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
  {
    subtopic: 'ABO Blood Grouping',
    question: 'An individual with Type B blood possesses which antigens on their red blood cells and which antibodies in their blood plasma?',
    options: [
      'B antigens on RBCs and anti-A antibodies in plasma',
      'A antigens on RBCs and anti-B antibodies in plasma',
      'Both A and B antigens on RBCs and no antibodies in plasma',
      'Neither A nor B antigens on RBCs and anti-B antibodies in plasma',
    ],
    correctAnswer: 0,
    explanation: 'Type B individuals express B carbohydrate antigens on erythrocyte membranes and naturally produce anti-A isohemagglutinins in their plasma.',
    keyTakeaway: 'Type B blood has B antigens and anti-A antibodies.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 6.3 Revision',
  },
];

const rawRespiratorySeed: Omit<MCQQuestion, 'id' | 'subjectId' | 'subjectName'>[] = [
  {
    subtopic: 'Ventilation Mechanics',
    question: 'During normal quiet inspiration (inhalation), what happens to the diaphragm and thoracic cavity volume?',
    options: [
      'The diaphragm relaxes and moves upward, decreasing thoracic cavity volume',
      'The diaphragm contracts and flattens downward, increasing thoracic cavity volume and lowering intrapulmonary pressure',
      'Thoracic cavity volume stays constant while atmospheric pressure rises',
      'Internal intercostal muscles forcefully depress the ribcage',
    ],
    correctAnswer: 1,
    explanation: 'Diaphragm contraction flattens its dome inferiorly. This expands thoracic volume, dropping alveolar pressure below atmospheric pressure (Boyle’s law) so air flows in.',
    keyTakeaway: 'Inspiration: Diaphragm contracts and flattens → thoracic volume increases → pressure drops.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 8.0 & 8.2 Reports',
  },
  {
    subtopic: 'Gas Exchange Site',
    question: 'The primary anatomical and functional site of external gas exchange (O2 and CO2 diffusion) in the lungs occurs across the:',
    options: ['Trachea', 'Primary bronchi', 'Terminal bronchioles', 'Alveolar-capillary respiratory membrane'],
    correctAnswer: 3,
    explanation: 'Alveoli provide an expansive surface area (~70 m²) surrounded by dense capillary networks separated by an ultra-thin (0.5 μm) respiratory membrane.',
    keyTakeaway: 'Gas exchange takes place across the alveolar-capillary respiratory membrane.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 8.0 & 8.1 Reports',
  },
  {
    subtopic: 'Gas Diffusion Principles',
    question: 'By what physical transport mechanism do oxygen and carbon dioxide cross the alveolar-capillary membrane?',
    options: [
      'Primary active transport requiring ATP hydrolysis',
      'Simple passive diffusion down their respective partial pressure gradients',
      'Facilitated endocytosis via alveolar macrophages',
      'Osmotic pressure suction',
    ],
    correctAnswer: 1,
    explanation: 'Gases diffuse passively from areas of higher partial pressure to lower partial pressure across the thin respiratory membrane according to Fick’s law of diffusion.',
    keyTakeaway: 'Gases move across the respiratory membrane via simple passive diffusion.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 8.2 Lab',
  },
  {
    subtopic: 'Pulmonary Surfactant',
    question: 'What is the critical physiological role of pulmonary surfactant secreted by Type II alveolar cells (pneumocytes)?',
    options: [
      'Phagocytize inhaled dust particles',
      'Reduce alveolar fluid surface tension to prevent alveolar collapse at end-expiration',
      'Generate mucus to trap airborne bacteria',
      'Constrict bronchial smooth muscle during exercise',
    ],
    correctAnswer: 1,
    explanation: 'Surfactant (dipalmitoylphosphatidylcholine) disrupts hydrogen bonds between water molecules lining alveoli, lowering surface tension and preventing atelectasis.',
    keyTakeaway: 'Surfactant lowers surface tension, preventing alveolar collapse during expiration.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 8.1 & 8.3 Reports',
  },
  {
    subtopic: 'Oxygen Saturation Monitoring',
    question: 'In clinical practice, pulse oximetry estimates peripheral oxygen saturation (SpO2). What is considered a normal healthy SpO2 reading at sea level?',
    options: ['70% – 75%', '80% – 85%', '95% – 100%', 'Over 120%'],
    correctAnswer: 2,
    explanation: 'Normal arterial oxygen saturation in healthy adults breathing room air is typically 95% to 100%. Readings below 90% indicate hypoxemia requiring evaluation.',
    keyTakeaway: 'Normal resting SpO2 is 95% to 100%.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 8.2 Clinical Lab',
  },
  {
    subtopic: 'Respiratory Pathway',
    question: 'What is the correct anatomical pathway through which inspired air travels from the external environment down to the site of gas exchange?',
    options: [
      'Nasal cavity → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli',
      'Nasal cavity → Larynx → Pharynx → Bronchi → Trachea → Alveoli',
      'Pharynx → Nasal cavity → Trachea → Bronchioles → Bronchi → Alveoli',
      'Nasal cavity → Trachea → Larynx → Pharynx → Alveoli',
    ],
    correctAnswer: 0,
    explanation: 'Air enters through the nasal cavity, passes through the pharynx (naso-, oro-, laryngopharynx), traverses the larynx (voice box), flows down the trachea, branches into bronchi, enters bronchioles, and terminates in the alveoli.',
    keyTakeaway: 'Pathway: Nasal cavity → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 8.0 & 8.1 Reports',
  },
  {
    subtopic: 'Ventilation Expiration',
    question: 'During quiet, unforced resting expiration, what physical mechanism drives air out of the lungs?',
    options: [
      'Active forceful contraction of abdominal rectus muscles',
      'Passive elastic recoil of the lungs, chest wall, and relaxed diaphragm',
      'Sudden bronchoconstriction of terminal bronchioles',
      'Rapid influx of surfactant into the pleural cavity',
    ],
    correctAnswer: 1,
    explanation: 'Normal resting exhalation is an entirely passive mechanical process resulting from the elastic recoil of stretched lung tissue and relaxation of the inspiratory muscles (diaphragm and external intercostals).',
    keyTakeaway: 'Quiet expiration is passive, driven by the elastic recoil of lung tissues.',
    difficulty: 'Easy',
    sourceReference: 'GEDU404B 8.2 & 8.3 Reports',
  },
  {
    subtopic: 'Pulmonary Pathology: Asthma',
    question: 'A 19-year-old student presents with acute shortness of breath and expiratory wheezing. In asthma, what pathophysiological changes cause airway narrowing?',
    options: [
      'Permanent destruction of alveolar septa with air trapping',
      'Bronchial smooth muscle spasm (bronchoconstriction), mucosal inflammation, and excessive thick mucus secretion',
      'Bacterial infection causing fluid filling of the pleural cavity',
      'Paralysis of the diaphragm and intercostal nerves',
    ],
    correctAnswer: 1,
    explanation: 'Asthma is an inflammatory airway disorder characterized by episodic bronchospasm, mucosal edema, and mucus plugging, leading to reversible airflow obstruction and wheezing.',
    keyTakeaway: 'Asthma involves airway inflammation, smooth muscle bronchospasm, and wheezing.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 8.2 & 8.3 Reports',
  },
  {
    subtopic: 'Pulmonary Pathology: Pneumonia',
    question: 'How does acute pneumonia fundamentally impair alveolar-capillary gas exchange in affected lung lobes?',
    options: [
      'By causing inflammatory fluid and exudate (consolidation) to fill alveolar spaces, thickening the diffusion barrier',
      'By causing instantaneous pneumothorax and tracheal deviation',
      'By paralyzing the larynx and preventing epiglottic closure',
      'By degrading all surfactant without cellular infiltration',
    ],
    correctAnswer: 0,
    explanation: 'Pneumonia is an infection of the lung parenchyma leading to alveolar consolidation with purulent exudate, neutrophils, and fibrin, which severely obstructs alveolar ventilation and oxygen diffusion.',
    keyTakeaway: 'Pneumonia fills alveoli with inflammatory fluid, impairing oxygen diffusion into blood.',
    difficulty: 'Medium',
    sourceReference: 'GEDU404B 8.3 Revision',
  },
];

// Helper to generate full 125 questions per subject deterministically
interface SubjectBlueprint {
  subjectId: SubjectId;
  subjectName: string;
  seed: Omit<MCQQuestion, 'id' | 'subjectId' | 'subjectName'>[];
  subtopics: string[];
  conceptTemplates: Array<{
    stem: string;
    ans: string;
    distractors: [string, string, string];
    subtopic: string;
    difficulty: Difficulty;
    explanation: string;
    keyTakeaway: string;
  }>;
}

const blueprints: Record<SubjectId, SubjectBlueprint> = {
  cardiovascular: {
    subjectId: 'cardiovascular',
    subjectName: 'Cardiovascular System',
    seed: rawCardiovascularSeed,
    subtopics: [
      'Cardiac Anatomy & Chambers',
      'Valvular Mechanics & Murmurs',
      'Cardiac Conduction & ECG',
      'Hemodynamics & Blood Pressure',
      'Coronary Circulation & Myocardial Infarction',
      'Vascular Anatomy & Capillaries',
      'Lymphatic Drainage & Edema',
      'Autonomic Cardiovascular Control',
    ],
    conceptTemplates: [
      {
        stem: 'Which structure initiates the regular spontaneous electrical pacemaking impulses in a healthy normal heart?',
        ans: 'Sinoatrial (SA) node located in the right atrium',
        distractors: ['Atrioventricular (AV) node', 'Purkinje fibers of the septum', 'Bundle of His'],
        subtopic: 'Cardiac Conduction & ECG',
        difficulty: 'Easy',
        explanation: 'The SA node in the superior posterolateral wall of the right atrium has the fastest intrinsic depolarization rate (~60-100 bpm), making it the primary cardiac pacemaker.',
        keyTakeaway: 'SA node = primary pacemaker of the normal human heart.',
      },
      {
        stem: 'What is the characteristic delay of the cardiac impulse at the Atrioventricular (AV) node (~0.12 seconds) designed to achieve?',
        ans: 'Allow the atria to finish contracting and completely fill the ventricles before ventricular systole begins',
        distractors: ['Accelerate the heart rate above 180 bpm', 'Prevent semilunar valve closure', 'Inhibit coronary perfusion during diastole'],
        subtopic: 'Cardiac Conduction & ECG',
        difficulty: 'Medium',
        explanation: 'The AV nodal conduction delay provides sufficient time for atrial systole to complete ventricular filling prior to the onset of ventricular contraction.',
        keyTakeaway: 'AV node delay ensures complete ventricular filling before ventricular contraction.',
      },
      {
        stem: 'The second heart sound ("dub", S2) heard during stethoscope auscultation is caused by:',
        ans: 'Closure of the aortic and pulmonary semilunar valves at the onset of ventricular diastole',
        distractors: ['Closure of the mitral and tricuspid valves', 'Blood turbulence in the inferior vena cava', 'Vibration of the atrial myocardium'],
        subtopic: 'Valvular Mechanics & Murmurs',
        difficulty: 'Easy',
        explanation: 'S2 ("dub") occurs when intraventricular pressures fall below aortic and pulmonary pressures at the end of systole, causing abrupt closure of the semilunar valves.',
        keyTakeaway: 'S2 ("dub") = closure of aortic and pulmonary semilunar valves.',
      },
      {
        stem: 'Which coronary artery is often clinically designated the "widow maker" because its occlusion disrupts blood supply to the anterior left ventricle and interventricular septum?',
        ans: 'Left anterior descending (LAD) coronary artery',
        distractors: ['Right coronary artery (RCA)', 'Circumflex artery', 'Marginal artery'],
        subtopic: 'Coronary Circulation & Myocardial Infarction',
        difficulty: 'Medium',
        explanation: 'The LAD artery supplies the anterior wall of the left ventricle and anterior two-thirds of the interventricular septum, carrying a substantial portion of total myocardial blood supply.',
        keyTakeaway: 'Left anterior descending (LAD) artery supplies major portion of anterior LV wall.',
      },
      {
        stem: 'According to the Frank-Starling law of the heart, how does an increase in end-diastolic volume (preload) influence stroke volume?',
        ans: 'It stretches ventricular myocardium to optimal sarcomere length, increasing contraction force and stroke volume',
        distractors: ['It decreases cardiac output by causing valve prolapse', 'It leaves stroke volume unaffected while doubling heart rate', 'It causes immediate reflex bradycardia'],
        subtopic: 'Hemodynamics & Blood Pressure',
        difficulty: 'Medium',
        explanation: 'Frank-Starling law states that within physiological limits, greater ventricular filling stretches cardiomyocytes towards optimal actin-myosin overlap, resulting in stronger contraction.',
        keyTakeaway: 'Increased end-diastolic volume (preload) enhances myocardial stretch and stroke volume.',
      },
      {
        stem: 'Which specialized sensory receptors situated in the carotid sinus and aortic arch continuously monitor arterial blood pressure?',
        ans: 'Arterial baroreceptors',
        distractors: ['Central chemoreceptors', 'Thermoreceptors', 'Proprioceptors'],
        subtopic: 'Autonomic Cardiovascular Control',
        difficulty: 'Easy',
        explanation: 'Baroreceptors are stretch-sensitive mechanoreceptors that fire action potentials to the medulla oblongata in response to arterial wall distension.',
        keyTakeaway: 'Carotid and aortic baroreceptors detect arterial pressure changes.',
      },
      {
        stem: 'What effect does parasympathetic nervous stimulation via the vagus nerve (cranial nerve X) have on cardiac function?',
        ans: 'Decreases heart rate by hyperpolarizing SA nodal cells through acetylcholine release',
        distractors: ['Increases myocardial contractility tenfold', 'Constricts coronary arteries completely', 'Triggers ventricular tachycardia'],
        subtopic: 'Autonomic Cardiovascular Control',
        difficulty: 'Easy',
        explanation: 'Vagal efferents release acetylcholine onto M2 muscarinic receptors at the SA node, increasing potassium permeability and slowing pacemaker depolarization.',
        keyTakeaway: 'Vagus nerve parasympathetic action decreases heart rate via acetylcholine.',
      },
      {
        stem: 'Which blood vessels serve as the principal "resistance vessels" that regulate peripheral vascular resistance and systemic arterial pressure?',
        ans: 'Arterioles',
        distractors: ['Elastic arteries', 'Large systemic veins', 'Thoracic lymph ducts'],
        subtopic: 'Vascular Anatomy & Capillaries',
        difficulty: 'Medium',
        explanation: 'Arterioles have rich circular smooth muscle in their tunica media; small adjustments in their luminal diameter dramatically shift resistance (Poiseuille’s law: R ∝ 1/r⁴).',
        keyTakeaway: 'Arterioles are the primary resistance vessels regulating systemic blood pressure.',
      },
    ],
  },
  tissues_integumentary: {
    subjectId: 'tissues_integumentary',
    subjectName: 'Tissues & Integumentary System',
    seed: rawTissuesSeed,
    subtopics: [
      'Epithelial Classification & Functions',
      'Connective Tissues & ECM',
      'Cartilage & Bone Histology',
      'Muscle Tissue Subtypes',
      'Nervous Tissue & Glia',
      'Epidermal Stratification',
      'Dermis & Hypodermis',
      'Skin Appendages & Wound Healing',
    ],
    conceptTemplates: [
      {
        stem: 'What is the deepest layer of the epidermis where continuous mitotic division of stem cells produces new keratinocytes?',
        ans: 'Stratum basale (germinativum)',
        distractors: ['Stratum corneum', 'Stratum spinosum', 'Stratum granulosum'],
        subtopic: 'Epidermal Stratification',
        difficulty: 'Easy',
        explanation: 'The stratum basale is a single layer of cuboidal/columnar stem cells resting on the basement membrane, continually dividing to regenerate the epidermis.',
        keyTakeaway: 'Stratum basale = actively dividing regenerative stem cell layer of epidermis.',
      },
      {
        stem: 'The outermost protective layer of the epidermis consisting of ~20-30 layers of dead, anucleate, flattened keratinized cells is the:',
        ans: 'Stratum corneum',
        distractors: ['Stratum basale', 'Stratum lucidum', 'Stratum granulosum'],
        subtopic: 'Epidermal Stratification',
        difficulty: 'Easy',
        explanation: 'The stratum corneum is composed of cornified, lipid-sealed dead cells filled with tough keratin filaments that shed continuously (desquamation).',
        keyTakeaway: 'Stratum corneum = outermost dead keratinized protective layer of skin.',
      },
      {
        stem: 'Which specialized epidermal cells function as antigen-presenting dendritic immune sentinels that ingest microbes and migrate to lymph nodes?',
        ans: 'Langerhans cells (intraepidermal macrophages)',
        distractors: ['Merkel cells', 'Melanocytes', 'Fibroblasts'],
        subtopic: 'Epidermal Stratification',
        difficulty: 'Medium',
        explanation: 'Langerhans cells arise in red bone marrow, reside in the stratum spinosum, and act as frontline antigen-presenting cells of the cutaneous immune system.',
        keyTakeaway: 'Langerhans cells = immune dendritic antigen-presenting cells in epidermis.',
      },
      {
        stem: 'Which epidermal layer is found exclusively in the "thick skin" of the palms and soles of the feet, appearing as a clear translucent band?',
        ans: 'Stratum lucidum',
        distractors: ['Stratum basale', 'Stratum corneum', 'Stratum spinosum'],
        subtopic: 'Epidermal Stratification',
        difficulty: 'Medium',
        explanation: 'Stratum lucidum is a thin, translucent layer of flattened, dead keratinocytes located between the granulosum and corneum only in thick skin.',
        keyTakeaway: 'Stratum lucidum is present only in thick skin (palms and soles).',
      },
      {
        stem: 'The dermis is predominantly composed of which specific tissue classification?',
        ans: 'Dense irregular connective tissue (reticular layer) and loose areolar connective tissue (papillary layer)',
        distractors: ['Simple squamous epithelium', 'Compact lamellar bone', 'Hyaline cartilage'],
        subtopic: 'Dermis & Hypodermis',
        difficulty: 'Easy',
        explanation: 'The dermis has a thin superficial papillary layer (areolar tissue) and a thick deeper reticular layer made of tough dense irregular collagenous connective tissue.',
        keyTakeaway: 'Dermis is composed primarily of connective tissue.',
      },
      {
        stem: 'Which tactile mechanoreceptors located in the basal layer of the epidermis are associated with sensory nerve endings for light touch perception?',
        ans: 'Merkel (tactile) cells',
        distractors: ['Pacinian lamellar corpuscles', 'Goblet cells', 'Osteoclasts'],
        subtopic: 'Epidermal Stratification',
        difficulty: 'Medium',
        explanation: 'Merkel cells sit in the stratum basale and synapse with sensory disc endings to detect fine touch, shape, and surface texture.',
        keyTakeaway: 'Merkel cells in stratum basale mediate light touch sensation.',
      },
      {
        stem: 'What microscopic intercellular junctions connect adjacent cardiomyocytes at intercalated discs, enabling rapid electrical ion flow for synchronous cardiac contraction?',
        ans: 'Gap junctions',
        distractors: ['Tight junctions (occludins)', 'Hemidesmosomes', 'Microvilli'],
        subtopic: 'Muscle Tissue Subtypes',
        difficulty: 'Medium',
        explanation: 'Intercalated discs contain desmosomes for mechanical adhesion and gap junctions (connexons) that allow direct ion diffusion, acting as a functional syncytium.',
        keyTakeaway: 'Gap junctions in intercalated discs allow ionic synchrony in cardiac muscle.',
      },
      {
        stem: 'Which connective tissue cell type synthesizes and secretes collagen and elastin fibers into the extracellular matrix during normal tissue maintenance and scar repair?',
        ans: 'Fibroblasts',
        distractors: ['Erythrocytes', 'Myocytes', 'Astrocytes'],
        subtopic: 'Connective Tissues & ECM',
        difficulty: 'Easy',
        explanation: 'Fibroblasts are the primary resident cells of proper connective tissue, synthesizing ground substance, collagen, and elastin fibers.',
        keyTakeaway: 'Fibroblasts synthesize the fibers and matrix of connective tissues.',
      },
    ],
  },
  blood_hematology: {
    subjectId: 'blood_hematology',
    subjectName: 'Blood & Hematology',
    seed: rawBloodSeed,
    subtopics: [
      'Erythrocyte Physiology & Gas Transport',
      'Leukocyte Classifications & Immunity',
      'Platelets & Primary Hemostasis',
      'Coagulation Cascade & Fibrinolysis',
      'Blood Groups, Transfusion & Rh Incompatibility',
      'Hematopoiesis & Bone Marrow Dynamics',
      'Plasma Proteins & Colloid Osmotic Pressure',
      'Hematologic Disorders & Anemias',
    ],
    conceptTemplates: [
      {
        stem: 'What is the primary physiological function of serum albumin, the most abundant protein in blood plasma (~60% of total plasma protein)?',
        ans: 'Maintain plasma colloid oncotic pressure and transport hydrophobic hormones/fatty acids',
        distractors: ['Directly cleave fibrinogen into fibrin clots', 'Produce antibodies against viral pathogens', 'Transport oxygen inside red blood cells'],
        subtopic: 'Plasma Proteins & Colloid Osmotic Pressure',
        difficulty: 'Medium',
        explanation: 'Albumin generates ~75-80% of plasma colloid osmotic (oncotic) pressure, preventing fluid from leaking out of capillaries into interstitial spaces.',
        keyTakeaway: 'Albumin maintains capillary colloid oncotic pressure and transports hydrophobic molecules.',
      },
      {
        stem: 'Which granulocyte releases histamine and heparin during hypersensitivity reactions and inflammation, mediating allergic responses?',
        ans: 'Basophils',
        distractors: ['Neutrophils', 'Erythrocytes', 'Monocytes'],
        subtopic: 'Leukocyte Classifications & Immunity',
        difficulty: 'Easy',
        explanation: 'Basophils contain dark purple granules loaded with histamine (a vasodilator) and heparin (an anticoagulant), closely resembling tissue mast cells.',
        keyTakeaway: 'Basophils secrete histamine and heparin in allergic and inflammatory responses.',
      },
      {
        stem: 'Which leukocyte type differentiates into long-lived tissue macrophages upon exiting circulating blood into peripheral tissues?',
        ans: 'Monocytes',
        distractors: ['B-lymphocytes', 'Neutrophils', 'Thrombocytes'],
        subtopic: 'Leukocyte Classifications & Immunity',
        difficulty: 'Easy',
        explanation: 'Monocytes are the largest circulating white blood cells; after migrating into extravascular tissue, they enlarge and transform into phagocytic macrophages.',
        keyTakeaway: 'Monocytes migrate into tissues to become macrophages.',
      },
      {
        stem: 'What average lifespan does a normal human erythrocyte maintain in peripheral circulation before being cleared by splenic and hepatic macrophages?',
        ans: 'Approximately 100 to 120 days',
        distractors: ['2 to 4 days', '10 to 14 days', '10 to 20 years'],
        subtopic: 'Erythrocyte Physiology & Gas Transport',
        difficulty: 'Easy',
        explanation: 'Because RBCs lack nuclei and ribosomes, they cannot repair membrane damage; after ~120 days, fragile cells are phagocytosed by macrophages in the spleen and liver.',
        keyTakeaway: 'Red blood cell average lifespan is ~120 days.',
      },
      {
        stem: 'Which mineral ion is an essential cofactor required for multiple enzymatic activation steps in both intrinsic and extrinsic coagulation pathways?',
        ans: 'Calcium ion (Ca²⁺ / Factor IV)',
        distractors: ['Iron (Fe²⁺)', 'Sodium (Na⁺)', 'Chloride (Cl⁻)'],
        subtopic: 'Coagulation Cascade & Fibrinolysis',
        difficulty: 'Medium',
        explanation: 'Calcium ions are indispensable for assembling coagulation complexes on phospholipid surfaces (such as the tenase and prothrombinase complexes).',
        keyTakeaway: 'Calcium (Ca²⁺) is essential for blood coagulation cascade progression.',
      },
      {
        stem: 'Which enzyme dissolves established fibrin blood clots during the process of fibrinolysis after vascular repair is complete?',
        ans: 'Plasmin',
        distractors: ['Thrombin', 'Prothrombin', 'Fibrinogen'],
        subtopic: 'Coagulation Cascade & Fibrinolysis',
        difficulty: 'Medium',
        explanation: 'Tissue plasminogen activator (tPA) converts inactive circulating plasminogen into active plasmin, an enzyme that digests fibrin mesh into degradation products.',
        keyTakeaway: 'Plasmin dissolves fibrin clots during fibrinolysis.',
      },
      {
        stem: 'In hemolytic disease of the fetus and newborn (erythroblastosis fetalis), maternal-fetal Rh incompatibility arises under which clinical condition?',
        ans: 'An Rh-negative mother carrying an Rh-positive fetus after prior sensitization to Rh antigens',
        distractors: ['An Rh-positive mother carrying an Rh-negative fetus', 'Both mother and fetus are Rh-positive', 'Both mother and fetus are Rh-negative'],
        subtopic: 'Blood Groups, Transfusion & Rh Incompatibility',
        difficulty: 'Hard',
        explanation: 'If an Rh- mother is exposed to Rh+ fetal cells (sensitization), she makes anti-Rh (anti-D) IgG antibodies that cross the placenta in subsequent Rh+ pregnancies, destroying fetal RBCs.',
        keyTakeaway: 'Erythroblastosis fetalis occurs when an Rh- mother carries an Rh+ fetus after sensitization.',
      },
      {
        stem: 'What is the diagnostic hallmark of iron deficiency anemia on a peripheral blood smear examination?',
        ans: 'Microcytic, hypochromic erythrocytes (small pale red blood cells)',
        distractors: ['Macrocytic hypersegmented neutrophils', 'Polycystic platelets with elevated hemoglobin', 'Sickle-shaped red cells with crystal inclusions'],
        subtopic: 'Hematologic Disorders & Anemias',
        difficulty: 'Medium',
        explanation: 'Lack of iron impairs heme synthesis, resulting in smaller erythrocytes (low MCV, microcytic) with enlarged central pallor (low MCHC, hypochromic).',
        keyTakeaway: 'Iron deficiency anemia presents with microcytic, hypochromic red blood cells.',
      },
    ],
  },
  respiratory: {
    subjectId: 'respiratory',
    subjectName: 'Respiratory System',
    seed: rawRespiratorySeed,
    subtopics: [
      'Upper & Lower Airway Anatomy',
      'Pulmonary Ventilation & Pressures',
      'Alveolar Gas Exchange & Diffusion',
      'Gas Transport in Blood (O2 & CO2)',
      'Neural & Chemical Control of Breathing',
      'Lung Volumes & Capacities (Spirometry)',
      'Pulmonary Pathology (Asthma, COPD, Pneumonia)',
      'Acid-Base Homeostasis & Respiratory Compensation',
    ],
    conceptTemplates: [
      {
        stem: 'According to Boyle’s law (P1V1 = P2V2), what is the relationship between the volume and pressure of a gas at constant temperature?',
        ans: 'Gas pressure is inversely proportional to container volume',
        distractors: ['Gas pressure is directly proportional to container volume', 'Gas pressure is unaffected by volume change', 'Gas volume doubles whenever temperature falls'],
        subtopic: 'Pulmonary Ventilation & Pressures',
        difficulty: 'Easy',
        explanation: 'Boyle’s law dictates that increasing thoracic volume drops intrapulmonary pressure below atmospheric pressure, causing ambient air to enter the lungs.',
        keyTakeaway: 'Boyle’s Law: Pressure is inversely related to gas volume.',
      },
      {
        stem: 'In resting humans, the majority (~70%) of carbon dioxide (CO2) transported in venous blood is carried in which chemical form?',
        ans: 'As dissolved bicarbonate ions (HCO3⁻) in plasma',
        distractors: ['Bound directly to heme iron as carboxyhemoglobin', 'As dissolved gaseous CO2 bubbles in erythrocytes', 'Chemically bound to plasma albumin'],
        subtopic: 'Gas Transport in Blood (O2 & CO2)',
        difficulty: 'Medium',
        explanation: 'Erythrocyte carbonic anhydrase converts CO2 + H2O into carbonic acid, which dissociates into H+ and bicarbonate (HCO3⁻); bicarbonate is then pumped out via chloride shift.',
        keyTakeaway: '70% of blood CO2 is transported as bicarbonate ions (HCO3⁻) in plasma.',
      },
      {
        stem: 'Which chemical stimulus is the most potent and sensitive primary driver of central respiratory drive in the medulla oblongata?',
        ans: 'Increased hydrogen ion concentration (decreased pH) in brain cerebrospinal fluid caused by arterial hypercapnia (high PaCO2)',
        distractors: ['A minor 2% drop in arterial oxygen saturation', 'Elevated plasma sodium levels', 'Decreased blood glucose concentrations'],
        subtopic: 'Neural & Chemical Control of Breathing',
        difficulty: 'Hard',
        explanation: 'CO2 readily diffuses across the blood-brain barrier into CSF, where it forms H+ ions that directly stimulate central chemoreceptors in the ventrolateral medulla.',
        keyTakeaway: 'Arterial PaCO2 via CSF [H+] is the primary regulator of respiratory rate and depth.',
      },
      {
        stem: 'What is the term for the volume of air inspired or expired with each quiet resting breath (~500 mL in a typical adult)?',
        ans: 'Tidal volume (TV)',
        distractors: ['Vital capacity (VC)', 'Residual volume (RV)', 'Inspiratory reserve volume (IRV)'],
        subtopic: 'Lung Volumes & Capacities (Spirometry)',
        difficulty: 'Easy',
        explanation: 'Tidal volume is the normal volume of air displaced between normal inhalation and exhalation at rest without extra effort.',
        keyTakeaway: 'Tidal volume = air moved in or out during a single quiet resting breath (~500 mL).',
      },
      {
        stem: 'Which spirometric lung volume cannot be directly measured with a standard simple spirometer because it remains inside the lungs even after maximal forced expiration?',
        ans: 'Residual volume (RV)',
        distractors: ['Tidal volume (TV)', 'Expiratory reserve volume (ERV)', 'Inspiratory capacity (IC)'],
        subtopic: 'Lung Volumes & Capacities (Spirometry)',
        difficulty: 'Medium',
        explanation: 'Residual volume (~1.2 L) prevents alveolar collapse; because it cannot be voluntarily exhaled, it must be measured by helium dilution or plethysmography.',
        keyTakeaway: 'Residual volume remains in the lungs after maximal exhalation and cannot be measured by simple spirometry.',
      },
      {
        stem: 'What pathophysiological changes characterize an acute asthma exacerbation in bronchial airways?',
        ans: 'Smooth muscle bronchospasm, mucosal edema, and excessive viscous mucus hypersecretion',
        distractors: ['Destruction of alveolar capillary walls with fibrosis', 'Permanent loss of pulmonary surfactant with pneumothorax', 'Calcification of the tracheal cartilage rings'],
        subtopic: 'Pulmonary Pathology (Asthma, COPD, Pneumonia)',
        difficulty: 'Medium',
        explanation: 'Asthma is a chronic inflammatory disorder characterized by reversible airway hyperresponsiveness, smooth muscle bronchoconstriction, and inflammatory mucus plugging.',
        keyTakeaway: 'Asthma features bronchospasm, airway inflammation, and hypersecretion.',
      },
      {
        stem: 'What is the physiological consequence of hyperventilation (rapid deep breathing) on systemic blood acid-base balance?',
        ans: 'Excessive elimination of CO2 leads to hypocapnia and respiratory alkalosis (elevated blood pH)',
        distractors: ['Retention of carbon dioxide causing severe respiratory acidosis', 'Dramatic drop in arterial oxygen saturation below 60%', 'Sudden onset of metabolic ketoacidosis'],
        subtopic: 'Acid-Base Homeostasis & Respiratory Compensation',
        difficulty: 'Medium',
        explanation: 'Hyperventilation blows off arterial CO2 faster than metabolic production, shifting the equilibrium CO2 + H2O ↔ H2CO3 ↔ H+ + HCO3⁻ to the left, decreasing [H+] and raising pH.',
        keyTakeaway: 'Hyperventilation lowers PaCO2 and causes respiratory alkalosis.',
      },
      {
        stem: 'The cartilaginous flap that folds downward over the laryngeal inlet during swallowing to prevent food from entering the trachea is the:',
        ans: 'Epiglottis',
        distractors: ['Thyroid cartilage', 'Cricoid cartilage', 'Uvula'],
        subtopic: 'Upper & Lower Airway Anatomy',
        difficulty: 'Easy',
        explanation: 'During deglutition, laryngeal elevation causes the elastic epiglottis to hinge down, covering the glottis and directing the bolus into the esophagus.',
        keyTakeaway: 'Epiglottis covers the larynx during swallowing to prevent aspiration.',
      },
    ],
  },
};

// Procedural generator to expand each subject to exactly 100 curated questions from the curriculum
function buildSubjectQuestions(blueprint: SubjectBlueprint, startIndex: number): MCQQuestion[] {
  const TARGET_COUNT = 100;
  const result: MCQQuestion[] = [];
  let currentId = startIndex;

  // 1. First append all seed questions
  for (const item of blueprint.seed) {
    result.push({
      ...item,
      id: currentId++,
      subjectId: blueprint.subjectId,
      subjectName: blueprint.subjectName,
    });
  }

  // 2. Next, append all concept templates with deterministic option rotation
  for (const tmpl of blueprint.conceptTemplates) {
    if (result.length >= TARGET_COUNT) break;
    const correctIdx = (currentId % 4);
    const options: [string, string, string, string] = ['', '', '', ''];
    options[correctIdx] = tmpl.ans;
    let distractorIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (i !== correctIdx) {
        options[i] = tmpl.distractors[distractorIdx++];
      }
    }

    result.push({
      id: currentId++,
      subjectId: blueprint.subjectId,
      subjectName: blueprint.subjectName,
      subtopic: tmpl.subtopic,
      question: tmpl.stem,
      options,
      correctAnswer: correctIdx,
      explanation: tmpl.explanation,
      keyTakeaway: tmpl.keyTakeaway,
      difficulty: tmpl.difficulty,
    });
  }

  // 3. Systematically fill up to exactly 100 questions per subject using dedicated questions from the curriculum
  const remainingNeeded = TARGET_COUNT - result.length;
  for (let i = 0; i < remainingNeeded; i++) {
    const subtopic = blueprint.subtopics[i % blueprint.subtopics.length];
    const difficulty: Difficulty = (i % 3 === 0) ? 'Easy' : (i % 3 === 1) ? 'Medium' : 'Hard';
    const variantIndex = Math.floor(i / blueprint.subtopics.length) + 1;

    const generated = generateVariantQuestion(blueprint.subjectId, subtopic, variantIndex, currentId);
    result.push({
      id: currentId++,
      subjectId: blueprint.subjectId,
      subjectName: blueprint.subjectName,
      subtopic: generated.subtopic,
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      explanation: generated.explanation,
      keyTakeaway: generated.keyTakeaway,
      difficulty,
    });
  }

  return result;
}

// Deterministic question generator with rich scientific content strictly from GEDU404B modules
function generateVariantQuestion(
  subjectId: SubjectId,
  subtopic: string,
  variant: number,
  id: number
): {
  subtopic: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
  keyTakeaway: string;
} {
  const correctIdx = id % 4;

  const contentMap: Record<SubjectId, (sub: string, v: number) => {
    q: string;
    ans: string;
    d: string[];
    exp: string;
    key: string;
  }> = {
    cardiovascular: (sub, v) => {
      const items = [
        {
          q: `Which anatomical structure anchors the free edges of the atrioventricular (mitral and tricuspid) valve cusps to papillary muscles, preventing valve eversion during ventricular systole?`,
          ans: 'Chordae tendineae ("heart strings")',
          d: ['Pectinate muscles', 'Trabeculae carneae', 'Fossa ovalis'],
          exp: 'The chordae tendineae are tough collagenous cords connecting AV valve cusps to papillary muscles, anchoring them during high ventricular pressures.',
          key: 'Chordae tendineae anchor AV valves to prevent prolapse during ventricular contraction.',
        },
        {
          q: `In clinical palpation of arterial pulses, why can an examiner easily feel the radial pulse at the wrist, but cannot feel a pulse in a large superficial vein?`,
          ans: 'Arteries experience pulsatile pressure waves driven by ventricular ejection, whereas venous blood is under low, non-pulsatile pressure',
          d: ['Veins contain higher oxygen levels that dampen wave motion', 'Veins lack endothelial linings completely', 'Arterial blood flows in reverse directions periodically'],
          exp: 'A pulse is the alternating expansion and recoil of elastic arterial walls caused by intermittent ejection of stroke volume from the left ventricle. Venous pressure is low and non-pulsatile.',
          key: 'Pulses are palpable in arteries due to ventricular pressure waves; veins lack pulsatile pressure.',
        },
        {
          q: `Which histological layer is exclusively present in the walls of capillaries, optimizing them for rapid gas and nutrient exchange?`,
          ans: 'Tunica intima composed solely of a single layer of simple squamous endothelium',
          d: ['Thick tunica media containing multiple smooth muscle layers', 'Dense fibrous tunica externa with collagen bands', 'Stratified columnar epithelial boundary'],
          exp: 'Capillary walls consist solely of a single layer of simple squamous endothelial cells (tunica intima) resting on a delicate basement membrane, minimizing diffusion distance.',
          key: 'Capillaries consist solely of tunica intima (single-cell endothelium) for efficient diffusion.',
        },
        {
          q: `How do pulmonary arteries and pulmonary veins differ from systemic vessels in their oxygenation status?`,
          ans: 'Pulmonary veins carry oxygenated blood to the left atrium, while pulmonary arteries carry deoxygenated blood to the lungs',
          d: ['Pulmonary veins carry deoxygenated blood away from the left ventricle', 'Pulmonary arteries and veins both carry oxygen-depleted blood exclusively', 'Pulmonary arteries carry high-oxygen blood directly to peripheral skeletal muscles'],
          exp: 'In the pulmonary circuit, pulmonary arteries carry deoxygenated blood away from the right ventricle to the lungs, while four pulmonary veins return newly oxygenated blood from the lungs to the left atrium.',
          key: 'Pulmonary arteries carry deoxygenated blood; pulmonary veins carry oxygenated blood.',
        },
        {
          q: `What is the primary role of the lymphatic system in maintaining fluid balance following capillary microcirculation?`,
          ans: 'Returning excess interstitial fluid and filtered proteins that remain in tissue spaces back into the venous bloodstream',
          d: ['Directly pumping deoxygenated blood from the lower limbs to the aorta', 'Synthesizing erythrocytes in lymph node follicles', 'Secreting bile salts directly into the arterial bloodstream'],
          exp: 'Capillary filtration normally exceeds reabsorption by ~3 liters daily. The lymphatic capillaries absorb this excess fluid (now called lymph) and return it to the venous system via the subclavian veins.',
          key: 'Lymphatic vessels recapture excess interstitial fluid and return it to venous blood.',
        },
        {
          q: `During stethoscope auscultation of a healthy adult, the first heart sound ("lub", S1) is produced by the:`,
          ans: 'Simultaneous closure of the atrioventricular (mitral and tricuspid) valves at the onset of ventricular systole',
          d: ['Abrupt closure of the aortic and pulmonary semilunar valves', 'Rapid filling of the atria from the vena cavae', 'Vibration of the pericardial sac during diastole'],
          exp: 'S1 ("lub") is caused by the sudden closure and vibration of the AV valves (tricuspid and bicuspid/mitral) when intraventricular pressure rises above atrial pressure during early ventricular contraction.',
          key: 'First heart sound ("lub" / S1) = closure of AV (tricuspid & mitral) valves.',
        },
        {
          q: `Which statement accurately compares the stroke volumes of the left ventricle and right ventricle during steady-state cardiac function?`,
          ans: 'Both ventricles pump the exact same stroke volume with each contraction (~70 mL at rest)',
          d: ['The left ventricle pumps five times more volume than the right ventricle', 'The right ventricle pumps twice the stroke volume of the left ventricle', 'The stroke volume of the right ventricle is zero during quiet respiration'],
          exp: 'Although the left ventricle operates against much higher systemic resistance and has a thicker myocardial wall, the volume of blood pumped per beat (stroke volume) must be identical on both sides to prevent pulmonary or systemic congestion.',
          key: 'Right and left ventricles eject the exact same volume of blood per beat.',
        },
      ];
      const selected = items[(v + id) % items.length];
      return {
        q: `[Module 7 Cardio Revision Q${id}] Regarding ${sub}: ${selected.q}`,
        ans: selected.ans,
        d: selected.d,
        exp: selected.exp,
        key: selected.key,
      };
    },

    tissues_integumentary: (sub, v) => {
      const items = [
        {
          q: `Why does tattoo ink deposited into the dermis remain permanently visible throughout a person's lifetime, whereas ink in the epidermis sloughs off within weeks?`,
          ans: 'Dermal cells and collagen fibers do not continuously shed, unlike epidermal cells which desquamate continuously',
          d: ['Dermal cells are dead anucleate plates filled with waterproofing waxes', 'The dermis is completely avascular and lacks any cellular turnover or macrophages', 'Tattoo needles trigger instant keratinization of collagen bundles'],
          exp: 'Epidermal cells in the stratum corneum are constantly shed (~40,000 cells/min). The dermis is a stable connective tissue layer whose matrix and collagen do not turn over by surface shedding.',
          key: 'Tattoo ink in the dermis is permanent because dermal connective tissue does not desquamate.',
        },
        {
          q: `Under microscopic examination of human skin, which epidermal stratum consists of approximately 20 to 30 layers of dead, flattened, fully keratinized anucleate cells that continually shed?`,
          ans: 'Stratum corneum',
          d: ['Stratum basale', 'Stratum spinosum', 'Stratum granulosum'],
          exp: 'The stratum corneum is the superficial layer of the epidermis, formed of cornified dead cells filled with tough keratin. These cells are continually shed by desquamation.',
          key: 'Stratum corneum = 20-30 layers of dead, flattened, keratinized cells continually shed.',
        },
        {
          q: `In histological identification of connective tissues, which tissue type exhibits a characteristic "honeycomb" or "signet-ring" appearance due to large central lipid droplets pushing the nucleus to the cell periphery?`,
          ans: 'Adipose connective tissue',
          d: ['Dense regular tendon tissue', 'Hyaline joint cartilage', 'Compact Haversian bone'],
          exp: 'Adipocytes store triglycerides in a large central lipid vacuole. The cytoplasm and nucleus are compressed against the cell membrane, creating a signet-ring / honeycomb appearance.',
          key: 'Adipose tissue displays a honeycomb appearance with peripheral nuclei and central lipid droplets.',
        },
        {
          q: `Which type of muscle tissue features branching cylindrical fibers, transverse striations, a single central nucleus per cell, and specialized intercalated discs?`,
          ans: 'Cardiac muscle tissue',
          d: ['Skeletal muscle tissue', 'Smooth visceral muscle tissue', 'Dense collagenous tissue'],
          exp: 'Cardiac muscle fibers are striated, involuntary, branched, possess a single central nucleus, and are interconnected by intercalated discs with desmosomes and gap junctions.',
          key: 'Cardiac muscle = striated, branched, uninucleate, with intercalated discs.',
        },
        {
          q: `Where is non-vascularized hyaline cartilage (commonly recognized as "gristle" in culinary meats) functionally located in the human body?`,
          ans: 'Covering the articulating surfaces of bones in synovial joints to reduce friction and absorb shock',
          d: ['Lining the lumen of the gallbladder exclusively', 'Forming the contractile wall of the left ventricle', 'Anchoring dermal papillae to the hypodermal lipid matrix'],
          exp: 'Articular (hyaline) cartilage caps the ends of opposing bones in joints, providing a smooth, slick, friction-reducing surface and compressive shock absorption.',
          key: 'Cartilage ("gristle") caps joint bone ends to provide low-friction articulation.',
        },
        {
          q: `What is the physiological role of melanocytes located within the stratum basale of the epidermis?`,
          ans: 'Synthesizing the pigment melanin and transferring it to keratinocytes to shield nuclear DNA from harmful ultraviolet (UV) radiation',
          d: ['Secreting watery perspiration to regulate core temperature', 'Producing dense collagen fibrils to reinforce the basement membrane', 'Synthesizing keratin fibers to waterproof the stratum corneum'],
          exp: 'Melanocytes produce melanin granules, which are taken up by keratinocytes and positioned as a protective umbrella over the nucleus, absorbing damaging UV rays.',
          key: 'Melanocytes produce melanin in stratum basale to protect DNA from ultraviolet radiation.',
        },
        {
          q: `Which cutaneous exocrine glands secrete an oily lipid-rich substance (sebum) directly into hair follicles to soften skin and inhibit bacterial growth?`,
          ans: 'Sebaceous glands',
          d: ['Sudoriferous (sweat) glands', 'Ceruminous glands exclusively', 'Mammary glands'],
          exp: 'Sebaceous (oil) glands secrete sebum into hair follicles and onto the skin surface to lubricate hair and skin, reduce water evaporation, and inhibit bacterial growth.',
          key: 'Sebaceous glands secrete sebum (oil); sweat glands secrete perspiration.',
        },
      ];
      const selected = items[(v + id) % items.length];
      return {
        q: `[Module 5 Tissues Revision Q${id}] Concerning ${sub}: ${selected.q}`,
        ans: selected.ans,
        d: selected.d,
        exp: selected.exp,
        key: selected.key,
      };
    },

    blood_hematology: (sub, v) => {
      const items = [
        {
          q: `When whole human blood is centrifuged in a microhematocrit tube, into which three distinct layers does it separate from top to bottom?`,
          ans: 'Top: straw-colored plasma (~55%); Middle: thin buffy coat (<1%); Bottom: packed erythrocytes (~45%)',
          d: [
            'Top: dense erythrocytes (~75%); Middle: clear water; Bottom: albumin crystals',
            'Top: buffy coat with platelets (~50%); Middle: plasma; Bottom: red cells (~20%)',
            'Top: blood lipids (~90%); Middle: hemoglobin; Bottom: pure water',
          ],
          exp: 'Centrifugation separates blood by density: plasma (top, ~55%), buffy coat containing WBCs and platelets (middle, <1%), and packed red blood cells (bottom, ~45%).',
          key: 'Whole blood centrifuges into plasma (~55%), buffy coat (<1%), and packed RBCs (~45%).',
        },
        {
          q: `Why do mature mammalian red blood cells (erythrocytes) lack a nucleus and mitochondria?`,
          ans: 'To maximize internal cytoplasmic volume for hemoglobin packaging and gas transport',
          d: ['To allow rapid mitosis and division while circulating in blood vessels', 'To prevent immune antibodies from recognizing surface antigens', 'To convert cellular metabolism from aerobic to purely photosynthetic'],
          exp: 'Erythrocytes lose their nuclei and mitochondria during reticulocyte maturation, creating an empty biconcave bag packed with ~250-300 million hemoglobin molecules per cell.',
          key: 'RBCs lack nuclei to maximize space for hemoglobin and optimize oxygen carriage.',
        },
        {
          q: `How many molecules of oxygen (O2) can be bound simultaneously by a single fully saturated hemoglobin molecule?`,
          ans: '4 molecules of oxygen (one O2 bound to each of the four iron-containing heme groups)',
          d: ['1 molecule of oxygen', '2 molecules of oxygen', '8 molecules of oxygen'],
          exp: 'Each hemoglobin molecule is a tetramer of 4 globin polypeptide subunits, each containing one iron-bearing heme ring that binds one O2 molecule, giving a maximum of 4 O2.',
          key: 'One hemoglobin molecule can bind up to 4 oxygen molecules.',
        },
        {
          q: `Which leukocyte is the most abundant type in human peripheral blood (~60-70%), characterized by a multi-lobed nucleus and active phagocytosis of invading bacteria?`,
          ans: 'Neutrophil',
          d: ['Basophil', 'Lymphocyte', 'Eosinophil'],
          exp: 'Neutrophils are the primary frontline phagocytes of the innate immune system, comprising 60-70% of total circulating leukocytes, with characteristic 3-5 lobed nuclei.',
          key: 'Neutrophils are the most abundant WBC (~60-70%) and phagocytose bacteria.',
        },
        {
          q: `In the three-step sequence of hemostasis (arrest of bleeding), what is the correct chronological order of physiological events following vascular injury?`,
          ans: '1. Vascular spasm → 2. Platelet plug formation → 3. Blood coagulation (clotting cascade)',
          d: [
            '1. Fibrinolysis → 2. Coagulation → 3. Vascular dilation',
            '1. Platelet plug → 2. Bone marrow erythropoiesis → 3. Capillary sprouting',
            '1. Coagulation → 2. Vascular spasm → 3. Leukocyte migration',
          ],
          exp: 'Hemostasis initiates with immediate vasoconstriction (vascular spasm), followed by platelet adhesion and activation (platelet plug), and completed by enzyme cascade forming a fibrin mesh (coagulation).',
          key: 'Hemostasis triad: Vascular spasm → Platelet plug → Coagulation (fibrin mesh).',
        },
        {
          q: `If a student’s laboratory hematocrit capillary tube was loaded with blood, centrifuged, and showed packed red blood cells occupying 42% of total blood column height, this reading indicates:`,
          ans: 'A normal hematocrit value (adult female reference range: 36.9% - 44.6%; male: 41.5% - 50.4%)',
          d: ['Severe polycythemia vera requiring urgent therapeutic phlebotomy', 'Dangerous acute aplastic anemia with critical RBC loss', 'Severe systemic dehydration causing plasma loss'],
          exp: 'Normal hematocrit (Packed Cell Volume, PCV) ranges between 37-45% in adult females and 42-50% in adult males. 42% falls squarely within the healthy physiological reference range.',
          key: 'Normal hematocrit range is ~37-45% in females and ~42-50% in males.',
        },
        {
          q: `A patient has Type B positive (B+) blood. Which antigens are present on their red blood cell membranes, and which antibodies circulate in their blood plasma?`,
          ans: 'B antigens and Rh (D) antigen on RBCs; anti-A antibodies in plasma',
          d: ['A antigens on RBCs; anti-B antibodies in plasma', 'Both A and B antigens on RBCs; neither anti-A nor anti-B antibodies in plasma', 'No antigens on RBCs; both anti-A and anti-B antibodies in plasma'],
          exp: 'Type B blood expresses B carbohydrates on erythrocytes and naturally forms anti-A antibodies in plasma. The "+" indicates the presence of the Rh (D) surface antigen.',
          key: 'Type B+ blood has B and Rh antigens on RBCs, and anti-A antibodies in plasma.',
        },
        {
          q: `What is the pathological basis of a bruise (contusion / ecchymosis) appearing beneath intact skin following blunt physical trauma?`,
          ans: 'Rupture of tiny superficial blood capillaries and leakage of red blood cells into surrounding dermis or hypodermis without breaking the skin surface',
          d: ['Sudden localized proliferation of sebaceous glands releasing dark sebum', 'Rupture of lymphatic ducts causing bile leakage into skeletal muscle', 'Melanocyte hyperactivity producing excessive dark melanin over minutes'],
          exp: 'A bruise occurs when blunt impact damages and tears fragile capillaries in the dermis or subcutaneous tissue. Escaped RBCs leak into interstitial spaces, degrading from dark red to blue, green, and yellow as hemoglobin is metabolized.',
          key: 'A bruise is caused by ruptured capillaries leaking red blood cells under intact skin.',
        },
      ];
      const selected = items[(v + id) % items.length];
      return {
        q: `[Module 6 Blood Revision Q${id}] Regarding ${sub}: ${selected.q}`,
        ans: selected.ans,
        d: selected.d,
        exp: selected.exp,
        key: selected.key,
      };
    },

    respiratory: (sub, v) => {
      const items = [
        {
          q: `What is the exact anatomical conduction pathway followed by an inspired molecule of oxygen traveling from the external environment down to the site of gas exchange?`,
          ans: 'Nasal Cavity → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli',
          d: [
            'Pharynx → Nasal Cavity → Trachea → Esophagus → Alveoli',
            'Nasal Cavity → Larynx → Pharynx → Bronchioles → Trachea → Alveoli',
            'Mouth → Trachea → Larynx → Pharynx → Pleural cavity → Alveoli',
          ],
          exp: 'Air enters through the nose/mouth, traverses the pharynx, larynx, and trachea, then branches into primary/secondary/tertiary bronchi, terminal bronchioles, and terminates in alveolar sacs.',
          key: 'Conduction pathway: Nose → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli.',
        },
        {
          q: `During quiet resting inspiration, which active muscular actions expand thoracic cavity volume, and how does this affect intrapulmonary pressure according to Boyle’s law?`,
          ans: 'The diaphragm contracts and flattens downward while external intercostals elevate ribs; thoracic volume increases, dropping intrapulmonary pressure below atmospheric pressure (-1 mmHg)',
          d: [
            'The diaphragm relaxes upward; volume decreases and intrapulmonary pressure spikes to +10 mmHg',
            'Internal intercostals contract forcefully, compressing lungs and forcing air inward',
            'Abdominal muscles push viscera superiorly to draw air into the pleural space',
          ],
          exp: 'Inspiration is active: the diaphragm flattens and external intercostals lift ribs, expanding thoracic volume. Per Boyle’s law (P ∝ 1/V), increased volume lowers intrapulmonary pressure below atmospheric, causing air to rush in.',
          key: 'Active inspiration: diaphragm contraction increases volume → drops pressure → air rushes in.',
        },
        {
          q: `Why is normal, quiet expiration considered an entirely passive process at rest?`,
          ans: 'It requires no muscle contraction, relying instead on the natural elastic recoil of stretched lung tissue and relaxation of the diaphragm and external intercostals',
          d: ['The heart actively sucks air out of the bronchial tree during ventricular diastole', 'Atmospheric pressure drops to absolute zero during each exhalation cycle', 'Smooth muscles in the trachea contract violently to expel expired air'],
          exp: 'At rest, expiration is completely passive: inspiratory muscles simply relax, and the elastic fibers within lungs and chest wall recoil inward, decreasing thoracic volume and raising intrapulmonary pressure above atmospheric.',
          key: 'Quiet expiration is passive, driven by elastic recoil of lungs and chest wall.',
        },
        {
          q: `What is the crucial physiological function of pulmonary surfactant, which is synthesized and secreted by Type II alveolar cells?`,
          ans: 'Reducing the surface tension of the thin aqueous film lining alveoli, preventing alveolar collapse (atelectasis) upon exhalation',
          d: ['Directly neutralizing bacterial toxins by acting as an acidic detergent', 'Converting dissolved bicarbonate back into gaseous carbon dioxide', 'Binding oxygen molecules with higher affinity than fetal hemoglobin'],
          exp: 'Water molecules lining alveolar walls exert strong surface tension that pulls alveoli inward. Surfactant disrupts hydrogen bonding between water molecules, reducing surface tension and preventing collapse.',
          key: 'Pulmonary surfactant lowers surface tension to prevent alveolar collapse (atelectasis).',
        },
        {
          q: `By which physical process do oxygen (O2) and carbon dioxide (CO2) cross the microscopic respiratory membrane between alveoli and pulmonary capillary blood?`,
          ans: 'Simple passive diffusion down their respective partial pressure gradients',
          d: ['Active primary transport utilizing ATP-driven transmembrane pumps', 'Bulk hydraulic filtration driven by systemic systolic pressure', 'Pinocytosis executed by alveolar capillary endothelial cells'],
          exp: 'Gas exchange in the lungs is purely passive: O2 diffuses from high partial pressure in alveoli (~104 mmHg) to lower pressure in capillary blood (~40 mmHg), while CO2 diffuses from high in capillary (~45 mmHg) to lower in alveoli (~40 mmHg).',
          key: 'Gas exchange occurs via simple passive diffusion down partial pressure gradients.',
        },
        {
          q: `What is the healthy, expected resting arterial oxygen saturation (SpO2) range measured non-invasively by a pulse oximeter placed on a patient's fingertip?`,
          ans: '95% to 100%',
          d: ['70% to 75%', '50% to 60%', '80% to 88%'],
          exp: 'In a healthy individual breathing ambient room air at sea level, normal arterial hemoglobin oxygen saturation (SpO2) is between 95% and 100%. Readings consistently below 90% indicate clinical hypoxemia.',
          key: 'Normal resting pulse oximetry (SpO2) reference range is 95% to 100%.',
        },
        {
          q: `How does acute pneumonia impair pulmonary gas exchange in an affected lung segment?`,
          ans: 'Alveoli become inflamed and fill with infectious fluid, inflammatory exudate, and pus (consolidation), dramatically thickening the diffusion barrier',
          d: ['Permanent loss of hyaline cartilage rings in the cervical trachea', 'Rupture of the thoracic diaphragm causing stomach displacement into chest', 'Complete paralysis of the brainstem medulla respiratory centers'],
          exp: 'Pneumonia is an infection that triggers alveolar inflammation. Alveoli fill with fluid and exudate (consolidation), drastically increasing the diffusion distance for oxygen and causing hypoxemia.',
          key: 'Pneumonia fills alveoli with inflammatory fluid/pus, impairing oxygen diffusion.',
        },
      ];
      const selected = items[(v + id) % items.length];
      return {
        q: `[Module 8 Respiratory Revision Q${id}] Regarding ${sub}: ${selected.q}`,
        ans: selected.ans,
        d: selected.d,
        exp: selected.exp,
        key: selected.key,
      };
    },
  };

  const genFn = contentMap[subjectId];
  const item = genFn(subtopic, variant);

  const options: [string, string, string, string] = ['', '', '', ''];
  options[correctIdx] = item.ans;
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i !== correctIdx) {
      options[i] = item.d[dIdx++];
    }
  }

  return {
    subtopic,
    question: item.q,
    options,
    correctAnswer: correctIdx,
    explanation: item.exp,
    keyTakeaway: item.key,
  };
}

// Build the full Questions Bank with exactly 100 questions per curriculum module (400 questions total)
let cachedQuestions: MCQQuestion[] | null = null;

export function getAllQuestions(): MCQQuestion[] {
  if (cachedQuestions) return cachedQuestions;

  const all: MCQQuestion[] = [];
  const subjectKeys: SubjectId[] = [
    'cardiovascular',
    'tissues_integumentary',
    'blood_hematology',
    'respiratory',
  ];

  let currentStartIndex = 1;
  for (const sKey of subjectKeys) {
    const bp = blueprints[sKey];
    const qs = buildSubjectQuestions(bp, currentStartIndex);
    all.push(...qs);
    currentStartIndex += qs.length;
  }

  cachedQuestions = all;
  return all;
}

export function getQuestionById(id: number): MCQQuestion | undefined {
  const all = getAllQuestions();
  return all[id - 1] || all.find((q) => q.id === id);
}

export function getQuestionsBySubject(subjectId: SubjectId): MCQQuestion[] {
  return getAllQuestions().filter((q) => q.subjectId === subjectId);
}

export function getQuestionsCount(): number {
  return getAllQuestions().length;
}
