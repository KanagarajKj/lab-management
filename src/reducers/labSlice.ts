import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LaboratoryFormData } from '../types/types';

// Define the types for our data
export interface TestMethod {
  method: string;
  parameters: string[];
  sampleType: string;
}

export interface Laboratory {
  id: number;
  labName: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  servicesOffered: string[];
  status: 'Active' | 'Inactive';
  testMethods: TestMethod[];
}

// Initial state
const initialState: {
  laboratories: Laboratory[];
  selectedLab: Laboratory | null;
} = {
  laboratories: [
    {
      id: 1,
      labName: "Viswa Lab Chennai",
      location: "Chennai",
      contactPerson: "Dr. Ramesh",
      contactNumber: "9876543210",
      servicesOffered: ["Chemical Analysis", "Oil Testing", "Water Quality"],
      status: "Active",
      testMethods: [
        {
          method: "ASTM D445",
          parameters: ["Viscosity", "Temperature"],
          sampleType: "Oil"
        },
        {
          method: "ISO 7027",
          parameters: ["Turbidity"],
          sampleType: "Water"
        }
      ]
    },
    {
      id: 2,
      labName: "Viswa Lab Mumbai",
      location: "Mumbai",
      contactPerson: "Dr. Priya",
      contactNumber: "9123456789",
      servicesOffered: ["Material Testing", "Environmental Testing"],
      status: "Inactive",
      testMethods: [
        {
          method: "ISO 9001",
          parameters: ["Hardness", "Tensile Strength"],
          sampleType: "Metal"
        },
        {
          method: "EPA 8270D",
          parameters: ["Organic Pollutants"],
          sampleType: "Air"
        }
      ]
    },
    {
      id: 3,
      labName: "Kanagaraj Lab Mumbai",
      location: "Mumbai",
      contactPerson: "Er. Raj",
      contactNumber: "9123456789",
      servicesOffered: ["Material Testing", "Environmental Testing"],
      status: "Active",
      testMethods: [
        {
          method: "ISO 9001",
          parameters: ["Hardness", "Tensile Strength"],
          sampleType: "Metal"
        },
        {
          method: "EPA 8270D",
          parameters: ["Organic Pollutants"],
          sampleType: "Air"
        }
      ]
    },
    {
      "id": 4,
      "labName": "Global Test Labs Hyderabad",
      "location": "Hyderabad",
      "contactPerson": "Dr. Anjali",
      "contactNumber": "9845123456",
      "servicesOffered": ["Food Testing", "Soil Analysis"],
      "status": "Active",
      "testMethods": [
        {
          "method": "FSSAI 2021",
          "parameters": ["Nutritional Content", "Contaminants"],
          "sampleType": "Food"
        },
        {
          "method": "ISO 14688",
          "parameters": ["Grain Size", "Soil Composition"],
          "sampleType": "Soil"
        }
      ]
    },
    {
      "id": 5,
      "labName": "Eco Testing Services",
      "location": "Delhi",
      "contactPerson": "Mr. Vivek",
      "contactNumber": "9810023456",
      "servicesOffered": ["Air Quality", "Waste Management"],
      "status": "Inactive",
      "testMethods": [
        {
          "method": "EPA 8081A",
          "parameters": ["Pesticides"],
          "sampleType": "Air"
        },
        {
          "method": "SW-846",
          "parameters": ["Hazardous Waste Composition"],
          "sampleType": "Waste"
        }
      ]
    },
    {
      "id": 6,
      "labName": "Advanced Material Labs",
      "location": "Bangalore",
      "contactPerson": "Dr. Suresh",
      "contactNumber": "9900456789",
      "servicesOffered": ["Material Testing", "Failure Analysis"],
      "status": "Active",
      "testMethods": [
        {
          "method": "ASTM E18",
          "parameters": ["Hardness Testing"],
          "sampleType": "Metal"
        },
        {
          "method": "ASTM E8",
          "parameters": ["Tensile Testing"],
          "sampleType": "Alloys"
        }
      ]
    },
    {
      "id": 7,
      "labName": "BioCare Labs Pune",
      "location": "Pune",
      "contactPerson": "Dr. Meera",
      "contactNumber": "9898654321",
      "servicesOffered": ["Pathology", "Drug Testing"],
      "status": "Active",
      "testMethods": [
        {
          "method": "CLSI M100",
          "parameters": ["Antimicrobial Susceptibility"],
          "sampleType": "Blood"
        },
        {
          "method": "FDA-BT01",
          "parameters": ["Drug Purity", "Stability"],
          "sampleType": "Pharmaceuticals"
        }
      ]
    },
    {
      "id": 8,
      "labName": "EnviroCheck Labs",
      "location": "Kolkata",
      "contactPerson": "Ms. Swati",
      "contactNumber": "9800234567",
      "servicesOffered": ["Water Testing", "Noise Pollution Analysis"],
      "status": "Inactive",
      "testMethods": [
        {
          "method": "WHO 2011",
          "parameters": ["pH", "Heavy Metals"],
          "sampleType": "Water"
        },
        {
          "method": "ISO 9613",
          "parameters": ["Decibel Levels"],
          "sampleType": "Environment"
        }
      ]
    },
    {
      "id": 9,
      "labName": "Nuclear Test Facility",
      "location": "Chennai",
      "contactPerson": "Dr. Kamal",
      "contactNumber": "9756456781",
      "servicesOffered": ["Radiation Testing", "Safety Compliance"],
      "status": "Active",
      "testMethods": [
        {
          "method": "IAEA 2014",
          "parameters": ["Gamma Radiation"],
          "sampleType": "Metal"
        },
        {
          "method": "ANSI N42",
          "parameters": ["Radiation Levels"],
          "sampleType": "Materials"
        }
      ]
    },
    {
      "id": 10,
      "labName": "Food Safety Labs",
      "location": "Mumbai",
      "contactPerson": "Ms. Anita",
      "contactNumber": "9223456710",
      "servicesOffered": ["Nutritional Analysis", "Allergen Testing"],
      "status": "Inactive",
      "testMethods": [
        {
          "method": "AOAC 985.29",
          "parameters": ["Protein Content"],
          "sampleType": "Food"
        },
        {
          "method": "EU 1169/2011",
          "parameters": ["Allergen Trace"],
          "sampleType": "Food"
        }
      ]
    },
    {
      "id": 11,
      "labName": "Precision Testing Services",
      "location": "Delhi",
      "contactPerson": "Mr. Rohan",
      "contactNumber": "9112345678",
      "servicesOffered": ["Mechanical Testing", "Calibration"],
      "status": "Active",
      "testMethods": [
        {
          "method": "ISO 17025",
          "parameters": ["Torque", "Force"],
          "sampleType": "Machines"
        },
        {
          "method": "ASTM D2240",
          "parameters": ["Hardness Testing"],
          "sampleType": "Rubber"
        }
      ]
    },
    {
      "id": 12,
      "labName": "Clean Water Labs",
      "location": "Goa",
      "contactPerson": "Dr. Deepak",
      "contactNumber": "9870032109",
      "servicesOffered": ["Water Purity", "Bacteriological Testing"],
      "status": "Active",
      "testMethods": [
        {
          "method": "ISO 5667",
          "parameters": ["Bacteria Levels"],
          "sampleType": "Water"
        },
        {
          "method": "EPA 300.0",
          "parameters": ["Anion Analysis"],
          "sampleType": "Water"
        }
      ]
    },
    {
      "id": 13,
      "labName": "Renewable Labs Bengaluru",
      "location": "Bangalore",
      "contactPerson": "Ms. Lakshmi",
      "contactNumber": "9988675432",
      "servicesOffered": ["Solar Panel Testing", "Wind Energy Analysis"],
      "status": "Active",
      "testMethods": [
        {
          "method": "IEC 61215",
          "parameters": ["Efficiency", "Durability"],
          "sampleType": "Solar Panels"
        },
        {
          "method": "ISO 9613",
          "parameters": ["Turbine Noise"],
          "sampleType": "Turbines"
        }
      ]
    },
    {
      "id": 14,
      "labName": "Soil Health Labs",
      "location": "Chennai",
      "contactPerson": "Mr. Dinesh",
      "contactNumber": "9823456789",
      "servicesOffered": ["Fertility Testing", "Pesticide Residue Analysis"],
      "status": "Inactive",
      "testMethods": [
        {
          "method": "USDA 2010",
          "parameters": ["Nitrogen", "Phosphorus"],
          "sampleType": "Soil"
        },
        {
          "method": "EPA 508",
          "parameters": ["Pesticide Residue"],
          "sampleType": "Soil"
        }
      ]
    },
    {
      "id": 15,
      "labName": "Smart Sensors Labs",
      "location": "Noida",
      "contactPerson": "Ms. Anu",
      "contactNumber": "9876543890",
      "servicesOffered": ["Sensor Testing", "IoT Device Analysis"],
      "status": "Active",
      "testMethods": [
        {
          "method": "ISO 18000",
          "parameters": ["RFID Performance"],
          "sampleType": "Sensors"
        },
        {
          "method": "IEC 60601",
          "parameters": ["Electromagnetic Compatibility"],
          "sampleType": "Devices"
        }
      ]
    },
    {
      "id": 16,
      "labName": "NanoTech Labs",
      "location": "Hyderabad",
      "contactPerson": "Dr. Neha",
      "contactNumber": "9912346789",
      "servicesOffered": ["Nanomaterial Analysis", "Thin Film Testing"],
      "status": "Active",
      "testMethods": [
        {
          "method": "ISO 10718",
          "parameters": ["Particle Size"],
          "sampleType": "Nanoparticles"
        },
        {
          "method": "ASTM D3828",
          "parameters": ["Coating Thickness"],
          "sampleType": "Films"
        }
      ]
    },
    {
      "id": 17,
      "labName": "MedTech Labs",
      "location": "Ahmedabad",
      "contactPerson": "Dr. Aarti",
      "contactNumber": "9812345789",
      "servicesOffered": ["Medical Device Testing", "Compliance Checks"],
      "status": "Inactive",
      "testMethods": [
        {
          "method": "ISO 13485",
          "parameters": ["Material Safety"],
          "sampleType": "Devices"
        },
        {
          "method": "ISO 10993",
          "parameters": ["Biocompatibility"],
          "sampleType": "Implants"
        }
      ]
    },
    {
      "id": 18,
      "labName": "AirCheck Labs",
      "location": "Lucknow",
      "contactPerson": "Mr. Arjun",
      "contactNumber": "9887654321",
      "servicesOffered": ["Air Purity Testing", "Indoor Air Quality"],
      "status": "Active",
      "testMethods": [
        {
          "method": "EPA TO-15",
          "parameters": ["VOC Levels"],
          "sampleType": "Air"
        },
        {
          "method": "ISO 16000",
          "parameters": ["Particulate Matter"],
          "sampleType": "Air"
        }
      ]
    }
  ],
  selectedLab: null
};

// Create the slice
const labsSlice = createSlice({
  name: 'labs',
  initialState,
  reducers: {
    addLaboratory: (state, action: PayloadAction<LaboratoryFormData>) => {
      const newId = state.laboratories.length > 0 
        ? Math.max(...state.laboratories.map(lab => lab.id)) + 1 
        : 1;
      state.laboratories.push({ ...action.payload, id: newId });
    },
    updateLaboratory: (state, action: PayloadAction<LaboratoryFormData>) => {
      const index = state.laboratories.findIndex(lab => lab.id === action.payload.id);
      if (index !== -1) {
        state.laboratories[index] = action.payload;
      }
    },
    deleteLaboratory: (state, action: PayloadAction<number>) => {
      state.laboratories = state.laboratories.filter(lab => lab.id !== action.payload);
    },
    setSelectedLab: (state, action: PayloadAction<Laboratory | null>) => {
      state.selectedLab = action.payload;
    }
  }
});

export const { 
  addLaboratory, 
  updateLaboratory, 
  deleteLaboratory, 
  setSelectedLab 
} = labsSlice.actions;

export default labsSlice.reducer;