export interface TCMDiagnosis {
  // Inspection
  complexion: string;
  tongueColor: string;
  tongueCoating: string;
  tongueFeatures: string;
  
  // Auscultation and Olfaction
  voiceSound: string;
  breathOdor: string;
  
  // Inquiry
  coldHeatSensation: string;
  sweating: string;
  appetite: string;
  thirst: string;
  sleepPattern: string;
  bowelMovements: string;
  urination: string;
  painDescription: string;
  
  // Palpation
  pulseRate: number;
  pulseQualities: string[];
}