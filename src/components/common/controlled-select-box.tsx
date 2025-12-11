import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface IControlledSelectBoxProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  placeholder?: string;
  name: Path<T>;
  rules?: Parameters<UseFormReturn<T>['register']>[1];
  options: Option[];
}

const ControlledSelectBox = <T extends FieldValues>({
  form,
  placeholder,
  name,
  rules,
  options,
}: IControlledSelectBoxProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ...field } }) => {
        return (
          <div className="relative flex flex-col w-full gap-2">
            <select aria-invalid={!!form.formState.errors?.[name]} {...field} onChange={onChange} key={field.value}>
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {form.watch(name) && (
              <button
                className="absolute transform -translate-y-1/2 right-6 top-1/2"
                type="button"
                onClick={() => onChange('')}
              >
                X
              </button>
            )}
            {form.formState.errors?.[name]?.message && (
              <div className="text-xs text-red-500">
                {JSON.stringify(form.formState.errors?.[name]?.message).replaceAll(`"`, '')}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControlledSelectBox;
