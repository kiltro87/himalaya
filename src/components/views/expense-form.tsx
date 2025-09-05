
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Expense } from "@/lib/types";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  concept: z.string().min(1, { message: "El concepto es requerido." }),
  amount: z.coerce.number().min(0.01, { message: "El importe debe ser mayor que cero." }),
  date: z.string().min(1, { message: "La fecha es requerida." }),
});

type FormValues = z.infer<typeof formSchema>;

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, 'isEstimate' | 'id' | 'categoryId'>) => void;
  expense: Expense | null;
  categoryId: string;
  currencySymbol: string;
}

export function ExpenseForm({ isOpen, onClose, onSave, expense, categoryId, currencySymbol }: ExpenseFormProps) {
  console.log("ExpenseForm: Rendering component. Is open?", isOpen);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    console.log("ExpenseForm: Effect running. isOpen:", isOpen);
    if (isOpen) {
      if (expense) {
        console.log("ExpenseForm: Initializing form for editing expense:", expense);
        form.reset({
          concept: expense.concept,
          amount: expense.amount,
          date: new Date(expense.date).toISOString().split('T')[0],
        });
      } else {
        const defaultDate = new Date().toISOString().split('T')[0];
        console.log("ExpenseForm: Initializing form for new expense. Default date:", defaultDate);
        form.reset({
          concept: "",
          amount: 0,
          date: defaultDate,
        });
      }
    }
  }, [expense, isOpen, form]);


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("ExpenseForm: Form submitted with data:", data);
    const expenseToSave = {
      concept: data.concept,
      amount: data.amount,
      date: new Date(data.date).toISOString(),
    };
    console.log("ExpenseForm: Calling onSave with processed data:", expenseToSave);
    onSave(expenseToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      console.log(`ExpenseForm: Dialog open state changed to: ${open}`);
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{expense ? "Editar Gasto" : "Añadir Gasto"}</DialogTitle>
          <DialogDescription>
            Introduce los detalles del gasto en la categoría seleccionada.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ej: Cena en Thamel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importe ({currencySymbol})</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

    