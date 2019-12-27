// Queries

// #user(id: Uuid): User
export * from './IdArg'
export * from './User'

// #users(): UserList
export * from './UserList'

// #profile(userId: Uuid): User
export * from './UserIdArg'
export * from './Profile'

// #profiles(): ProfilesList
export * from './ProfileList'

// Mutations

// #createProfile(input: CreateProfileInput): CreateProfilePayload
export * from './CreateProfileInput'
export * from './CreateProfilePayload'
export * from './CreateProfileProblems'

// #updateProfile(input: UpdateProfileInput): UpdateProfilePayload
export * from './UpdateProfileInput'
export * from './UpdateProfilePayload'
export * from './UpdateProfileProblems'

// #deleteProfile(input: DeleteProfileInput): DeleteProfilePayload
export * from './DeleteProfileInput'
export * from './DeleteProfilePayload'
export * from './DeleteProfileProblems'

// Problems
export * from './problems'
