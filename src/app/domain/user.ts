export interface User {

    email: string;
    number?: string;
    name?: string;
    password?: string;
    active?: boolean;
    picture?: string;
    roles?: string[];
    notifications?: string[];
}

export const roles = [
    { displayName: 'Bruger', role: '' },
    { displayName: 'Dagens vagt', role: 'SUPER' },
    { displayName: 'Tillidsmand', role: 'TILLI' },
    { displayName: 'Driftkontor', role: 'DRIFT' },
    { displayName: 'Administrator', role: 'ADMIN' }
  ];
