import React from "react";
import { Children } from "react";

import { AlertProvider } from "@/providers/alert-provider/alert-provider";
import { ThemeProvider } from "@/providers/theme-provider/theme-provider";


const ProviderComposer = ({providers, children}: {providers: React.ReactElement[], children: React.ReactNode}) => {
    return providers.reduceRight(
        (acc, provider) => React.cloneElement(provider as any, {children: acc}),
        children
    )
}



export const AppProviders = ({children}: {children: React.ReactNode}) => {
    const providerList = [
        ThemeProvider,
        AlertProvider,
        // if a provides has a DI use inline wrap
        // ({ children }: { children: React.ReactNode }) => 
        // ( <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> ),
    ]
    return providerList.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children)
}