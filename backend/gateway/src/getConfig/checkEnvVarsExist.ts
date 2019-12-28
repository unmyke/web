const isEnvVarNotExists = (varName: string): boolean => {
  const envVar = process.env[varName]

  return !envVar
}
export const checkEnvVarsExist = ({
  envVarNames,
  scope,
}: {
  envVarNames: string[]
  scope: string
}): void => {
  const notExistingEnvVars = envVarNames.filter(isEnvVarNotExists)

  if (notExistingEnvVars.length) {
    throw new Error(
      `Environment variables for ${scope} must be set: ${notExistingEnvVars.join(
        ', ',
      )}.`,
    )
  }
}
