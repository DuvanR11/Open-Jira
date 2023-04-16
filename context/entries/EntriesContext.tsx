import { Entry } from '@/interfaces';
import { createContext } from 'react';


interface Contextprops {
    entries: Entry[]

    //methods
    addNewEntry: (description: string) => void
    updateEntry: (entry: Entry, showSnackbar?: boolean) => void

}


export const EntriesContext = createContext({} as Contextprops)