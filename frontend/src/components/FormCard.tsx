import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { toFirstLetterUpperCase } from "@/utils/string";
import { Badge } from "./ui/badge";

export type ButtonProps = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (...args: any[]) => void | ((...args: any[]) => Promise<void>);
  className?: string;
};

export type FormCardButtons = {
  primary: ButtonProps;
  secondary?: ButtonProps;
};

type FormCardProps = {
  title: string;
  description?: string;
  zodSchema: z.ZodTypeAny;
  defaultValues: z.infer<FormCardProps["zodSchema"]>;
  buttons: FormCardButtons;
  className?: string;
};

type ZodFieldType = {
  _def: {
    description: string;
    typeName: ZodTypeAny;
  };
};

type PasswordField = ControllerRenderProps & { type: string };

export const FormCard = ({
  title,
  description,
  zodSchema,
  defaultValues,
  buttons,
  className,
}: FormCardProps) => {
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const [formError, setFormError] = useState<string | null>(null);

  const fields = useMemo(
    () => Object.entries(zodSchema._def.shape()),
    [zodSchema],
  );

  const values = form.watch();

  const payload = useMemo(() => {
    const result: Record<string, unknown> = {};
    Object.entries(values).forEach(([key, value]) => (result[key] = value));
    return result;
  }, [values]);

  return (
    <Card className={className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            buttons.primary.onClick.bind(null, setFormError, payload),
          )}
          className="flex flex-col gap-4 w-full"
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent className="w-full">
            {fields.map(([key, value]) => {
              const fieldName = toFirstLetterUpperCase(key);
              const typedValue = value as ZodFieldType;
              const description = typedValue._def.description;

              return (
                <FormField
                  key={key}
                  name={key}
                  control={form.control}
                  render={({ field }) => {
                    const isPassword = key === "password";
                    if (isPassword) (field as PasswordField).type = "password";

                    return (
                      <FormItem>
                        <FormLabel>{fieldName}</FormLabel>
                        <FormControl>
                          <Input placeholder={fieldName} {...field} />
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
            {formError && (
              <Badge className="flex text-red-500 w-fit bg-bg-000 border-red-500 justify-start hover:bg-bg-000">
                {formError}
              </Badge>
            )}
          </CardContent>
          <CardFooter className="flex justify-between gap-8 w-full">
            {buttons.secondary && (
              <Button
                onClick={buttons.secondary?.onClick}
                className={buttons.secondary?.className}
              >
                {buttons.secondary?.label}
              </Button>
            )}
            <Button type="submit" className={buttons.primary.className}>
              {buttons.primary.label}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
