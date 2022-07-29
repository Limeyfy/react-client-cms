import React, { createContext } from 'react';
import { ICmsComponents } from './CmsTypes';

export interface ICmsProviderProps {
    children: React.ReactNode;
    components?: ICmsComponents;
    dark?: boolean;
}

export const CmsContext = createContext<ICmsProviderProps>({
    children: null,
});

export const CmsProvider: React.FC<ICmsProviderProps> = (
    props: ICmsProviderProps
) => {
    return (
        <CmsContext.Provider value={props}>
            {props.children}
        </CmsContext.Provider>
    );
};
