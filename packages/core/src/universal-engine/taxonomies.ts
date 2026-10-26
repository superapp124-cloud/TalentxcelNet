import type { UniversalClassTaxonomy, UniversalChapterMeta, SubjectCode } from './types'

// Helper to evenly allocate questions to chapters summing to target
function allocateChapters(
  chapters: Array<{ id: string; chapterNumber: number; title: string; disciplineCode?: string; disciplineName?: string; topics: Array<{ id: string; title: string }> }>,
  targetTotal: number
): UniversalChapterMeta[] {
  const count = chapters.length
  const base = Math.floor(targetTotal / count)
  const remainder = targetTotal % count

  return chapters.map((ch, idx) => ({
    ...ch,
    targetQuestionCount: base + (idx < remainder ? 1 : 0),
  }))
}

// ============================================================================
// 1. SCIENCE TAXONOMY (Physics, Chemistry, Biology) — 600,000 Questions
// Cl 4-8: 40,000/class (200,000 total)
// Cl 9-12: 100,000/class (400,000 total across Physics, Chemistry & Biology)
// ============================================================================
export const SCIENCE_CLASSES_TAXONOMY: UniversalClassTaxonomy[] = [
  // Class 4 (40,000 Qs)
  {
    classNumber: 4,
    className: 'Class 4',
    subjectCode: 'science',
    subjectName: 'General Science & Environmental Studies',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: 'sci_c4_ch01', chapterNumber: 1, title: 'Plant Life: Food Making (Photosynthesis) & Adaptations', topics: [{ id: 't1', title: 'Parts of a Leaf & Photosynthesis' }, { id: 't2', title: 'Terrestrial & Aquatic Plant Adaptations' }, { id: 't3', title: 'Insectivorous & Non-Green Plants' }] },
      { id: 'sci_c4_ch02', chapterNumber: 2, title: 'Animal Life: Reproduction & Life Cycles', topics: [{ id: 't1', title: 'Egg-Laying Animals vs Mammals' }, { id: 't2', title: 'Life Cycle of Butterfly, Frog & Hen' }, { id: 't3', title: 'Parental Care in Animal Kingdom' }] },
      { id: 'sci_c4_ch03', chapterNumber: 3, title: 'Human Body: Teeth, Tongue & Digestive System', topics: [{ id: 't1', title: 'Types of Teeth (Incisors, Canines, Molars)' }, { id: 't2', title: 'Digestive Journey & Saliva Action' }, { id: 't3', title: 'Dental Hygiene & Microbes' }] },
      { id: 'sci_c4_ch04', chapterNumber: 4, title: 'Food, Nutrients & Balanced Diet', topics: [{ id: 't1', title: 'Carbohydrates, Fats, Proteins, Vitamins & Minerals' }, { id: 't2', title: 'Roughage & Water' }, { id: 't3', title: 'Food Preservation & Deficiency Diseases' }] },
      { id: 'sci_c4_ch05', chapterNumber: 5, title: 'Safety, First Aid & Home Precautions', topics: [{ id: 't1', title: 'Fire Safety & Electrical Precautions' }, { id: 't2', title: 'First Aid for Cuts, Burns & Insect Stings' }, { id: 't3', title: 'Road & Playground Rules' }] },
      { id: 'sci_c4_ch06', chapterNumber: 6, title: 'States of Matter: Solids, Liquids & Gases', topics: [{ id: 't1', title: 'Arrangement of Molecules' }, { id: 't2', title: 'Solutes, Solvents & Solutions' }, { id: 't3', title: 'Evaporation, Condensation, Filtration & Decantation' }] },
      { id: 'sci_c4_ch07', chapterNumber: 7, title: 'Force, Work & Elementary Simple Machines', topics: [{ id: 't1', title: 'Frictional, Gravitational & Muscular Forces' }, { id: 't2', title: 'Types of Simple Machines (Lever, Pulley, Inclined Plane)' }, { id: 't3', title: 'Forms of Energy (Solar, Wind, Heat, Light)' }] },
      { id: 'sci_c4_ch08', chapterNumber: 8, title: 'Air, Water & Weather Cycles', topics: [{ id: 't1', title: 'Composition of Air & Atmospheric Pressure' }, { id: 't2', title: 'Sea Breeze & Land Breeze' }, { id: 't3', title: 'Water Purification Methods' }] },
      { id: 'sci_c4_ch09', chapterNumber: 9, title: 'Earth, Sun, Moon & Solar System', topics: [{ id: 't1', title: 'Rotation & Revolution of Earth (Day, Night & Seasons)' }, { id: 't2', title: 'Phases of the Moon & Eclipses' }, { id: 't3', title: 'Planets of the Solar System' }] },
      { id: 'sci_c4_ch10', chapterNumber: 10, title: 'Our Environment & Waste Management (3 Rs)', topics: [{ id: 't1', title: 'Biodegradable vs Non-Biodegradable Waste' }, { id: 't2', title: 'Reduce, Reuse, Recycle Practices' }, { id: 't3', title: 'Pollution Prevention (Air, Water, Soil)' }] },
    ], 40000),
  },
  // Class 5 (40,000 Qs)
  {
    classNumber: 5,
    className: 'Class 5',
    subjectCode: 'science',
    subjectName: 'General Science & Environmental Studies',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: 'sci_c5_ch01', chapterNumber: 1, title: 'Plant Reproduction: Seeds, Spores & Vegetative Propagation', topics: [{ id: 't1', title: 'Structure of a Seed & Seed Germination Conditions' }, { id: 't2', title: 'Seed Dispersal by Wind, Water, Animals & Explosion' }, { id: 't3', title: 'Crops, Agriculture & Storage' }] },
      { id: 'sci_c5_ch02', chapterNumber: 2, title: 'Animal Habitats & Survival Adaptations', topics: [{ id: 't1', title: 'Body Coverings (Scales, Shells, Feathers, Fur)' }, { id: 't2', title: 'Breathing Organs (Gills, Moist Skin, Lungs, Spiracles)' }, { id: 't3', title: 'Migration & Camouflage' }] },
      { id: 'sci_c5_ch03', chapterNumber: 3, title: 'Skeletal & Muscular Systems', topics: [{ id: 't1', title: 'Human Skeleton: Skull, Backbone, Ribcage & Limbs' }, { id: 't2', title: 'Movable Joints (Ball-and-Socket, Hinge, Pivot, Gliding)' }, { id: 't3', title: 'Voluntary & Involuntary Muscles' }] },
      { id: 'sci_c5_ch04', chapterNumber: 4, title: 'Nervous System & Sense Organs', topics: [{ id: 't1', title: 'Brain Anatomy (Cerebrum, Cerebellum, Medulla)' }, { id: 't2', title: 'Spinal Cord & Reflex Actions' }, { id: 't3', title: 'Care of Eyes, Ears, Nose, Tongue & Skin' }] },
      { id: 'sci_c5_ch05', chapterNumber: 5, title: 'Health, Hygiene & Communicable Diseases', topics: [{ id: 't1', title: 'Communicable Diseases & Pathogens (Bacteria, Viruses, Protozoa)' }, { id: 't2', title: 'Modes of Transmission & Prevention' }, { id: 't3', title: 'Vaccination & Immunity' }] },
      { id: 'sci_c5_ch06', chapterNumber: 6, title: 'Rocks, Minerals & Soil Formation', topics: [{ id: 't1', title: 'Igneous, Sedimentary & Metamorphic Rocks' }, { id: 't2', title: 'Metallic & Non-Metallic Minerals' }, { id: 't3', title: 'Coal, Petroleum & Soil Conservation' }] },
      { id: 'sci_c5_ch07', chapterNumber: 7, title: 'Simple Machines & Mechanical Advantage', topics: [{ id: 't1', title: 'Three Classes of Levers (Load, Fulcrum, Effort)' }, { id: 't2', title: 'Wheel and Axle, Pulley & Screw' }, { id: 't3', title: 'Friction: Advantages & Disadvantages' }] },
      { id: 'sci_c5_ch08', chapterNumber: 8, title: 'Air & Atmospheric Layers', topics: [{ id: 't1', title: 'Layers of Atmosphere (Troposphere to Exosphere)' }, { id: 't2', title: 'Properties of Air & Air Pressure Experiments' }, { id: 't3', title: 'Greenhouse Effect & Air Pollution' }] },
      { id: 'sci_c5_ch09', chapterNumber: 9, title: 'Natural Disasters & Survival Preparedness', topics: [{ id: 't1', title: 'Earthquakes: Epicenter, Seismograph & Safety' }, { id: 't2', title: 'Volcanoes, Tsunamis & Floods' }, { id: 't3', title: 'Disaster Management & Rescue Services' }] },
      { id: 'sci_c5_ch10', chapterNumber: 10, title: 'Space Exploration, Satellites & Eclipses', topics: [{ id: 't1', title: 'Solar and Lunar Eclipses: Umbra & Penumbra' }, { id: 't2', title: 'Artificial Satellites & Communication' }, { id: 't3', title: 'Indian Space Odyssey (ISRO & Chandrayaan)' }] },
    ], 40000),
  },
  // Class 6 (40,000 Qs)
  {
    classNumber: 6,
    className: 'Class 6',
    subjectCode: 'science',
    subjectName: 'Science Foundation',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: 'sci_c6_ch01', chapterNumber: 1, title: 'Components of Food & Nutrient Deficiency', topics: [{ id: 't1', title: 'Carbohydrates & Starch Iodine Test' }, { id: 't2', title: 'Protein Biuret Test & Fats' }, { id: 't3', title: 'Vitamins A, B, C, D & Scurvy, Rickets, Beriberi' }] },
      { id: 'sci_c6_ch02', chapterNumber: 2, title: 'Sorting Materials into Groups & Properties', topics: [{ id: 't1', title: 'Appearance, Hardness & Solubility' }, { id: 't2', title: 'Flotation, Density & Transparency' }, { id: 't3', title: 'Thermal & Electrical Conductivity' }] },
      { id: 'sci_c6_ch03', chapterNumber: 3, title: 'Separation of Substances: Mixtures & Solutions', topics: [{ id: 't1', title: 'Handpicking, Threshing, Winnowing & Sieving' }, { id: 't2', title: 'Sedimentation, Decantation & Filtration' }, { id: 't3', title: 'Evaporation, Condensation & Saturated Solutions' }] },
      { id: 'sci_c6_ch04', chapterNumber: 4, title: 'Getting to Know Plants: Morphology & Function', topics: [{ id: 't1', title: 'Herbs, Shrubs, Trees & Venation (Reticulate vs Parallel)' }, { id: 't2', title: 'Taproots vs Fibrous Roots' }, { id: 't3', title: 'Flower Anatomy: Sepals, Petals, Stamens & Pistil' }] },
      { id: 'sci_c6_ch05', chapterNumber: 5, title: 'Body Movements: Joints, Bones & Animal Locomotion', topics: [{ id: 't1', title: 'Human Ball & Socket, Hinge, Pivot Joints' }, { id: 't2', title: 'X-rays & Cartilage' }, { id: 't3', title: 'Gait of Animals: Earthworm, Snail, Cockroach, Fish, Bird' }] },
      { id: 'sci_c6_ch06', chapterNumber: 6, title: 'The Living Organisms — Characteristics & Habitats', topics: [{ id: 't1', title: 'Biotic vs Abiotic Components' }, { id: 't2', title: 'Desert, Aquatic, Mountain & Grassland Adaptations' }, { id: 't3', title: 'Respiration, Excretion & Stimuli Response' }] },
      { id: 'sci_c6_ch07', chapterNumber: 7, title: 'Motion and Measurement of Distances', topics: [{ id: 't1', title: 'SI Units of Length & Standard Metre' }, { id: 't2', title: 'Measurement of Curved Lines & Parallax Error' }, { id: 't3', title: 'Rectilinear, Circular & Periodic Motion' }] },
      { id: 'sci_c6_ch08', chapterNumber: 8, title: 'Light, Shadows and Reflections', topics: [{ id: 't1', title: 'Luminous vs Non-Luminous Objects' }, { id: 't2', title: 'Formation of Shadows & Pinhole Camera' }, { id: 't3', title: 'Mirrors & Rectilinear Propagation of Light' }] },
      { id: 'sci_c6_ch09', chapterNumber: 9, title: 'Electricity and Circuits', topics: [{ id: 't1', title: 'Electric Cell: Terminals, Anode & Cathode' }, { id: 't2', title: 'Complete vs Open Electric Circuits' }, { id: 't3', title: 'Conductors and Insulators of Electricity' }] },
      { id: 'sci_c6_ch10', chapterNumber: 10, title: 'Fun with Magnets: Poles & Magnetic Fields', topics: [{ id: 't1', title: 'Discovery of Magnets & Magnetic vs Non-Magnetic Materials' }, { id: 't2', title: 'North and South Poles of a Magnet' }, { id: 't3', title: 'Magnetic Attraction, Repulsion & Magnetic Compass' }] },
    ], 40000),
  },
  // Class 7 (40,000 Qs)
  {
    classNumber: 7,
    className: 'Class 7',
    subjectCode: 'science',
    subjectName: 'Science Intermediate',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: 'sci_c7_ch01', chapterNumber: 1, title: 'Nutrition in Plants: Autotrophs & Heterotrophs', topics: [{ id: 't1', title: 'Photosynthesis Mechanism & Chlorophyll Action' }, { id: 't2', title: 'Parasitic (Cuscuta), Saprotrophic (Fungi) & Symbiosis (Lichens)' }, { id: 't3', title: 'Nutrient Replenishment in Soil' }] },
      { id: 'sci_c7_ch02', chapterNumber: 2, title: 'Nutrition in Animals: Digestion in Humans & Ruminants', topics: [{ id: 't1', title: 'Ingestion, Digestion, Absorption, Assimilation & Egestion' }, { id: 't2', title: 'Stomach Acid, Bile Juice, Pancreatic Enzymes & Villi' }, { id: 't3', title: 'Digestion in Grass-Eating Animals (Rumen) & Amoeba' }] },
      { id: 'sci_c7_ch03', chapterNumber: 3, title: 'Heat: Temperature Measurement & Heat Transfer', topics: [{ id: 't1', title: 'Clinical vs Laboratory Thermometers' }, { id: 't2', title: 'Conduction, Convection & Radiation' }, { id: 't3', title: 'Thermos Flask Mechanism & Woolen Clothing' }] },
      { id: 'sci_c7_ch04', chapterNumber: 4, title: 'Acids, Bases and Salts: Indicators & Neutralisation', topics: [{ id: 't1', title: 'Organic Acids (Citric, Acetic, Lactic) vs Mineral Acids' }, { id: 't2', title: 'Litmus, Turmeric & Phenolphthalein Indicators' }, { id: 't3', title: 'Neutralisation Reaction & Everyday Applications' }] },
      { id: 'sci_c7_ch05', chapterNumber: 5, title: 'Physical and Chemical Changes: Rusting & Crystallisation', topics: [{ id: 't1', title: 'Physical Changes vs Chemical Changes' }, { id: 't2', title: 'Rusting of Iron (Fe + O2 + H2O) & Galvanisation' }, { id: 't3', title: 'Magnesium Ribbon Combustion & Copper Sulphate Crystallisation' }] },
      { id: 'sci_c7_ch06', chapterNumber: 6, title: 'Respiration in Organisms: Aerobic vs Anaerobic', topics: [{ id: 't1', title: 'Cellular Respiration (Glucose breakdown into CO2 + H2O + ATP)' }, { id: 't2', title: 'Anaerobic Lactic Acid Fermentation in Muscle Cells' }, { id: 't3', title: 'Breathing in Earthworms, Fish, Insects (Spiracles) & Plants' }] },
      { id: 'sci_c7_ch07', chapterNumber: 7, title: 'Transportation in Animals and Plants: Circulatory & Excretory', topics: [{ id: 't1', title: 'Blood Components (RBC, WBC, Platelets, Plasma)' }, { id: 't2', title: 'Human Heart Anatomy, Blood Vessels (Arteries, Veins, Capillaries)' }, { id: 't3', title: 'Human Kidney Excretion & Plant Xylem/Phloem Transpiration' }] },
      { id: 'sci_c7_ch08', chapterNumber: 8, title: 'Reproduction in Plants: Asexual & Sexual', topics: [{ id: 't1', title: 'Vegetative Propagation, Budding (Yeast) & Spore Formation' }, { id: 't2', title: 'Pollination (Self vs Cross) & Fertilisation (Zygote)' }, { id: 't3', title: 'Seed Dispersal Mechanisms' }] },
      { id: 'sci_c7_ch09', chapterNumber: 9, title: 'Motion and Time: Speed Formula & Distance-Time Graphs', topics: [{ id: 't1', title: 'Speed = Distance / Time Calculation' }, { id: 't2', title: 'Simple Pendulum: Period & Frequency' }, { id: 't3', title: 'Interpreting Distance-Time Graphs' }] },
      { id: 'sci_c7_ch10', chapterNumber: 10, title: 'Electric Current and Its Effects: Heating & Magnetic', topics: [{ id: 't1', title: 'Circuit Symbols & Heating Effect (Nichrome wire, Fuse, MCB)' }, { id: 't2', title: 'Magnetic Effect of Current (Oersted Experiment)' }, { id: 't3', title: 'Electromagnets & Electric Bell Circuit' }] },
    ], 40000),
  },
  // Class 8 (40,000 Qs)
  {
    classNumber: 8,
    className: 'Class 8',
    subjectCode: 'science',
    subjectName: 'Science Advanced Transition',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: 'sci_c8_ch01', chapterNumber: 1, title: 'Crop Production and Management: Agronomy', topics: [{ id: 't1', title: 'Kharif vs Rabi Crops' }, { id: 't2', title: 'Ploughing, Sowing, Manures vs Chemical Fertilisers' }, { id: 't3', title: 'Drip & Sprinkler Irrigation, Weeding & Harvesting' }] },
      { id: 'sci_c8_ch02', chapterNumber: 2, title: 'Microorganisms: Friend and Foe', topics: [{ id: 't1', title: 'Bacteria, Fungi, Protozoa & Algae' }, { id: 't2', title: 'Commercial Use: Fermentation, Antibiotics & Vaccines' }, { id: 't3', title: 'Food Poisoning, Pasteurisation & Nitrogen Cycle' }] },
      { id: 'sci_c8_ch03', chapterNumber: 3, title: 'Coal and Petroleum: Fossil Fuels', topics: [{ id: 't1', title: 'Carbonisation & Destructive Distillation of Coal (Coke, Tar, Gas)' }, { id: 't2', title: 'Petroleum Refining & Fractional Distillation Products' }, { id: 't3', title: 'Natural Gas (CNG) & Conservation of Petrochemicals' }] },
      { id: 'sci_c8_ch04', chapterNumber: 4, title: 'Combustion and Flame: Fire Extinction & Calorific Value', topics: [{ id: 't1', title: 'Conditions for Combustion (Ignition Temperature, Oxygen, Fuel)' }, { id: 't2', title: 'Types of Combustion: Rapid, Spontaneous, Explosion' }, { id: 't3', title: 'Zones of a Candle Flame & Calorific Value (kJ/kg)' }] },
      { id: 'sci_c8_ch05', chapterNumber: 5, title: 'Conservation of Plants and Animals: Biodiversity', topics: [{ id: 't1', title: 'Deforestation Consequences & Desertification' }, { id: 't2', title: 'Biosphere Reserves, National Parks & Sanctuaries' }, { id: 't3', title: 'Endangered Species, Red Data Book & Migration' }] },
      { id: 'sci_c8_ch06', chapterNumber: 6, title: 'Reproduction in Animals: Sexual & Metamorphosis', topics: [{ id: 't1', title: 'Male & Female Reproductive Organs & Gametes' }, { id: 't2', title: 'Internal vs External Fertilisation & IVF' }, { id: 't3', title: 'Asexual Reproduction: Binary Fission (Amoeba) & Budding (Hydra)' }] },
      { id: 'sci_c8_ch07', chapterNumber: 7, title: 'Reaching the Age of Adolescence: Endocrine Hormones', topics: [{ id: 't1', title: 'Puberty, Secondary Sexual Characters & Growth Spurt' }, { id: 't2', title: 'Hormones: Pituitary, Thyroid, Pancreas, Adrenals, Sex Hormones' }, { id: 't3', title: 'Sex Determination (XX vs XY Chromosomes) & Nutrition' }] },
      { id: 'sci_c8_ch08', chapterNumber: 8, title: 'Force and Pressure: Atmospheric & Fluid Pressure', topics: [{ id: 't1', title: 'Contact vs Non-Contact Forces' }, { id: 't2', title: 'Pressure Formula: P = Force / Area (Pascals)' }, { id: 't3', title: 'Atmospheric Pressure Experiments & Manometers' }] },
      { id: 'sci_c8_ch09', chapterNumber: 9, title: 'Friction: Rolling, Sliding & Fluid Drag', topics: [{ id: 't1', title: 'Factors Affecting Friction: Interlocking of Irregularities' }, { id: 't2', title: 'Static, Sliding and Rolling Friction Comparison' }, { id: 't3', title: 'Ball Bearings, Lubricants & Streamlining in Fluid Drag' }] },
      { id: 'sci_c8_ch10', chapterNumber: 10, title: 'Sound: Vibration, Amplitude, Frequency & Pitch', topics: [{ id: 't1', title: 'Sound Produced by Vibrating Bodies & Vocal Cords (Larynx)' }, { id: 't2', title: 'Propagation Through Mediums (No sound in Vacuum)' }, { id: 't3', title: 'Frequency (Hz), Pitch, Loudness (Decibels) & Noise Pollution' }] },
      { id: 'sci_c8_ch11', chapterNumber: 11, title: 'Chemical Effects of Electric Current: Electroplating', topics: [{ id: 't1', title: 'Conductivity of Liquids (Electrolytes)' }, { id: 't2', title: 'Electrolysis of Water into H2 and O2' }, { id: 't3', title: 'Electroplating Applications (Chromium, Gold, Zinc)' }] },
      { id: 'sci_c8_ch12', chapterNumber: 12, title: 'Light: Reflection Laws, Refraction & Human Eye', topics: [{ id: 't1', title: 'Laws of Reflection (Incident, Normal, Reflected Ray)' }, { id: 't2', title: 'Regular vs Diffuse Reflection & Multiple Images (Kaleidoscope)' }, { id: 't3', title: 'Human Eye Anatomy: Cornea, Iris, Lens, Retina, Rods & Cones' }] },
    ], 40000),
  },

  // ==========================================================================
  // SENIOR CLASSES (9-12) — 100,000 Questions Per Class
  // Explicitly partitioned into PHYSICS, CHEMISTRY, BIOLOGY
  // ==========================================================================

  // Class 9 (100,000 Qs: 35k Physics, 35k Chemistry, 30k Biology)
  {
    classNumber: 9,
    className: 'Class 9',
    subjectCode: 'science',
    subjectName: 'Secondary Science (Physics, Chemistry & Biology)',
    totalQuestionsTarget: 100000,
    chapters: allocateChapters([
      // PHYSICS (35,000 Qs)
      { id: 'sci_c9_ch01', chapterNumber: 1, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Motion: Velocity, Acceleration & Graphical Derivations', topics: [{ id: 't1', title: 'Distance vs Displacement, Uniform & Non-Uniform Motion' }, { id: 't2', title: 'Speed, Velocity & Acceleration (v = u + at)' }, { id: 't3', title: 'Kinematics Equations: s = ut + 1/2at², v² = u² + 2as' }, { id: 't4', title: 'Uniform Circular Motion & Centripetal Acceleration' }] },
      { id: 'sci_c9_ch02', chapterNumber: 2, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Force and Laws of Motion: Newton’s Laws & Momentum', topics: [{ id: 't1', title: 'First Law of Motion & Inertia' }, { id: 't2', title: 'Second Law of Motion (F = ma) & Mathematical Proof' }, { id: 't3', title: 'Third Law of Motion (Action-Reaction)' }, { id: 't4', title: 'Conservation of Linear Momentum (m1u1 + m2u2 = m1v1 + m2v2)' }] },
      { id: 'sci_c9_ch03', chapterNumber: 3, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Gravitation: Universal Gravitation & Free Fall', topics: [{ id: 't1', title: 'Universal Law of Gravitation (F = G*M*m/r²)' }, { id: 't2', title: 'Acceleration Due to Gravity (g = 9.8 m/s²) & Free Fall' }, { id: 't3', title: 'Mass vs Weight on Earth and Moon' }, { id: 't4', title: 'Thrust, Pressure, Buoyancy & Archimedes’ Principle' }] },
      { id: 'sci_c9_ch04', chapterNumber: 4, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Work and Energy: Work-Energy Theorem & Power', topics: [{ id: 't1', title: 'Scientific Work (W = F * s * cos θ)' }, { id: 't2', title: 'Kinetic Energy (Ek = 1/2mv²) Derivation' }, { id: 't3', title: 'Potential Energy (Ep = mgh) & Law of Conservation of Energy' }, { id: 't4', title: 'Power (P = W/t in Watts) & Commercial Unit of Energy (kWh)' }] },
      { id: 'sci_c9_ch05', chapterNumber: 5, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Sound: Waves, Speed, Ultrasound & Sonar', topics: [{ id: 't1', title: 'Longitudinal Sound Waves: Compressions & Rarefactions' }, { id: 't2', title: 'Wavelength, Frequency, Time Period & Amplitude (v = λ*f)' }, { id: 't3', title: 'Reflection of Sound, Echoes & Reverberation' }, { id: 't4', title: 'Ultrasound Applications, SONAR & Structure of Human Ear' }] },

      // CHEMISTRY (35,000 Qs)
      { id: 'sci_c9_ch06', chapterNumber: 6, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Matter in Our Surroundings: States & Phase Changes', topics: [{ id: 't1', title: 'Particulate Nature of Matter & Diffusion' }, { id: 't2', title: 'States of Matter & Effect of Temperature (Latent Heat of Fusion/Vapourisation)' }, { id: 't3', title: 'Effect of Pressure on Gases & Sublimation' }, { id: 't4', title: 'Evaporation Factors & Cooling Effect' }] },
      { id: 'sci_c9_ch07', chapterNumber: 7, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Is Matter Around Us Pure: Mixtures, Colloids & Solutions', topics: [{ id: 't1', title: 'Pure Substances vs Mixtures (Homogeneous vs Heterogeneous)' }, { id: 't2', title: 'True Solutions, Colloids (Tyndall Effect) & Suspensions' }, { id: 't3', title: 'Concentration of Solution: Mass Percentage Calculations' }, { id: 't4', title: 'Separation Techniques: Centrifugation, Chromatography, Distillation' }] },
      { id: 'sci_c9_ch08', chapterNumber: 8, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Atoms and Molecules: Laws of Chemical Combination', topics: [{ id: 't1', title: 'Law of Conservation of Mass & Law of Constant Proportions' }, { id: 't2', title: 'Dalton’s Atomic Theory & Atomic Symbols' }, { id: 't3', title: 'Atomic Mass Unit & Molecular Mass Calculation' }, { id: 't4', title: 'Writing Chemical Formulae of Ionic Compounds (Criss-Cross Method)' }] },
      { id: 'sci_c9_ch09', chapterNumber: 9, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Structure of the Atom: Subatomic Particles & Isotopes', topics: [{ id: 't1', title: 'Thomson’s Model & Rutherford’s Alpha-Particle Scattering Experiment' }, { id: 't2', title: 'Bohr’s Model of Atom & Energy Levels (Shells K, L, M, N)' }, { id: 't3', title: 'Electronic Configuration & Valency' }, { id: 't4', title: 'Atomic Number, Mass Number, Isotopes & Isobars' }] },

      // BIOLOGY (30,000 Qs)
      { id: 'sci_c9_ch10', chapterNumber: 10, disciplineCode: 'biology', disciplineName: 'Biology', title: 'The Fundamental Unit of Life: Cell Structure & Organelles', topics: [{ id: 't1', title: 'Cell Theory, Prokaryotic vs Eukaryotic Cells' }, { id: 't2', title: 'Plasma Membrane: Osmosis & Diffusion (Hypo/Hyper/Isotonic)' }, { id: 't3', title: 'Cell Wall, Nucleus & Chromosomes (DNA/RNA)' }, { id: 't4', title: 'Endoplasmic Reticulum, Golgi Apparatus, Lysosomes, Mitochondria, Plastids, Vacuoles' }] },
      { id: 'sci_c9_ch11', chapterNumber: 11, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Tissues: Plant Meristems & Animal Epithelium/Connective', topics: [{ id: 't1', title: 'Meristematic Tissues (Apical, Intercalary, Lateral)' }, { id: 't2', title: 'Permanent Plant Tissues (Parenchyma, Collenchyma, Sclerenchyma, Xylem, Phloem)' }, { id: 't3', title: 'Epithelial, Muscular (Striated, Smooth, Cardiac) & Nervous Tissue' }, { id: 't4', title: 'Connective Tissue: Blood, Bone, Ligament, Tendon, Cartilage, Areolar, Adipose' }] },
      { id: 'sci_c9_ch12', chapterNumber: 12, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Improvement in Food Resources: Crops & Animal Husbandry', topics: [{ id: 't1', title: 'Crop Variety Improvement: Hybridisation & Genetic Modification' }, { id: 't2', title: 'Crop Production Management: Manures, Fertilisers, Irrigation, Cropping Patterns' }, { id: 't3', title: 'Crop Protection Management: Weeds, Pests & Storage of Grains' }, { id: 't4', title: 'Animal Husbandry: Cattle Farming, Poultry, Fisheries (Pisciculture) & Apiculture' }] },
    ], 100000),
  },

  // Class 10 (100,000 Qs: 35k Physics, 35k Chemistry, 30k Biology)
  {
    classNumber: 10,
    className: 'Class 10',
    subjectCode: 'science',
    subjectName: 'Secondary Science (Physics, Chemistry & Biology)',
    totalQuestionsTarget: 100000,
    chapters: allocateChapters([
      // CHEMISTRY (35,000 Qs)
      { id: 'sci_c10_ch01', chapterNumber: 1, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Chemical Reactions and Equations: Balancing & Types', topics: [{ id: 't1', title: 'Balancing Chemical Equations & Law of Conservation of Mass' }, { id: 't2', title: 'Combination, Decomposition (Thermal, Electrolytic, Photolytic)' }, { id: 't3', title: 'Displacement & Double Displacement (Precipitation) Reactions' }, { id: 't4', title: 'Oxidation, Reduction (Redox Reactions), Corrosion & Rancidity' }] },
      { id: 'sci_c10_ch02', chapterNumber: 2, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Acids, Bases and Salts: pH Scale & Industrial Salts', topics: [{ id: 't1', title: 'Chemical Properties of Acids & Bases with Metals and Carbonates' }, { id: 't2', title: 'pH Scale & Importance in Everyday Life (Digestive, Soil, Tooth Decay)' }, { id: 't3', title: 'Preparation of Bleaching Powder, Baking Soda, Washing Soda' }, { id: 't4', title: 'Plaster of Paris & Water of Crystallisation' }] },
      { id: 'sci_c10_ch03', chapterNumber: 3, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Metals and Non-Metals: Metallurgy & Reactivity Series', topics: [{ id: 't1', title: 'Physical & Chemical Properties of Metals and Non-Metals' }, { id: 't2', title: 'Reactivity Series of Metals & Ionic Bonding Mechanism' }, { id: 't3', title: 'Extraction of Metals: Roasting, Calcination & Electrolytic Refining' }, { id: 't4', title: 'Corrosion Prevention: Galvanisation, Alloying (Steel, Brass, Bronze)' }] },
      { id: 'sci_c10_ch04', chapterNumber: 4, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Carbon and Its Compounds: Covalent Bonding & Functional Groups', topics: [{ id: 't1', title: 'Covalent Bonding & Versatile Nature of Carbon (Catenation, Tetravalency)' }, { id: 't2', title: 'Homologous Series, IUPAC Nomenclature & Functional Groups' }, { id: 't3', title: 'Chemical Properties: Combustion, Oxidation, Addition & Substitution' }, { id: 't4', title: 'Ethanol, Ethanoic Acid (Esterification) & Soaps/Detergents Micelles' }] },

      // BIOLOGY (30,000 Qs)
      { id: 'sci_c10_ch05', chapterNumber: 5, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Life Processes: Nutrition, Respiration, Transport & Excretion', topics: [{ id: 't1', title: 'Autotrophic Nutrition (Stomata, Chloroplasts) & Human Digestion' }, { id: 't2', title: 'Aerobic vs Anaerobic Respiration & Human Respiratory System' }, { id: 't3', title: 'Circulatory System: Heart Function, Blood Pressure & Lymph' }, { id: 't4', title: 'Excretion in Humans: Nephron Structure & Urine Formation; Plant Excretion' }] },
      { id: 'sci_c10_ch06', chapterNumber: 6, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Control and Coordination: Nervous System & Phytohormones', topics: [{ id: 't1', title: 'Neuron Anatomy, Synapse & Reflex Arc' }, { id: 't2', title: 'Human Brain: Forebrain, Midbrain, Hindbrain & Protection' }, { id: 't3', title: 'Plant Tropic Movements (Phototropism, Geotropism) & Phytohormones (Auxin, Gibberellin)' }, { id: 't4', title: 'Endocrine Glands: Pituitary, Thyroid, Pancreas, Adrenal, Gonads' }] },
      { id: 'sci_c10_ch07', chapterNumber: 7, disciplineCode: 'biology', disciplineName: 'Biology', title: 'How Do Organisms Reproduce: Fission, Vegetative & Human Systems', topics: [{ id: 't1', title: 'Asexual Modes: Fission, Fragmentation, Regeneration, Budding, Spores' }, { id: 't2', title: 'Sexual Reproduction in Flowering Plants: Pollination & Double Fertilisation' }, { id: 't3', title: 'Male and Female Human Reproductive Systems & Menstrual Cycle' }, { id: 't4', title: 'Reproductive Health, STDs & Contraceptive Methods' }] },
      { id: 'sci_c10_ch08', chapterNumber: 8, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Heredity: Mendel’s Laws & Sex Determination', topics: [{ id: 't1', title: 'Inherited Traits & Mendel’s Monohybrid Cross (3:1 Law of Segregation)' }, { id: 't2', title: 'Mendel’s Dihybrid Cross (9:3:3:1 Law of Independent Assortment)' }, { id: 't3', title: 'Expression of Traits: Genes & Proteins' }, { id: 't4', title: 'Sex Determination in Human Beings (XX vs XY)' }] },

      // PHYSICS (35,000 Qs)
      { id: 'sci_c10_ch09', chapterNumber: 9, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Light — Reflection and Refraction: Mirror & Lens Formulae', topics: [{ id: 't1', title: 'Spherical Mirrors: Concave & Convex Ray Diagrams' }, { id: 't2', title: 'Mirror Formula (1/v + 1/u = 1/f) & Magnification (m = -v/u)' }, { id: 't3', title: 'Refraction of Light, Snell’s Law (n = sin i / sin r) & Refractive Index' }, { id: 't4', title: 'Lens Formula (1/v - 1/u = 1/f), Magnification & Power of Lens (P = 1/f in Dioptres)' }] },
      { id: 'sci_c10_ch10', chapterNumber: 10, disciplineCode: 'physics', disciplineName: 'Physics', title: 'The Human Eye and the Colourful World: Dispersion & Vision Defects', topics: [{ id: 't1', title: 'Power of Accommodation & Vision Defects (Myopia, Hypermetropia, Presbyopia)' }, { id: 't2', title: 'Refraction of Light Through a Glass Prism & Dispersion (VIBGYOR)' }, { id: 't3', title: 'Atmospheric Refraction: Twinkling of Stars, Advanced Sunrise & Delayed Sunset' }, { id: 't4', title: 'Scattering of Light: Tyndall Effect & Blue Colour of the Sky' }] },
      { id: 'sci_c10_ch11', chapterNumber: 11, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Electricity: Ohm’s Law, Resistance & Joule’s Heating', topics: [{ id: 't1', title: 'Electric Current (I = Q/t), Potential Difference (V = W/Q) & Voltmeters' }, { id: 't2', title: 'Ohm’s Law (V = IR) & Factors Affecting Resistance (R = ρ*l/A)' }, { id: 't3', title: 'Resistors in Series (Rs = R1 + R2) and Parallel (1/Rp = 1/R1 + 1/R2)' }, { id: 't4', title: 'Joule’s Law of Heating (H = I²Rt) & Electric Power (P = VI = I²R = V²/R)' }] },
      { id: 'sci_c10_ch12', chapterNumber: 12, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Magnetic Effects of Electric Current: Fleming’s Rules & Induction', topics: [{ id: 't1', title: 'Magnetic Field Lines & Field Due to Current-Carrying Straight Wire & Solenoid' }, { id: 't2', title: 'Right-Hand Thumb Rule & Force on a Current-Carrying Conductor in Magnetic Field' }, { id: 't3', title: 'Fleming’s Left-Hand Rule & Principle of Electric Motor' }, { id: 't4', title: 'Electromagnetic Induction, Fleming’s Right-Hand Rule & Domestic Electric Circuits (Earthing/Fuse)' }] },
      { id: 'sci_c10_ch13', chapterNumber: 13, disciplineCode: 'biology', disciplineName: 'Ecology', title: 'Our Environment: Ecosystems & Ozone Layer Depletion', topics: [{ id: 't1', title: 'Ecosystem Components, Food Chains & Food Webs' }, { id: 't2', title: 'Trophic Levels & 10% Law of Energy Transfer' }, { id: 't3', title: 'Biological Magnification of Non-Biodegradable Pesticides' }, { id: 't4', title: 'Ozone Layer Depletion (CFCs) & Solid Waste Management' }] },
    ], 100000),
  },

  // Class 11 (100,000 Qs: 35k Physics, 35k Chemistry, 30k Biology)
  {
    classNumber: 11,
    className: 'Class 11',
    subjectCode: 'science',
    subjectName: 'Senior Secondary Science (Physics, Chemistry & Biology)',
    totalQuestionsTarget: 100000,
    chapters: allocateChapters([
      // PHYSICS (35,000 Qs)
      { id: 'sci_c11_ch01', chapterNumber: 1, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Units and Measurements & Dimensional Analysis', topics: [{ id: 't1', title: 'SI Base & Derived Units' }, { id: 't2', title: 'Dimensional Analysis & Applications' }, { id: 't3', title: 'Significant Figures & Error Analysis' }] },
      { id: 'sci_c11_ch02', chapterNumber: 2, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Kinematics in 1D and 2D: Projectile Motion', topics: [{ id: 't1', title: 'Relative Velocity in 1D & 2D' }, { id: 't2', title: 'Projectile Motion Equations & Range' }, { id: 't3', title: 'Uniform Circular Motion & Angular Velocity' }] },
      { id: 'sci_c11_ch03', chapterNumber: 3, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Laws of Motion: Friction & Circular Dynamics', topics: [{ id: 't1', title: 'Newton’s Laws & Free-Body Diagrams' }, { id: 't2', title: 'Static, Kinetic & Rolling Friction' }, { id: 't3', title: 'Banking of Roads & Centripetal Force' }] },
      { id: 'sci_c11_ch04', chapterNumber: 4, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Work, Energy, Power & Collisions', topics: [{ id: 't1', title: 'Work-Energy Theorem with Variable Forces' }, { id: 't2', title: 'Elastic & Inelastic Collisions in 1D/2D' }, { id: 't3', title: 'Potential Energy of a Spring & Conservative Forces' }] },
      { id: 'sci_c11_ch05', chapterNumber: 5, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Rotational Motion: Moment of Inertia & Torque', topics: [{ id: 't1', title: 'Centre of Mass of Two-Particle System' }, { id: 't2', title: 'Torque & Angular Momentum Conservation' }, { id: 't3', title: 'Moment of Inertia & Parallel/Perpendicular Axes Theorems' }] },
      { id: 'sci_c11_ch06', chapterNumber: 6, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Thermodynamics & Kinetic Theory of Gases', topics: [{ id: 't1', title: 'First Law of Thermodynamics (ΔQ = ΔU + ΔW)' }, { id: 't2', title: 'Carnot Heat Engine & Second Law' }, { id: 't3', title: 'Ideal Gas Law & Root Mean Square Speed' }] },

      // CHEMISTRY (35,000 Qs)
      { id: 'sci_c11_ch07', chapterNumber: 7, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Some Basic Concepts of Chemistry: Mole Concept & Stoichiometry', topics: [{ id: 't1', title: 'Mole Concept & Avogadro’s Number' }, { id: 't2', title: 'Empirical and Molecular Formula Calculations' }, { id: 't3', title: 'Molarity, Molality & Limiting Reagent Stoichiometry' }] },
      { id: 'sci_c11_ch08', chapterNumber: 8, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Structure of Atom: Quantum Mechanical Model', topics: [{ id: 't1', title: 'Photoelectric Effect & Planck’s Quantum Theory' }, { id: 't2', title: 'de Broglie Wavelength & Heisenberg Uncertainty' }, { id: 't3', title: 'Quantum Numbers & Aufbau, Pauli, Hund Rules' }] },
      { id: 'sci_c11_ch09', chapterNumber: 9, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Chemical Bonding and Molecular Structure', topics: [{ id: 't1', title: 'VSEPR Theory & Molecular Geometry' }, { id: 't2', title: 'Valence Bond Theory & Hybridisation (sp, sp2, sp3)' }, { id: 't3', title: 'Molecular Orbital Theory & Bond Order' }] },
      { id: 'sci_c11_ch10', chapterNumber: 10, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Chemical Thermodynamics: Enthalpy & Gibbs Energy', topics: [{ id: 't1', title: 'First Law, Internal Energy & Enthalpy' }, { id: 't2', title: 'Hess’s Law of Constant Heat Summation' }, { id: 't3', title: 'Entropy & Gibbs Free Energy (ΔG = ΔH - TΔS)' }] },
      { id: 'sci_c11_ch11', chapterNumber: 11, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Equilibrium: Chemical and Ionic', topics: [{ id: 't1', title: 'Law of Mass Action, Kc & Kp Relations' }, { id: 't2', title: 'Le Chatelier’s Principle' }, { id: 't3', title: 'Buffer Solutions, pH & Solubility Product (Ksp)' }] },
      { id: 'sci_c11_ch12', chapterNumber: 12, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Organic Chemistry: Basic Principles & Hydrocarbons', topics: [{ id: 't1', title: 'IUPAC Nomenclature & Structural Isomerism' }, { id: 't2', title: 'Inductive, Electromeric & Resonance Effects' }, { id: 't3', title: 'Alkanes, Alkenes, Alkynes & Aromaticity (Hückel Rule)' }] },

      // BIOLOGY (30,000 Qs)
      { id: 'sci_c11_ch13', chapterNumber: 13, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Biological Classification & Plant/Animal Kingdom', topics: [{ id: 't1', title: 'Five Kingdom Classification (Monera, Protista, Fungi, Plantae, Animalia)' }, { id: 't2', title: 'Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms' }, { id: 't3', title: 'Non-Chordata to Chordata Phyla Characteristics' }] },
      { id: 'sci_c11_ch14', chapterNumber: 14, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Cell: The Unit of Life, Biomolecules & Cell Cycle', topics: [{ id: 't1', title: 'Fluid Mosaic Model & Ultrastructure of Organelles' }, { id: 't2', title: 'Carbohydrates, Lipids, Proteins & Enzymes Activation' }, { id: 't3', title: 'Mitosis vs Meiosis Phases & Significance' }] },
      { id: 'sci_c11_ch15', chapterNumber: 15, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Plant and Human Physiology Foundations', topics: [{ id: 't1', title: 'Photosynthesis (C3, C4 Cycles) & Respiration (Glycolysis, Krebs)' }, { id: 't2', title: 'Human Breathing, Exchange of Gases & Circulation' }, { id: 't3', title: 'Excretion, Locomotion, Neural Control & Chemical Coordination' }] },
    ], 100000),
  },

  // Class 12 (100,000 Qs: 35k Physics, 35k Chemistry, 30k Biology)
  {
    classNumber: 12,
    className: 'Class 12',
    subjectCode: 'science',
    subjectName: 'Senior Secondary Science (Physics, Chemistry & Biology)',
    totalQuestionsTarget: 100000,
    chapters: allocateChapters([
      // PHYSICS (35,000 Qs)
      { id: 'sci_c12_ch01', chapterNumber: 1, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Electric Charges, Fields & Gauss’s Theorem', topics: [{ id: 't1', title: 'Coulomb’s Law in Vector Form' }, { id: 't2', title: 'Electric Field Lines & Dipole in Uniform Field' }, { id: 't3', title: 'Gauss’s Law & Applications (Wire, Sheet, Sphere)' }] },
      { id: 'sci_c12_ch02', chapterNumber: 2, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Electrostatic Potential and Capacitance', topics: [{ id: 't1', title: 'Equipotential Surfaces & Potential of Dipole' }, { id: 't2', title: 'Parallel Plate Capacitor & Dielectrics' }, { id: 't3', title: 'Energy Stored in Capacitor & Combinations' }] },
      { id: 'sci_c12_ch03', chapterNumber: 3, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Current Electricity: Kirchhoff’s Laws & Potentiometer', topics: [{ id: 't1', title: 'Drift Velocity & Ohm’s Law Microscopic Derivation' }, { id: 't2', title: 'Kirchhoff’s Rules & Wheatstone Bridge' }, { id: 't3', title: 'EMF, Internal Resistance & Meter Bridge' }] },
      { id: 'sci_c12_ch04', chapterNumber: 4, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Moving Charges, Magnetism & Electromagnetic Induction', topics: [{ id: 't1', title: 'Biot-Savart Law & Ampere’s Circuital Law' }, { id: 't2', title: 'Lorentz Force & Moving Coil Galvanometer' }, { id: 't3', title: 'Faraday’s Laws of Induction, Lenz’s Law & AC Generator' }] },
      { id: 'sci_c12_ch05', chapterNumber: 5, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Optics: Ray and Wave Optics', topics: [{ id: 't1', title: 'Total Internal Reflection & Lens Maker’s Formula' }, { id: 't2', title: 'Microscopes, Telescopes & Prism Dispersion' }, { id: 't3', title: 'Huygens’ Principle, Young’s Double Slit & Diffraction' }] },
      { id: 'sci_c12_ch06', chapterNumber: 6, disciplineCode: 'physics', disciplineName: 'Physics', title: 'Modern Physics & Semiconductor Devices', topics: [{ id: 't1', title: 'Dual Nature of Radiation & Photoelectric Equation' }, { id: 't2', title: 'Bohr’s Hydrogen Atom & Nuclear Binding Energy' }, { id: 't3', title: 'p-n Junction Diode, Rectifiers & Solar Cells' }] },

      // CHEMISTRY (35,000 Qs)
      { id: 'sci_c12_ch07', chapterNumber: 7, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Solutions: Colligative Properties & Raoult’s Law', topics: [{ id: 't1', title: 'Henry’s Law & Raoult’s Law for Ideal/Non-Ideal Solutions' }, { id: 't2', title: 'Elevation in Boiling Point & Depression in Freezing Point' }, { id: 't3', title: 'Osmotic Pressure & Van ’t Hoff Factor (i)' }] },
      { id: 'sci_c12_ch08', chapterNumber: 8, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Electrochemistry: Nernst Equation & Batteries', topics: [{ id: 't1', title: 'Galvanic Cells & Nernst Equation Derivations' }, { id: 't2', title: 'Kohlrausch’s Law & Molar Conductivity' }, { id: 't3', title: 'Faraday’s Laws of Electrolysis, Batteries & Fuel Cells' }] },
      { id: 'sci_c12_ch09', chapterNumber: 9, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Chemical Kinetics: Rate Laws & Arrhenius Equation', topics: [{ id: 't1', title: 'Rate of Reaction, Order & Molecularity' }, { id: 't2', title: 'Integrated Rate Equations for Zero & First Order' }, { id: 't3', title: 'Half-Life & Arrhenius Equation (k = Ae^(-Ea/RT))' }] },
      { id: 'sci_c12_ch10', chapterNumber: 10, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Coordination Compounds & d/f-Block Elements', topics: [{ id: 't1', title: 'Lanthanoid Contraction & Transition Metal Properties' }, { id: 't2', title: 'Werner’s Theory & IUPAC Nomenclature of Complexes' }, { id: 't3', title: 'Crystal Field Theory (CFT) & Isomerism' }] },
      { id: 'sci_c12_ch11', chapterNumber: 11, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Haloalkanes, Alcohols, Phenols & Ethers', topics: [{ id: 't1', title: 'SN1 vs SN2 Mechanisms & Stereochemistry' }, { id: 't2', title: 'Preparation & Reactions of Alcohols and Phenols (Kolbe, Reimer-Tiemann)' }, { id: 't3', title: 'Williamson Ether Synthesis & Cleavage' }] },
      { id: 'sci_c12_ch12', chapterNumber: 12, disciplineCode: 'chemistry', disciplineName: 'Chemistry', title: 'Aldehydes, Ketones, Carboxylic Acids & Amines', topics: [{ id: 't1', title: 'Nucleophilic Addition Reactions & Aldol Condensation' }, { id: 't2', title: 'Cannizzaro Reaction & Carboxylic Acid Acidity' }, { id: 't3', title: 'Diazonium Salts, Gabriel Phthalimide & Carbylamine Test' }] },

      // BIOLOGY (30,000 Qs)
      { id: 'sci_c12_ch13', chapterNumber: 13, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Reproduction in Flowering Plants & Humans', topics: [{ id: 't1', title: 'Microsporogenesis, Megasporogenesis & Double Fertilisation' }, { id: 't2', title: 'Spermatogenesis, Oogenesis & Implantation' }, { id: 't3', title: 'Parturition, Lactation & Assisted Reproductive Technology (ART)' }] },
      { id: 'sci_c12_ch14', chapterNumber: 14, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Genetics and Evolution: Molecular Basis of Inheritance', topics: [{ id: 't1', title: 'DNA Structure, Packaging & Meselson-Stahl Experiment' }, { id: 't2', title: 'Transcription, Genetic Code & Translation' }, { id: 't3', title: 'Lac Operon, Human Genome Project & Hardy-Weinberg Principle' }] },
      { id: 'sci_c12_ch15', chapterNumber: 15, disciplineCode: 'biology', disciplineName: 'Biology', title: 'Biotechnology & Ecology: Principles and Applications', topics: [{ id: 't1', title: 'Recombinant DNA Technology, Restriction Enzymes & PCR' }, { id: 't2', title: 'Bt Cotton, Insulin Production, Gene Therapy' }, { id: 't3', title: 'Population Ecology, Biodiversity Hotspots & Global Warming' }] },
    ], 100000),
  },
]

// ============================================================================
// 2. ENGLISH TAXONOMY (Grammar, Reading Comprehension & Literature) — 600,000 Qs
// Cl 4-8: 40,000/class (200,000 total)
// Cl 9-12: 100,000/class (400,000 total across Grammar, Reading & Literature)
// ============================================================================
export const ENGLISH_CLASSES_TAXONOMY: UniversalClassTaxonomy[] = [
  ...[4, 5, 6, 7, 8].map((c) => ({
    classNumber: c,
    className: `Class ${c}`,
    subjectCode: 'english' as SubjectCode,
    subjectName: 'English Language & Reading',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: `eng_c${c}_ch01`, chapterNumber: 1, title: 'Nouns: Proper, Common, Collective, Abstract & Countable', topics: [{ id: 't1', title: 'Noun Types & Capitalisation' }, { id: 't2', title: 'Singular & Plural Irregular Rules' }, { id: 't3', title: 'Possessive Nouns & Gender' }] },
      { id: `eng_c${c}_ch02`, chapterNumber: 2, title: 'Pronouns: Personal, Possessive, Reflexive & Demonstrative', topics: [{ id: 't1', title: 'Subject vs Object Pronouns' }, { id: 't2', title: 'Relative Pronouns (Who, Which, That)' }, { id: 't3', title: 'Pronoun-Antecedent Agreement' }] },
      { id: `eng_c${c}_ch03`, chapterNumber: 3, title: 'Verbs: Regular, Irregular, Transitive & Intransitive', topics: [{ id: 't1', title: 'Action Verbs vs State/Linking Verbs' }, { id: 't2', title: 'Transitive & Intransitive Objects' }, { id: 't3', title: 'Auxiliary Verbs (Do, Be, Have)' }] },
      { id: `eng_c${c}_ch04`, chapterNumber: 4, title: 'Tenses: Simple, Continuous & Perfect Tenses', topics: [{ id: 't1', title: 'Simple Present, Past & Future' }, { id: 't2', title: 'Continuous/Progressive Tenses' }, { id: 't3', title: 'Present & Past Perfect Aspect' }] },
      { id: `eng_c${c}_ch05`, chapterNumber: 5, title: 'Adjectives: Degrees of Comparison & Order', topics: [{ id: 't1', title: 'Descriptive, Quantitative & Demonstrative Adjectives' }, { id: 't2', title: 'Positive, Comparative & Superlative Degrees' }, { id: 't3', title: 'Order of Multiple Adjectives' }] },
      { id: `eng_c${c}_ch06`, chapterNumber: 6, title: 'Adverbs: Manner, Time, Place, Frequency & Degree', topics: [{ id: 't1', title: 'Adverbs of Manner (-ly rules)' }, { id: 't2', title: 'Adverbs of Frequency & Position in Sentence' }, { id: 't3', title: 'Adverbs vs Adjectives Distinction' }] },
      { id: `eng_c${c}_ch07`, chapterNumber: 7, title: 'Prepositions: Time, Place & Direction', topics: [{ id: 't1', title: 'Prepositions of Time (In, On, At)' }, { id: 't2', title: 'Prepositions of Place (Under, Above, Between, Among)' }, { id: 't3', title: 'Prepositional Phrases' }] },
      { id: `eng_c${c}_ch08`, chapterNumber: 8, title: 'Conjunctions: Coordinating & Subordinating', topics: [{ id: 't1', title: 'FANBOYS Coordinating Conjunctions' }, { id: 't2', title: 'Subordinating Conjunctions (Although, Because, Since)' }, { id: 't3', title: 'Correlative Conjunctions (Either/Or, Neither/Nor)' }] },
      { id: `eng_c${c}_ch09`, chapterNumber: 9, title: 'Vocabulary: Synonyms, Antonyms, Prefixes & Suffixes', topics: [{ id: 't1', title: 'Contextual Synonyms & Antonyms' }, { id: 't2', title: 'Root Words, Prefixes (Un-, Dis-, Re-) & Suffixes' }, { id: 't3', title: 'Homophones, Homonyms & Collocations' }] },
      { id: `eng_c${c}_ch10`, chapterNumber: 10, title: 'Reading Comprehension & Inferences', topics: [{ id: 't1', title: 'Identifying Main Idea & Supporting Details' }, { id: 't2', title: 'Contextual Vocabulary & Fact vs Opinion' }, { id: 't3', title: 'Author Purpose & Logical Inferences' }] },
    ], 40000),
  })),

  // Classes 9-12 (100,000 Qs each = 400,000 Qs across Advanced Grammar, Syntax, Writing & Literature)
  ...[9, 10, 11, 12].map((c) => ({
    classNumber: c,
    className: `Class ${c}`,
    subjectCode: 'english' as SubjectCode,
    subjectName: 'Secondary & Senior Secondary English Language & Literature',
    totalQuestionsTarget: 100000,
    chapters: allocateChapters([
      // ADVANCED GRAMMAR (40,000 Qs)
      { id: `eng_c${c}_ch01`, chapterNumber: 1, disciplineCode: 'grammar', disciplineName: 'Grammar & Syntax', title: 'Tenses and Aspect: Advanced Temporal Sequences', topics: [{ id: 't1', title: 'Past Perfect vs Simple Past in Complex Narratives' }, { id: 't2', title: 'Future Perfect Continuous & Time Markers' }, { id: 't3', title: 'Conditional Sentences (Zero, First, Second, Third & Mixed)' }, { id: 't4', title: 'Subjunctive Mood & Inverted Conditionals' }] },
      { id: `eng_c${c}_ch02`, chapterNumber: 2, disciplineCode: 'grammar', disciplineName: 'Grammar & Syntax', title: 'Reported Speech: Direct & Indirect Discourse', topics: [{ id: 't1', title: 'Backshift Rules for Statements & Questions' }, { id: 't2', title: 'Reporting Imperatives, Suggestions & Exclamations' }, { id: 't3', title: 'Reporting Verbs with Inherent Prepositions (Insist on, Apologise for)' }, { id: 't4', title: 'Dialogue Punctuation & Indirect Questions' }] },
      { id: `eng_c${c}_ch03`, chapterNumber: 3, disciplineCode: 'grammar', disciplineName: 'Grammar & Syntax', title: 'Active and Passive Voice: Transformations & Ergative Verbs', topics: [{ id: 't1', title: 'Voice Conversion with Complex Objects & Prepositional Verbs' }, { id: 't2', title: 'Impersonal Passive Constructions (It is said that...)' }, { id: 't3', title: 'Passive with Modals & Infinitives' }, { id: 't4', title: 'Stylistic Appropriateness of Passive in Academic Contexts' }] },
      { id: `eng_c${c}_ch04`, chapterNumber: 4, disciplineCode: 'grammar', disciplineName: 'Grammar & Syntax', title: 'Subject-Verb Concord (Agreement) & Complex Nominals', topics: [{ id: 't1', title: 'Compound Subjects with As Well As, Together With, Accompanied By' }, { id: 't2', title: 'Collective Nouns, Expressions of Quantity & Pluralia Tantum' }, { id: 't3', title: 'Neither...Nor / Either...Or Rule of Proximity' }, { id: 't4', title: 'Inverted Sentence Word Order Agreement' }] },
      { id: `eng_c${c}_ch05`, chapterNumber: 5, disciplineCode: 'grammar', disciplineName: 'Grammar & Syntax', title: 'Clauses: Noun, Relative, Adverbial & Synthesis', topics: [{ id: 't1', title: 'Defining vs Non-Defining Relative Clauses' }, { id: 't2', title: 'Noun Clauses as Subjects, Objects & Complements' }, { id: 't3', title: 'Adverbial Clauses of Concession, Condition & Reason' }, { id: 't4', title: 'Sentence Synthesis: Simple, Compound & Complex Transformations' }] },
      { id: `eng_c${c}_ch06`, chapterNumber: 6, disciplineCode: 'grammar', disciplineName: 'Grammar & Syntax', title: 'Error Detection, Sentence Correction & Editing', topics: [{ id: 't1', title: 'Dangling Modifiers & Faulty Parallelism' }, { id: 't2', title: 'Misplaced Adverbs, Pronoun Ambiguity & Split Infinitives' }, { id: 't3', title: 'Redundancy, Wordiness & Double Negatives' }, { id: 't4', title: 'Omission and Insertion of Articles & Determiners' }] },

      // READING COMPREHENSION & VOCABULARY (30,000 Qs)
      { id: `eng_c${c}_ch07`, chapterNumber: 7, disciplineCode: 'reading', disciplineName: 'Reading & Vocabulary', title: 'Discursive & Analytical Reading Passages', topics: [{ id: 't1', title: 'Identifying Main Thesis, Sub-Arguments & Structure' }, { id: 't2', title: 'Contextual Word Inference & Polysemy' }, { id: 't3', title: 'Tone, Attitude & Bias Detection (Objective, Sarcastic, Didactic)' }, { id: 't4', title: 'Summary Generation & Core Claim Extraction' }] },
      { id: `eng_c${c}_ch08`, chapterNumber: 8, disciplineCode: 'reading', disciplineName: 'Reading & Vocabulary', title: 'Case-Based & Data-Oriented Factual Comprehension', topics: [{ id: 't1', title: 'Interpreting Infographics, Charts & Qualitative Passages' }, { id: 't2', title: 'Correlating Textual Evidence with Empirical Data' }, { id: 't3', title: 'Logical Fallacies in Argumentative Texts' }, { id: 't4', title: 'Comparing Perspectives in Paired Excerpts' }] },
      { id: `eng_c${c}_ch09`, chapterNumber: 9, disciplineCode: 'reading', disciplineName: 'Reading & Vocabulary', title: 'Advanced Lexis: Idioms, Phrasal Verbs & Collocations', topics: [{ id: 't1', title: 'Academic Collocations & Formal Register' }, { id: 't2', title: 'Figurative Idioms & Contextual Pragmatics' }, { id: 't3', title: 'Separable vs Inseparable Phrasal Verbs' }, { id: 't4', title: 'Etymology, Latin/Greek Roots & Foreign Loanwords' }] },

      // WRITING SKILLS & LITERATURE (30,000 Qs)
      { id: `eng_c${c}_ch10`, chapterNumber: 10, disciplineCode: 'writing', disciplineName: 'Writing & Rhetoric', title: 'Formal Writing: Analytical Essays, Reports & Letters', topics: [{ id: 't1', title: 'Editorial & Complaint Letter Formats and Registers' }, { id: 't2', title: 'Analytical Paragraph Formulation Based on Prompts' }, { id: 't3', title: 'Article & Speech Writing: Rhetorical Devices' }, { id: 't4', title: 'Formal Invitations, Replies & Notices' }] },
      { id: `eng_c${c}_ch11`, chapterNumber: 11, disciplineCode: 'literature', disciplineName: 'Literature', title: 'Poetic Devices & Literary Criticism', topics: [{ id: 't1', title: 'Metaphor, Simile, Personification & Synecdoche' }, { id: 't2', title: 'Alliteration, Assonance, Consonance & Onomatopoeia' }, { id: 't3', title: 'Irony (Dramatic, Situational, Verbal) & Hyperbole' }, { id: 't4', title: 'Meter, Rhyme Schemes, Blank Verse & Stanzaic Forms' }] },
      { id: `eng_c${c}_ch12`, chapterNumber: 12, disciplineCode: 'literature', disciplineName: 'Literature', title: 'Dramatic & Prose Textual Analysis', topics: [{ id: 't1', title: 'Character Arc & Motivation Analysis' }, { id: 't2', title: 'Thematic Exploration: Colonialism, Identity, Morality, Social Justice' }, { id: 't3', title: 'Narrative Voice (First vs Third Person Omniscient/Limited)' }, { id: 't4', title: 'Critical Evaluation of Classical & Modern Excerpts' }] },
    ], 100000),
  })),
]

// ============================================================================
// 3. HINDI TAXONOMY (व्याकरण, बोध एवं साहित्य) — 600,000 Questions
// Cl 4-8: 40,000/class (200,000 total)
// Cl 9-12: 100,000/class (400,000 total across व्याकरण, काव्य एवं गद्य साहित्य)
// ============================================================================
export const HINDI_CLASSES_TAXONOMY: UniversalClassTaxonomy[] = [
  ...[4, 5, 6, 7, 8].map((c) => ({
    classNumber: c,
    className: `Class ${c}`,
    subjectCode: 'hindi' as SubjectCode,
    subjectName: 'हिंदी भाषा एवं व्याकरण',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: `hin_c${c}_ch01`, chapterNumber: 1, title: 'भाषा, लिपि, बोली और मानक वर्णमाला', topics: [{ id: 't1', title: 'स्वर, व्यंजन, अनुस्वार व अनुनासिक' }, { id: 't2', title: 'संयुक्त व्यंजन व द्वित्व व्यंजन' }, { id: 't3', title: 'देवनागरी लिपि व वर्ण-विच्छेद' }] },
      { id: `hin_c${c}_ch02`, chapterNumber: 2, title: 'संज्ञा एवं उसके भेद (व्यक्तिवाचक, जातिवाचक, भाववाचक)', topics: [{ id: 't1', title: 'संज्ञा के तीन प्रमुख भेद' }, { id: 't2', title: 'भाववाचक संज्ञा बनाना' }, { id: 't3', title: 'द्रव्यवाचक व समूहवाचक संज्ञा' }] },
      { id: `hin_c${c}_ch03`, chapterNumber: 3, title: 'लिंग और वचन के नियम व परिवर्तन', topics: [{ id: 't1', title: 'पुल्लिंग से स्त्रीलिंग बनाने के नियम' }, { id: 't2', title: 'एकवचन व बहुवचन परिवर्तन' }, { id: 't3', title: 'सदा एकवचन व सदा बहुवचन शब्द' }] },
      { id: `hin_c${c}_ch04`, chapterNumber: 4, title: 'सर्वनाम एवं उसके भेद', topics: [{ id: 't1', title: 'पुरुषवाचक सर्वनाम (उत्तम, मध्यम, अन्य)' }, { id: 't2', title: 'निश्चयवाचक, अनिश्चयवाचक व संबंधवाचक' }, { id: 't3', title: 'प्रश्नवाचक व निजवाचक सर्वनाम' }] },
      { id: `hin_c${c}_ch05`, chapterNumber: 5, title: 'विशेषण: भेद एवं प्राविशेषण', topics: [{ id: 't1', title: 'गुणवाचक, संख्यावाचक व परिमाणवाचक' }, { id: 't2', title: 'सार्वनामिक विशेषण' }, { id: 't3', title: 'विशेषण की तुलनात्मक अवस्थाएं' }] },
      { id: `hin_c${c}_ch06`, chapterNumber: 6, title: 'क्रिया: सकर्मक, अकर्मक व काल', topics: [{ id: 't1', title: 'सकर्मक व अकर्मक क्रिया की पहचान' }, { id: 't2', title: 'भूतकाल, वर्तमान काल व भविष्यत काल' }, { id: 't3', title: 'संयुक्त क्रिया व सहायक क्रिया' }] },
      { id: `hin_c${c}_ch07`, chapterNumber: 7, title: 'कारक एवं परसर्ग (विभक्ति चिह्न)', topics: [{ id: 't1', title: 'कर्ता, कर्म, करण व संप्रदान कारक' }, { id: 't2', title: 'अपादान, संबंध, अधिकरण व संबोधन' }, { id: 't3', title: 'परसर्गों का सही वाक्य प्रयोग' }] },
      { id: `hin_c${c}_ch08`, chapterNumber: 8, title: 'शब्द भंडार: विलोम, पर्यायवाची व अनेक शब्दों के लिए एक शब्द', topics: [{ id: 't1', title: 'समानार्थी / पर्यायवाची शब्द' }, { id: 't2', title: 'विलोम / विपरीतार्थक शब्द' }, { id: 't3', title: 'वाक्यांश के लिए एक शब्द व श्रुतिसम भिन्नार्थक' }] },
      { id: `hin_c${c}_ch09`, chapterNumber: 9, title: 'मुहावरे और लोकोक्तियाँ', topics: [{ id: 't1', title: 'प्रचलित मुहावरे व अर्थ' }, { id: 't2', title: 'वाक्य प्रयोग द्वारा मुहावरा स्पष्टीकरण' }, { id: 't3', title: 'नीतिपरक लोकोक्तियाँ व उनका संदर्भ' }] },
      { id: `hin_c${c}_ch10`, chapterNumber: 10, title: 'अपठित गद्यांश एवं व्यावहारिक बोध', topics: [{ id: 't1', title: 'गद्यांश का मूल भाव समझना' }, { id: 't2', title: 'शीर्षक चयन व प्रश्नोत्तर' }, { id: 't3', title: 'कठिन शब्दों के प्रसंगानुसार अर्थ' }] },
    ], 40000),
  })),

  // Classes 9-12 (100,000 Qs each = 400,000 Qs across मानक व्याकरण, रस-छंद-अलंकार, पद परिचय व साहित्य)
  ...[9, 10, 11, 12].map((c) => ({
    classNumber: c,
    className: `Class ${c}`,
    subjectCode: 'hindi' as SubjectCode,
    subjectName: 'माध्यमिक एवं उच्च माध्यमिक हिंदी (व्याकरण, बोध एवं साहित्य)',
    totalQuestionsTarget: 100000,
    chapters: allocateChapters([
      // व्याकरण (45,000 Qs)
      { id: `hin_c${c}_ch01`, chapterNumber: 1, disciplineCode: 'vyakaran', disciplineName: 'हिंदी व्याकरण', title: 'संधि: स्वर, व्यंजन एवं विसर्ग संधि के सूत्र व नियम', topics: [{ id: 't1', title: 'दीर्घ, गुण, वृद्धि, यण व अयादि स्वर संधि' }, { id: 't2', title: 'व्यंजन संधि के प्रमुख 14 नियम' }, { id: 't3', title: 'विसर्ग संधि के परिवर्तन नियम' }, { id: 't4', title: 'संधि-विच्छेद एवं पहचान' }] },
      { id: `hin_c${c}_ch02`, chapterNumber: 2, disciplineCode: 'vyakaran', disciplineName: 'हिंदी व्याकरण', title: 'समास: अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वंद्व व बहुव्रीहि', topics: [{ id: 't1', title: 'तत्पुरुष समास के कारक-आधारित भेद' }, { id: 't2', title: 'कर्मधारय बनाम बहुव्रीहि समास का अंतर' }, { id: 't3', title: 'द्विगु व द्वंद्व समास की विशेषताएं' }, { id: 't4', title: 'समस्त पद रचना एवं समास विग्रह' }] },
      { id: `hin_c${c}_ch03`, chapterNumber: 3, disciplineCode: 'vyakaran', disciplineName: 'हिंदी व्याकरण', title: 'उपसर्ग, प्रत्यय एवं शब्द निर्माण', topics: [{ id: 't1', title: 'संस्कृत (तत्सम), हिंदी व आगत उपसर्ग' }, { id: 't2', title: 'कृदंत (कृत) प्रत्यय व तद्धित प्रत्यय' }, { id: 't3', title: 'मूल शब्द और उपसर्ग-प्रत्यय का पृथक्करण' }, { id: 't4', title: 'एक साथ उपसर्ग व प्रत्यय का प्रयोग' }] },
      { id: `hin_c${c}_ch04`, chapterNumber: 4, disciplineCode: 'vyakaran', disciplineName: 'हिंदी व्याकरण', title: 'वाक्य भेद: रचना के आधार पर (सरल, संयुक्त, मिश्र) व रूपांतरण', topics: [{ id: 't1', title: 'उद्देश्य और विधेय की पहचान' }, { id: 't2', title: 'सरल, संयुक्त व मिश्र वाक्य की पहचान' }, { id: 't3', title: 'प्रधान उपवाक्य व आश्रित उपवाक्य (संज्ञा, विशेषण, क्रियाविशेषण)' }, { id: 't4', title: 'वाक्य रूपांतरण अभ्यास' }] },
      { id: `hin_c${c}_ch05`, chapterNumber: 5, disciplineCode: 'vyakaran', disciplineName: 'हिंदी व्याकरण', title: 'पद परिचय (Morphosyntactic Word Parsing)', topics: [{ id: 't1', title: 'संज्ञा, सर्वनाम व विशेषण पदों का व्याकरणिक परिचय' }, { id: 't2', title: 'क्रिया, काल, वाच्य व लिंग-वचन निर्धारण' }, { id: 't3', title: 'क्रियाविशेषण व अव्यय पदों का परिचय' }, { id: 't4', title: 'वाक्य में पदों का परस्पर संबंध निर्धारण' }] },
      { id: `hin_c${c}_ch06`, chapterNumber: 6, disciplineCode: 'vyakaran', disciplineName: 'हिंदी व्याकरण', title: 'अलंकार: शब्दालंकार (अनुप्रास, यमक, श्लेष) व अर्थालंकार', topics: [{ id: 't1', title: 'अनुप्रास, यमक, श्लेष व वक्रोक्ति' }, { id: 't2', title: 'उपमा, रूपक, उत्प्रेक्षा व अतिशयोक्ति' }, { id: 't3', title: 'मानवीकरण व अन्योक्ति अलंकार' }, { id: 't4', title: 'काव्य पंक्तियों में अलंकार पहचान' }] },
      { id: `hin_c${c}_ch07`, chapterNumber: 7, disciplineCode: 'vyakaran', disciplineName: 'हिंदी व्याकरण', title: 'रस सिद्धांत एवं रस के नौ स्थायी भाव व अंग', topics: [{ id: 't1', title: 'विभाव (आलंबन, उद्दीपन), अनुभाव व संचारी भाव' }, { id: 't2', title: 'शृंगार, हास्य, करुण, रौद्र व वीर रस' }, { id: 't3', title: 'भयानक, वीभत्स, अद्भुत, शांत व वात्सल्य रस' }, { id: 't4', title: 'काव्य पंक्तियों से रस निष्पत्ति' }] },

      // बोध एवं रचनात्मक लेखन (25,000 Qs)
      { id: `hin_c${c}_ch08`, chapterNumber: 8, disciplineCode: 'bodh', disciplineName: 'अपठित बोध', title: 'अपठित गद्यांश एवं काव्यांश: आलोचनात्मक व्याख्या', topics: [{ id: 't1', title: 'गद्यांश के केंद्रीय विचार व सूक्ष्म प्रश्न' }, { id: 't2', title: 'काव्यांश का भाव सौंदर्य व शिल्प सौंदर्य' }, { id: 't3', title: 'प्रतीकात्मक अर्थ व जीवन मूल्य' }, { id: 't4', title: 'शीर्षक चयन की सार्थकता' }] },
      { id: `hin_c${c}_ch09`, chapterNumber: 9, disciplineCode: 'bodh', disciplineName: 'रचनात्मक लेखन', title: 'रचनात्मक लेखन: अनुच्छेद, पत्र, संवाद व सूचना लेखन', topics: [{ id: 't1', title: 'समसामयिक विषयों पर अनुच्छेद लेखन' }, { id: 't2', title: 'औपचारिक व कार्यालयी पत्र प्रारूप' }, { id: 't3', title: 'संवाद लेखन व विषयवस्तु का विकास' }, { id: 't4', title: 'विज्ञापन व ई-मेल लेखन तकनीक' }] },

      // काव्य एवं गद्य साहित्य (30,000 Qs)
      { id: `hin_c${c}_ch10`, chapterNumber: 10, disciplineCode: 'sahitya', disciplineName: 'साहित्य', title: 'भक्तिकाल एवं रीतिकाल काव्य परंपरा', topics: [{ id: 't1', title: 'कबीर की साखियां व निर्गुण भक्ति भाव' }, { id: 't2', title: 'सूरदास के पद व बाल लीला वर्णन' }, { id: 't3', title: 'तुलसीदास: रामचरितमानस चौपाई व नीति दोहे' }, { id: 't4', title: 'रसखान के सवैये व मीराबाई की पदावली' }] },
      { id: `hin_c${c}_ch11`, chapterNumber: 11, disciplineCode: 'sahitya', disciplineName: 'साहित्य', title: 'आधुनिक छायावादी एवं प्रगतिवादी कविता', topics: [{ id: 't1', title: 'जयशंकर प्रसाद, सूर्यकांत त्रिपाठी निराला' }, { id: 't2', title: 'सुमित्रानंदन पंत व महादेवी वर्मा का विरह भाव' }, { id: 't3', title: 'रामधारी सिंह दिनकर का राष्ट्रप्रेम व ओज' }, { id: 't4', title: 'हरिवंश राय बच्चन की हालावादी दृष्टि' }] },
      { id: `hin_c${c}_ch12`, chapterNumber: 12, disciplineCode: 'sahitya', disciplineName: 'साहित्य', title: 'आधुनिक गद्य विधाएं: कहानी, उपन्यास, निबंध व व्यंग्य', topics: [{ id: 't1', title: 'मुंशी प्रेमचंद की यथार्थवादी कहानियां' }, { id: 't2', title: 'हरिशंकर परसाई के सामाजिक व्यंग्य' }, { id: 't3', title: 'रेखाचित्र, संस्मरण व यात्रा वृत्तांत' }, { id: 't4', title: 'पात्र चरित्र-चित्रण व उद्देश्य मीमांसा' }] },
    ], 100000),
  })),
]

// ============================================================================
// 4. SOCIAL SCIENCE TAXONOMY (History, Geography, Civics, Economics) — 600,000 Qs
// Cl 4-8: 40,000/class (200,000 total)
// Cl 9-12: 100,000/class (400,000 total across History, Geography, Civics & Economics)
// ============================================================================
export const SOCIAL_SCIENCE_CLASSES_TAXONOMY: UniversalClassTaxonomy[] = [
  ...[4, 5, 6, 7, 8].map((c) => ({
    classNumber: c,
    className: `Class ${c}`,
    subjectCode: 'social_science' as SubjectCode,
    subjectName: 'Social Studies Foundation',
    totalQuestionsTarget: 40000,
    chapters: allocateChapters([
      { id: `sst_c${c}_ch01`, chapterNumber: 1, title: 'The Story of Early Humans & River Valley Civilizations', topics: [{ id: 't1', title: 'Paleolithic to Neolithic Tool Revolution' }, { id: 't2', title: 'Indus Valley Civilization Town Planning & Seals' }, { id: 't3', title: 'Mesopotamian, Egyptian & Chinese River Civilizations' }] },
      { id: `sst_c${c}_ch02`, chapterNumber: 2, title: 'Maps, Globes, Longitudes and Latitudes', topics: [{ id: 't1', title: 'Parallels of Latitude (Equator, Tropics, Arctic)' }, { id: 't2', title: 'Meridians of Longitude & Time Zones (GMT / IST)' }, { id: 't3', title: 'Grid System, Scale & Cardinal Directions' }] },
      { id: `sst_c${c}_ch03`, chapterNumber: 3, title: 'Physical Divisions of India & Major Landforms', topics: [{ id: 't1', title: 'The Great Himalayan Range & Passes' }, { id: 't2', title: 'Northern Alluvial Plains & Peninsular Plateau' }, { id: 't3', title: 'Coastal Plains & Island Groups (Andaman & Lakshadweep)' }] },
      { id: `sst_c${c}_ch04`, chapterNumber: 4, title: 'Climate, Weather & Natural Vegetation of the Earth', topics: [{ id: 't1', title: 'Torrid, Temperate & Frigid Heat Zones' }, { id: 't2', title: 'Tropical Rainforests, Deciduous & Coniferous Forests' }, { id: 't3', title: 'Grasslands (Savanna, Prairies, Steppes)' }] },
      { id: `sst_c${c}_ch05`, chapterNumber: 5, title: 'Early Kingdoms, Ashoka and the Maurya Empire', topics: [{ id: 't1', title: 'Janapadas & Mahajanapadas (Magadha Rise)' }, { id: 't2', title: 'Chandragupta Maurya & Chanakya’s Arthashastra' }, { id: 't3', title: 'Emperor Ashoka, Kalinga War & Dhamma Edicts' }] },
      { id: `sst_c${c}_ch06`, chapterNumber: 6, title: 'The Medieval Era: Delhi Sultanate & Mughal Dynasty', topics: [{ id: 't1', title: 'Qutbuddin Aibak, Iltutmish & Alauddin Khilji' }, { id: 't2', title: 'Akbar’s Sulh-i-Kul & Mansabdari Administrative System' }, { id: 't3', title: 'Mughal Architecture (Taj Mahal, Red Fort) & Decline' }] },
      { id: `sst_c${c}_ch07`, chapterNumber: 7, title: 'Our Constitution, Fundamental Rights & Duties', topics: [{ id: 't1', title: 'Constituent Assembly & Dr. B.R. Ambedkar' }, { id: 't2', title: 'Six Fundamental Rights in the Indian Constitution' }, { id: 't3', title: 'Preamble Principles (Sovereign, Socialist, Secular, Democratic Republic)' }] },
      { id: `sst_c${c}_ch08`, chapterNumber: 8, title: 'Organs of Democratic Government: Legislature, Executive & Judiciary', topics: [{ id: 't1', title: 'Parliament (Lok Sabha & Rajya Sabha Law Making)' }, { id: 't2', title: 'President, Prime Minister & Council of Ministers' }, { id: 't3', title: 'Supreme Court, High Courts & Rule of Law' }] },
      { id: `sst_c${c}_ch09`, chapterNumber: 9, title: 'Local Self-Government: Panchayati Raj & Municipalities', topics: [{ id: 't1', title: 'Gram Sabha, Gram Panchayat & Nyaya Panchayat' }, { id: 't2', title: 'Panchayat Samiti & Zila Parishad' }, { id: 't3', title: 'Municipal Corporations, Mayor & City Sanitation' }] },
      { id: `sst_c${c}_ch10`, chapterNumber: 10, title: 'Livelihoods, Markets and Trade', topics: [{ id: 't1', title: 'Rural Livelihoods: Farming, Agricultural Labor & Fishing' }, { id: 't2', title: 'Urban Livelihoods: Street Vendors, Factories & Offices' }, { id: 't3', title: 'Weekly Markets vs Shopping Complexes & Wholesale Chains' }] },
    ], 40000),
  })),

  // Classes 9-12 (100,000 Qs each = 400,000 Qs across History, Geography, Civics & Economics)
  ...[9, 10, 11, 12].map((c) => ({
    classNumber: c,
    className: `Class ${c}`,
    subjectCode: 'social_science' as SubjectCode,
    subjectName: 'Secondary & Senior Social Sciences (History, Geography, Civics & Economics)',
    totalQuestionsTarget: 100000,
    chapters: allocateChapters([
      // HISTORY (25,000 Qs)
      { id: `sst_c${c}_ch01`, chapterNumber: 1, disciplineCode: 'history', disciplineName: 'History', title: 'The French Revolution & Rise of Modern Democratic Ideals', topics: [{ id: 't1', title: 'Old Regime Estates System & Storming of the Bastille' }, { id: 't2', title: 'Declaration of Rights of Man & Reign of Terror (Robespierre)' }, { id: 't3', title: 'Directory Rule & Rise of Napoleon Bonaparte' }, { id: 't4', title: 'Abolition of Slavery & Global Legacy of 1789' }] },
      { id: `sst_c${c}_ch02`, chapterNumber: 2, disciplineCode: 'history', disciplineName: 'History', title: 'Socialism in Europe & The Russian Revolution (1917)', topics: [{ id: 't1', title: 'Liberals, Radicals, Conservatives & Industrial Changes' }, { id: 't2', title: '1905 Revolution, Bloody Sunday & Duma Formation' }, { id: 't3', title: 'February & October Revolutions (Lenin & Bolsheviks)' }, { id: 't4', title: 'Civil War, Stalin’s Collectivisation & Global Impact' }] },
      { id: `sst_c${c}_ch03`, chapterNumber: 3, disciplineCode: 'history', disciplineName: 'History', title: 'Nationalism in India: Non-Cooperation to Civil Disobedience', topics: [{ id: 't1', title: 'First World War Impact, Rowlatt Act & Jallianwala Bagh' }, { id: 't2', title: 'Khilafat Movement & Non-Cooperation Dimensions' }, { id: 't3', title: 'Salt March (Dandi) & Civil Disobedience Movement' }, { id: 't4', title: 'Sense of Collective Belonging (Bharat Mata, Folklore, Tricolour)' }] },
      { id: `sst_c${c}_ch04`, chapterNumber: 4, disciplineCode: 'history', disciplineName: 'History', title: 'The Making of a Global World & Age of Industrialisation', topics: [{ id: 't1', title: 'Ancient Silk Routes, Food Journeys & Conquest/Disease' }, { id: 't2', title: '19th Century World Economy (Corn Laws, Indentured Labor)' }, { id: 't3', title: 'Inter-War Great Depression (1929) & Bretton Woods System' }, { id: 't4', title: 'Proto-Industrialisation to Factory Production & Steam Power' }] },

      // GEOGRAPHY (25,000 Qs)
      { id: `sst_c${c}_ch05`, chapterNumber: 5, disciplineCode: 'geography', disciplineName: 'Geography', title: 'Resources and Development: Land, Soil & Conservation', topics: [{ id: 't1', title: 'Classification of Resources (Biotic, Abiotic, Renewable, Non-renewable)' }, { id: 't2', title: 'Resource Planning in India & Sustainable Development (Rio Summit)' }, { id: 't3', title: 'Land Use Patterns, Degradation & Conservation Measures' }, { id: 't4', title: 'Soil Types of India (Alluvial, Black, Red, Laterite, Arid)' }] },
      { id: `sst_c${c}_ch06`, chapterNumber: 6, disciplineCode: 'geography', disciplineName: 'Geography', title: 'Water Resources & Multipurpose River Valley Projects', topics: [{ id: 't1', title: 'Water Scarcity & Quantitative/Qualitative Stress' }, { id: 't2', title: 'Multipurpose River Valley Projects: Pros & Environmental Criticisms' }, { id: 't3', title: 'Traditional Rainwater Harvesting Methods (Guls, Kuls, Tankas, Khadins)' }, { id: 't4', title: 'Integrated Water Resources Management (IWRM)' }] },
      { id: `sst_c${c}_ch07`, chapterNumber: 7, disciplineCode: 'geography', disciplineName: 'Geography', title: 'Agriculture: Cropping Patterns & Agrarian Reforms', topics: [{ id: 't1', title: 'Primitive Subsistence, Intensive Subsistence & Commercial Farming' }, { id: 't2', title: 'Cropping Seasons (Rabi, Kharif, Zaid) & Major Food Crops' }, { id: 't3', title: 'Commercial & Cash Crops (Sugarcane, Tea, Coffee, Cotton, Jute)' }, { id: 't4', title: 'Technological & Institutional Reforms (Bhoodan-Gramdan, Green Revolution)' }] },
      { id: `sst_c${c}_ch08`, chapterNumber: 8, disciplineCode: 'geography', disciplineName: 'Geography', title: 'Minerals, Energy Resources & Manufacturing Industries', topics: [{ id: 't1', title: 'Ferrous & Non-Ferrous Minerals (Iron Ore, Manganese, Copper, Bauxite)' }, { id: 't2', title: 'Conventional vs Non-Conventional Energy (Solar, Wind, Nuclear, Biogas)' }, { id: 't3', title: 'Industrial Location Factors & Agro-Based vs Mineral-Based Industries' }, { id: 't4', title: 'Iron & Steel, Aluminium, Chemical & IT Industries' }] },

      // POLITICAL SCIENCE / CIVICS (25,000 Qs)
      { id: `sst_c${c}_ch09`, chapterNumber: 9, disciplineCode: 'political_science', disciplineName: 'Political Science', title: 'Power Sharing and Federalism: Constitutional Architecture', topics: [{ id: 't1', title: 'Case Studies: Belgium (Prudential Sharing) vs Sri Lanka (Majoritarianism)' }, { id: 't2', title: 'Forms of Power Sharing (Horizontal, Vertical, Social Groups)' }, { id: 't3', title: 'What Makes India a Federal Country? (Union, State, Concurrent Lists)' }, { id: 't4', title: 'Decentralisation in India (73rd & 74th Constitutional Amendments)' }] },
      { id: `sst_c${c}_ch10`, chapterNumber: 10, disciplineCode: 'political_science', disciplineName: 'Political Science', title: 'Gender, Religion, Caste & Social Divisions', topics: [{ id: 't1', title: 'Public/Private Division of Labor & Women’s Political Representation' }, { id: 't2', title: 'Communalism: Politics, Ideology & Secular State Safeguards' }, { id: 't3', title: 'Caste in Politics vs Politics in Caste' }, { id: 't4', title: 'Constitutional Protections Against Discrimination' }] },
      { id: `sst_c${c}_ch11`, chapterNumber: 11, disciplineCode: 'political_science', disciplineName: 'Political Science', title: 'Political Parties: Functions, National/State Parties & Reforms', topics: [{ id: 't1', title: 'Why Do We Need Political Parties? (Functions & Necessities)' }, { id: 't2', title: 'One-Party, Two-Party & Multi-Party Coalition Systems' }, { id: 't3', title: 'Criteria for Recognized National and State Parties in India' }, { id: 't4', title: 'Challenges to Political Parties & Electoral Reforms (Anti-Defection, Affidavit)' }] },
      { id: `sst_c${c}_ch12`, chapterNumber: 12, disciplineCode: 'political_science', disciplineName: 'Political Science', title: 'Outcomes and Challenges of Democracy', topics: [{ id: 't1', title: 'Accountable, Responsive and Legitimate Governance' }, { id: 't2', title: 'Economic Growth, Reduction of Inequality & Poverty' }, { id: 't3', title: 'Accommodation of Social Diversity & Dignity of Citizens' }, { id: 't4', title: 'Deepening of Democracy & Citizen Empowerment' }] },

      // ECONOMICS (25,000 Qs)
      { id: `sst_c${c}_ch13`, chapterNumber: 13, disciplineCode: 'economics', disciplineName: 'Economics', title: 'Development: National Income, HDI & Sustainability', topics: [{ id: 't1', title: 'What Development Promises: Conflicting & Different Goals' }, { id: 't2', title: 'Income and Other Criteria (Per Capita Income, Infant Mortality Rate)' }, { id: 't3', title: 'Human Development Index (UNDP HDI Indicators)' }, { id: 't4', title: 'Sustainability of Development & Groundwater Depletion' }] },
      { id: `sst_c${c}_ch14`, chapterNumber: 14, disciplineCode: 'economics', disciplineName: 'Economics', title: 'Sectors of the Indian Economy: Primary, Secondary & Tertiary', topics: [{ id: 't1', title: 'GDP Contribution vs Employment Share Across Sectors' }, { id: 't2', title: 'Disguised Unemployment in Agriculture & Creation of Rural Jobs (MGNREGA)' }, { id: 't3', title: 'Organised vs Unorganised Sector Working Conditions' }, { id: 't4', title: 'Public Sector vs Private Sector Role in Infrastructure' }] },
      { id: `sst_c${c}_ch15`, chapterNumber: 15, disciplineCode: 'economics', disciplineName: 'Economics', title: 'Money and Credit: Banking, SHGs & RBI Supervision', topics: [{ id: 't1', title: 'Double Coincidence of Wants, Barter System & Modern Currency' }, { id: 't2', title: 'Commercial Banks: Loan Activities & Credit Creation' }, { id: 't3', title: 'Formal vs Informal Credit Sources & Role of Reserve Bank of India (RBI)' }, { id: 't4', title: 'Self-Help Groups (SHGs) for Rural Women & Microfinance' }] },
      { id: `sst_c${c}_ch16`, chapterNumber: 16, disciplineCode: 'economics', disciplineName: 'Economics', title: 'Globalisation, MNCs & Consumer Rights (COPRA)', topics: [{ id: 't1', title: 'Production Across Countries: Multi-National Corporations (MNCs)' }, { id: 't2', title: 'Foreign Trade, Investment Policies & WTO (World Trade Organisation)' }, { id: 't3', title: 'Impact of Globalisation on Small Producers vs Consumers' }, { id: 't4', title: 'Consumer Protection Act (COPRA), Consumer Rights & Redressal Forums' }] },
    ], 100000),
  })),
]

// ============================================================================
// 5. MASTER TAXONOMY MAP
// ============================================================================
export const UNIVERSAL_TAXONOMIES_BY_SUBJECT: Record<SubjectCode, UniversalClassTaxonomy[]> = {
  science: SCIENCE_CLASSES_TAXONOMY,
  english: ENGLISH_CLASSES_TAXONOMY,
  hindi: HINDI_CLASSES_TAXONOMY,
  social_science: SOCIAL_SCIENCE_CLASSES_TAXONOMY,
  math: [] as UniversalClassTaxonomy[], // Will be bridged dynamically to MATH_CLASSES_TAXONOMY
}
