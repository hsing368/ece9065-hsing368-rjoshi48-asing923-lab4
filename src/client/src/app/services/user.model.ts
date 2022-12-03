export interface User{
    uid: string,
    email: string,
    displayName: string,
    isAdmin: Boolean,
    disabled: Boolean,
    emailVerified: Boolean,
    registered: Boolean,
    providerId: string
}