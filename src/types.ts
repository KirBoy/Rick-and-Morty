export type CharactersType = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    },
    location: {
        name: string;
        url: string;
    },
    image: string;
    episode: string[],
    url: string;
    created: string;
}

export type FiltersType = {
    name: string;
    status: string;
    gender: string;
    type: string;
}

export type ServerType = {
    info: {
        count: number;
        next: string;
        pages: number;
        prev?: number;
    }
    results: CharactersType[]
}

export type  PaginationType = {
    currentPage: number;
    totalPages: number | null;
}
