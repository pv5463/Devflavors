// API Health Check Service
import { RecipeDBAPIService } from './recipedb-api';
import { FlavorDBAPIService } from './flavordb-api';

export interface APIHealthStatus {
  recipeDB: {
    status: 'online' | 'offline' | 'checking';
    message: string;
    responseTime?: number;
  };
  flavorDB: {
    status: 'online' | 'offline' | 'checking';
    message: string;
    responseTime?: number;
  };
}

export const APIHealthService = {
  // Check RecipeDB API health
  checkRecipeDB: async (): Promise<{ status: 'online' | 'offline'; responseTime: number; message: string }> => {
    const startTime = Date.now();
    try {
      console.log('[Health Check] Testing RecipeDB API...');
      const recipes = await RecipeDBAPIService.getAllRecipes(1, 1);
      const responseTime = Date.now() - startTime;
      
      if (recipes && recipes.length >= 0) {
        console.log(`[Health Check] RecipeDB is ONLINE (${responseTime}ms)`);
        return {
          status: 'online',
          responseTime,
          message: `Connected successfully in ${responseTime}ms`
        };
      }
      
      return {
        status: 'offline',
        responseTime,
        message: 'API returned unexpected response'
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error('[Health Check] RecipeDB is OFFLINE:', error);
      return {
        status: 'offline',
        responseTime,
        message: error instanceof Error ? error.message : 'Connection failed'
      };
    }
  },

  // Check FlavorDB API health
  checkFlavorDB: async (): Promise<{ status: 'online' | 'offline'; responseTime: number; message: string }> => {
    const startTime = Date.now();
    try {
      console.log('[Health Check] Testing FlavorDB API...');
      const compounds = await FlavorDBAPIService.getAllCompounds(1, 1);
      const responseTime = Date.now() - startTime;
      
      if (compounds && compounds.length >= 0) {
        console.log(`[Health Check] FlavorDB is ONLINE (${responseTime}ms)`);
        return {
          status: 'online',
          responseTime,
          message: `Connected successfully in ${responseTime}ms`
        };
      }
      
      return {
        status: 'offline',
        responseTime,
        message: 'API returned unexpected response'
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error('[Health Check] FlavorDB is OFFLINE:', error);
      return {
        status: 'offline',
        responseTime,
        message: error instanceof Error ? error.message : 'Connection failed'
      };
    }
  },

  // Check both APIs
  checkAll: async (): Promise<APIHealthStatus> => {
    console.log('[Health Check] Starting API health check...');
    
    const [recipeDBResult, flavorDBResult] = await Promise.all([
      APIHealthService.checkRecipeDB(),
      APIHealthService.checkFlavorDB()
    ]);

    const status: APIHealthStatus = {
      recipeDB: {
        status: recipeDBResult.status,
        message: recipeDBResult.message,
        responseTime: recipeDBResult.responseTime
      },
      flavorDB: {
        status: flavorDBResult.status,
        message: flavorDBResult.message,
        responseTime: flavorDBResult.responseTime
      }
    };

    console.log('[Health Check] Results:', status);
    return status;
  }
};
