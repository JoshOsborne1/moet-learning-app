export type KSBType = 'knowledge' | 'skill' | 'behaviour';
export type AssessmentMethod = 'knowledge_test' | 'practical_observation' | 'technical_interview';

export interface KSB {
    id: string;
    type: KSBType;
    title: string;
    description: string;
    assessedBy: AssessmentMethod[];
    keyPoints: string[];
    specialist?: string; // e.g. 'Electrical Technician'
}

export interface Question {
    id: number;
    text: string;
    options: { a: string; b: string; c: string; d: string };
    answer: 'a' | 'b' | 'c' | 'd';
    explanation: string;
    ksb: string; // e.g. 'K1', 'K2'
    topic: string;
}

export interface PortfolioSection {
    id: string;
    title: string;
    prompt: string;
    placeholder: string;
    ksbHints: string[];
}

export const KSBS: KSB[] = [
    // KNOWLEDGE
    {
        id: 'K1', type: 'knowledge',
        title: 'First Principles – Plant & Equipment',
        description: 'First principles relating to the operation and maintenance of appropriate plant and equipment.',
        assessedBy: ['technical_interview', 'knowledge_test'],
        keyPoints: [
            'Interpret engineering drawings, circuit diagrams, wiring diagrams, layout diagrams',
            'Understand electrical supply systems: grid, 3-phase 4-wire, single phase, 12V/24V',
            'Types and uses of transformers (fixed and portable)',
            'Isolation and control methods: isolators, circuit breakers, switchgear, fuses, RCDs',
            'Cable forms and selection: size, insulation, data cables, screened cables',
            'Cable protection: conduit, armoured cable, bus bars',
            'Engineering materials: ferrous, non-ferrous, thermoplastic, thermosetting',
            'Corrosion types: pitting, galvanic, oxidation',
            'Document control: issue numbers, approval, authorisation procedures',
            'CAD drawings and databases in maintenance activities',
            'Quality control: calibration, inspection, validation of test equipment',
        ],
    },
    {
        id: 'K2', type: 'knowledge',
        title: 'Health, Safety & Environmental Regulations',
        description: 'Relevant industry health and safety standards, regulations, and environmental and regulatory requirements.',
        assessedBy: ['technical_interview', 'knowledge_test'],
        keyPoints: [
            'Health and Safety at Work Act (HASAW)',
            'RIDDOR – Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
            'COSHH – Control of Substances Hazardous to Health',
            'PUWER – Provision and Use of Work Equipment Regulations',
            'Electricity at Work Regulations',
            'LOLER – Lifting Operations and Lifting Equipment Regulations',
            'ISO 14001 – Environmental Management Systems',
            'Safety signs: warning (yellow), prohibition (red), mandatory (blue), information (green)',
            'Fire extinguisher types: CO2 (electrical), foam, water, wet chemical',
            'PPE selection and use; RPE for hazardous substances',
            'Risk assessment: identify hazards, assess risks, control measures',
            'Four Cs of health and safety: Competence, Control, Co-operation, Communication',
            'Permit to work procedures; lock-off/tag-off isolation',
            'Emergency procedures: electric shock – isolate supply, remove from source, CPR',
        ],
    },
    {
        id: 'K3', type: 'knowledge',
        title: 'Maintenance Practices & Procedures',
        description: 'Maintenance and operational practices, processes and procedures covering a range of plant and equipment.',
        assessedBy: ['technical_interview', 'knowledge_test'],
        keyPoints: [
            'Planned preventative maintenance (PPM) vs reactive maintenance',
            'Isolation and lock-off procedure for electrical maintenance',
            'Fault diagnostic techniques: half-split, input-to-output, function testing, unit substitution',
            'Use of fault diagnostic equipment: multimeters, insulation resistance testers, voltage indicators',
            'Cable types and termination methods',
            'Dismantling/assembly: unplugging, de-soldering, screwed/clamped/crimped connections',
            'BS 7671 / IET Wiring Regulations for cable selection and testing',
            '"Lifed" items: seals, gaskets, overload protection devices',
            'Off-load checks before proving equipment with electrical supply on',
            'Documentation: job sheets, maintenance records, test results',
            'Returning work area to safe and clean condition (5S)',
        ],
    },
    {
        id: 'K4', type: 'knowledge',
        title: 'Engineering Theories & Principles',
        description: 'The relevant engineering theories and principles relative to their occupation.',
        assessedBy: ['technical_interview', 'knowledge_test'],
        keyPoints: [
            'SI units: length (m), mass (kg), time (s), temperature (K), capacity (litre)',
            'Derived SI units: force (N), power (W), current (A), voltage (V), resistance (Ω)',
            'Ohm\'s Law: V = IR; transpositions for I and R',
            'Power formula: P = IV = V²/R = I²R',
            'Work done: W = F × d (joules); Power = Work/time (watts)',
            'Pythagoras\' theorem and trigonometry (sin, cos, tan) for engineering problems',
            'Heat transfer: conduction, convection, radiation; Q = (k/s) × A × ΔT',
            'Thermal expansion: coefficient of expansion, change in length',
            'Forces: compression, tension, shear, torsion',
            'Friction: resistance between surfaces in contact',
            'Density: kg/m³; specific heat capacity; specific latent heat',
            'Series and parallel circuit calculations',
        ],
    },
    // SKILLS – CORE
    {
        id: 'S1', type: 'skill',
        title: 'Health, Safety & Environmental Compliance',
        description: 'Comply with industry health, safety and environmental working practices and regulations.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Follow HASAW, COSHH, PUWER, Electricity at Work Regs', 'Wear appropriate PPE', 'Conduct and follow risk assessments', 'Report hazards and near misses'],
    },
    {
        id: 'S2', type: 'skill',
        title: 'Fault Location & Rectification',
        description: 'Locate, and rectify faults on plant and equipment.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Use diagnostic techniques (half-split, input-to-output)', 'Use test equipment correctly', 'Identify root cause vs symptoms', 'Rectify faults to specification'],
    },
    {
        id: 'S3', type: 'skill',
        title: 'Stakeholder Communication',
        description: 'Communicate with and provide information to stakeholders in line with personal role and responsibilities.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Inform operators and managers of work status', 'Use maintenance management systems', 'Provide clear handover information'],
    },
    {
        id: 'S4', type: 'skill',
        title: 'Technical Documentation',
        description: 'Read, understand and interpret information and work in compliance with technical specifications and supporting documentation.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Read circuit diagrams and wiring diagrams', 'Interpret engineering drawings', 'Follow SOPs and job instructions', 'Use BS/ISO standards'],
    },
    {
        id: 'S5', type: 'skill',
        title: 'Work Area Preparation & Reinstatement',
        description: 'Prepare work areas to undertake work related activities and reinstate those areas after completion.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Set up barriers and warning signs', 'Isolate equipment safely', 'Clean and reinstate area after work', 'Return tools and equipment to designated locations'],
    },
    {
        id: 'S6', type: 'skill',
        title: 'Plant Inspection & Maintenance',
        description: 'Inspect and maintain appropriate plant and equipment to meet operational requirements.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Carry out visual inspections', 'Perform planned preventative maintenance', 'Check components against specification', 'Replace lifed items'],
    },
    {
        id: 'S7', type: 'skill',
        title: 'Performance Testing & Assessment',
        description: 'Assess and test the performance and condition of plant and equipment.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Use appropriate test equipment', 'Compare results against specification', 'Document test results', 'Prove equipment before return to service'],
    },
    {
        id: 'S8', type: 'skill',
        title: 'Handover & Confirmation',
        description: 'Communicate, handover and confirm that the appropriate engineering process has been completed to specification.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Complete sign-off documentation', 'Inform relevant personnel of completion', 'Confirm acceptance from line manager/production team', 'Record all actions taken'],
    },
    // SKILLS – SPECIALIST (Electrical)
    {
        id: 'S9', type: 'skill', specialist: 'Electrical Technician',
        title: 'Install & Dismantle Electrical Plant',
        description: 'Position, assemble, install and dismantle electrical plant and equipment to agreed specifications.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Install to drawings and specifications', 'Dismantle safely following isolation procedures', 'Use correct tools and techniques'],
    },
    {
        id: 'S10', type: 'skill', specialist: 'Electrical Technician',
        title: 'Electrical Preventative Maintenance',
        description: 'Carry out planned, unplanned and preventative maintenance procedures on electrical plant and equipment.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Follow PPM schedules', 'Carry out reactive maintenance', 'Use maintenance management systems', 'Document all maintenance activities'],
    },
    {
        id: 'S11', type: 'skill', specialist: 'Electrical Technician',
        title: 'Component Replacement & Repair',
        description: 'Replace, repair and/or remove components in electrical plant and equipment and ensure its return to operational condition.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Select correct replacement components', 'Use correct termination techniques', 'Test after replacement', 'Return to operational condition'],
    },
    {
        id: 'S12', type: 'skill', specialist: 'Electrical Technician',
        title: 'Electrical Fault Diagnosis',
        description: 'Diagnose and determine the cause of faults in electrical plant and equipment.',
        assessedBy: ['technical_interview', 'practical_observation'],
        keyPoints: ['Use systematic diagnostic approach', 'Interpret fault codes', 'Use test equipment (multimeter, insulation tester)', 'Distinguish root cause from symptoms'],
    },
    // BEHAVIOURS
    {
        id: 'B1', type: 'behaviour',
        title: 'Health & Safety',
        description: 'Follows health and safety policies and procedures and challenges unsafe behaviour to ensure protection of people and property.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Follow all H&S policies without exception', 'Challenge unsafe behaviour appropriately', 'Work safely alone and with supervision'],
    },
    {
        id: 'B2', type: 'behaviour',
        title: 'Quality Focused',
        description: 'Ensures that work achieves quality standard both occupationally and personally.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Work meets company standards', 'Personal standards are high', 'Check work before sign-off'],
    },
    {
        id: 'B3', type: 'behaviour',
        title: 'Working with Others',
        description: 'Has the ability to work well with people from different disciplines, backgrounds and expertise to accomplish an activity safely and on time.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Collaborate effectively with team', 'Respect different expertise', 'Contribute to team success'],
    },
    {
        id: 'B4', type: 'behaviour',
        title: 'Interpersonal Skills',
        description: 'Gets along well with others and takes into account their needs and concerns.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Listen actively to others', 'Consider others\' needs', 'Build positive working relationships'],
    },
    {
        id: 'B5', type: 'behaviour',
        title: 'Critical Reasoning',
        description: 'Uses resources, techniques and obtained facts to develop sound solutions while recognising and defining problems.',
        assessedBy: ['technical_interview'],
        keyPoints: ['Analyse problems systematically', 'Use evidence to reach conclusions', 'Develop and evaluate solutions', 'Recognise limits of own knowledge'],
    },
    {
        id: 'B6', type: 'behaviour',
        title: 'Sustainability & Ethics',
        description: 'Behaves ethically and undertakes work in a way that contributes to sustainable development.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Dispose of waste correctly', 'Follow environmental regulations', 'Act with integrity', 'Consider environmental impact'],
    },
    {
        id: 'B7', type: 'behaviour',
        title: 'Risk Awareness',
        description: 'Demonstrates high concentration, desire to reduce risks, compliance and awareness of change through regular monitoring.',
        assessedBy: ['practical_observation'],
        keyPoints: ['Monitor for hazards continuously', 'Check information regularly', 'Proactively identify and report risks', 'Remain alert throughout tasks'],
    },
];

