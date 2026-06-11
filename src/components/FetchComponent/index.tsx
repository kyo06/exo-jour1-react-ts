import useFetch, { type UseFetchResult } from '@hooks/useFetch';
import React from 'react';

interface FetchComponentProps<T> {
    url: string;
    children: (state : UseFetchResult<T>) => React.ReactNode;
}

//Render Props Component pour abstraire la logique de fetch et de gestion d'état

export default function FetchComponent<T>({ url, children }: FetchComponentProps<T>) {
    const state = useFetch<T>(url);
    return <>{children(state)}</>;
};