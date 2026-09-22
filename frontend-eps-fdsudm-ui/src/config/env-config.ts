
import {z} from 'zod';

const envSchema = z.object({
    VITE_BE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "qa", "test", "production"]).default("development")

})

export const envEndpoints = {
    VITE_BE_URL: import.meta.env.VITE_BE_URL
}


export const _env = envSchema.safeParse(envEndpoints)

if (!_env.success) {
    console.error("Environment variable validation error: ", _env.error);
    throw new Error("Invalid Environment Variable: ", _env.error);
} 

export const env = _env.data;


const IS_PROD: boolean = import.meta.env.MODE === 'production'