export const QUESTIONS: Question[] = [
    // --- SAMPLE TEST QUESTIONS (from PDF, verified answers) ---
    {
        id: 1, ksb: 'K1', topic: 'Circuit Symbols',
        text: 'Which electrical component does a circle with an X inside represent as a circuit symbol?',
        options: { a: 'Battery', b: 'Lamp', c: 'Resistor', d: 'Transformer' },
        answer: 'a',
        explanation: 'A circle with an X inside represents a battery (or cell) in standard circuit diagram notation.',
    },
    {
        id: 2, ksb: 'K1', topic: 'Engineering Drawings',
        text: 'What type of orthographic projection uses the "first angle" convention where the view is placed on the opposite side to the direction of viewing?',
        options: { a: 'First angle', b: 'Second angle', c: 'Third angle', d: 'Isometric' },
        answer: 'a',
        explanation: 'First angle projection (used in Europe) places the view on the opposite side to the direction of viewing. Third angle (used in USA) places the view on the same side.',
    },
    {
        id: 3, ksb: 'K4', topic: 'Ohm\'s Law',
        text: 'An engineer has measured a voltage of 4.5 V across a 1 kΩ resistor. How much current is flowing through the resistor?',
        options: { a: '0.0045 A', b: '4.5 A', c: '222.22 A', d: '4500 A' },
        answer: 'a',
        explanation: 'Using Ohm\'s Law: I = V/R = 4.5 / 1000 = 0.0045 A (4.5 mA).',
    },
    {
        id: 4, ksb: 'K1', topic: 'Engineering Materials',
        text: 'An engineer is selecting a material for a socket for an electrical plug. Which material would be most suitable?',
        options: { a: 'Copper', b: 'Brass', c: 'Thermoplastic', d: 'Thermosetting plastic' },
        answer: 'd',
        explanation: 'Thermosetting plastics are used for electrical sockets because they are rigid, heat-resistant, and excellent electrical insulators. They do not soften when heated, unlike thermoplastics.',
    },
    {
        id: 5, ksb: 'K1', topic: 'Corrosion',
        text: 'Which type of corrosion is described as "the preferential corrosion of one metal when it is in electrical contact with another metal, in the presence of an electrolyte"?',
        options: { a: 'Galvanic', b: 'Oxidation', c: 'Pitting', d: 'Rusting' },
        answer: 'a',
        explanation: 'Galvanic corrosion occurs when two dissimilar metals are in electrical contact in the presence of an electrolyte. The less noble metal (anode) corrodes preferentially.',
    },
    {
        id: 6, ksb: 'K4', topic: 'Pythagoras',
        text: 'Using Pythagoras\' theorem, calculate the length of the hypotenuse of a right-angled triangle with sides of 45 mm and 35 mm, rounded to the nearest whole number.',
        options: { a: '49 mm', b: '57 mm', c: '63 mm', d: '77 mm' },
        answer: 'b',
        explanation: 'Using Pythagoras: c² = 45² + 35² = 2025 + 1225 = 3250. c = √3250 ≈ 57 mm.',
    },
    {
        id: 7, ksb: 'K1', topic: 'Circuit Protection',
        text: 'What is the function of a circuit breaker?',
        options: { a: 'To convert high transmission voltage to low voltage', b: 'To convert mechanical energy into electrical power', c: 'To increase current flow after a fault is detected', d: 'To interrupt current flow after a fault is detected' },
        answer: 'd',
        explanation: 'A circuit breaker automatically interrupts (breaks) the electrical circuit when a fault (overcurrent or short circuit) is detected, protecting the circuit and equipment.',
    },
    {
        id: 8, ksb: 'K4', topic: 'Forces & Friction',
        text: 'The definition of friction is:',
        options: { a: 'The heat generated between two surfaces in contact with each other', b: 'The force pulling two surfaces together', c: 'The resistance that a surface encounters when moving over another surface', d: 'The amount of material worn away from a surface' },
        answer: 'c',
        explanation: 'Friction is the force that resists relative motion between two surfaces in contact. It acts parallel to the surfaces and opposes motion.',
    },
    {
        id: 9, ksb: 'K1', topic: 'Quality & Calibration',
        text: 'Multimeters are normally calibrated. In this context, what does calibration mean?',
        options: { a: 'Recording where the multimeter was purchased and the products it has been used to measure', b: 'Using the multimeter to measure products to ensure they meet the requirements', c: 'Collecting documentary evidence that measurements carried out in production maintain the desired level of accuracy', d: 'Ensuring that the multimeter gives the same measurement as a device of known accuracy' },
        answer: 'd',
        explanation: 'Calibration is the process of comparing a measuring instrument against a reference standard of known accuracy to ensure it gives correct readings.',
    },
    {
        id: 10, ksb: 'K2', topic: 'H&S Legislation',
        text: 'Which piece of legislation details the requirements for reporting dangerous occurrences and accidents?',
        options: { a: 'PUWER', b: 'RIDDOR', c: 'COSHH', d: 'HASAW' },
        answer: 'b',
        explanation: 'RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations) requires employers to report work-related deaths, injuries, occupational diseases, and dangerous occurrences.',
    },
    {
        id: 11, ksb: 'K2', topic: 'Fire Safety',
        text: 'Which type of fire extinguisher should be used to extinguish an electrical fire?',
        options: { a: 'Carbon dioxide', b: 'Foam', c: 'Water', d: 'Wet chemical' },
        answer: 'a',
        explanation: 'CO2 (carbon dioxide) extinguishers are safe for electrical fires because CO2 is non-conductive. Water and foam conduct electricity and must never be used on electrical fires.',
    },
    {
        id: 12, ksb: 'K2', topic: 'Environmental Conditions',
        text: 'An environmental condition that could lead to accidents in the workplace is:',
        options: { a: 'Workers not wearing the provided PPE', b: 'Appropriate ventilation', c: 'Lack of management control of the workforce', d: 'Inadequate lighting' },
        answer: 'd',
        explanation: 'Inadequate lighting is an environmental condition (related to the physical workplace) that can cause accidents. Workers not wearing PPE and lack of management control are human factors.',
    },
    {
        id: 13, ksb: 'K2', topic: 'Safety Signs',
        text: 'What does the colour blue mean on a safety sign?',
        options: { a: 'The activity shown is prohibited', b: 'The instruction shown is mandatory', c: 'The sign provides information about an emergency exit', d: 'It is a warning sign' },
        answer: 'b',
        explanation: 'Blue safety signs indicate mandatory instructions (e.g., "Must wear PPE"). Red = prohibition, Yellow = warning, Green = safe condition/emergency.',
    },
    {
        id: 14, ksb: 'K2', topic: 'Environmental Standards',
        text: 'What is the purpose of the ISO 14001 standard?',
        options: { a: 'To help companies document the elements needed to maintain an efficient quality system', b: 'To specify the requirements for environmental management systems', c: 'To ensure that all machines and processes in the workplace do not affect the environment', d: 'To ensure that workplaces are safe and accidents are reported to appropriate authorities' },
        answer: 'b',
        explanation: 'ISO 14001 specifies requirements for an Environmental Management System (EMS), helping organisations improve their environmental performance through more efficient use of resources and reduction of waste.',
    },
    {
        id: 15, ksb: 'K2', topic: 'PPE',
        text: 'A worker is lifting an electrical motor weighing 10 kg. What would be an appropriate item of PPE to reduce the risks associated with this activity?',
        options: { a: 'Safety boots', b: 'Ear muffs', c: 'Hard hat', d: 'Glasses' },
        answer: 'a',
        explanation: 'Safety boots protect feet from dropped heavy objects. When manually handling a 10 kg motor, the primary risk is dropping it on feet, making safety boots the most appropriate PPE.',
    },
    {
        id: 16, ksb: 'K3', topic: 'System Isolation',
        text: 'During maintenance, what is meant by system isolation?',
        options: { a: 'Removing a machine or process from the workshop so it cannot interfere with other activities', b: 'Working independently on a machine without assistance from other engineers', c: 'A safety document that permits certain people to carry out specific work within a specified time frame', d: 'A safety procedure that ensures machines are shut off and cannot be started up again prior to the completion of work' },
        answer: 'd',
        explanation: 'System isolation is the safety procedure of shutting off energy sources (electrical, pneumatic, hydraulic) and preventing re-energisation until maintenance is complete. This is achieved through lock-off/tag-off procedures.',
    },
    {
        id: 17, ksb: 'K3', topic: 'Capacitor Safety',
        text: 'An engineer is about to repair a circuit that contains a capacitor. What should the engineer do before working near the capacitor to prevent electric shock?',
        options: { a: 'Ensure the capacitor is fully charged', b: 'Ensure the capacitor is fully discharged', c: 'Ensure the capacitor is partially charged', d: 'Ensure the capacitor is partially discharged' },
        answer: 'b',
        explanation: 'Capacitors store electrical energy and can deliver a dangerous shock even when the power is off. Always fully discharge capacitors before working near them.',
    },
    {
        id: 18, ksb: 'K3', topic: 'Test Equipment',
        text: 'An instrument that can be used to measure voltage, current and resistance is:',
        options: { a: 'Ammeter', b: 'Multimeter', c: 'Ohmmeter', d: 'Voltmeter' },
        answer: 'b',
        explanation: 'A multimeter (also called a VOM – Volt-Ohm-Milliammeter) can measure voltage, current, and resistance. Individual instruments (ammeter, voltmeter, ohmmeter) each measure only one quantity.',
    },
    {
        id: 19, ksb: 'K3', topic: 'Cable Jointing',
        text: 'The technique which involves joining two pieces of wire by deforming them is:',
        options: { a: 'Crimping', b: 'De-soldering', c: 'Screwing', d: 'Soldering' },
        answer: 'a',
        explanation: 'Crimping involves mechanically deforming a connector around a wire using a crimping tool. This creates a gas-tight, reliable connection without heat.',
    },
    {
        id: 20, ksb: 'K2', topic: 'Electric Shock First Aid',
        text: 'A first aider has been called to treat a victim of electric shock. The action the first aider should take first is:',
        options: { a: 'Check the person for burns or other wounds', b: 'Check the person is breathing', c: 'Perform CPR on the victim', d: 'Separate the victim from the power source' },
        answer: 'd',
        explanation: 'The first priority is to separate the victim from the power source (safely, without touching them directly). Only then can you safely approach and provide first aid.',
    },
    {
        id: 21, ksb: 'K3', topic: 'Lifed Items',
        text: 'Which part is commonly a "lifed" item in a product?',
        options: { a: 'Housing (casing)', b: 'Resistor', c: 'Overload protection device', d: 'Electric motor' },
        answer: 'c',
        explanation: 'Overload protection devices (such as fuses, thermal overloads, and circuit breakers) are "lifed" items – they must be replaced after a set period or after operating, regardless of apparent condition.',
    },
    {
        id: 22, ksb: 'K4', topic: 'SI Units',
        text: 'What is the SI base unit for capacity?',
        options: { a: 'Litre', b: 'Gallon', c: 'Metre', d: 'Kilogram' },
        answer: 'a',
        explanation: 'The litre (L) is the SI unit for capacity/volume. Note: the strict SI base unit for volume is the cubic metre (m³), but the litre is an accepted SI unit for capacity.',
    },
    {
        id: 23, ksb: 'K4', topic: 'SI Units',
        text: 'What is measured in units of kg m⁻³?',
        options: { a: 'Power', b: 'Density', c: 'Capacity', d: 'Conductivity' },
        answer: 'b',
        explanation: 'Density is mass per unit volume, measured in kilograms per cubic metre (kg/m³ or kg m⁻³). For example, water has a density of approximately 1000 kg/m³.',
    },
    {
        id: 24, ksb: 'K4', topic: 'Electrical Principles',
        text: 'What is the opposition to the flow of electric current called?',
        options: { a: 'Potential difference', b: 'Power', c: 'Resistance', d: 'Voltage' },
        answer: 'c',
        explanation: 'Resistance (measured in ohms, Ω) is the opposition to the flow of electric current. It is defined by Ohm\'s Law: R = V/I.',
    },
    {
        id: 25, ksb: 'K4', topic: 'Power Calculations',
        text: 'An electric heater has a power rating of 1500 W and works off a supply voltage of 230 V. What is the heater\'s current rating?',
        options: { a: '0.2 A', b: '6.5 A', c: '1270 A', d: '1720 A' },
        answer: 'b',
        explanation: 'Using P = IV, rearranged: I = P/V = 1500/230 ≈ 6.52 A ≈ 6.5 A.',
    },
    {
        id: 26, ksb: 'K4', topic: 'Circuit Calculations',
        text: 'Calculate the total resistance of a series circuit containing resistors of 8.8 kΩ and 2.4 kΩ.',
        options: { a: '8.8 kΩ', b: '11.2 kΩ', c: '12.1 kΩ', d: '20.2 kΩ' },
        answer: 'b',
        explanation: 'For resistors in series, total resistance = R1 + R2 = 8.8 + 2.4 = 11.2 kΩ.',
    },
    {
        id: 27, ksb: 'K4', topic: 'Forces',
        text: 'What type of force acts to pull or stretch a material along its length?',
        options: { a: 'Compression', b: 'Shear', c: 'Tension', d: 'Torsion' },
        answer: 'd',
        explanation: 'Tension is a pulling force that stretches a material. Compression squeezes, shear acts sideways, and torsion is a twisting force.',
    },
    {
        id: 28, ksb: 'K4', topic: 'Work & Energy',
        text: 'A box of equipment is pushed 2 m along a flat surface by applying a force of 30 N. What is the work done when moving the box?',
        options: { a: '15 J', b: '30 J', c: '45 J', d: '60 J' },
        answer: 'd',
        explanation: 'Work done = Force × Distance = 30 N × 2 m = 60 J.',
    },
    {
        id: 29, ksb: 'K4', topic: 'Power Calculations',
        text: 'An engineer is inspecting an electric lamp. The lamp has a voltage of 9 V across it and a current of 3 A flowing through it. What is the power dissipated by the lamp?',
        options: { a: '3 W', b: '6 W', c: '12 W', d: '27 W' },
        answer: 'd',
        explanation: 'Power P = V × I = 9 V × 3 A = 27 W.',
    },
    {
        id: 30, ksb: 'K4', topic: 'Heat Transfer',
        text: 'A metal plate has thermal conductivity of 75 W m⁻¹ °C⁻¹, is 0.05 m thick, area 1 m², with temperatures of 200°C and 50°C on each side. Calculate the heat transfer through the plate using Q = (k/s) × A × ΔT.',
        options: { a: '1.5 kJ', b: '56.25 kJ', c: '112.5 kJ', d: '225 kJ' },
        answer: 'd',
        explanation: 'Q = (k/s) × A × ΔT = (75/0.05) × 1 × (200-50) = 1500 × 150 = 225,000 W = 225 kJ.',
    },
    // --- ADDITIONAL GENERATED QUESTIONS ---
    // K1 – Engineering Information & Electrical Systems
    {
        id: 31, ksb: 'K1', topic: 'Electrical Supply Systems',
        text: 'A standard UK three-phase four-wire supply system provides a line voltage of approximately:',
        options: { a: '110 V', b: '230 V', c: '400 V', d: '11 kV' },
        answer: 'c',
        explanation: 'UK three-phase supply provides 400 V line-to-line (between phases) and 230 V line-to-neutral (phase voltage). The 400 V is the standard three-phase voltage.',
    },
    {
        id: 32, ksb: 'K1', topic: 'Transformers',
        text: 'What is the primary purpose of an isolating transformer?',
        options: { a: 'To increase voltage for long-distance transmission', b: 'To provide electrical isolation between primary and secondary circuits', c: 'To convert AC to DC power', d: 'To reduce power consumption' },
        answer: 'b',
        explanation: 'An isolating transformer provides electrical isolation between the primary and secondary windings, preventing direct electrical connection and reducing shock risk.',
    },
    {
        id: 33, ksb: 'K1', topic: 'Circuit Protection',
        text: 'What does RCD stand for in electrical systems?',
        options: { a: 'Residual Current Device', b: 'Rated Current Detector', c: 'Resistance Control Device', d: 'Remote Circuit Disconnector' },
        answer: 'a',
        explanation: 'RCD stands for Residual Current Device. It detects imbalances in current between live and neutral conductors and disconnects the supply within milliseconds to prevent electrocution.',
    },
    {
        id: 34, ksb: 'K1', topic: 'Engineering Drawings',
        text: 'Which type of diagram shows the physical layout and routing of cables in an installation?',
        options: { a: 'Circuit diagram', b: 'Schematic diagram', c: 'Wiring diagram', d: 'Block diagram' },
        answer: 'c',
        explanation: 'A wiring diagram shows the physical layout and routing of cables and connections. A circuit diagram shows the electrical connections using symbols without regard to physical layout.',
    },
    {
        id: 35, ksb: 'K1', topic: 'Cable Selection',
        text: 'When selecting cable for an installation, which regulation provides guidance on cable sizing and current ratings?',
        options: { a: 'PUWER', b: 'BS 7671 (IET Wiring Regulations)', c: 'COSHH', d: 'ISO 9001' },
        answer: 'b',
        explanation: 'BS 7671 (the IET Wiring Regulations) is the UK standard for electrical installations, providing guidance on cable sizing, current ratings, protection, and installation methods.',
    },
    {
        id: 36, ksb: 'K1', topic: 'Engineering Materials',
        text: 'Which material property describes the ability to be drawn into a wire?',
        options: { a: 'Malleability', b: 'Ductility', c: 'Hardness', d: 'Brittleness' },
        answer: 'b',
        explanation: 'Ductility is the ability of a material to be drawn into a wire without breaking. Copper is highly ductile, making it ideal for electrical cables. Malleability is the ability to be hammered into sheets.',
    },
    {
        id: 37, ksb: 'K1', topic: 'Document Control',
        text: 'Why is document control important in engineering maintenance?',
        options: { a: 'To ensure engineers always use the most current and approved version of procedures', b: 'To reduce the number of documents that need to be stored', c: 'To allow engineers to modify procedures as they see fit', d: 'To speed up maintenance tasks by reducing paperwork' },
        answer: 'a',
        explanation: 'Document control ensures that only current, approved versions of procedures, drawings, and specifications are used. Using outdated documents can lead to incorrect maintenance and safety hazards.',
    },
    {
        id: 38, ksb: 'K1', topic: 'Quality Control',
        text: 'What action should be taken when a component does not meet the required quality standard?',
        options: { a: 'Use it anyway if the deviation is small', b: 'Report the deviation to a responsible person and document the action taken', c: 'Modify the standard to match the component', d: 'Dispose of it without recording' },
        answer: 'b',
        explanation: 'When a component does not meet required standards, you must report the deviation to a responsible person, document all actions agreed upon and taken, and decide whether to repair, replace, or scrap the item.',
    },
    {
        id: 39, ksb: 'K1', topic: 'Electrical Systems',
        text: 'What is the purpose of a busbar in an electrical distribution system?',
        options: { a: 'To convert AC to DC', b: 'To provide a common connection point for multiple circuits', c: 'To measure electrical current', d: 'To protect against overloads' },
        answer: 'b',
        explanation: 'A busbar is a metallic strip or bar that provides a common connection point for multiple electrical circuits. It allows power to be distributed from a single source to multiple loads efficiently.',
    },
    // K2 – Health & Safety
    {
        id: 40, ksb: 'K2', topic: 'H&S Legislation',
        text: 'Under PUWER, who is responsible for ensuring that work equipment is suitable for its intended use?',
        options: { a: 'The equipment manufacturer only', b: 'The employee using the equipment', c: 'The employer', d: 'The Health and Safety Executive' },
        answer: 'c',
        explanation: 'PUWER (Provision and Use of Work Equipment Regulations) places the duty on employers to ensure work equipment is suitable, maintained, and used safely. Employers must also provide adequate training and information.',
    },
    {
        id: 41, ksb: 'K2', topic: 'Risk Assessment',
        text: 'What is the correct hierarchy of control measures for managing workplace hazards?',
        options: { a: 'PPE → Engineering controls → Substitution → Elimination', b: 'Elimination → Substitution → Engineering controls → Administrative controls → PPE', c: 'Administrative controls → PPE → Elimination → Substitution', d: 'PPE → Administrative controls → Engineering controls → Elimination' },
        answer: 'b',
        explanation: 'The hierarchy of controls (most to least effective): 1. Elimination, 2. Substitution, 3. Engineering controls, 4. Administrative controls, 5. PPE. PPE is always the last resort.',
    },
    {
        id: 42, ksb: 'K2', topic: 'Permit to Work',
        text: 'What is the purpose of a Permit to Work (PTW) system?',
        options: { a: 'To allow any engineer to carry out any task without supervision', b: 'To formally authorise specific people to carry out specific work within a defined time frame under controlled conditions', c: 'To replace the need for risk assessments', d: 'To record the number of hours worked by maintenance staff' },
        answer: 'b',
        explanation: 'A Permit to Work is a formal document that authorises specific people to carry out specific work within a defined time frame. It ensures hazards are identified, controls are in place, and the right people are informed.',
    },
    {
        id: 43, ksb: 'K2', topic: 'LOLER',
        text: 'Under LOLER, how often must lifting equipment used for lifting persons be thoroughly examined?',
        options: { a: 'Every 5 years', b: 'Every 2 years', c: 'Every 6 months', d: 'Every month' },
        answer: 'c',
        explanation: 'Under LOLER, lifting equipment used for lifting persons must be thoroughly examined every 6 months. Equipment used for lifting other loads must be examined every 12 months.',
    },
    {
        id: 44, ksb: 'K2', topic: 'COSHH',
        text: 'What does COSHH require employers to do regarding hazardous substances?',
        options: { a: 'Ban all hazardous substances from the workplace', b: 'Assess the risks and implement controls to prevent or adequately control exposure', c: 'Provide employees with hazardous substances training only', d: 'Report all hazardous substances to the HSE' },
        answer: 'b',
        explanation: 'COSHH requires employers to assess the risks from hazardous substances and implement appropriate controls to prevent or adequately control exposure. This includes substitution, engineering controls, and PPE.',
    },
    // K3 – Maintenance Practices
    {
        id: 45, ksb: 'K3', topic: 'Fault Diagnosis',
        text: 'The half-split method of fault finding involves:',
        options: { a: 'Testing every component from start to finish', b: 'Splitting the system in half and testing the midpoint to determine which half contains the fault', c: 'Replacing components one at a time until the fault is found', d: 'Testing only the most likely fault location first' },
        answer: 'b',
        explanation: 'The half-split method divides the system at its midpoint and tests there. This halves the search area with each test, making it very efficient for finding faults in long chains of components.',
    },
    {
        id: 46, ksb: 'K3', topic: 'Electrical Maintenance',
        text: 'Before carrying out maintenance on electrical equipment, what is the correct sequence of actions?',
        options: { a: 'Start work immediately, then isolate if needed', b: 'Isolate, lock off, prove dead, then start work', c: 'Prove dead, then isolate and lock off', d: 'Lock off only, then start work' },
        answer: 'b',
        explanation: 'The correct sequence is: 1. Isolate (disconnect from supply), 2. Lock off (prevent re-energisation), 3. Prove dead (verify with approved voltage indicator), then start work. This is the safe isolation procedure.',
    },
    {
        id: 47, ksb: 'K3', topic: 'Test Equipment',
        text: 'What is the purpose of a proving unit when using a voltage indicator?',
        options: { a: 'To measure the exact voltage of a circuit', b: 'To verify that the voltage indicator is working correctly before and after use', c: 'To prove that a circuit is live before isolation', d: 'To calibrate the voltage indicator annually' },
        answer: 'b',
        explanation: 'A proving unit is used to verify that a voltage indicator is functioning correctly before and after testing a circuit. This ensures that a "dead" reading is genuine and not due to a faulty instrument.',
    },
    {
        id: 48, ksb: 'K3', topic: 'Maintenance Records',
        text: 'Why is it important to complete maintenance documentation after completing a task?',
        options: { a: 'It is only required for legal compliance', b: 'It provides a historical record, supports future maintenance planning, and demonstrates compliance', c: 'It is only needed if a fault was found', d: 'Documentation is optional for minor maintenance tasks' },
        answer: 'b',
        explanation: 'Maintenance documentation provides a historical record of all work done, supports future maintenance planning, demonstrates compliance with regulations, and helps identify recurring faults.',
    },
    {
        id: 49, ksb: 'K3', topic: 'Planned Maintenance',
        text: 'What is the main advantage of Planned Preventative Maintenance (PPM) over reactive maintenance?',
        options: { a: 'It is always cheaper than reactive maintenance', b: 'It reduces unplanned downtime and extends equipment life by addressing issues before failure', c: 'It eliminates the need for reactive maintenance entirely', d: 'It requires less skilled engineers' },
        answer: 'b',
        explanation: 'PPM reduces unplanned downtime by addressing potential issues before they cause failure. It extends equipment life, improves reliability, and allows maintenance to be planned around production schedules.',
    },
    {
        id: 50, ksb: 'K3', topic: 'Cable Termination',
        text: 'Which termination method provides the most reliable gas-tight connection for electrical cables?',
        options: { a: 'Soldering', b: 'Screwing', c: 'Crimping', d: 'Twisting' },
        answer: 'c',
        explanation: 'Crimping provides a gas-tight, mechanically strong connection that is highly reliable and resistant to vibration. It is preferred in many industrial applications over soldering, which can be affected by heat and vibration.',
    },
    // K4 – Engineering Theories
    {
        id: 51, ksb: 'K4', topic: 'Electrical Principles',
        text: 'Two resistors of 6 Ω and 3 Ω are connected in parallel. What is the total resistance?',
        options: { a: '9 Ω', b: '4.5 Ω', c: '2 Ω', d: '0.5 Ω' },
        answer: 'c',
        explanation: 'For parallel resistors: 1/R = 1/R1 + 1/R2 = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. Therefore R = 2 Ω.',
    },
    {
        id: 52, ksb: 'K4', topic: 'Power Calculations',
        text: 'A motor draws 10 A from a 400 V supply. What is the power consumed?',
        options: { a: '40 W', b: '400 W', c: '4000 W', d: '40000 W' },
        answer: 'c',
        explanation: 'Power P = V × I = 400 V × 10 A = 4000 W (4 kW).',
    },
    {
        id: 53, ksb: 'K4', topic: 'Heat Transfer',
        text: 'Which method of heat transfer does not require a medium and can occur through a vacuum?',
        options: { a: 'Conduction', b: 'Convection', c: 'Radiation', d: 'Evaporation' },
        answer: 'c',
        explanation: 'Radiation transfers heat through electromagnetic waves and does not require a medium. This is how the Sun\'s heat reaches Earth through the vacuum of space. Conduction and convection require a medium.',
    },
    {
        id: 54, ksb: 'K4', topic: 'Forces',
        text: 'A bolt is being tightened. What type of force is the bolt experiencing?',
        options: { a: 'Compression', b: 'Tension', c: 'Torsion', d: 'Shear' },
        answer: 'c',
        explanation: 'When a bolt is being tightened, it experiences torsion (twisting force). The bolt shank also experiences tension as it is stretched, but the primary force during tightening is torsion.',
    },
    {
        id: 55, ksb: 'K4', topic: 'Ohm\'s Law',
        text: 'A circuit has a resistance of 50 Ω and a current of 2 A flowing through it. What is the voltage across the circuit?',
        options: { a: '25 V', b: '52 V', c: '100 V', d: '200 V' },
        answer: 'c',
        explanation: 'Using Ohm\'s Law: V = I × R = 2 A × 50 Ω = 100 V.',
    },
    {
        id: 56, ksb: 'K4', topic: 'Thermal Expansion',
        text: 'A steel rod is 2 m long at 20°C. The coefficient of linear expansion for steel is 12 × 10⁻⁶ /°C. How much does the rod expand when heated to 120°C?',
        options: { a: '0.24 mm', b: '2.4 mm', c: '24 mm', d: '240 mm' },
        answer: 'b',
        explanation: 'Change in length = L × α × ΔT = 2 × 12×10⁻⁶ × (120-20) = 2 × 12×10⁻⁶ × 100 = 0.0024 m = 2.4 mm.',
    },
    {
        id: 57, ksb: 'K4', topic: 'Work & Energy',
        text: 'A pump lifts 500 kg of water to a height of 10 m in 25 seconds. What is the power output of the pump? (g = 10 m/s²)',
        options: { a: '200 W', b: '2000 W', c: '5000 W', d: '50000 W' },
        answer: 'b',
        explanation: 'Work done = mgh = 500 × 10 × 10 = 50,000 J. Power = Work/time = 50,000/25 = 2000 W (2 kW).',
    },
    {
        id: 58, ksb: 'K4', topic: 'SI Units',
        text: 'What is the SI unit of electrical resistance?',
        options: { a: 'Ampere (A)', b: 'Volt (V)', c: 'Ohm (Ω)', d: 'Watt (W)' },
        answer: 'c',
        explanation: 'The ohm (Ω) is the SI unit of electrical resistance. It is defined as the resistance between two points when a potential difference of 1 volt causes a current of 1 ampere to flow.',
    },
    {
        id: 59, ksb: 'K4', topic: 'Trigonometry',
        text: 'In a right-angled triangle, the sine of an angle is defined as:',
        options: { a: 'Adjacent / Hypotenuse', b: 'Opposite / Hypotenuse', c: 'Opposite / Adjacent', d: 'Hypotenuse / Opposite' },
        answer: 'b',
        explanation: 'Sine = Opposite / Hypotenuse (SOH). Cosine = Adjacent / Hypotenuse (CAH). Tangent = Opposite / Adjacent (TOA). Remember: SOH-CAH-TOA.',
    },
    {
        id: 60, ksb: 'K4', topic: 'Electrical Principles',
        text: 'What happens to the total resistance when more resistors are added in series?',
        options: { a: 'Total resistance decreases', b: 'Total resistance stays the same', c: 'Total resistance increases', d: 'Total resistance becomes zero' },
        answer: 'c',
        explanation: 'In a series circuit, total resistance = R1 + R2 + R3 + ... Adding more resistors in series always increases the total resistance.',
    },
];

