const formData = {
  email: {
    name: 'email',
    label: 'E-mail',
    placeholder: '1210000@isep.ipp.pt',
    autoComplete: 'email',
    validation: {
      required: 'This field is required.',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Please enter a valid e-mail address.',
      },
    },
  },
  firstName: {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'John',
    autoComplete: 'given-name',
    validation: {
      required: 'This field is required.',
      maxLength: {
        value: 20,
        message: 'Cannot exceed 20 characters.',
      },
    },
  },
  lastName: {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Smith',
    autoComplete: 'family-name',
    validation: {
      required: 'This field is required.',
      maxLength: {
        value: 20,
        message: 'Cannot exceed 20 characters.',
      },
    },
  },
  mechNumber: {
    name: 'number',
    label: 'Mechanographic Nr.',
    placeholder: '1210000',
    autoComplete: 'nickname',
    validation: {
      required: 'This field is required.',
      validate: (value) => Number.isInteger(parseInt(value)),
    },
  },
  institution: {
    name: 'institution',
    label: 'Institution',
    placeholder: 'Instituto Superior de Engenharia do Porto',
    autoComplete: 'organization',
    validation: {
      required: 'This field is required.',
    },
  },
};

export const formMap = new Map(Object.entries(formData));
