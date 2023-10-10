import * as React from "react"
import { Button } from "@/components/ui/button"
import { MoreVertical } from 'lucide-react';

export interface SectionHeaderProps {
  title: string;
  hasMenu: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, hasMenu }) => {
  return (
    <div className="flex flex-row items-center justify-between mb-6">
      <h2>{title}</h2>
      {hasMenu && <Button variant="ghost" size="sm"><MoreVertical /></Button>}
    </div>
  );
}

export default SectionHeader