export const PORTFOLIO_SECTIONS: PortfolioSection[] = [
    {
        id: 'intro',
        title: 'Introduction to the Task',
        prompt: 'Describe the task you were given, the equipment involved, and the context of the maintenance activity.',
        placeholder: 'e.g. I was tasked with carrying out fault diagnosis on [equipment]. The system consists of... I was issued the task by my line manager via [system] which provided me with...',
        ksbHints: ['K1', 'K2', 'K3', 'B5'],
    },
    {
        id: 'planning',
        title: 'Planning the Task',
        prompt: 'Describe how you planned the maintenance activity, including checking documentation, tools, isolation requirements, and coordination with other teams.',
        placeholder: 'e.g. I checked with the production team when the equipment would be available. I then checked I had all relevant documentation and the service kit. I selected and checked tools were fit for purpose...',
        ksbHints: ['S3', 'S4', 'S5', 'K1', 'K2', 'K3', 'B3', 'B4', 'B6'],
    },
    {
        id: 'health_safety',
        title: 'Health & Safety',
        prompt: 'Describe the health and safety measures you took, including PPE, risk assessments, isolation procedures, and compliance with regulations.',
        placeholder: 'e.g. I always ensure I comply with national and company regulations (HASAW, COSHH, PUWER, Electricity at Work). I checked what PPE was appropriate. I used lock-off/tag-off isolation...',
        ksbHints: ['S1', 'K2', 'B1', 'B2', 'B6', 'B7'],
    },
    {
        id: 'task',
        title: 'The Task',
        prompt: 'Describe in detail how you carried out the maintenance activity, including fault finding, diagnosis, repairs, and testing.',
        placeholder: 'e.g. I commenced the task by... Using the [diagnostic technique], I identified the fault as... I isolated the system and verified dead using a proving unit. I then...',
        ksbHints: ['S2', 'S4', 'S6', 'S7', 'K1', 'K3', 'K4', 'B5', 'S9', 'S10', 'S11', 'S12'],
    },
    {
        id: 'handover',
        title: 'Task Completion & Handover',
        prompt: 'Describe how you completed the task, tested the equipment, communicated with stakeholders, and reinstated the work area.',
        placeholder: 'e.g. Having ensured the equipment was meeting operational specification, I spoke to [personnel] to inform them of what I had done. I completed the sign-off documents. I returned all tools and ensured the area was clean...',
        ksbHints: ['S3', 'S5', 'S8', 'K1', 'K2', 'K3', 'B2', 'B3', 'B6'],
    },
];

export const GRADE_BOUNDARIES = {
    knowledge_test: { pass: 60, merit: 75, distinction: 85, total: 30 },
    practical_observation: { pass: 3.5, merit: 7, distinction: 10.5 },
    technical_interview: { pass: 3.5, merit: 7, distinction: 10.5 },
};

export const KSB_CATEGORIES = {
    knowledge: KSBS.filter(k => k.type === 'knowledge'),
    skills_core: KSBS.filter(k => k.type === 'skill' && !k.specialist),
    skills_specialist: KSBS.filter(k => k.type === 'skill' && k.specialist),
    behaviours: KSBS.filter(k => k.type === 'behaviour'),
};
