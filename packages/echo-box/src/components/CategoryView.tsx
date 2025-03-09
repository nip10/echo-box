import { TriangleAlert, Lightbulb, Ellipsis } from "lucide-preact";
import { Button } from "./common/Button";

interface CategoryViewProps {
  onCategorySelect: (type: "report" | "idea" | "other") => void;
}

export function CategoryView({ onCategorySelect }: CategoryViewProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2">
        <Button variant="category" onClick={() => onCategorySelect("report")}>
          <TriangleAlert className="w-8 h-8 text-yellow-500" />
          <span className="text-sm text-gray-700 font-semibold">Issue</span>
        </Button>

        <Button variant="category" onClick={() => onCategorySelect("idea")}>
          <Lightbulb className="w-8 h-8 text-yellow-400" />
          <span className="text-sm text-gray-700 font-semibold">Idea</span>
        </Button>

        <Button variant="category" onClick={() => onCategorySelect("other")}>
          <Ellipsis className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-700 font-semibold">Other</span>
        </Button>
      </div>
    </div>
  );
}
