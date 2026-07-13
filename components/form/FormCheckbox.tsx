/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";

import FormGroup from "@/components/form/FormGroup";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Props type
type FormCheckboxProps = {
  id: string;
  label: string;
  control: Control<any>;
};

// The component
function FormCheckbox({ control, id, label }: FormCheckboxProps) {
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
    </FormGroup>
  );
}

export default FormCheckbox;
