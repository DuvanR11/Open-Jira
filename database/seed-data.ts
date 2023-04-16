
interface SeedData {
    entries: SeedEntry[]
}


interface SeedEntry {
    description: string;
    createdAt:   number;
    status:      string;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'pending pues como seria',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'in-progress hola jajja',
            status: 'in-progress',
            createdAt: Date.now() - 1000,
        },
        {
            description: 'finished como seriaaaa',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}