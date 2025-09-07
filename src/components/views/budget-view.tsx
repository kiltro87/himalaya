
"use client";

import { useState, useMemo } from "react";
import { tripConfig } from "@/lib/trip-config";
import { Expense } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plane, Utensils, Hotel, ShoppingBag, Clapperboard, Wallet, PlusCircle, Pencil, Trash2, CheckCircle, Ticket, Handshake } from "lucide-react";
import { ExpenseForm } from "./expense-form";
import { format } from "date-fns/format";
import { es } from "date-fns/locale/es";
import * as budgetService from "@/services/budget-service";
import { v4 as uuidv4 } from "uuid";

const categoryIcons: { [key: string]: React.ReactNode } = {
  transporte: <Plane className="size-5" />,
  tour: <Clapperboard className="size-5"/>,
  comida: <Utensils className="size-5"/>,
  "entradas-visados": <Wallet className="size-5"/>,
  alojamiento: <Hotel className="size-5"/>,
  "actividades-ocio": <Ticket className="size-5" />,
  "gastos-personales": <ShoppingBag className="size-5" />,
  "propinas-servicios": <Handshake className="size-5" />,
  contingencia: <Wallet className="size-5"/>,
};

interface BudgetViewProps {
  expenses: Expense[];
  onExpensesChange: (expenses: Expense[]) => void;
}

export function BudgetView({ expenses, onExpensesChange }: BudgetViewProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [targetCategory, setTargetCategory] = useState<string | null>(null);
  
  const allInitialEstimates = useMemo(() => {
    return tripConfig.budget.categories.flatMap(cat => 
        cat.expenses.map(exp => ({ ...exp, categoryId: cat.id, isEstimate: true }))
    );
  }, []);

  const handleConvertToSpent = (estimate: Expense & { categoryId: string }) => {
    const { isEstimate, ...spentData } = estimate;
    const newSpentExpense = {
        ...spentData,
        date: new Date().toISOString(),
        concept: `${estimate.concept}` // Use the same concept to link them
    };
    
    setEditingExpense({ ...newSpentExpense, id: ''}); // Treat as new expense form
    setTargetCategory(estimate.categoryId);
    setIsFormOpen(true);
  };
  
  const handleAddNewExpense = (categoryId: string) => {
    setEditingExpense(null);
    setTargetCategory(categoryId);
    setIsFormOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setTargetCategory(expense.categoryId!);
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleDeleteExpense = async (expenseId: string) => {
    await budgetService.deleteSpentExpense(expenseId);
    onExpensesChange(expenses.filter(exp => exp.id !== expenseId));
  };

  const handleSaveExpense = async (expenseData: Omit<Expense, 'isEstimate' | 'id'>) => {
    if (!targetCategory) return;
    
    const expenseToSave = {
      ...expenseData,
      categoryId: targetCategory,
    };

    if (editingExpense && editingExpense.id) {
        // Update existing expense
        const updatedExpense = { ...expenseToSave, id: editingExpense.id };
        await budgetService.updateSpentExpense(editingExpense.id, expenseToSave);
        onExpensesChange(expenses.map(exp => exp.id === editingExpense.id ? updatedExpense : exp));
    } else {
        // Add new expense
        const newExpenseWithId = { ...expenseToSave, id: uuidv4() };
        await budgetService.addSpentExpense(newExpenseWithId);
        onExpensesChange([...expenses, newExpenseWithId]);
    }

    setIsFormOpen(false);
    setEditingExpense(null);
    setTargetCategory(null);
  };
  
  const combinedCategories = useMemo(() => {
    const originalCategories = tripConfig.budget.categories;

    const spentConcepts = new Set(expenses.map(e => e.concept));

    const remainingEstimates = allInitialEstimates.filter(
      (estimate) => !spentConcepts.has(estimate.concept)
    );
  
    const combined = originalCategories.map(category => {
      const categorySpentItems = expenses.filter(e => e.categoryId === category.id);
      const categoryEstimateItems = remainingEstimates.filter(e => e.categoryId === category.id);
      const spentAmount = categorySpentItems.reduce((acc, exp) => acc + exp.amount, 0);
  
      const allExpenses = [...categoryEstimateItems, ...categorySpentItems].sort((a,b) => {
        if (a.isEstimate && !b.isEstimate) return -1;
        if (!a.isEstimate && b.isEstimate) return 1;
        if (!a.isEstimate && !b.isEstimate && a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });
  
      return {
        ...category,
        spent: spentAmount,
        displayExpenses: allExpenses,
      };
    });
  
    return combined;
  }, [allInitialEstimates, expenses]);

  return (
    <>
      <div className="space-y-6">
        <Accordion type="multiple" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {combinedCategories.map((category) => {
            const progress = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
            return (
              <Card key={category.id} className="overflow-hidden">
                <AccordionItem value={category.id} className="border-none">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-primary">{categoryIcons[category.id]}</div>
                      <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleAddNewExpense(category.id); }}>
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="px-4 pb-2">
                    <AccordionTrigger className="w-full p-0 pt-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                      <div className="w-full space-y-2 text-left">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-foreground">
                            Gastado: {tripConfig.budget.currency_symbol}
                            {category.spent.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="text-muted-foreground">
                            Presupuesto: {tripConfig.budget.currency_symbol}
                            {category.budget.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress value={progress} />
                      </div>
                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <ul className="divide-y border-t">
                      {category.displayExpenses.length === 0 && <p className="p-4 text-sm text-muted-foreground">No hay gastos en esta categoría.</p>}
                      {category.displayExpenses.map((expense, idx) => (
                        <li key={expense.id || idx} className={`flex items-center justify-between p-4 ${expense.isEstimate ? 'bg-muted/30' : ''}`}>
                          <div>
                            <p className="font-semibold">{expense.concept}</p>
                            <p className="text-sm text-muted-foreground">
                              {expense.isEstimate ? 'Estimación inicial' : format(new Date(expense.date), "PPP", { locale: es })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">
                              {tripConfig.budget.currency_symbol}
                              {expense.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            {expense.isEstimate ? (
                                <Button variant="ghost" size="icon" onClick={() => handleConvertToSpent(expense as Expense & { categoryId: string })} title="Marcar como gastado">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                            ) : (
                              <>
                                <Button variant="ghost" size="icon" onClick={() => handleEditExpense(expense)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteExpense(expense.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            );
          })}
        </Accordion>
      </div>

      {isFormOpen && targetCategory && (
        <ExpenseForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveExpense}
          expense={editingExpense}
          categoryId={targetCategory}
          currencySymbol={tripConfig.budget.currency_symbol}
        />
      )}
    </>
  );
}
