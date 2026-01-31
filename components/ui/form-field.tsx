import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, id, className, ...props }, ref) => {
    const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="space-y-2">
        <Label
          htmlFor={fieldId}
          className={error ? 'text-red-600' : ''}
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </Label>
        <Input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${fieldId}-error` : helperText ? `${fieldId}-description` : undefined
          }
          className={
            error 
              ? `border-red-500 focus-visible:ring-red-500 ${className || ''}` 
              : className || ''
          }
          {...props}
        />
        {error && (
          <p
            id={`${fieldId}-error`}
            className="text-sm font-medium text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${fieldId}-description`} className="text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
