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
          if (!value) {
            return false;
          }
          const validMimeTypes = ['image/jpeg', 'image/png'];
          return validMimeTypes.includes(value.type);
        },
      },
    });
  };
}