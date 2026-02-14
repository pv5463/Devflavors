// FlavorDB API Configuration
const FLAVORDDB_API_KEY = "vycVFejHYvzkX71rJpoDEvjE6NUY9d3LWd8eE28sdX0Nna28";
const FLAVORDDB_BASE_URL = "https://api.foodoscope.com/flavordb";

// Fetch wrapper with default config and comprehensive error handling
const flavorDBFetch = async (endpoint: string, params?: Record<string, any>, retries: number = 0) => {
  const url = new URL(`${FLAVORDDB_BASE_URL}${endpoint}`);
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key].toString());
      }
    });
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${FLAVORDDB_API_KEY}`,
        },
      });

      if (!response.ok) {
        // Don't retry on 400 errors
        if (response.status === 400) {
          throw new Error(`Bad Request: ${endpoint}`);
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Don't retry on 400 errors
      if (error instanceof Error && error.message.includes('Bad Request')) {
        throw error;
      }
      
      if (attempt === retries) {
        throw error;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

// API Response Types
export interface FlavorDBCompound {
  id: string;
  pubchemId?: string;
  name: string;
  commonName?: string;
  casNumber?: string;
  molecularWeight?: number;
  monoisotopicMass?: number;
  description?: string;
  naturalOccurrence?: string[];
  tasteThreshold?: string;
  aromaThresholdValues?: string;
  functionalGroups?: string[];
  flavorProfile?: string[];
  fema?: string;
  jecfa?: string;
  gras?: boolean;
  nas?: boolean;
  iofi?: string;
  flNo?: string;
  einecs?: string;
  naturalSource?: string[];
  naturalSourceReadable?: string[];
  entityAliasReadable?: string[];
  category?: string;
  numRings?: number;
  rotatableBonds?: number;
  numberOfAtoms?: number;
  aromaticRings?: number;
  aromaticBonds?: number;
  heavyAtomCount?: number;
  topologicalPolarSurfaceArea?: number;
  surfaceArea?: number;
  hbdCount?: number;
  hbaCount?: number;
  alogp?: number;
  energy?: number;
  byCoe?: boolean;
  byCoeApproval?: boolean;
  byFema?: boolean;
  byTradeAssociationGuidelines?: boolean;
  byEnergy?: number;
  molecule?: {
    structure?: string;
    smiles?: string;
  };
}

// API Service
export const FlavorDBAPIService = {
  // Get by common name
  getByCommonName: async (name: string): Promise<FlavorDBCompound[]> => {
    try {
      const data = await flavorDBFetch("/properties/by-commonName", { name });
      return data || [];
    } catch (error) {
      // Silently fail and return empty array
      return [];
    }
  },

  // Get compound by ID
  getCompoundById: async (id: string): Promise<FlavorDBCompound | null> => {
    try {
      const data = await flavorDBFetch(`/compounds/${id}`);
      return data || null;
    } catch (error) {
      // Silently fail and return null
      return null;
    }
  },

  // Search compounds (general search)
  searchCompounds: async (query: string): Promise<FlavorDBCompound[]> => {
    try {
      const data = await flavorDBFetch("/search", { q: query });
      return data || [];
    } catch (error) {
      // Silently fail and return empty array
      return [];
    }
  },

  // Get all compounds
  getAllCompounds: async (page: number = 1, limit: number = 20): Promise<FlavorDBCompound[]> => {
    try {
      const data = await flavorDBFetch("/compounds", { page, limit });
      return data || [];
    } catch (error) {
      // Silently fail and return empty array
      return [];
    }
  },
};

export default FlavorDBAPIService;
