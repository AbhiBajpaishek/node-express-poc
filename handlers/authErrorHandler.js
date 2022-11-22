export const errorHandler = (validatorError) => {
  const errorResponse = { errors: {} };
  const errCode = validatorError.code;
  if (errCode === 11000)
    errorResponse.errors['email'] = 'Email already registered, please login!!';
  else if (validatorError.message.includes('Credentials are wrong!!')) {
    errorResponse.errors['password'] = validatorError.message;
  } else if (validatorError.message.includes(`Email doesn't exist`)) {
    errorResponse.errors['email'] = validatorError.message;
  } else
    Object.values(validatorError.errors).forEach(({ properties }) => {
      errorResponse.errors[properties.path] = properties.message;
    });
  return errorResponse;
};
