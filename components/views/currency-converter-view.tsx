
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const currencies = [
  { code: 'EUR', name: 'Euro', rate: 1 },
  { code: 'USD', name: 'US Dollar', rate: 1.08 },
  { code: 'NPR', name: 'Nepalese Rupee', rate: 144.15 },
  { code: 'INR', name: 'Indian Rupee', rate: 90.21 },
  { code: 'BTN', name: 'Bhutanese Ngultrum', rate: 90.21 },
];

export function CurrencyConverterView() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('NPR');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate;
    if (fromRate && toRate && amount > 0) {
      const convertedAmount = (amount / fromRate) * toRate;
      setResult(convertedAmount);
    } else {
      setResult(0);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }
  
  useEffect(() => {
    handleConvert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency]);


  return (
    <div className="max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">Conversión rápida basada en tipos de cambio de referencia.</p>
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto,1fr] gap-4 items-end">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">Importe</label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              placeholder="100"
            />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium">De</label>
             <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
           <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={handleSwap}>
                <ArrowRightLeft />
            </Button>
           </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">A</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                     {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={handleConvert} className="w-full">Convertir</Button>
        </div>
        {result !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg text-muted-foreground">{amount.toLocaleString()} {fromCurrency} =</p>
            <p className="text-4xl font-bold text-primary">
              {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
            </p>
          </div>
        )}
    </div>
  );
}
