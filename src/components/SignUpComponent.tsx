'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { ValidationError } from 'yup';
import { useRouter } from 'next/navigation';

const SignUpComponent = () => {
  const router = useRouter();

  type ValidationMessages = {
    [key: string]: string;
    min: string;
    max: string;
    upper: string;
    digit: string;
  };

  const validationMessages: ValidationMessages = {
    min: '8 characters or more (no spaces)',
    max: '64 characters or less',
    upper: 'at least 1 uppercase letter',
    digit: 'at least 1 number',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, validationMessages.min)
      .max(64, validationMessages.max)
      .matches(/^(?=.*\d)/, validationMessages.digit)
      .matches(/^(?=.*[A-Z])/, validationMessages.upper),
  });

  const fullValidatorForSchema =
    (schema: Yup.ObjectSchema<Record<string, string>>) => (values: Record<string, string>) =>
      schema
        .validate(values, {
          abortEarly: false,
          strict: false,
        })
        .then(() => ({}))
        .catch((error) => {
          if (error instanceof ValidationError) {
            return error.inner.reduce(
              (memo: Record<string, string[]>, { path, message }) => ({
                ...memo,
                [path as string]: (memo[path as string] || []).concat(message),
              }),
              {},
            );
          }
        });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={fullValidatorForSchema(validationSchema)}
      onSubmit={(values) => {
        console.log('Form values:', values);
        router.push('/dashboard');
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={clsx(
                  'mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none bg-white',
                  {
                    '[&:not(:focus)]:border-green-500 [&:not(:focus)]:bg-green-200': touched.email,
                    '[&:not(:focus)]:border-red-500 [&:not(:focus)]:bg-red-200':
                      errors.email && touched.email,
                  },
                )}
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={clsx(
                  'mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none bg-white',
                  {
                    '[&:not(:focus)]:border-green-500 [&:not(:focus)]:bg-green-200':
                      touched.password,
                    '[&:not(:focus)]:border-red-500 [&:not(:focus)]:bg-red-200':
                      errors.password && touched.password,
                  },
                )}
              />
            </div>

            <ul className="text-green-400">
              {Object.keys(validationMessages).map((key) => (
                <li
                  key={key}
                  className={clsx({
                    'text-red-400':
                      errors.password?.includes(validationMessages[key]) && touched.password,
                  })}
                >
                  {validationMessages[key]}
                </li>
              ))}
            </ul>
            <button
              type="submit"
              className="w-60 m-auto py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-3xl shadow"
            >
              Sign Up
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpComponent;
