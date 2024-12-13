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
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMemo } from "react";
import { Input } from "./ui/input";
import { toFirstLetterUpperCase } from "@/utils/string";

type ButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

type FormCardProps = {
  title: string;
  description?: string;
  zodSchema: z.ZodTypeAny;
  defaultValues: z.infer<FormCardProps["zodSchema"]>;
  buttons: {
    submit: ButtonProps;
    cancel?: ButtonProps;
  };
  className?: string;
};

type ZodFieldType = {
  _def: {
    description: string;
    typeName: ZodTypeAny;
  };
};

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

  const fields = useMemo(
    () => Object.entries(zodSchema._def.shape()),
    [zodSchema],
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {description && <CardDescription>{description}</CardDescription>}
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(buttons.submit.onClick)}
            className="flex flex-col gap-4"
          >
            {fields.map(([key, value]) => {
              const fieldName = toFirstLetterUpperCase(key);
              const typedValue = value as ZodFieldType;
              const description = typedValue._def.description;

              return (
                <FormField
                  key={key}
                  name={fieldName}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName}</FormLabel>
                      <FormControl>
                        <Input placeholder={fieldName} {...field} />
                      </FormControl>
                      <FormDescription>{description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {buttons.cancel && (
          <Button
            onClick={buttons.cancel?.onClick}
            className={buttons.cancel?.className}
          >
            {buttons.cancel?.label}
          </Button>
        )}
        <Button
          onClick={buttons.submit.onClick}
          className={buttons.submit.className}
        >
          {buttons.submit.label}
        </Button>
      </CardFooter>
    </Card>
  );
};
