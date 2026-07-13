/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FormGroup from "./FormGroup";
import { Control, Controller } from "react-hook-form";

// Props type
type FormCheckboxProps = {
  id: string;
  label: string;
  control: Control<any>;
  error?: string;
};

// The component
function FormCheckbox({ error, control, ...props }: FormCheckboxProps) {
  // Destructure some props
  const { id, label } = props;

  // Returned JSX
  return (
    <FormGroup>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <div className="flex gap-2">
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={id} className="cursor-pointer capitalize">
              {label}
            </Label>
          </div>
        )}
      />
      {error && <span className="text-primary text-sm">{error}</span>}
    </FormGroup>
  );
}

export default FormCheckbox;
