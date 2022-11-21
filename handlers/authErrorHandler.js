export const errorHandler = (validatorError) => {
  const errorResponse = {};
  const errCode = validatorError.code;
  if (errCode === 11000)
    errorResponse['email'] = 'Email already registered, please login!!';
  else
    Object.values(validatorError.errors).forEach(({ properties }) => {
      errorResponse[properties.path] = properties.message;
    });
  return errorResponse;
};
