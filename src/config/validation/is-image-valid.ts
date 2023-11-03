import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsImageValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isImageValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value == null) {
            return true; // Permite valor nulo
          }

          if (value.startsWith('data:image/jpeg')) {
            return true;
          }

          if (value.startsWith('data:image/png')) {
            return true;
          }

          return false;
        },
      },
    });
  };
}
