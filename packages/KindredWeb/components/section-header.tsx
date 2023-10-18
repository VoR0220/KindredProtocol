import * as React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from 'lucide-react';

export interface SectionHeaderProps {
  title: string;
  description?: string; // description is optional
  hasMenu?: boolean;
  titleClassName?: string; // class for h2 tag
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  hasMenu = false, 
  titleClassName = "", // default to empty string if not provided
}) => {
  return (
    <div className="flex flex-row items-start justify-between my-6">
      <div className="header-content">
        {/* Apply titleClassName to the h2 tag */}
        <h2 className={`${titleClassName}`}>{title}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {hasMenu && (
        <Button variant="ghost" size="sm" className="text-gray-400">
          <MoreVertical className="w-5 h-5 text-gray-400"/>
        </Button>
      )}
    </div>
  );
}

export default SectionHeader;
