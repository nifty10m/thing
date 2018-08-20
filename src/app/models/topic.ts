export interface Topic {
    title: string;
    description?: string;
    pilot: string;
    votes: Vote[];
}

export interface Vote {
    participant: string;
    amount: number;
}
