
"use client";

import { tripConfig } from "@/lib/trip-config";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shirt, Footprints, Tent, SprayCan, FileText, Cable, Pill } from "lucide-react";
import * as packingService from "@/services/packing-service";

const packingCategoryIcons: { [key: string]: React.ReactNode } = {
  equipaje_ropa: <Shirt className="text-primary" />,
  equipaje_calzado: <Footprints className="text-primary" />,
  equipaje_equipamiento: <Tent className="text-primary" />,
  equipaje_higiene: <SprayCan className="text-primary" />,
  equipaje_documentos: <FileText className="text-primary" />,
  equipaje_electronica: <Cable className="text-primary" />,
  equipaje_medicinas: <Pill className="text-primary" />,
};

type PackingState = {
  [itemId: string]: boolean;
};

interface PackingViewProps {
    packingState: PackingState;
    onPackingChange: (state: PackingState) => void;
}

export function PackingView({ packingState, onPackingChange }: PackingViewProps) {

  const handleItemToggle = async (itemId: string) => {
    const newState = {
      ...packingState,
      [itemId]: !packingState[itemId],
    };
    onPackingChange(newState);
    await packingService.savePackingState(newState);
  };

  return (
    <Accordion type="multiple" className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {tripConfig.packing.categories.map(category => (
        <Card key={category.id}>
        <AccordionItem value={category.id} key={category.id} className="border-none">
          <AccordionTrigger className="p-4 text-lg font-bold hover:no-underline">
            <div className="flex items-center gap-3">
              {packingCategoryIcons[category.id]}
              <span>{category.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <div className="space-y-3">
              {category.items.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <Checkbox 
                    id={`item-${item.id}`} 
                    checked={!!packingState[item.id]}
                    onCheckedChange={() => handleItemToggle(item.id)}
                    className="mt-1"
                  />
                  <label htmlFor={`item-${item.id}`} className="flex-1 cursor-pointer">
                    <p className="font-medium">{item.name}</p>
                    {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                  </label>
                  {item.quantity && <span className="text-sm font-semibold">{item.quantity}</span>}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        </Card>
      ))}
    </Accordion>
  );
}
